export function PortalAdvancesListingSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4 lg:p-8">
      {/* Header Skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-8 bg-gray-200 rounded-lg w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
      </div>

      {/* Promo Cards Skeleton */}
      <div className="flex gap-4 mb-6 overflow-hidden">
        {[1, 2].map((i) => (
          <div key={i} className="w-[277px] h-[122px] bg-gray-200 rounded-lg flex-shrink-0"></div>
        ))}
      </div>

      {/* Advances Title Skeleton */}
      <div className="h-6 bg-gray-200 rounded-lg w-1/3 mb-6"></div>

      {/* Advance Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 bg-white rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-3 bg-gray-200 rounded-lg w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
