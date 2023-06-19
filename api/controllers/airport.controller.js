const { Airport } = require ('../models/airport.model')

const getAllAirports = async (req, res) => {
    try {
         const airports = await Airport.findAll()
        if (airports) {
            return res.status(200).json(airports)
        } else {
            return res.status(404).send('Airports not found')
        }
    } catch (err) {
        return res.status(200).send(err.message)
    }
}

const creatAirport = async (req, res) => {
    try {
        const airport = await Airport.create(req.body)
        return res.status(200).json({message: 'Airport created', airport})
    } catch (error) {
        return res.status(500).send('Error: Cannot create airport ')
    }
}

const updateAirport = async (req, res) => {
    try {
        const [airportExist, airport]= await Airport.update(req.body, {
            returning : true,
            where: { id: req.params.id }
        })
        if (airportExist !== 0 ) {
            return res.status(200).json({ message: 'Airport updated', airport: airport })
        } else {
            return res.status(404).send('Error: Airport not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

const deleteAirport = async (req, res) => {
    try {
        const airport = await Airport.destroy({
            where: { id: req.params.id }
        })
        if(airport){
            return res.status(200).json('Airport deleted')
        } else {
            return res.status(404).send('Error: Airport not found')
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

module.exports = { getAllAirports, creatAirport, updateAirport, deleteAirport }