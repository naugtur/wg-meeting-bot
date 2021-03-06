#!/usr/bin/env node
const path = require('path')
const minimist = require('minimist')
const agenda = require('./agenda')
const markdowner = require('./markdowner')
const publish = require('./publish')
const templates = require('./templates')
const gh = require('./gh')

const argv = minimist(process.argv.slice(2), {
  string: ['token', 'tag']
})

if (argv.config) {
  Object.assign(argv, require(path.resolve(process.cwd(), argv.config)))
}

if (argv.help || !argv.token || !argv.issuerepo || !argv.tag || !argv.date) {
  console.log('Usage:')
  console.log(`prepare-wg-meeting
    --token=GITHUB_USER_TOKEN     token scoped gist,public_repo
    --tag=tag-to-look-for         eg. diag-agenda
    --issuerepo=user/project      eg. nodejs/diagnostics
    --date=date                   meeting date, anything that can be passed to Date()
    `)
  console.log('  Getting a token: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/')
  process.exit(1)
}
const when = new Date(argv.date)
const date = `${when.getFullYear()}/${when.getUTCMonth() + 1}/${when.getUTCDate()}`

const fetch = gh.createFetch(argv.token)

agenda.getItems(argv.tag, fetch)
  .then(items => markdowner.getMarkdown(date, items, argv.tag))
  .then(content => Promise.all([
    publish.publishMarkdown(content.all, fetch),
    publish.publishIssue(argv.issuerepo, {
      title: `WG Meeting ${date}`,
      body: templates.issue(date, content.agenda)
    }, fetch)
  ]))
  .then(([gistUrl, issueUrl]) => {
    console.log('Go to https://hackmd.io/new and import this gist:')
    console.log(gistUrl)
    console.log('Issue created:')
    console.log(issueUrl)
  })
  .catch(e => {
    console.error(e)
    console.error('Check if your token is valid and has scope for: gist, public_repo')
    process.exit(1)
  })
