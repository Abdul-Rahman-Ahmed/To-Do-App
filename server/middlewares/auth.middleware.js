const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')
const requestStatus = require('../utils/requestStatus')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return next(appError.create(401, requestStatus.FAIL, 'No token provided'))

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return next(appError.create(401, requestStatus.FAIL, 'Invalid token'))
  }
}

module.exports = authMiddleware
