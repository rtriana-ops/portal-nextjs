"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { CTAButton } from "@/components/cta-button"
import { useRouter } from "next/navigation"

export default function IndependentContractorCompanyNamePage() {
  const [companyName, setCompanyName] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])

  const validateCompanyName = (value: string): string => {
    // Required field
    if (!value || value.trim().length === 0) {
      return "Platform or company name is required"
    }

    // Minimum 3 characters
    if (value.trim().length < 3) {
      return "Platform or company name must be at least 3 characters"
    }

    // Maximum 100 characters
    if (value.length > 100) {
      return "Platform or company name must not exceed 100 characters"
    }

    // No only spaces
    if (value.trim().length === 0) {
      return "Platform or company name cannot contain only spaces"
    }

    // No only numbers
    if (/^\d+$/.test(value.trim())) {
      return "Platform or company name cannot contain only numbers"
    }

    // No only special characters (must contain at least one letter)
    if (!/[a-zA-Z]/.test(value)) {
      return "Platform or company name must contain at least one letter"
    }

    // Allow letters, numbers, spaces, and common characters (.,'-&)
    if (!/^[a-zA-Z0-9\s.,'\-&]+$/.test(value)) {
      return "Platform or company name can only contain letters, numbers, spaces, and common characters (.,'-&)"
    }

    return ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCompanyName(value)

    // Clear error when user starts typing
    if (error && value.length > 0) {
      setError("")
    }
  }

  const handleContinue = () => {
    const validationError = validateCompanyName(companyName)

    if (validationError) {
      setError(validationError)
      return
    }

    console.log("Platform or company name:", companyName.trim())
    router.push("/independent-contractor-start-date")
  }

  const isValid = companyName.trim().length >= 3 && companyName.length <= 100 && validateCompanyName(companyName) === ""

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
              Who do you work with?
            </h1>
            <p className="text-gray-600 text-base">If you use multiple platforms, enter the one you use most.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="companyName" className="block text-gray-700 font-medium text-base font-sans">
              Platform or company name
            </label>
            <input
              ref={inputRef}
              id="companyName"
              type="text"
              value={companyName}
              onChange={handleChange}
              placeholder="e.g. Uber"
              className={`w-full px-4 py-4 border-[1.5px] rounded-xl text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300/80"
                  : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:bg-white"
              }`}
            />
            {error ? (
              <p className="text-red-500 mt-1 text-xs">{error}</p>
            ) : (
              <p className="text-gray-500 mt-1 text-xs">Use a platform name or your own name.</p>
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
