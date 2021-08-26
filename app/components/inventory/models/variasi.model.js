const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../state')

module.exports = sequelize.define(
  'variasiProduk',
  {
    produkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    satuanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
)
