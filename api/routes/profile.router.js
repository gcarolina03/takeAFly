const profileRouter = require('express').Router()
const { checkAuth } = require('../../middlewares/auth') 

const {
  showProfile,
  updateMyUser,
  showMyTravels,
  updateMyTravel,
  deleteMyTravel,
	addToTravel,
	removeFromTravel
} = require('../controllers/profile.controller')

profileRouter.get('/', checkAuth, showProfile)
profileRouter.get('/travels', checkAuth, showMyTravels)

profileRouter.post('/travel/:travelId/user', checkAuth, addToTravel)

profileRouter.put('/travel/:id', checkAuth, updateMyTravel)
profileRouter.put('/', checkAuth, updateMyUser)

profileRouter.delete('/travel/:travelId/user', checkAuth, removeFromTravel)
profileRouter.delete('/travel/:id', checkAuth, deleteMyTravel)

module.exports =  { profileRouter } 

