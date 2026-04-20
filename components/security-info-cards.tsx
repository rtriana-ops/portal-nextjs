'use client'

import { Lock, EyeOff, Shield } from 'lucide-react'

export function SecurityInfoCards() {
  return (
    <div className="w-full space-y-4 mb-14">
      {/* Circle 1 - Green with Lock Icon */}
      <div className="flex items-center gap-4">
        <div className="bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 w-10 h-10">
          <div className="text-white">
            <Lock size={20} />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-700 font-sans text-base">256-bit Encryption.</p>
        </div>
      </div>

      {/* Circle 2 - Yellow with EyeOff Icon */}
      <div className="flex items-center gap-4">
        <div className="rounded-full flex items-center justify-center flex-shrink-0 w-10 h-10 bg-cyan-600">
          <div className="text-gray-800">
            <EyeOff className="text-white" size={20} />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-700 font-sans text-base">Fundo never sees your bank password.</p>
        </div>
      </div>

      {/* Circle 3 - Blue with Shield Icon */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 w-10 h-10">
          <div className="text-white">
            <Shield size={20} />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-700 font-sans text-base">Trusted by millions of users.</p>
        </div>
      </div>
    </div>
  )
}
