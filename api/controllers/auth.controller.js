const bcrypt = require('bcrypt')
const { User } = require('../models/user.model')

const signup = async(req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error creating user')
    }
}

const login = async (req,res) => {
    try {
        const email = req.body.email
        const user = await User.findOne({ where: { email }})
        if (!user) {
            return res.status(400).send('user or password incorrect')
        }

        bcrypt.compare(req.body.password, user.password, (err,result) =>{
            if(err) {
                return res.status(400).send('user or password incorrect')
            }
            res.status(200).json(user )
        })
    }   catch (error) {
        console.log(error)
        res.status(500).send('Error: cannot login ')
    } 
}

module.exports = { signup, login }