const travelRouter = require('express').Router()
const { checkAuth, checkAdmin } = require('../../middlewares/auth')

const { getAllTravels, getOneTravel, createTravel, updateTravel, deleteTravel } = require('../controllers/travel.controller')

travelRouter.get('/', checkAuth, getAllTravels)
travelRouter.get('/:id', checkAuth, getOneTravel)
travelRouter.post('/', checkAuth, createTravel)
travelRouter.put('/:id', checkAuth, updateTravel)
travelRouter.delete('/:id', checkAuth, deleteTravel)

module.exports =  { travelRouter } 