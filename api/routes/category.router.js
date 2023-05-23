const categoryRouter = require('express').Router()

const { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')

categoryRouter.get('/', getAllCategories)
categoryRouter.get('/:id', getOneCategory)
categoryRouter.post('/', createCategory)
categoryRouter.put('/:id', updateCategory)
categoryRouter.delete('/:id', deleteCategory)

module.exports = { categoryRouter }