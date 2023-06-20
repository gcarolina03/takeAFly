const airportRouter = require('express').Router()
const { checkAuth, checkAdmin } = require('../../middlewares/auth')

const { getAllAirports, createAirport, updateAirport, deleteAirport } = require('../controllers/airport.controller')

airportRouter.get('/', checkAuth, getAllAirports)

airportRouter.post('/', checkAuth, checkAdmin, createAirport)

airportRouter.put('/:id', checkAuth, checkAdmin, updateAirport)

airportRouter.delete('/:id', checkAuth, checkAdmin, deleteAirport)

module.exports = { airportRouter }