const { Sequelize } = require('sequelize')
const { HOST: host, USER, PASSWORD, DB } = require('./db.config')
module.exports = new Sequelize(DB, USER, PASSWORD, {
  host,
  dialect: 'mysql',
  port: 3306,
})
