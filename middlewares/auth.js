const jwt = require('jsonwebtoken')
const { User } = require('../api/models/user.model')

const checkAuth = (req, res, next) => {
  if (!req.headers.token) { return res.status(500).send('Error: Token not valid') }

  jwt.verify(req.headers.token, process.env.JWT_SECRET, async (err, data) => {
    if (err) { return res.status(500).send('Error: Token not valid') }

    const user = await User.findOne({ where: { email: data.email }})
    if(!user) { return res.status(500).send('Error: Token not valid') }

    res.locals.user = user
    next()
  })
}

const checkAdmin = async (req, res, next) => {
  if(res.locals.user.roles !== 'admin') { return res.status(500).send('You are not authorized to access this resource') }
  next()
}

module.exports = { checkAuth, checkAdmin }
