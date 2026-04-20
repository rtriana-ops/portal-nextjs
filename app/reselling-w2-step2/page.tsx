'use client'

import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { CTAButton } from "@/components/cta-button"
import { ChevronDown } from "lucide-react"

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE",
  "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY",
  "LA", "ME", "MD", "MA", "MI", "MN", "MS",
  "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
  "NY", "NC", "ND", "OH", "OK", "OR", "PA",
  "RI", "SC", "SD", "TN", "TX", "UT", "VT",
  "VA", "WA", "WV", "WI", "WY"
]

const CITIES_BY_STATE: Record<string, string[]> = {
  "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland", "Long Beach", "Fresno", "Bakersfield", "Anaheim", "Santa Ana"],
  "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Garland"],
  "Florida": ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Fort Lauderdale", "Tallahassee", "Port St. Lucie", "Cape Coral"],
  "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon"],
  "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Bethlehem", "Lancaster"],
  "Illinois": ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Elgin", "Peoria", "Springfield"],
  "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Parma", "Canton"],
  "Georgia": ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens", "Alpharetta", "Sandy Springs"],
  "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Chapel Hill"],
  "Michigan": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing", "Ann Arbor", "Flint"],
  "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton", "Atlantic City", "Princeton"],
  "Virginia": ["Virginia Beach", "Norfolk", "Richmond", "Arlington", "Alexandria", "Roanoke"],
  "Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent", "Everett"],
  "Arizona": ["Phoenix", "Mesa", "Chandler", "Scottsdale", "Glendale", "Gilbert", "Tempe"],
  "Tennessee": ["Memphis", "Nashville", "Knoxville", "Chattanooga", "Clarksville", "Franklin"],
  "Massachusetts": ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge", "New Bedford"],
  "Indiana": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Bloomington"],
  "Baltimore": ["Baltimore", "Columbia", "Frederick", "Gaithersburg", "Bowie"],
  "Missouri": ["Kansas City", "St. Louis", "Springfield", "Independence", "Columbia"],
  "Wisconsin": ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"],
}

const ZIP_CODES_BY_CITY: Record<string, string[]> = {
  "Los Angeles": ["90001", "90002", "90003", "90004", "90005", "90006", "90007", "90008"],
  "San Francisco": ["94102", "94103", "94104", "94105", "94106", "94107", "94108", "94109"],
  "New York City": ["10001", "10002", "10003", "10004", "10005", "10006", "10007", "10008", "10009", "10010"],
  "Houston": ["77001", "77002", "77003", "77004", "77005", "77006", "77007", "77008", "77009", "77010"],
  "Chicago": ["60601", "60602", "60603", "60604", "60605", "60606", "60607", "60608", "60609", "60610"],
  "Philadelphia": ["19101", "19102", "19103", "19104", "19105", "19106", "19107", "19108", "19109", "19110"],
  "Phoenix": ["85001", "85002", "85003", "85004", "85005", "85006", "85007", "85008", "85009", "85010"],
  "Miami": ["33101", "33102", "33103", "33104", "33105", "33106", "33107", "33108", "33109", "33110"],
  "Dallas": ["75201", "75202", "75203", "75204", "75205", "75206", "75207", "75208", "75209", "75210"],
  "Austin": ["78701", "78702", "78703", "78704", "78705", "78706", "78707", "78708", "78709", "78710"],
}

