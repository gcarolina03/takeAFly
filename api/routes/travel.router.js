const travelRouter = require('express').Router()
const { checkAuth, checkAdmin } = require('../../middlewares/auth')

const { 
  getAllTravels,
  getOneTravel,
  createTravel,
  updateTravel,
  deleteTravel,
  addUserToTravel,
  removeUserFromTravel,
  usersInTravel } = require('../controllers/travel.controller')

travelRouter.get('/', checkAuth, getAllTravels)
travelRouter.get('/:travelId/users', checkAuth, usersInTravel)
travelRouter.get('/:id', checkAuth, getOneTravel)

travelRouter.post('/', checkAuth, createTravel)
travelRouter.post('/:travelId/user/:userId', checkAuth, checkAdmin, addUserToTravel)

travelRouter.put('/:id', checkAuth, checkAdmin, updateTravel)

travelRouter.delete('/:id', checkAuth, checkAdmin, deleteTravel)
travelRouter.delete('/:travelId/user/:userId', checkAuth, checkAdmin, removeUserFromTravel)


module.exports =  { travelRouter } 