import cron from 'node-cron'
import Suggestion from '../models/Suggestion.js'

/**
 * Start all scheduled jobs
 */
export function startCronJobs(io) {
  console.log('Starting cron jobs...')

  // Every hour: check for old pending suggestions and log them
  cron.schedule('0 * * * *', async () => {
    try {
      const pending = await Suggestion.countDocuments({ status: 'pending' })
      console.log(`[Cron] Pending market suggestions: ${pending}`)
    } catch (err) {
      console.error('[Cron] Error checking pending suggestions:', err.message)
    }
  })

  // Every day at midnight: simple cleanup example
  cron.schedule('0 0 * * *', async () => {
    console.log('[Cron] Running daily maintenance...')
    // Later we can add:
    // - Auto-reject very old pending suggestions
    // - Trigger UMA resolution checks
    // - Generate daily market slate with Grok
  })

  console.log('Cron jobs scheduled')
}
