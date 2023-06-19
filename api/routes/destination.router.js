const destinationRouter = require('express').Router()
const { checkAuth, checkAdmin } = require('../../middlewares/auth') 
const {
  getAllDestination,
  getOneDestination,
  getDestinationsByCategory,
  createDestination,
  updateDestination,
  deleteDestination,
  getDestinationsByAirport
} = require('../controllers/destination.controller')

destinationRouter.get('/', checkAuth, getAllDestination)
destinationRouter.get('/category/:idCategory', checkAuth, getDestinationsByCategory)
destinationRouter.get('/category/:airportId', checkAuth, getDestinationsByAirport)

destinationRouter.get('/:id', checkAuth, getOneDestination)

destinationRouter.post('/', checkAuth, checkAdmin, createDestination)

destinationRouter.put('/:id', checkAuth, checkAdmin, updateDestination)

destinationRouter.delete('/:id', checkAuth, checkAdmin, deleteDestination)

module.exports = { destinationRouter }