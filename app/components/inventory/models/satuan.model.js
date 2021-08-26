const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../state')

module.exports = sequelize.define(
  'satuan',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
)
