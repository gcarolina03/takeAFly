const router = require('express').Router();
const { authRouter } = require('./auth.router.js'); 
const { categoryRouter } = require('./categories.router.js')

router.use('/auth', authRouter);
router.use('/categories', categoryRouter)

module.exports = { router }