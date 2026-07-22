import { PrivyProvider } from '@privy-io/react-auth'
import SuggestMarket from './components/SuggestMarket.jsx'
import MarketList from './components/MarketList.jsx'

function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID || "your-privy-app-id"}
      config={{
        loginMethods: ['email', 'google', 'apple', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#10b981',
        },
      }}
    >
      <div className="min-h-screen bg-zinc-950 text-white">
        <header className="border-b border-zinc-800 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-emerald-400">
              Brightline Prediction Market
            </h1>
            <p className="text-zinc-400 text-sm">Florida Rail Safety Markets</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6 space-y-16">
          <MarketList />
          <SuggestMarket />
        </main>
      </div>
    </PrivyProvider>
  )
}

export default App
