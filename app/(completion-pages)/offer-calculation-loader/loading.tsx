export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f7f9fd] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Loading spinner */}
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-900 rounded-full animate-spin"></div>
          
          {/* Loading text */}
          <p className="text-gray-600 text-center font-sans">Loading your offer calculation...</p>
        </div>
      </div>
    </div>
  )
}
