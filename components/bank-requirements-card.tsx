'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BankRequirementsCardProps {
  onCheckChange?: (isChecked: boolean) => void
}

export function BankRequirementsCard({ onCheckChange }: BankRequirementsCardProps) {
  const [isChecked, setIsChecked] = useState(true)

  const handleCheckChange = (newState: boolean) => {
    setIsChecked(newState)
    onCheckChange?.(newState)
  }

  return (
    <div className="relative bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm">
      {/* Content */}
      <div className="pt-12 space-y-6 lg:pt-0">
        <h3 className="text-xl text-gray-900 lg:text-xl font-normal mt-6">
          To continue I confirm that:
        </h3>

        {/* Requirements List */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Image src="/icons/circle-check.svg" alt="Check" width={24} height={24} />
            </div>
            <p className="text-base text-gray-900 lg:text-base">
              My account is at least 3 months old.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Image src="/icons/circle-check.svg" alt="Check" width={24} height={24} />
            </div>
            <p className="text-gray-900 text-base">
              This is my primary bank account.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Image src="/icons/circle-check.svg" alt="Check" width={24} height={24} />
            </div>
            <p className="text-base text-gray-900 lg:text-base">
              I earn at least $1500 per month.
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div
          onClick={() => handleCheckChange(!isChecked)}
          className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer transition-all bg-white hover:border-gray-300"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isChecked ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"
              }`}
            >
              {isChecked && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span className="text-gray-900 font-medium">I meet this requirements</span>
          </div>
        </div>
      </div>
    </div>
  )
}
