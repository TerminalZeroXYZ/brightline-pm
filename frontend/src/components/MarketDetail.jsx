import { useState } from 'react'

export default function MarketDetail({ market }) {
  const [amount, setAmount] = useState('')
  const [side, setSide] = useState('yes')

  if (!market) {
    return <div className="text-zinc-400">Market not found</div>
  }

  const handleTrade = (e) => {
    e.preventDefault()
    alert(`Trade submitted: ${amount} USDC on ${side.toUpperCase()} (This is a demo - real trading will be added later)`)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <span className="text-xs px-2 py-1 rounded-full bg-emerald-900/50 text-emerald-400">
          {market.isScalar ? 'Scalar Market' : 'Binary Market'}
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">{market.title}</h1>
        <p className="text-zinc-400">{market.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div className="bg-zinc-800 p-4 rounded-xl">
          <div className="text-zinc-500">Status</div>
          <div className="font-medium text-emerald-400 capitalize">{market.status || 'open'}</div>
        </div>
        <div className="bg-zinc-800 p-4 rounded-xl">
          <div className="text-zinc-500">Ends</div>
          <div className="font-medium">
            {market.endTime ? new Date(market.endTime).toLocaleDateString() : 'TBD'}
          </div>
        </div>
      </div>

      {/* Simple trading form (demo) */}
      <form onSubmit={handleTrade} className="space-y-4 border-t border-zinc-800 pt-6">
        <h3 className="font-semibold text-lg">Place a Trade (Demo)</h3>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setSide('yes')}
            className={`flex-1 py-3 rounded-xl font-medium ${
              side === 'yes' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            Yes / Higher
          </button>
          <button
            type="button"
            onClick={() => setSide('no')}
            className={`flex-1 py-3 rounded-xl font-medium ${
              side === 'no' 
                ? 'bg-red-600 text-white' 
                : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            No / Lower
          </button>
        </div>

        <input
          type="number"
          placeholder="Amount in USDC"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl"
          min="1"
          step="0.01"
        />

        <button
          type="submit"
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold text-lg"
        >
          Confirm Trade
        </button>
      </form>
    </div>
  )
}
