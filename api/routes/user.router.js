const userRouter = require('express').Router();
const { checkAuth, checkAdmin } = require('../../middlewares/auth')
const { createUser, getUsers, getOneUser, updateUser, deleteUser, showProfile } = require('../controllers/user.controller')

userRouter.get('/', checkAuth, checkAdmin, getUsers)
userRouter.get('/profile', checkAuth, checkAdmin, showProfile)
userRouter.get('/:id', checkAuth, checkAdmin, getOneUser)

userRouter.post('/', checkAuth, checkAdmin, createUser)

userRouter.put('/:id', checkAuth, updateUser)

userRouter.delete('/:id', checkAuth, deleteUser)


module.exports = { userRouter } 