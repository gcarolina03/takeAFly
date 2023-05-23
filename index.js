require('dotenv').config()
const express = require('express')
const { sequelize, connectDB, syncModels, closeConnection } = require('./db')
const { router } = require('./api/routes');
const addRelationsToModels = require('./db/relationships')

const app = express()

const connectionAndSync = async () => {
  await connectDB()
  addRelationsToModels()
  // await syncModels('alter')
}

const start = async () => {
  try {
    app.get('/', (req, res) => res.send('Welcome to Take A Fly API'))
    app.use(express.json())
    app.use('/api', router)
    app.listen(process.env.EXPRESS_PORT || 2222)
    connectionAndSync()
    console.info(`Take A Fly API running on port ${process.env.EXPRESS_PORT}`)
  } catch (err) {
    throw new Error(`Cannot start server on port ${process.env.EXPRESS_PORT}, ${err}`)
  }
}

start();