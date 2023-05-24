const travelRouter = require('express').Router()
const { checkAuth, checkAdmin } = require('../../middlewares/auth')

const { 
  getAllTravels,
  getOneTravel,
  createTravel,
  updateTravel,
  deleteTravel,
  showMyTravels,
  addUserToTravel,
  removeUserFromTravel } = require('../controllers/travel.controller')

travelRouter.get('/', checkAuth, getAllTravels)
travelRouter.get('/myTravels', checkAuth, showMyTravels)
travelRouter.get('/:id', checkAuth, getOneTravel)

travelRouter.post('/', checkAuth, createTravel)
travelRouter.post('/:travelId/user/:userId', checkAuth, addUserToTravel)

travelRouter.put('/:id', checkAuth, updateTravel)

travelRouter.delete('/:id', checkAuth, deleteTravel)
travelRouter.delete('/:travelId/user/:userId', checkAuth, removeUserFromTravel)


module.exports =  { travelRouter } 