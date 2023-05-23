const { sequelize } = require('../../db')
const { DataTypes } = require('sequelize')

const Destination = sequelize.define("destinations", {
  country : {
    type: DataTypes.STRING,
    allowNull: false
  },
  city : {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
},
{
  timestamps: false
})

module.exports = { Destination }