export default function ResellingW2Step2Page() {
  const [streetAddress, setStreetAddress] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [highlightedStateIndex, setHighlightedStateIndex] = useState(-1)
  const [highlightedCityIndex, setHighlightedCityIndex] = useState(-1)
  const [stateInputValue, setStateInputValue] = useState("")
  const [cityInputValue, setCityInputValue] = useState("")
  const [isStateOpen, setIsStateOpen] = useState(false)
  const [isCityOpen, setIsCityOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cities, setCities] = useState<string[]>([])
  const router = useRouter()
  const stateContainerRef = useRef<HTMLDivElement>(null)
  const cityContainerRef = useRef<HTMLDivElement>(null)
  const stateInputRef = useRef<HTMLInputElement>(null)
  const cityInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (stateContainerRef.current && !stateContainerRef.current.contains(event.target as Node)) {
        setIsStateOpen(false)
      }
      if (cityContainerRef.current && !cityContainerRef.current.contains(event.target as Node)) {
        setIsCityOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle state selection
  const handleSelectState = (selectedState: string) => {
    setState(selectedState)
    setStateInputValue(selectedState)
    setIsStateOpen(false)
    setHighlightedStateIndex(-1)
  }

  // Handle city selection
  const handleSelectCity = (selectedCity: string) => {
    setCity(selectedCity)
    setCityInputValue(selectedCity)
    setIsCityOpen(false)
    setHighlightedCityIndex(-1)
    setZipCode("")
  }

  // Filter states
  const filteredStates = stateInputValue
    ? US_STATES.filter((s) => s.toLowerCase().includes(stateInputValue.toLowerCase()))
    : US_STATES

  // Filter cities
  const filteredCities = cityInputValue && cities.length > 0
    ? cities.filter((c) => c.toLowerCase().includes(cityInputValue.toLowerCase()))
    : cities

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

  // Handle city keyboard navigation
  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isCityOpen && e.key !== "Enter") {
      setIsCityOpen(true)
      setHighlightedCityIndex(0)
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedCityIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedCityIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedCityIndex >= 0) {
          handleSelectCity(filteredCities[highlightedCityIndex])
        }
        break
      case "Escape":
        setIsCityOpen(false)
        break
    }
  }

  const isValid = streetAddress.trim() && state && city && zipCode.replace(/\D/g, "").length === 5

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
            {/* Street Address */}
            <div className="space-y-2">
              <label htmlFor="street" className="block text-gray-700 font-medium text-base font-sans">
                Home address
              </label>
              <input
                id="street"
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="e.g. 123 Main Street. Apt. 4B"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none"
              />
            </div>

            {/* State */}
            <div className="space-y-2" ref={stateContainerRef}>
              <label htmlFor="state" className="block text-gray-700 font-medium text-base font-sans">
                State of residence 
              </label>
              <div className="relative">
                <input
                  ref={stateInputRef}
                  id="state"
                  type="text"
                  value={stateInputValue}
                  onChange={(e) => {
                    setStateInputValue(e.target.value)
                    setIsStateOpen(true)
                    setHighlightedStateIndex(0)
                  }}
                  onFocus={() => setIsStateOpen(true)}
                  onKeyDown={handleStateKeyDown}
                  placeholder="Select your state"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none cursor-pointer"
                />

                {isStateOpen && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-2 bg-blue-950 rounded-xl shadow-lg z-50 max-h-72 overflow-y-scroll"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {filteredStates.length > 0 ? (
                      <ul className="divide-y divide-blue-900">
                        {filteredStates.map((s, index) => (
                          <li key={s}>
                            <button
                              type="button"
                              onClick={() => handleSelectState(s)}
                              onMouseEnter={() => setHighlightedStateIndex(index)}
                              className={`w-full px-6 py-4 text-left font-sans transition-colors ${
                                index === highlightedStateIndex ? "bg-blue-900" : "bg-blue-950 hover:bg-blue-900"
                              } ${state === s ? "text-blue-200 font-semibold" : "text-white"}`}
                            >
                              {s}
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

            {/* City */}
            <div className="space-y-2">
              <label htmlFor="city" className="block text-gray-700 font-medium text-base font-sans">
                City of residence
              </label>
              <input
                id="city"
                type="text"
                value={cityInputValue}
                onChange={(e) => {
                  setCityInputValue(e.target.value)
                  setCity(e.target.value)
                }}
                placeholder="e.g. Albuquerque"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none"
              />
            </div>

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
                maxLength="5"
                inputMode="numeric"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none"
              />
            </div>
          </div>

          {/* Continue Button */}
          <CTAButton onClick={() => {
              if (isValid) {
                setIsSubmitting(true)
                setTimeout(() => {
                  router.push("/transition")
                }, 300)
              }
            }} disabled={!isValid || isSubmitting}>
            Continue
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
