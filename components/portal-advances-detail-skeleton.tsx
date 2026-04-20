export function PortalAdvancesDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4 lg:p-8">
      {/* Header Skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-8 bg-gray-200 rounded-lg w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
      </div>

      {/* Metrics Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
          </div>
        ))}
      </div>

      {/* Timeline/Content Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border rounded-lg space-y-2">
            <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
