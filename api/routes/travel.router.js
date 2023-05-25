const travelRouter = require('express').Router()
const { checkAuth, checkAdmin } = require('../../middlewares/auth')

const { 
  getAllTravels,
  getOneTravel,
  createTravel,
  updateTravel,
  deleteTravel,
  showMyTravels,
  deleteMyTravel,
  updateMyTravel,
  addUserToTravel,
  removeUserFromTravel,
  usersInTravel } = require('../controllers/travel.controller')

travelRouter.get('/', checkAuth, getAllTravels)
travelRouter.get('/myTravels', checkAuth, showMyTravels)
travelRouter.get('/users/:travelId', checkAuth, usersInTravel)
travelRouter.get('/:id', checkAuth, getOneTravel)

travelRouter.post('/', checkAuth, createTravel)
travelRouter.post('/:travelId/user/:userId', checkAuth, addUserToTravel)

travelRouter.put('/user/:id', checkAuth, updateMyTravel)
travelRouter.put('/:id', checkAuth, checkAdmin, updateTravel)

travelRouter.delete('/:id', checkAuth, checkAdmin, deleteTravel)
travelRouter.delete('/user/:id', checkAuth, deleteMyTravel)
travelRouter.delete('/:travelId/user/:userId', checkAuth, removeUserFromTravel)


module.exports =  { travelRouter } 