export default function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex justify-center items-center py-8">
      <div
        className={`${sizeClasses[size]} border-4 border-zinc-700 border-t-emerald-500 rounded-full animate-spin`}
      ></div>
    </div>
  )
}
