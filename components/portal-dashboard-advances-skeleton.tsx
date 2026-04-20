export function PortalDashboardAdvancesSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4 lg:p-8">
      {/* Header Skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-8 bg-gray-200 rounded-lg w-1/2"></div>
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Current Balance Card */}
        <div className="space-y-3 p-6 bg-white rounded-2xl border border-gray-200">
          <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
        </div>

        {/* Right Column - Grid Items */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts/Metrics Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-gray-200 space-y-4">
            <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
            <div className="h-48 bg-gray-100 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
