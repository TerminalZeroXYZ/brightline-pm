import express from 'express'
import Suggestion from '../models/Suggestion.js'
import { evaluateSuggestion } from '../services/grok.js'

const router = express.Router()

// Submit a new market suggestion
router.post('/', async (req, res) => {
  try {
    const { title, description, isScalar, suggestedBy } = req.body

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' })
    }

    // Call Grok to evaluate the idea
    const evaluation = await evaluateSuggestion(title, description)

    const suggestion = await Suggestion.create({
      title,
      description,
      isScalar: isScalar || false,
      suggestedBy: suggestedBy || 'anonymous',
      status: evaluation.score >= 70 ? 'pending' : 'rejected',
      grokScore: evaluation.score,
      grokFeedback: evaluation.feedback
    })

    res.status(201).json(suggestion)
  } catch (error) {
    console.error('Error creating suggestion:', error)
    res.status(500).json({ error: 'Failed to create suggestion' })
  }
})

// Get all suggestions
router.get('/', async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 }).limit(50)
    res.json(suggestions)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions' })
  }
})

// Get only pending suggestions (for admin review later)
router.get('/pending', async (req, res) => {
  try {
    const pending = await Suggestion.find({ status: 'pending' }).sort({ createdAt: -1 })
    res.json(pending)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending suggestions' })
  }
})

export default router
