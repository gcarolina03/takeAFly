const { Destination } = require('../models/destination.model')

const getAllDestination = async (req,res) => {
  try {
    const destinations = await Destination.findAll()
    if(destinations){
      return res.status(200).json(destinations)
    } else {
      return res.status(404).send('Destinations not found')
    }

  } catch (error) {
    return res.status(200).send(err.message)
  }
}

const getOneDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id)
    if(destination){
      return res.status(200).json(destination)
    } else {
      return res.status(404).send('Destination not found')
    }
  } catch(error) {
    return res.status(200).send(err.message)
  }
}

const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body)
    return res.status(200).json(destination)
  } catch(error){
    return res.status(200).send(err.message)
  }
}

const updateDestination = async (req, res) => {
  try {
    const [destinationExist, destination] = await Destination.update(req.body, {
      returning: true,
      where: {id: req.params.id}
    })
    if(destinationExist !== 0) {
      return res.status(200).json(destination)
    } else {
      return res.status(404).send ('Destination not found')
    }
  } catch(error) {
    return res.status(200).send(err.message)
  }
}

const deleteDestionation = async (req, res) => {
  try {
    const destination = await Destination.destroy({
      where: {id: req.params.id}
    })
    if (destination) {
      return res.status(200).json('Destination has been deleted')
    } else {
      return res.status(404).send('Destination not found')
    }
  } catch (error) {
    return res.status(200).send(err.message)
  }
}

module.exports = {
  getAllDestination,
  getOneDestination,
  createDestination,
  updateDestination,
  deleteDestionation
}