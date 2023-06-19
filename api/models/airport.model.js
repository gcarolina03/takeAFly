const { sequelize } = require('../../db')
const { DataTypes } = require('sequelize')

const Airport = sequelize.define('airport', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    }
},
{
  timestamps: false
})

module.exports = { Airport } 