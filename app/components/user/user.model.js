const { DataTypes } = require('sequelize')
const { sequelize } = require('../../state')

module.exports = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: null,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    avatarId: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    isVerifed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      defaultValue: null,
      get() {
        if (this.lastName == null) {
          return this.firstName
        } else {
          return `${this.firstName} ${this.lastName}`
        }
      },
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  }
)
