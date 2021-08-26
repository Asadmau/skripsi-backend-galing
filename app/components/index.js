const { endpoint } = require('../state')
module.exports = () => {
  require('./inventory/http').admin(endpoint.inventory)
  require('./storage').http(endpoint.storage)
  require('./user').http(endpoint.main)
  require('./inventory/http').public(endpoint.main)
}
