import { useEffect, useState } from 'react'
import { getMarkets } from '../lib/api.js'
import MarketCard from './MarketCard.jsx'

export default function MarketList() {
  const [markets, setMarkets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const res = await getMarkets()
        setMarkets(res.data)
      } catch (err) {
        console.error('Failed to load markets', err)
        setError('Could not load markets. Showing sample data.')
        // Fallback sample data
        setMarkets([
          {
            id: 'sample-1',
            title: 'Brightline fatalities in Q3 2026',
            description: 'Total accidental fatalities caused by Brightline trains between July 1 and September 30, 2026.',
            isScalar: true,
            endTime: '2026-10-01',
            status: 'open'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMarkets()
  }, [])

  if (loading) {
    return (
      <div className="text-center text-zinc-400 py-16">
        Loading markets...
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Open Markets</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-amber-900/30 border border-amber-700 rounded-lg text-amber-200 text-sm">
          {error}
        </div>
      )}

      {markets.length === 0 ? (
        <p className="text-zinc-500 py-8">No markets available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {markets.map((market) => (
            <MarketCard key={market.id || market._id} market={market} />
          ))}
        </div>
      )}
    </div>
  )
}
