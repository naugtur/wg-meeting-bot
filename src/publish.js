
module.exports = {
  publishMarkdown: function (content, fetch) {
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
  }
}
