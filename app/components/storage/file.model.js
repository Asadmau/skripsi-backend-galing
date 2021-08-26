const { DataTypes } = require('sequelize')
const { sequelize } = require('../../state')

module.exports = sequelize.define(
  'file',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    contentType: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  },
  { freezeTableName: true }
)
