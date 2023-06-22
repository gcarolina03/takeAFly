const bcrypt = require('bcrypt')
const { User } = require('../models/user.model');
const { Travel } = require ('../models/travel.model')
const { Category } = require ('../models/category.model')
const { Destination } = require ('../models/destination.model')


const showProfile = async (req, res) => {
  try {
    return res.json( res.locals.user )
  } catch (err) {
    return res.status(404).send('Error: User not found') 
  }
}

const updateMyUser = async (req, res) => {
  try {
    if(req.body.password) { req.body.password = bcrypt.hashSync(req.body.password, 10) }
		if(req.body.email) { delete req.body.email }

		const [userExist, user] = await User.update(req.body, {
			returning: true,
			where: { id: res.locals.user.id}
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

const showMyTravels = async (req, res) => {
	try {
		const travels = await res.locals.user.getTravels({ 
			include: [ 
				{ model: Destination, attributes: ['city', 'imgUrl'] },
			], 
			attributes: { exclude: ['destinationId'] } ,
			joinTableAttributes: [],
			order: [['departure_date', 'DESC']]
		})
		if (travels) {
			return res.status(200).json( travels )
		} else {
			return res.status(404).send('No travels found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateMyTravel = async (req, res) => {
	try {
		let travel = await Travel.findByPk(req.params.id)

		if (travel) {
			if(parseInt(travel.userId) !== parseInt(res.locals.user.id)) {
				return res.status(500).send('You are not authorized to access this resource')
			}

			travel = await Travel.update(req.body, {
					returning: true,
					where: { id: req.params.id },
				})

			return res.status(200).json({ message: 'Success: Travel updated', travel: travel })
		} else {
			return res.status(404).send('Error: Travel not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteMyTravel = async (req, res) => {
	try {
		const travel = await Travel.findByPk(req.params.id)

		if (travel) {
			if(parseInt(travel.userId) !== parseInt(res.locals.user.id)) {
				return res.status(500).send('You are not authorized to access this resource')
			}

			await Travel.destroy({
				where: { id: req.params.id },
			})

			return res.status(200).json('Success: Travel deleted')
		} else {
			return res.status(404).send('Error: Travel not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const addToTravel = async (req, res) => {
	try {
		const travel = await Travel.findByPk(req.params.travelId)

		if(travel) {
			if(travel.visibility !== 'public') {
				return res.status(500).send('You are not authorized to access this resource')
			}

			const user = await User.findByPk(res.locals.user.id)
			await travel.addUser(user)
			return res.status(200).json('Success: User added to travel')
		} else {
			return res.status(404).send('No travel found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const removeFromTravel = async (req, res) => {
	try {
		const travel = await Travel.findByPk(req.params.travelId)

		if(travel) {
			if(travel.visibility !== "public") {
				return res.status(500).send('You are not authorized to access this resource')
			}
			
			const user = await User.findByPk(res.locals.user.id)
			await travel.removeUser(user)
			return res.status(200).json('Success: User removed to travel')

		} else {
			return res.status(404).send('No travel found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


module.exports = {
  showProfile,
  updateMyUser,
  showMyTravels,
  updateMyTravel,
  deleteMyTravel,
	addToTravel,
	removeFromTravel
}
