'use client'

import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CTAButton } from "@/components/cta-button"

export default function ResellingLightningStep2Page() {
  const [zipCode, setZipCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const isValid = zipCode.length === 5

  const handleContinue = () => {
    if (isValid) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/transition")
      }, 300)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <main className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Progress Bar */}
          <ProgressBar progress={67} currentStep={2} totalSteps={3} />

          {/* Title and Description */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold font-serif text-blue-900">
              Where do you currently live?
            </h1>
            <p className="text-base leading-relaxed font-sans text-gray-600">
              This helps us confirm your eligibility.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* ZIP Code */}
            <div className="space-y-2">
              <label htmlFor="zip" className="block text-gray-700 font-medium text-base font-sans">
                ZIP Code
              </label>
              <input
                id="zip"
                type="text"
                value={zipCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 5)
                  setZipCode(value)
                }}
                placeholder="e.g. 11011"
                maxLength={5}
                inputMode="numeric"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none"
              />
            </div>
          </div>

          {/* Continue Button */}
          <CTAButton onClick={handleContinue} disabled={!isValid || isSubmitting}>
            Continue
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
