'use client'

import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { CTAButton } from "@/components/cta-button"
import { ChevronDown, ChevronUp, Calendar, Lock } from "lucide-react"

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE",
  "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY",
  "LA", "ME", "MD", "MA", "MI", "MN", "MS",
  "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
  "NY", "NC", "ND", "OH", "OK", "OR", "PA",
  "RI", "SC", "SD", "TN", "TX", "UT", "VT",
  "VA", "WA", "WV", "WI", "WY"
]

export default function ResellingLightningStep1Page() {
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [ssn, setSSN] = useState("")
  const [driversLicense, setDriversLicense] = useState("")
  const [driversLicenseState, setDriversLicenseState] = useState("")
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ageError, setAgeError] = useState("")
  const [ssnError, setSsnError] = useState("")
  const [highlightedStateIndex, setHighlightedStateIndex] = useState(-1)
  const [inputValue, setInputValue] = useState("")
  const [isStateOpen, setIsStateOpen] = useState(false)
  const router = useRouter()
  const stateInputRef = useRef<HTMLInputElement>(null)
  const stateContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (stateContainerRef.current && !stateContainerRef.current.contains(event.target as Node)) {
        setIsStateOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Date of Birth formatting and validation (from lightning-date-of-birth-step-1)
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 8) {
      value = value.slice(0, 8)
    }

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

    setDateOfBirth(formatted)
    setAgeError("")
  }

  // Date validation
  const validateDate = (): boolean => {
    const cleaned = dateOfBirth.replace(/\D/g, "")
    if (cleaned.length !== 8) return false

    const day = parseInt(cleaned.slice(0, 2))
    const month = parseInt(cleaned.slice(2, 4))
    const year = parseInt(cleaned.slice(4))

    if (day < 1 || day > 31) return false
    if (month < 1 || month > 12) return false
    if (year < 1000 || year > 9999) return false

    return true
  }

  // Calculate age
  const calculateAndValidateAge = (): { isValid: boolean; age?: number } => {
    const cleaned = dateOfBirth.replace(/\D/g, "")
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

  // SSN formatting and validation (from lightning-ssn-verification-step-4)
  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9)
    let formatted = value
    if (value.length <= 3) {
      formatted = value
    } else if (value.length <= 5) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`
    } else {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5, 9)}`
    }
    setSSN(formatted)
    setSsnError("")
  }

  const isSSNValid = ssn.replace(/\D/g, "").length === 9

  // State filtering for autocomplete
  const filteredStates = inputValue
    ? US_STATES.filter((state) =>
        state.toLowerCase().includes(inputValue.toLowerCase())
      )
    : US_STATES

  // Handle state keyboard navigation
  const handleStateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isStateOpen && e.key !== "Enter") {
      setIsStateOpen(true)
      setHighlightedStateIndex(0)
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedStateIndex((prev) =>
          prev < filteredStates.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedStateIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedStateIndex >= 0) {
          handleSelectState(filteredStates[highlightedStateIndex])
        }
        break
      case "Escape":
        setIsStateOpen(false)
        break
    }
  }

  const handleSelectState = (state: string) => {
    setDriversLicenseState(state)
    setInputValue(state)
    setIsStateOpen(false)
    setHighlightedStateIndex(-1)
  }

  const handleContinue = () => {
    let hasError = false

    if (!driversLicense || !driversLicenseState) {
      hasError = true
    }

    if (!hasError) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/transition")
      }, 300)
    }
  }

  const isValid = driversLicense && driversLicenseState

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <main className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Progress Bar */}
          <ProgressBar progress={50} currentStep={1} totalSteps={2} />

          {/* Title and Description */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold font-serif text-blue-900">
              Verify your identity
            </h1>
            <p className="text-base leading-relaxed font-sans text-gray-600">
              We'll use this information to confirm your identity securely.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Driver's License Number */}
            <div className="space-y-2">
              <label htmlFor="license" className="block text-gray-700 font-medium text-base font-sans">
                Driver's License Number
              </label>
              <input
                id="license"
                type="text"
                value={driversLicense}
                onChange={(e) => setDriversLicense(e.target.value)}
                placeholder=""
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none"
              />
            </div>

            {/* Driver's License State */}
            <div className="space-y-2" ref={stateContainerRef}>
              <label htmlFor="state" className="block text-gray-700 font-medium text-base font-sans">
                Driver's License State
              </label>
              <div className="relative">
                <input
                  ref={stateInputRef}
                  id="state"
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setIsStateOpen(true)
                    setHighlightedStateIndex(0)
                  }}
                  onFocus={() => {
                    setIsStateOpen(true)
                  }}
                  onKeyDown={handleStateKeyDown}
                  placeholder="Select your state"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none cursor-pointer"
                />
                {isStateOpen ? (
                  <ChevronUp className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transition-transform" />
                ) : (
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transition-transform" />
                )}

                {/* Autocomplete dropdown - styled like lightning-state-of-residence-step-3 */}
                {isStateOpen && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-2 bg-blue-950 rounded-xl shadow-lg z-50 max-h-72 overflow-y-scroll"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <style>{`
                      div[class*="bg-blue-950"]::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                    {filteredStates.length > 0 ? (
                      <ul className="divide-y divide-blue-900">
                        {filteredStates.map((state, index) => (
                          <li key={state}>
                            <button
                              type="button"
                              onClick={() => handleSelectState(state)}
                              onMouseEnter={() => setHighlightedStateIndex(index)}
                              className={`w-full px-6 py-4 text-left font-sans transition-colors ${
                                index === highlightedStateIndex
                                  ? "bg-blue-900"
                                  : "bg-blue-950 hover:bg-blue-900"
                              } ${
                                driversLicenseState === state
                                  ? "text-blue-200 font-semibold"
                                  : "text-white"
                              }`}
                            >
                              {state}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-6 py-4 text-white text-center">No states found</div>
                    )}
                  </div>
                )}
              </div>
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
