const mdesc = require('markdown-escape')
const templates = require('./templates')

module.exports = {
  getMarkdown (items, tag) {
    const now = new Date()
    const date = `${now.getMonth()}/${now.getFullYear()}`

    const agenda = items.map((item) => {
      return `* ${mdesc(item.title)} [${item.repository_url.split('/').reverse()[0]}#${item.number}](${item.html_url})`
    }).join('\n')
    const minutes = items.map(item => {
      return `### ${mdesc(item.title)} [${item.repository_url.split('/').reverse()[0]}#${item.number}](${item.html_url}) \n${item.assignees.map(u => ' @' + u.login)}`
    }).join('\n\n')

    const md = templates.minutesDoc(date, tag, agenda, minutes)

    return {
      all: md,
      agenda: agenda
    }
  }
}
