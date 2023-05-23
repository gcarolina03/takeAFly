const { sequelize } = require('../../db')
const { DataTypes } = require('sequelize')

const Category = sequelize.define('category', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
  timestamps: false
})

module.exports = { Category } 