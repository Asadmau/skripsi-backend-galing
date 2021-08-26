let baseApi = '/api/admin'
module.exports = {
  config: require('./db.config'),
  sequelize: require('./sequelize'),
  moment: require('moment'),
  express: require('./config'),
  bcrypt: require('bcrypt'),
  secretJwt: 'galingDev10',
  port: process.env.PORT || 8080,
  hostname: process.env.DOMAIN || 'http://localhost:8080',
  endpoint: {
    inventory: baseApi + '/inventory',
    storage: '/api/storage',
    main: '/api/main',
  },
}
