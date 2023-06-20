const jwt = require('jsonwebtoken')
const { User } = require('../api/models/user.model')

const checkAuth = (req, res, next) => {
  if (!req.headers.token) { return res.status(500).send('Unauthorized') }

  jwt.verify(req.headers.token, process.env.JWT_SECRET, async (err, data) => {
    if (err) { return res.status(500).send('Unauthorized') }

    const user = await User.findOne({ where: { email: data.email }})
    if(!user) { return res.status(500).send('Unauthorized') }

    res.locals.user = user
    next()
  })
}

const checkAdmin = async (req, res, next) => {
  if(res.locals.user.roles !== 'admin') { return res.status(500).send('Unauthorized') }
  next()
}

module.exports = { checkAuth, checkAdmin }
