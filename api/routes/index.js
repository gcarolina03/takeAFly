const router = require('express').Router();
const { authRouter } = require('./auth.router.js'); 
const { categoryRouter } = require('./category.router.js')
const { travelRouter } = require('./travel.router.js')
const { userRouter } = require('./user.router')

router.use('/auth', authRouter);
router.use('/categories', categoryRouter)
router.use('/travel', travelRouter)
router.use('/user', userRouter);

module.exports = { router }