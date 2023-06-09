const userRouter = require('express').Router();
const { checkAuth, checkAdmin } = require('../../middlewares/auth')
const { createUser, getUsers, getOneUser, updateUser, deleteUser } = require('../controllers/user.controller')

userRouter.get('/', checkAuth, checkAdmin, getUsers)
userRouter.get('/:id', checkAuth, checkAdmin, getOneUser)

userRouter.post('/', checkAuth, checkAdmin, createUser)

userRouter.put('/:id', checkAuth, checkAdmin, updateUser)

userRouter.delete('/:id', checkAuth, checkAdmin, deleteUser)


module.exports = { userRouter } 