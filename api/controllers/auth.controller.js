const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model')

const signup = async(req, res) => {
    try {
        // password is encrypted
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        // user is created
        const user = await User.create(req.body)
        // create a JSON Web Token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).json( {token} )
    } catch (err) {
        console.log(err)
        res.status(500).send(`Error: User not created`)
    }
}

const login = async (req,res) => {
    try {
        const email = req.body.email
        // search user with email
        const user = await User.findOne({ where: { email }})
        // user not exist, return error
        if (!user) { return res.status(400).send('user or password incorrect') }

        // compare encrypted password
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            // password is not the same, return error
            if(err) { return res.status(400).send('user or password incorrect') }
            
            //ok! create a JSON Web Token
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.status(200).json( {token} )
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Error: Failed to login!')
    } 
}

module.exports = { signup, login }