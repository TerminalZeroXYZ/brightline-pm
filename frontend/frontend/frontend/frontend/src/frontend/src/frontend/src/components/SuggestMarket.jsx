import { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { submitSuggestion } from '../lib/api.js'

export default function SuggestMarket() {
  const { login, authenticated, user } = usePrivy()
  const [form, setForm] = useState({
    title: '',
    description: '',
    isScalar: false
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!authenticated) {
      login()
      return
    }

    setLoading(true)
    setStatus('Submitting your idea...')

    try {
      const response = await submitSuggestion({
        ...form,
        suggestedBy: user?.id || 'anonymous'
      })

      setStatus(
        `Success! Score: ${response.data.grokScore}. Status: ${response.data.status}`
      )
      setForm({ title: '', description: '', isScalar: false })
    } catch (error) {
      console.error(error)
      setStatus('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-2">Suggest a Market</h2>
        <p className="text-zinc-400 mb-6">
          Propose a new prediction market about Brightline train safety.
        </p>

        {!authenticated && (
          <div className="mb-6 p-4 bg-amber-900/30 border border-amber-700 rounded-lg">
            <p className="text-amber-200 text-sm mb-3">
              Please log in to submit a market idea.
            </p>
            <button
              onClick={login}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium"
            >
              Log In
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Market Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Total Brightline fatalities in Q3 2026"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Description & Resolution Criteria
            </label>
            <textarea
              required
              rows={5}
              placeholder="Describe the market and how it should be resolved (official FRA / NTSB data preferred)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isScalar}
              onChange={(e) => setForm({ ...form, isScalar: e.target.checked })}
              className="w-5 h-5"
            />
            <span className="text-zinc-300">
              Scalar market (predict the exact number)
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 rounded-xl font-semibold text-lg"
          >
            {loading ? 'Submitting...' : 'Submit Market Idea'}
          </button>
        </form>

        {status && (
          <div className="mt-6 p-4 bg-zinc-800 rounded-xl text-sm text-zinc-300">
            {status}
          </div>
        )}
      </div>
    </div>
  )
}
