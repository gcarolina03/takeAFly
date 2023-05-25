const router = require('express').Router();
const { authRouter } = require('./auth.router.js'); 
const { categoryRouter } = require('./category.router.js')
const { travelRouter } = require('./travel.router.js')
const { userRouter } = require('./user.router')
const { destinationRouter } = require('./destination.router')
const { profileRouter } = require('./profile.router')


router.use('/auth', authRouter);
router.use('/categories', categoryRouter)
router.use('/travels', travelRouter)
router.use('/users', userRouter);
router.use('/destinations', destinationRouter)
router.use('/profile', profileRouter)

module.exports = { router }