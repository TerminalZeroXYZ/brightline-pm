import { usePrivy } from '@privy-io/react-auth'

export default function Header() {
  const { login, logout, authenticated, user } = usePrivy()

  return (
    <header className="border-b border-zinc-800 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-emerald-400">
            Brightline Prediction Market
          </h1>
          <p className="text-zinc-400 text-sm">Florida Rail Safety Markets</p>
        </div>

        <div>
          {authenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">
                {user?.email?.address || user?.wallet?.address?.slice(0, 6) + '...'}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
