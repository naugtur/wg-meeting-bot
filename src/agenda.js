
module.exports = {
  getItems (tag, fetch) {
    return fetch({
      url: `https://api.github.com/search/issues?q=org:nodejs+state:open+label:${tag}&sort=updated`
    })
    .then(body => body.items)
  }
}
