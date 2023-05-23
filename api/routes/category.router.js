const categoryRouter = require('express').Router()
const { checkAuth, checkAdmin } = require('../../middlewares/auth')

const { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')

categoryRouter.get('/', checkAuth, checkAdmin, getAllCategories)
categoryRouter.get('/:id', checkAuth, checkAdmin, getOneCategory)
categoryRouter.post('/', checkAuth, checkAdmin, createCategory)
categoryRouter.put('/:id', checkAuth, checkAdmin, updateCategory)
categoryRouter.delete('/:id', checkAuth, checkAdmin, deleteCategory)

module.exports = { categoryRouter }