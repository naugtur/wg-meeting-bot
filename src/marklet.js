const mdesc = require('markdown-escape')

const now = new Date()
const m = {
  name: prompt('Workgroup name please'),
  date: `${now.getMonth()}/${now.getFullYear()}`
}

fetch('https://api.github.com/search/issues?q=org:nodejs+state:open+label:diag-agenda&sort=updated', {
  headers: {
    'user-agent': 'Node-WG-meeting-bot'
  },
  withCredentials: true
})
.then(res => res.json())
.then(body => body.items)
.then(items => {
  console.log(items)
  const agenda = items.map((item) => {
    return `* ${mdesc(item.title)} [${item.repository_url.split('/').reverse()[0]}#${item.number}](${item.html_url})`
  }).join('\n')
  const minutes = items.map(item => {
    return `### ${mdesc(item.title)} [${item.repository_url.split('/').reverse()[0]}#${item.number}](${item.html_url})
    ${item.assignees.map(u => ' @' + u.login)}`
  }).join('\n\n')

  const md = `
# ${m.name} WG Meeting ${m.date}

## Agenda

${agenda}

## Attendees

## Minutes

${minutes}
  `

  console.log(md)
})
