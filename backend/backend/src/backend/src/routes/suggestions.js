import express from 'express'
import Suggestion from '../models/Suggestion.js'

const router = express.Router()

// Submit a new market suggestion
router.post('/', async (req, res) => {
  try {
    const { title, description, isScalar, suggestedBy } = req.body

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' })
    }

    // Simple scoring for now (later we will connect Grok API)
    const score = Math.floor(Math.random() * 40) + 60 // temporary score between 60-100

    const suggestion = await Suggestion.create({
      title,
      description,
      isScalar: isScalar || false,
      suggestedBy: suggestedBy || 'anonymous',
      status: score >= 70 ? 'pending' : 'rejected',
      grokScore: score,
      grokFeedback: score >= 70 
        ? 'Looks like a solid market idea. Pending review.' 
        : 'Needs more clarity or better resolution criteria.'
    })

    res.status(201).json(suggestion)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create suggestion' })
  }
})

// Get all suggestions (for admin later)
router.get('/', async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 })
    res.json(suggestions)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions' })
  }
})

export default router
