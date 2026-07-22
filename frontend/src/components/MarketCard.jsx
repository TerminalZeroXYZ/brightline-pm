export default function MarketCard({ market }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-600 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white leading-tight">
          {market.title}
        </h3>
        <span className="text-xs px-2 py-1 rounded-full bg-emerald-900/50 text-emerald-400">
          {market.isScalar ? 'Scalar' : 'Binary'}
        </span>
      </div>

      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
        {market.description}
      </p>

      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-500">
          Ends: {new Date(market.endTime).toLocaleDateString()}
        </span>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium text-sm">
          Trade
        </button>
      </div>
    </div>
  )
}
