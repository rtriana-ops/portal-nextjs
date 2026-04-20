"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { CTAButton } from "@/components/cta-button"
import { useRouter } from "next/navigation"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Generate last 50 years
const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 50 }, (_, i) => currentYear - i)

export default function BeginWorkingPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false)
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)
  const monthDropdownRef = useRef<HTMLDivElement>(null)
  const yearDropdownRef = useRef<HTMLDivElement>(null)
  const monthButtonRef = useRef<HTMLButtonElement>(null)
  const yearButtonRef = useRef<HTMLButtonElement>(null)
  const [monthDropdownWidth, setMonthDropdownWidth] = useState<number>(0)
  const [yearDropdownWidth, setYearDropdownWidth] = useState<number>(0)
  const [shouldMonthOpenUpward, setShouldMonthOpenUpward] = useState(false)
  const [shouldYearOpenUpward, setShouldYearOpenUpward] = useState(false)
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setIsMonthDropdownOpen(false)
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const updateDropdownWidths = () => {
      if (monthButtonRef.current) {
        setMonthDropdownWidth(monthButtonRef.current.offsetWidth * 0.6)
      }
      if (yearButtonRef.current) {
        setYearDropdownWidth(yearButtonRef.current.offsetWidth * 0.6)
      }
    }

    updateDropdownWidths()
    window.addEventListener("resize", updateDropdownWidths)
    return () => window.removeEventListener("resize", updateDropdownWidths)
  }, [])

  useEffect(() => {
    const checkPosition = () => {
      if (monthButtonRef.current) {
        const rect = monthButtonRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const spaceBelow = viewportHeight - rect.bottom
        const dropdownHeight = 400
        setShouldMonthOpenUpward(spaceBelow < dropdownHeight && rect.top > dropdownHeight)
      }
      if (yearButtonRef.current) {
        const rect = yearButtonRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const spaceBelow = viewportHeight - rect.bottom
        const dropdownHeight = 320
        setShouldYearOpenUpward(spaceBelow < dropdownHeight && rect.top > dropdownHeight)
      }
    }

    checkPosition()
    window.addEventListener("resize", checkPosition)
    window.addEventListener("scroll", checkPosition)
    return () => {
      window.removeEventListener("resize", checkPosition)
      window.removeEventListener("scroll", checkPosition)
    }
  }, [isMonthDropdownOpen, isYearDropdownOpen])

  const handleContinue = () => {
    if (selectedMonth && selectedYear) {
      router.push("/work-schedule")
    }
  }

  const isValid = selectedMonth !== "" && selectedYear !== ""

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
              When did you begin working in this position?
            </h1>
          </div>

          <div className="space-y-6">
            {/* Month Dropdown */}
            <div className="space-y-2 relative" ref={monthDropdownRef}>
              <label htmlFor="month" className="block text-gray-700 font-medium text-base font-sans">
                Month you started
              </label>
              <button
                ref={monthButtonRef}
                type="button"
                onClick={() => {
                  setIsMonthDropdownOpen(!isMonthDropdownOpen)
                  setIsYearDropdownOpen(false)
                }}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-base text-left focus:outline-none focus:border-blue-600 transition-colors bg-white flex items-center justify-between"
              >
                <span className={selectedMonth ? "text-gray-900" : "text-gray-400"}>{selectedMonth || "January"}</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
                >
                  <path
                    d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3 10H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isMonthDropdownOpen && (
                <div
                  className={`absolute z-50 bg-[#172554] rounded-2xl shadow-xl overflow-hidden ${
                    shouldMonthOpenUpward ? "bottom-full mb-1" : "top-full mt-1"
                  }`}
                  style={{ width: `${monthDropdownWidth}px` }}
                >
                  <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {MONTHS.map((month) => (
                      <button
                        key={month}
                        onClick={() => {
                          setSelectedMonth(month)
                          setIsMonthDropdownOpen(false)
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-[#1e3a8a] transition-colors text-[13px]"
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Year Dropdown */}
            <div className="space-y-2 relative" ref={yearDropdownRef}>
              <label htmlFor="year" className="block text-gray-700 font-medium text-base font-sans">
                Year you started
              </label>
              <button
                ref={yearButtonRef}
                type="button"
                onClick={() => {
                  setIsYearDropdownOpen(!isYearDropdownOpen)
                  setIsMonthDropdownOpen(false)
                }}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-base text-left focus:outline-none focus:border-blue-600 transition-colors bg-white flex items-center justify-between"
              >
                <span className={selectedYear ? "text-gray-900" : "text-gray-400"}>{selectedYear || "2026"}</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
                >
                  <path
                    d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3 10H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isYearDropdownOpen && (
                <div
                  className={`absolute z-50 bg-[#172554] rounded-2xl shadow-xl overflow-hidden ${
                    shouldYearOpenUpward ? "bottom-full mb-1" : "top-full mt-1"
                  }`}
                  style={{ width: `${yearDropdownWidth}px` }}
                >
                  <div className="h-[320px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {YEARS.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year.toString())
                          setIsYearDropdownOpen(false)
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-[#1e3a8a] transition-colors text-[13px]"
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <CTAButton onClick={handleContinue} disabled={!isValid}>
            Continue
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
