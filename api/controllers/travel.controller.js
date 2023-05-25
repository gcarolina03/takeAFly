const { Travel } = require ('../models/travel.model.js')
const { User } = require ('../models/user.model.js')
const { Category } = require ('../models/category.model.js')
const { Destination } = require ('../models/destination.model.js')


const getAllTravels = async (req, res) => {
	try {
		let travels = "";
		if (res.locals.user.roles === 'admin') {
			travels = await Travel.findAll({
				include: [ 
				{ model: Category, attributes: ['title'] }, 
				{ model: Destination, attributes: ['city'] },
			], 
			attributes: { exclude: ['categoryId', 'destinationId'] }
			}) 
			
		} else {
			travels = await Travel.findAll({ 
				where: { visibility: 'public', },
				include: [ 
				{ model: Category, attributes: ['title'] }, 
				{ model: Destination, attributes: ['city'] },
			], 
			attributes: { exclude: ['categoryId', 'destinationId'] }
			})
		}


		if (travels) {
			return res.status(200).json(travels)
		} else {
			return res.status(404).send('No travels found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getOneTravel = async (req, res) => {
	try {
		let travel = ""
		if (res.locals.user.roles === 'admin') {
			travel = await Travel.findAll({
				where: { 
					id: req.params.id, }
			})
		} else {
			travel = await Travel.findAll({
				where: { 
					id: req.params.id,
					visibility: 'public', }
			})
		}
		
		if (travel.length !== 0) {
			return res.status(200).json(travel[0])
		} else {
			return res.status(404).send('Error: Travel not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const createTravel = async (req, res) => {
	try {
		if(!req.body.userId) { req.body.userId = res.locals.user.id }

		const travel = await Travel.create(req.body)
		await travel.addUser(res.locals.user)
		return res.status(200).json({ message: 'Success: Travel created', travel: travel })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateTravel = async (req, res) => {
	try {
		let travel = await Travel.findByPk(req.params.id)

		if (travel) {
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

const deleteTravel = async (req, res) => {
	try {
		const travel = await Travel.findByPk(req.params.id)

		if (travel) {
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

const addUserToTravel = async (req, res) => {
	try {
		const travel = await Travel.findByPk(req.params.travelId)

		if(travel) {
			if(travel.visibility !== 'public') {
				return res.status(500).send('You are not authorized to access this resource')
			}

			const user = await User.findByPk(req.params.userId)
			await travel.addUser(user)
			return res.status(200).json('Success: User added to travel')

		} else {
			return res.status(404).send('No travel found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const removeUserFromTravel = async (req, res) => {
	try {
		const travel = await Travel.findByPk(req.params.travelId)

		if(travel) {
			if(travel.visibility !== "public") {
				return res.status(500).send('You are not authorized to access this resource')
			}
			
			const user = await User.findByPk(req.params.userId)
			await travel.removeUser(user)
			return res.status(200).json('Success: User removed to travel')

		} else {
			return res.status(404).send('No travel found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const usersInTravel = async (req, res) => {
	try {
		const travel = await Travel.findByPk(req.params.travelId)

		if(travel) {
			if(travel.visibility !== "public") {
				return res.status(500).send('You are not authorized to access this resource')
			}

			const users = await travel.getUsers({ attributes: {exclude: ['password', 'roles']} })
			return res.status(200).json(users)
		} else {
			return res.status(404).send('No travel found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = {
    getAllTravels,
    getOneTravel,
    createTravel,
    updateTravel,
    deleteTravel,
		addUserToTravel,
		removeUserFromTravel,
		usersInTravel
}