"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { CTAButton } from "@/components/cta-button"
import { useRouter } from "next/navigation"

export default function BusinessOwnerCompanyNamePage() {
  const [businessName, setBusinessName] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])

  const validateBusinessName = (value: string): string => {
    if (!value || value.trim().length === 0) {
      return "Business name is required"
    }

    if (value.trim().length < 3) {
      return "Business name must be at least 3 characters"
    }

    if (value.length > 100) {
      return "Business name must not exceed 100 characters"
    }

    if (value.trim().length === 0) {
      return "Business name cannot contain only spaces"
    }

    if (/^\d+$/.test(value.trim())) {
      return "Business name cannot contain only numbers"
    }

    if (!/[a-zA-Z]/.test(value)) {
      return "Business name must contain at least one letter"
    }

    if (!/^[a-zA-Z0-9\s.,'\-&]+$/.test(value)) {
      return "Business name can only contain letters, numbers, spaces, and common characters (.,'-&)"
    }

    return ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBusinessName(value)

    if (error && value.length > 0) {
      setError("")
    }
  }

  const handleContinue = () => {
    const validationError = validateBusinessName(businessName)

    if (validationError) {
      setError(validationError)
      return
    }

    console.log("Business name:", businessName.trim())
    router.push("/business-start-date")
  }

  const isValid =
    businessName.trim().length >= 3 && businessName.length <= 100 && validateBusinessName(businessName) === ""

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={30} currentStep={3} totalSteps={10} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-8 lg:py-12">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl text-[#05055c] font-serif mb-4 text-blue-900 font-bold">
              What's your business name?
            </h1>
            <p className="text-gray-600 text-base">We use this to identify your business and keep things moving.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="businessName" className="block text-gray-700 font-medium text-base font-sans">
              Business Name
            </label>
            <input
              ref={inputRef}
              id="businessName"
              type="text"
              value={businessName}
              onChange={handleChange}
              placeholder="e.g. John's Plumbing LLC"
              className={`w-full px-4 py-4 border-[1.5px] rounded-xl text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300/80"
                  : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:bg-white"
              }`}
            />
            {error ? (
              <p className="text-red-500 mt-1 text-xs">{error}</p>
            ) : (
              <p className="text-gray-500 mt-1 text-xs">Use the name that appears on your bank account.</p>
            )}
          </div>

          <CTAButton onClick={handleContinue} disabled={!isValid}>
            Continue
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
