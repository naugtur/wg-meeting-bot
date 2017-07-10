#!/usr/bin/env node
const minimist = require('minimist')
const agenda = require('./agenda')
const markdowner = require('./markdowner')
const publish = require('./publish')
const gh = require('./gh')

const argv = minimist(process.argv.slice(2), {
  string: ['token', 'tag']
})

if (argv.help || !argv.token || !argv.issuerepo || !argv.tag) {
  console.log('Usage:')
  console.log('prepare-wg-meeting --token=GITHUB_USER_TOKEN --tag=tag-to-look-for --issuerepo=user/project')
  console.log('  Getting a token: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/')
  process.exit(1)
}

const fetch = gh.createFetch(argv.token)

agenda.getItems(argv.tag, fetch)
  .then(items => markdowner.getMarkdown(items, argv.tag))
  .then(content => Promise.all([
    publish.publishMarkdown(content.all, fetch),
    publish.publishIssue(argv.issuerepo, {
      title: `WG Meeting (insert date)`,
      body: `## Date/Time

(insert date)

It's helpful if you give this post a :+1: or :-1: so we know you'd like to attend.

## Agenda
${content.agenda}`
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
