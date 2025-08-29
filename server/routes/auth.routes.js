const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authMiddleware, getMe)

module.exports = router
