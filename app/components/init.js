module.exports = () => {
  require('./inventory/models')
  require('./storage').file
  require('./user').user
}
