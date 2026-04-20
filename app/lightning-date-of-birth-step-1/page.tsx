"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"

export default function DateOfBirthPage() {
  const router = useRouter()
  const [dateValue, setDateValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ageError, setAgeError] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Format input: DD / MM / YYYY with strict validation
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 8) {
      value = value.slice(0, 8)
    }

    // Validate individual parts while typing
    if (value.length >= 2) {
      const day = parseInt(value.slice(0, 2))
      if (day > 31) {
        value = value.slice(0, 1)
      }
    }

    if (value.length >= 4) {
      const month = parseInt(value.slice(2, 4))
      if (month > 12) {
        value = value.slice(0, 3)
      }
    }

    let formatted = value
    if (value.length >= 2) {
      formatted = value.slice(0, 2) + " / " + value.slice(2)
    }
    if (value.length >= 4) {
      formatted = value.slice(0, 2) + " / " + value.slice(2, 4) + " / " + value.slice(4)
    }

    setDateValue(formatted)
    setAgeError("") // Clear error when user changes the date
  }

  // Validate date format and values: DD / MM / YYYY
  const validateDate = (): boolean => {
    const cleaned = dateValue.replace(/\D/g, "")
    if (cleaned.length !== 8) return false

    const day = parseInt(cleaned.slice(0, 2))
    const month = parseInt(cleaned.slice(2, 4))
    const year = parseInt(cleaned.slice(4))

    if (day < 1 || day > 31) return false
    if (month < 1 || month > 12) return false
    // No year limitation, only check it's a valid 4-digit year
    if (year < 1000 || year > 9999) return false

    return true
  }

  // Calculate age and validate minimum 21 years
  const calculateAndValidateAge = (): { isValid: boolean; age?: number } => {
    const cleaned = dateValue.replace(/\D/g, "")
    if (cleaned.length !== 8) return { isValid: false }

    const day = parseInt(cleaned.slice(0, 2))
    const month = parseInt(cleaned.slice(2, 4))
    const year = parseInt(cleaned.slice(4))

    const birthDate = new Date(year, month - 1, day)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
      age--
    }

    return { isValid: age >= 21, age }
  }

  const handleContinue = () => {
    if (validateDate()) {
      const ageValidation = calculateAndValidateAge()
      
      if (!ageValidation.isValid) {
        setAgeError("You must be at least 21 years old to apply.")
        return
      }
      
      setAgeError("")
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/lightning-home-address-step-2")
      }, 300)
    }
  }

  const ageValidation = validateDate() ? calculateAndValidateAge() : { isValid: false }
  const isValid = validateDate() && ageValidation.isValid

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={40} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif text-blue-900">
              What's your date of birth?
            </h1>
            <p className="text-base text-gray-600 font-sans">
              We use this information to verify who you are.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="date-input" className="block text-gray-700 font-medium text-base font-sans">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  id="date-input"
                  type="text"
                  value={dateValue}
                  onChange={handleDateChange}
                  placeholder="DD / MM / YYYY"
                  maxLength={14}
                  inputMode="numeric"
                  className="w-full px-4 py-4 pr-12 border-[1.5px] border-gray-200 rounded-xl text-gray-900 bg-white transition-all duration-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none"
                />
                <img
                  src="/icons/calendar.svg"
                  alt="calendar"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none"
                />
              </div>
              {ageError && (
                <p className="text-red-600 text-sm font-medium">
                  {ageError}
                </p>
              )}
              {validateDate() && !ageValidation.isValid && !ageError && (
                <p className="text-red-600 text-sm font-medium">
                  You must be at least 21 years old to apply.
                </p>
              )}
            </div>

            <button
              onClick={handleContinue}
              disabled={!isValid || isSubmitting}
              className={`w-full py-4 px-6 rounded-full font-medium text-base flex items-center justify-center gap-2 transition-all duration-200 font-serif ${
                isValid
                  ? "bg-blue-900 hover:bg-blue-800 active:scale-[0.98] active:bg-blue-900 text-white"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              Continue
              <img src="/icons/arrow-right.png" alt="" width={20} height={20} className="mt-0.5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
