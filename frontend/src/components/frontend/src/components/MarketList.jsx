import { useEffect, useState } from 'react'
import axios from 'axios'
import MarketCard from './MarketCard.jsx'

export default function MarketList() {
  const [markets, setMarkets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/markets`
        )
        setMarkets(res.data)
      } catch (err) {
        console.error('Failed to load markets', err)
        // Fallback sample data so the page still works
        setMarkets([
          {
            id: '1',
            title: 'Brightline fatalities in Q3 2026',
            description: 'Total accidental fatalities caused by Brightline trains between July 1 and September 30, 2026.',
            isScalar: true,
            endTime: '2026-10-01'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMarkets()
  }, [])

  if (loading) {
    return <div className="text-center text-zinc-400 py-12">Loading markets...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Open Markets</h2>
      
      {markets.length === 0 ? (
        <p className="text-zinc-500">No markets available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      )}
    </div>
  )
}
