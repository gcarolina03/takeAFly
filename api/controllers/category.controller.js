const { Category } = require ('../models/category.model')

const getAllCategories = async (req, res) => {
    try {
         const categories = await Category.findAll()
        if (categories) {
            return res.status(200).json(categories)
        } else {
            return res.status(404).send('Categories not found')
        }
    } catch (err) {
        return res.status(200).send(err.message)
    }
}

const getOneCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id)
        if(category) {
            return res.status(200).json({ messge: 'Category Found', category})
        } else {
            return res.status(404).send('Error: Category not found')
        }
    } catch(err) {
        return res.status(500).send(err.message)
    }
}

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(200).json({message: 'Category created', category})
    } catch (error) {
        return res.status(500).send('Error: Cannot create category ')
    }
}

const updateCategory = async (req, res) => {
    try {
        const [categoryExist,category]= await Category.update(req.body, {
            returning : true,
            where: { id: req.params.id }
        })
        if (categoryExist !== 0 ) {
            return res.status(200).json({ message: 'Category updated', category: category })
        } else {
            return res.status(404).send('Error: Category not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.destroy({
            where: { id: req.params.id }
        })
        if(category){
            return res.status(200).json('Error: Category deleted')
        } else {
            return res.status(404).send('Error: Category not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

module.exports = { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory }