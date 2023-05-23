const router = require('express').Router();
const { authRouter } = require('./auth.router.js'); 
const { categoryRouter } = require('./categories.router.js')
const { travelRouter } = require('./travel.router.js')

router.use('/auth', authRouter);
router.use('/categories', categoryRouter)
router.use('/travel', travelRouter)

module.exports = { router }