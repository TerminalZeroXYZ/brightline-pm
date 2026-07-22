import { PrivyProvider } from '@privy-io/react-auth'
import Header from './components/Header.jsx'
import MarketList from './components/MarketList.jsx'
import SuggestMarket from './components/SuggestMarket.jsx'
import Footer from './components/Footer.jsx'

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
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Header />

        <main className="flex-1 max-w-6xl mx-auto p-6 space-y-16 w-full">
          <MarketList />
          <SuggestMarket />
        </main>

        <Footer />
      </div>
    </PrivyProvider>
  )
}

export default App
