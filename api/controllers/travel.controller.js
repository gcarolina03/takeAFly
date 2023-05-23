const { Travel } = require ('../models/travel.model.js')

const getAllTravels = async (req, res) => {
	try {
		const travels = await Travel.findAll()
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
		const travel = await Travel.findByPk(req.params.id)
		if (travel) {
			return res.status(200).json(travel)
		} else {
			return res.status(404).send('Error: Travel not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const createTravel = async (req, res) => {
	try {
		const travel = await Travel.create(req.body)
		return res.status(200).json({ message: 'Success: Travel created', travel: travel })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateTravel = async (req, res) => {
	try {
		const [travelExist, travel] = await Travel.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (travelExist !== 0) {
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
		const actor = await Travel.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (actor) {
			return res.status(200).json('Success: Travel deleted')
		} else {
			return res.status(404).send('Error: Travel not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
    getAllTravels,
    getOneTravel,
    createTravel,
    updateTravel,
    deleteTravel
}