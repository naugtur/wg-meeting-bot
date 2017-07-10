
module.exports = {
  publishMarkdown (content, fetch) {
    return fetch({
      method: 'POST',
      url: `https://api.github.com/gists`,
      body: {
        'description': 'wg-meeting-bot generated meeting minutes',
        'public': true,
        'files': {
          'minutes.md': {
            'content': content
          }
        }
      }
    })
    .then(body => body.html_url)
  },
  publishIssue (repo, data, fetch) {
    return fetch({
      method: 'POST',
      url: `https://api.github.com/repos/${repo}/issues`,
      body: data
    })
    .then(body => body.html_url)
  }
}
