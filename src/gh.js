const util = require('util')
const prequest = util.promisify(require('request'))

module.exports = {
  createFetch (token) {
    const mixin = {
      headers: {
        'authorization': `Bearer ${token}`,
        'user-agent': 'Node-WG-meeting-bot'
      },
      json: true
    }
    return (options) => prequest(Object.assign({}, mixin, options))
    .then(res => {
      if (res.statusCode < 400) {
        return res.body
      } else {
        console.error(options, res.body)
        throw Error(res.statusCode)
      }
    })
  }
}
