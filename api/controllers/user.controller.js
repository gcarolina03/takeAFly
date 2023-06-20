const bcrypt = require('bcrypt')
const { User } = require('../models/user.model');

const createUser = async (req, res) => {
  try {
    // password is encrypted
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    // user is created
    const user = await User.create(req.body)
    res.status(200).json( user );
  } catch (err) {
    res.status(500).send('Error: User not created')
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json( users );
  } catch (err) {
    res.status(500).send('Error: Users not found')
  }
}

const getOneUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json( user );
  } catch (err) {
    res.status(500).send('Error: User not found')
  }
}

const updateUser = async (req, res) => {
  try {
    if(req.body.password) { req.body.password = bcrypt.hashSync(req.body.password, 10) }

		const [userExist, user] = await User.update(req.body, {
			returning: true,
			where: { id: req.params.id }
		})
		
		if (userExist !== 0) {
			return res.status(200).json({ message: 'User updated!', user: user })
		} else {
			return res.status(404).send('Error: User not found')
		}
  } catch (err) {
    res.status(500).send('Error: User not found')
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
			where: { id: req.params.id },
		})

		if (user) {
			return res.status(200).json('User deleted')
		} else {
			return res.status(404).send('Error: User not deleted')
		}
  } catch (err) {
			return res.status(500).send('Error: User not deleted')
  }
}


module.exports = { createUser, getUsers, getOneUser, updateUser, deleteUser }