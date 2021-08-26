const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../state')

module.exports = sequelize.define(
  'kategori',
  {
    name: {
      type: DataTypes.STRING,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    type: {
      type: DataTypes.ENUM('parent', 'sub1', 'sub2'),
      allowNull: true,
      defaultValue: 'parent',
    },
  },
  {
    freezeTableName: true,
  }
)
