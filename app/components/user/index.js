module.exports = {
  http: function (path) {
    require('./http.user')(path)
  },
  user: require('./user.model'),
}
