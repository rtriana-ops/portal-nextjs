"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { CTAButton } from "@/components/cta-button"
import { useRouter } from "next/navigation"

export default function PaySchedulePage() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isActiveMilitary, setIsActiveMilitary] = useState(false)
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleContinue = () => {
    if (selectedOption) {
      router.push("/transition")
    }
  }

  const options = [
    { id: "weekly", label: "Weekly" },
    { id: "bi-weekly", label: "Bi-weekly" },
    { id: "semi-monthly", label: "Semi-monthly" },
    { id: "monthly", label: "Monthly" },
    { id: "daily", label: "Daily" },
  ]

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={40} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-8 lg:py-12">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl text-[#05055c] font-serif mb-4 text-blue-900 font-bold">
              What is your pay schedule?
            </h1>
          </div>

          <div className="space-y-3">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all bg-white ${
                  selectedOption === option.id ? "border-purple-500" : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedOption === option.id ? "border-purple-500 bg-purple-500" : "border-gray-300"
                    }`}
                  >
                    {selectedOption === option.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-gray-900 font-medium">{option.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-300" />

          {/* Military Service Checkbox */}
          <div
            onClick={() => setIsActiveMilitary(!isActiveMilitary)}
            className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer transition-all bg-white hover:border-gray-300"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isActiveMilitary ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"
                }`}
              >
                {isActiveMilitary && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-gray-900 font-medium">I'm currently on active military service</span>
            </div>
          </div>

          <CTAButton onClick={handleContinue} disabled={!selectedOption}>
            Continue
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
