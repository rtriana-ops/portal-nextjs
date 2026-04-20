'use client'

import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CTAButton } from "@/components/cta-button"
import { Info, X, Shield } from "lucide-react"

export default function ResellingWaOCStep3Page() {
  const [amount, setAmount] = useState("")
  const [amountError, setAmountError] = useState("")
  const [showAlert, setShowAlert] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Format currency amount with validation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 5) {
      setAmount(value)
      
      // Clear error if empty
      if (value === "") {
        setAmountError("")
        return
      }
      
      const numValue = parseInt(value, 10)
      
      // Check minimum
      if (numValue < 500) {
        setAmountError("Minimum amount is $500")
        return
      }
      
      // Check maximum
      if (numValue > 10000) {
        setAmountError("Maximum amount is $10,000")
        return
      }
      
      // Check if it's a multiple of 100
      if (numValue % 100 !== 0) {
        setAmountError("Amount must be in increments of $100")
        return
      }
      
      setAmountError("")
    }
  }

  const isValid = amount && !amountError

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

          {/* Title */}
          <h1 className="text-4xl font-bold font-serif text-blue-900">
            Funding details
          </h1>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* How much do you need? */}
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-gray-700 font-medium text-base font-sans">
                How much do you need?
              </label>
              <input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount (500-10,000 in increments of 100)"
                className={`w-full px-4 py-4 border rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:outline-none ${
                  amountError
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300/80"
                    : "border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80"
                }`}
              />
              {amountError && (
                <p className="text-red-600 text-sm font-medium">{amountError}</p>
              )}
            </div>
          </div>

          {/* Security Alert */}
          {showAlert && (
            <div className="relative bg-emerald-100 border-2 border-emerald-300 rounded-2xl p-4 flex gap-3">
              <div className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5 relative">
                <Shield className="w-6 h-6" />
                <svg className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-emerald-900 font-sans">
                  Your bank details are used only to verify your options and are handled securely.
                </p>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="text-emerald-700 hover:text-emerald-900 flex-shrink-0 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Continue Button */}
          <CTAButton onClick={handleContinue} disabled={!isValid || isSubmitting}>
            Continue
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
