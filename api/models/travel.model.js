const { sequelize } = require('../../db')
const { DataTypes } = require('sequelize')

const Travel = sequelize.define('travel', {
  departure_date: {
    type: DataTypes.DATEONLY,
  },
  return_date: {
    type: DataTypes.DATEONLY,
  },
  budget: {
    type: DataTypes.INTEGER,
  },
  visibility: {
    type: DataTypes.ENUM('public', 'private'),
    defaultValue: 'private'
  },
  airport: {
    type: DataTypes.STRING
  }
},
{
  timestamps: false
})

module.exports = { Travel }