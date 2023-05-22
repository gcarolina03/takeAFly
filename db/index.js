const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	port: process.env.DB_PORT,
	logging: false
});

const connectDB = async () => {
	try {
		await sequelize.authenticate()
		console.info('Connection to DB has been established successfully.')
	} catch (err) {
		throw new Error(`Cannot connect to DB, ${err}`)
	}
}

const syncModels = async () => {
	try {
		await sequelize.sync({ alter: true })
		console.info('All models were synchronized successfully.')
	} catch (err) {
		throw new Error(`models have not been synchronized, ${err}`)
	}
}

const closeConnection = async () => {
	try {
		await sequelize.close()
		console.info('Connection to DB has been closed successfully.')
	} catch (err) {
		throw new Error(`DB has not been disconnected, ${err}`)
	}
}

module.exports = { sequelize, connectDB, syncModels, closeConnection }
