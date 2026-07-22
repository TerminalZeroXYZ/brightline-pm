import express from 'express'
import Suggestion from '../models/Suggestion.js'
import Market from '../models/Market.js'

const router = express.Router()

// Approve a suggestion and create a market from it
router.post('/approve/:id', async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id)

    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' })
    }

    if (suggestion.status !== 'pending') {
      return res.status(400).json({ error: 'Suggestion is not pending' })
    }

    // Create a market record from the suggestion
    const market = await Market.create({
      title: suggestion.title,
      description: suggestion.description,
      isScalar: suggestion.isScalar,
      endTime: suggestion.endTime || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // default 90 days
      status: 'open',
      createdBy: suggestion.suggestedBy,
      suggestionId: suggestion._id
    })

    // Update the suggestion
    suggestion.status = 'live'
    await suggestion.save()

    res.json({
      message: 'Suggestion approved and market created',
      market
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to approve suggestion' })
  }
})

// Reject a suggestion
router.post('/reject/:id', async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id)
    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' })
    }

    suggestion.status = 'rejected'
    await suggestion.save()

    res.json({ message: 'Suggestion rejected' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject suggestion' })
  }
})

export default router
