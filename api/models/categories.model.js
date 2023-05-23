const { sequelize } = require('../../db')
const { DataTypes } = require('sequelize')

const Category = sequelize.define('categories', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = { Category } 