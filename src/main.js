#!/usr/bin/env node
const minimist = require('minimist')
const agenda = require('./agenda')
const markdowner = require('./markdowner')
const publish = require('./publish')
const gh = require('./gh')

const argv = minimist(process.argv.slice(2), {
  string: ['token', 'tag']
})

if (argv.help || !argv.token) {
  console.log('Usage: prepare-wg-meeting --token=GITHUB_USER_TOKEN --tag=tag-to-look-for')
  console.log('  Getting a token: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/')
  process.exit(1)
}

const fetch = gh.createFetch(argv.token)

agenda.getItems(argv.tag, fetch)
  .then(items => markdowner.getMarkdown(items, argv.tag))
  .then(content => publish.publishMarkdown(content, fetch))
  .then(gistUrl => {
    console.log('Go to https://hackmd.io/new and import this gist:')
    console.log(gistUrl)
  })
  .catch(e => {
    console.error(e)
    console.error('Check if your token is valid and allows creating gists')
    process.exit(1)
  })
