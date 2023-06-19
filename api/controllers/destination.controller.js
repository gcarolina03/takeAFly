const { Destination } = require('../models/destination.model')
const { Category } = require('../models/category.model')


const getAllDestination = async (req,res) => {
  try {
    const destinations = await Destination.findAll({include: Category})
    if(destinations){
      return res.status(200).json(destinations)
    } else {
      return res.status(404).send('Destinations not found')
    }
  } catch (err) {
    return res.status(500).send(err.message)
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
  } catch(err) {
    return res.status(500).send(err.message)
  }
}

const getDestinationsByCategory = async (req, res) => {
  try {
    const destination = await Destination.findAll({
      include: { model: Category, where: { id: req.params.idCategory }, 
      through: { attributes: [] },
      attributes: ['title'],
      },
      
    })
    
    if(destination) {
      return res.status(200).json(destination)
    } else {
      return res.status(404).send('Destination not found')
    }
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body)
    destination.addCategories(req.body.categories)
    return res.status(200).json({destination, categories: req.body.categories})
  } catch(err){
    return res.status(500).send(err.message)
  }
}

const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);

    if(destination) {
      await Destination.update(req.body, {
      where: { id: req.params.id }
    })

    if(req.body.categories) {
      destination.addCategories(req.body.categories.update)
      destination.removeCategories(req.body.categories.deleted)
    }
      return res.status(200).json({ destination, categories: req.body.categories.update })
    } else {
      return res.status(404).send ('Destination not found')
    }
  } catch(err) {
    return res.status(500).send(err.message)
  }
}

const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.destroy({
      where: {id: req.params.id}
    })
    if (destination) {
      return res.status(200).json('Destination has been deleted')
    } else {
      return res.status(404).send('Destination not found')
    }
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const getDestinationsByAirport = async (req, res) => {
  try {
    const destinations = await Destination.findAll({
      include: { model: Category, where: { id: req.params.airportId }, 
      through: { attributes: [] },
      attributes: ['title'],
      },
    })

    if (destinations) {
      return res.status(200).json(destinations);
    } else {
      return res.status(404).send('Destinations not found for the given airport');
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getAllDestination,
  getOneDestination,
  createDestination,
  updateDestination,
  deleteDestination,
  getDestinationsByCategory,
  getDestinationsByAirport
}