require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const requestStatus = require('./utils/requestStatus')
const authRoutes = require('./routes/auth.routes')

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

// connection to DB Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Failed to connect to MongoDB')
    process.exit(1)
  }
}

// connection to DB
connectDB()

// Routes
app.use('/api/auth', authRoutes)

// Handle wrong routes
app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  return res.status(err.codeStatus || 500).json({
    status: err.errorStatus || requestStatus.ERROR,
    code: err.codeStatus || 500,
    message: err.message || 'An unexpected error occurred',
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
