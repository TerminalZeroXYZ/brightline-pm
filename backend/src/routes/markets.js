import express from 'express'
import Market from '../models/Market.js'

const router = express.Router()

// Get all open markets
router.get('/', async (req, res) => {
  try {
    const markets = await Market.find({ status: 'open' })
      .sort({ createdAt: -1 })
      .limit(50)

    // If no markets in database yet, return a sample so the frontend still works
    if (markets.length === 0) {
      return res.json([
        {
          id: 'sample-1',
          title: 'Brightline fatalities in Q3 2026',
          description: 'Total number of accidental fatalities caused by Brightline trains from July 1 to September 30, 2026. Resolved using official FRA / NTSB data.',
          isScalar: true,
          status: 'open',
          endTime: new Date('2026-10-05')
        }
      ])
    }

    res.json(markets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch markets' })
  }
})

// Get a single market by ID
router.get('/:id', async (req, res) => {
  try {
    const market = await Market.findById(req.params.id)
    if (!market) {
      return res.status(404).json({ error: 'Market not found' })
    }
    res.json(market)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market' })
  }
})

export default router
