const { sequelize } = require('../../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  roles: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  }
},
{
  timestamps: false
})

module.exports = { User }