const asyncWrapper = require('../utils/asyncWrapper')
const User = require('../models/user.model')
const appError = require('../utils/appError')
const requestStatus = require('../utils/requestStatus')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncWrapper(async (req, res, next) => {
  const { username, email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser)
    return next(
      appError.create(400, requestStatus.ERROR, 'User already exists')
    )

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  const newUser = new User({ username, email, passwordHash })
  await newUser.save()
  res.status(201).json({
    status: requestStatus.SUCCESS,
    code: 201,
    message: 'User registered successfuly',
    data: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  })
})

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user)
    return next(appError.create(400, requestStatus.FAIL, 'Invalid credentials'))

  const isMatch = await bcrypt.compare(password, user.passwordHash)
  if (!isMatch)
    return next(appError.create(400, requestStatus.FAIL, 'Invalid credenials'))

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  res.json({
    status: requestStatus.SUCCESS,
    code: 200,
    message: 'Login successfuly',
    data: { token },
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  })
})

const getMe = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-passwordhash')
  res.json({ status: requestStatus.SUCCESS, code: 200, message: user })
})

module.exports = { registerUser, loginUser, getMe }
