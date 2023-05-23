const destinationRouter = require('express').Router()
const { checkAuth, checkAdmin } = require('../../middlewares/auth') 
const {
  getAllDestination,
  getOneDestination,
  createDestination,
  updateDestination,
  deleteDestionation
} = require('../controllers/destination.controller')

destinationRouter.get('/', getAllDestination)
destinationRouter.get('/:id', getOneDestination)
destinationRouter.post('/', checkAuth, checkAdmin, createDestination)
destinationRouter.put('/:id', checkAuth, checkAdmin, updateDestination)
destinationRouter.delete('/:id', checkAuth, checkAdmin, deleteDestionation)

module.exports = { destinationRouter }