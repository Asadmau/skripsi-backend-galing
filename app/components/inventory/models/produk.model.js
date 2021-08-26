const { DataTypes } = require('sequelize')
const { sequelize, moment, hostname, endpoint } = require('../../../state')

module.exports = sequelize.define(
  'produk',
  {
    name: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    fileId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
    gambar: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      defaultValue: null,
      get() {
        if (this.fileId != null) {
          return `${hostname + endpoint.storage}/file/${this.fileId}`
        } else {
          return null
        }
      },
    },
    kategoriId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    urlIg: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    dateCreate: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      defaultValue: null,
      get() {
        return moment(this.createdAt).format('DD/MM/YY')
      },
    },
  },
  { freezeTableName: true }
)
