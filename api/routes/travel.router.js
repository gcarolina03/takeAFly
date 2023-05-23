const travelRouter = require('express').Router()

const { getAllTravels, getOneTravel, createTravel, updateTravel, deleteTravel } = require('../controllers/travel.controller')

travelRouter.get('/', getAllTravels)
travelRouter.get('/:id', getOneTravel)
travelRouter.post('/', createTravel)
travelRouter.put('/:id', updateTravel)
travelRouter.delete('/:id', deleteTravel)

module.exports =  { travelRouter } 