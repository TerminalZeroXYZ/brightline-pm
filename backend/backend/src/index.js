import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import suggestionsRouter from './routes/suggestions.js'
import marketsRouter from './routes/markets.js'
import { startCronJobs } from './services/cron.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST']
  }
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}))
app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
})
app.use(limiter)

// Routes
app.use('/api/suggestions', suggestionsRouter)
app.use('/api/markets', marketsRouter)

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    time: new Date().toISOString() 
  })
})

// Socket.io
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('join-market', (marketId) => {
    socket.join(`market:${marketId}`)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/brightline'
mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected')
    // Start cron jobs after database is ready
    startCronJobs(io)
  })
  .catch((err) => console.error('MongoDB connection error:', err))

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export { io }
