'use client'

import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { InputField } from "@/components/input-field"
import { CTAButton } from "@/components/cta-button"
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react"

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE",
  "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY",
  "LA", "ME", "MD", "MA", "MI", "MN", "MS",
  "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
  "NY", "NC", "ND", "OH", "OK", "OR", "PA",
  "RI", "SC", "SD", "TN", "TX", "UT", "VT",
  "VA", "WA", "WV", "WI", "WY"
]

export default function ResellingW2Step1Page() {
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [year, setYear] = useState("")
  const [ssn, setSSN] = useState("")
  const [driversLicense, setDriversLicense] = useState("")
  const [driversLicenseState, setDriversLicenseState] = useState("")
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ssnError, setSsnError] = useState("")
  const [showSSN, setShowSSN] = useState(false)
  const [highlightedStateIndex, setHighlightedStateIndex] = useState(-1)
  const [inputValue, setInputValue] = useState("")
  const [isStateOpen, setIsStateOpen] = useState(false)
  const router = useRouter()
  const monthRef = useRef<HTMLInputElement>(null)
  const dayRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)
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

  // Date of Birth handling - Month input (1-12, max 2 digits)
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (value === '0') {
      value = ''
    } else if (value.length === 2) {
      const monthNum = parseInt(value)
      if (monthNum > 12) {
        value = value.slice(0, 1)
      } else if (monthNum < 1 && value !== '') {
        value = ''
      } else if (monthNum >= 1 && monthNum <= 9) {
        value = '0' + monthNum
      }
    } else if (value.length === 1) {
      const monthNum = parseInt(value)
      if (monthNum === 0) {
        value = ''
      }
    }
    
    setMonth(value)
    
    if (value.length === 2 && dayRef.current) {
      dayRef.current.focus()
    }
  }

  // Handle Day input (1-31, max 2 digits)
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (value === '0') {
      value = ''
    } else if (value.length === 2) {
      const dayNum = parseInt(value)
      if (dayNum > 31) {
        value = value.slice(0, 1)
      } else if (dayNum < 1 && value !== '') {
        value = ''
      } else if (dayNum >= 1 && dayNum <= 9) {
        value = '0' + dayNum
      }
    } else if (value.length === 1) {
      const dayNum = parseInt(value)
      if (dayNum === 0) {
        value = ''
      }
    }
    
    setDay(value)
    
    if (value.length === 2 && yearRef.current) {
      yearRef.current.focus()
    }
  }

  // Handle Year input (current year max, 4 digits)
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (value.length <= 4) {
      if (value.length === 4) {
        const yearNum = parseInt(value)
        const currentYear = new Date().getFullYear()
        if (yearNum > currentYear) {
          value = value.slice(0, -1)
        }
      }
      setYear(value)
    }
  }

  const isDateOfBirthValid = () => {
    if (!month || !day || !year) return false
    
    const monthNum = parseInt(month)
    const dayNum = parseInt(day)
    const yearNum = parseInt(year)
    const currentYear = new Date().getFullYear()
    
    if (monthNum < 1 || monthNum > 12) return false
    if (dayNum < 1 || dayNum > 31) return false
    if (yearNum > currentYear) return false
    if (yearNum < 1900) return false
    
    return true
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

    if (!isDateOfBirthValid()) {
      hasError = true
    }

    if (!isSSNValid) {
      setSsnError("Please enter a valid SSN")
      hasError = true
    }

    if (!driversLicense || !driversLicenseState) {
      hasError = true
    }

    if (!hasError) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/reselling-w2-step2")
      }, 300)
    }
  }

  const isValid = isDateOfBirthValid() && isSSNValid && driversLicense && driversLicenseState

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <main className="px-6 py-8 bg-[#f7f9fd]">
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
            {/* Date of Birth - Three separate inputs */}
            <div className="grid grid-cols-3 gap-4">
              {/* Month */}
              <InputField
                ref={monthRef}
                label="Month"
                type="text"
                value={month}
                onChange={handleMonthChange}
                placeholder="MM"
                maxLength={2}
                inputMode="numeric"
              />

              {/* Day */}
              <InputField
                ref={dayRef}
                label="Day"
                type="text"
                value={day}
                onChange={handleDayChange}
                placeholder="DD"
                maxLength={2}
                inputMode="numeric"
              />

              {/* Year */}
              <InputField
                ref={yearRef}
                label="Year"
                type="text"
                value={year}
                onChange={handleYearChange}
                placeholder="YYYY"
                maxLength={4}
                inputMode="numeric"
              />
            </div>

            {/* Social Security Number */}
            <div className="space-y-2">
              <label htmlFor="ssn" className="block text-gray-700 font-medium text-base font-sans">
                Social Security Number
              </label>
              <div className="relative">
                <input
                  id="ssn"
                  type={showSSN ? "text" : "password"}
                  value={ssn}
                  onChange={handleSSNChange}
                  placeholder="e.g XXX-XX-XXXX"
                  maxLength={11}
                  className={`w-full px-4 py-4 pr-12 border rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:outline-none ${
                    ssnError
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300/80"
                      : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowSSN(!showSSN)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showSSN ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 font-sans">
                Encrypted and never used for a credit check.
              </p>
              {ssnError && (
                <p className="text-red-600 text-sm font-medium">{ssnError}</p>
              )}
            </div>

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
