"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

export default function IncomeVerificationPage() {
  const [isChecked, setIsChecked] = useState(true)
  const [showInfoBanner, setShowInfoBanner] = useState(true)
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleContinue = () => {
    if (isChecked) {
      router.push("/transition")
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={40} currentStep={5} totalSteps={10} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-8 lg:py-12">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl lg:text-4xl text-[#05055c] font-serif mb-4 text-blue-900 font-bold">
              Your average monthly income?
            </h1>
          </div>

          {/* Info Banner */}
          {showInfoBanner && (
            <div className="border-2 border-gray-300 rounded-2xl p-4 bg-white relative">
              <button
                onClick={() => setShowInfoBanner(false)}
                className="absolute top-4 right-4 text-gray-900 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-start gap-3 pr-8">
                <div className="flex-shrink-0 mt-0.5">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-green-600"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-green-600 text-base mb-1">How this helps?</h3>
                  <p className="text-gray-700 text-sm">
                    We use this to confirm basic income details before the next step.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Income Confirmation Card */}
          <div
            onClick={() => setIsChecked(!isChecked)}
            className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm relative px-4 ${
              isChecked ? "border-blue-800" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Dollar Sign Icon */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-7 h-7">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_8360_1073)">
                      <path
                        d="M9.5 0.791626V18.2083M13.4583 3.95829H7.52083C6.78596 3.95829 6.08119 4.25022 5.56156 4.76985C5.04193 5.28948 4.75 5.99426 4.75 6.72913C4.75 7.464 5.04193 8.16877 5.56156 8.6884C6.08119 9.20803 6.78596 9.49996 7.52083 9.49996H11.4792C12.214 9.49996 12.9188 9.79189 13.4384 10.3115C13.9581 10.8311 14.25 11.5359 14.25 12.2708C14.25 13.0057 13.9581 13.7104 13.4384 14.2301C12.9188 14.7497 12.214 15.0416 11.4792 15.0416H4.75"
                        stroke="#24993F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_8360_1073">
                        <rect width="19" height="19" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-gray-900 font-medium font-sans text-base">My monthly income is at least $1,500</p>
              </div>

              {/* Checkmark */}
              <div className="flex-shrink-0">
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center transition-colors bg-blue-800 ${
                    isChecked ? "bg-blue-600" : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {isChecked && (
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 6L6 11L15 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!isChecked}
            className={`w-full py-4 px-6 rounded-full font-medium text-base flex items-center justify-center gap-2 transition-all duration-200 font-serif ${
              isChecked
                ? "bg-blue-900 hover:bg-blue-800 active:scale-[0.98] active:bg-blue-900 text-white"
                : "bg-gray-300 text-white cursor-not-allowed"
            }`}
          >
            Verify instantly with Plaid
            <img src="/icons/arrow-right.png" alt="" width={20} height={20} className="mt-0.5" />
          </button>
        </div>
      </main>
    </div>
  )
}
