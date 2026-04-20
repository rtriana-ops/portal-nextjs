"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

const CITIES_BY_STATE: Record<string, string[]> = {
  Alabama: ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"],
  Alaska: ["Anchorage", "Juneau", "Fairbanks", "Ketchikan", "Palmer"],
  Arizona: ["Phoenix", "Mesa", "Scottsdale", "Chandler", "Tempe"],
  Arkansas: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"],
  California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Fresno"],
  Colorado: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
  Connecticut: ["Bridgeport", "New Haven", "Hartford", "Stamford", "Norwalk"],
  Delaware: ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna"],
  Florida: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg"],
  Georgia: ["Atlanta", "Columbus", "Augusta", "Savannah", "Athens"],
  Hawaii: ["Honolulu", "Hilo", "Kailua", "Kaneohe", "Pearl City"],
  Idaho: ["Boise", "Nampa", "Meridian", "Pocatello", "Idaho Falls"],
  Illinois: ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville"],
  Indiana: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Bloomington"],
  Iowa: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"],
  Kansas: ["Kansas City", "Wichita", "Overland Park", "Topeka", "Olathe"],
  Kentucky: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"],
  Louisiana: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
  Maine: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"],
  Maryland: ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Bowie"],
  Massachusetts: ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge"],
  Michigan: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor"],
  Minnesota: ["Minneapolis", "St. Paul", "Rochester", "Bloomington", "Duluth"],
  Mississippi: ["Jackson", "Gulfport", "Hattiesburg", "Biloxi", "Southaven"],
  Missouri: ["Kansas City", "St. Louis", "Springfield", "Independence", "Columbia"],
  Montana: ["Billings", "Missoula", "Great Falls", "Bozeman", "Helena"],
  Nebraska: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
  Nevada: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Paradise"],
  "New Hampshire": ["Manchester", "Nashua", "Concord", "Derry", "Rochester"],
  "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton"],
  "New Mexico": ["Albuquerque", "Las Cruces", "Santa Fe", "Rio Rancho", "Roswell"],
  "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
  "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
  "North Dakota": ["Bismarck", "Fargo", "Grand Forks", "Minot", "Williston"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
  Oklahoma: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton"],
  Oregon: ["Portland", "Eugene", "Salem", "Gresham", "Hillsboro"],
  Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
  "Rhode Island": ["Providence", "Warwick", "Cranston", "Pawtucket", "Woonsocket"],
  "South Carolina": ["Charleston", "Columbia", "Greenville", "Spartanburg", "Myrtle Beach"],
  "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"],
  Tennessee: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
  Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
  Utah: ["Salt Lake City", "Provo", "West Valley City", "Orem", "Sandy"],
  Vermont: ["Burlington", "Rutland", "Barre", "Montpelier", "Bennington"],
  Virginia: ["Virginia Beach", "Richmond", "Arlington", "Alexandria", "Roanoke"],
  Washington: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
  "West Virginia": ["Charleston", "Huntington", "Parkersburg", "Wheeling", "Weirton"],
  Wisconsin: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"],
  Wyoming: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"],
}

export default function StateOfResidencePage() {
  const router = useRouter()
  const [selectedState, setSelectedState] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [cityValue, setCityValue] = useState("")
  const [isCityOpen, setIsCityOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [cityHighlightedIndex, setCityHighlightedIndex] = useState(-1)
  const [showUnsupportedNotification, setShowUnsupportedNotification] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cityContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const cityInputRef = useRef<HTMLInputElement>(null)

  const UNSUPPORTED_STATES = ["California", "New York"]
  const isUnsupportedState = UNSUPPORTED_STATES.includes(selectedState)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter states based on input
  const filteredStates = inputValue
    ? US_STATES.filter((state) =>
        state.toLowerCase().includes(inputValue.toLowerCase())
      )
    : US_STATES

  // Get cities for selected state
  const citiesForState = selectedState ? CITIES_BY_STATE[selectedState] || [] : []

  // Filter cities based on input
  const filteredCities = cityValue
    ? citiesForState.filter((city) =>
        city.toLowerCase().includes(cityValue.toLowerCase())
      )
    : citiesForState

  // Handle select a city from dropdown
  const handleSelectCity = (city: string) => {
    setCityValue(city)
    setIsCityOpen(false)
    setCityHighlightedIndex(-1)
  }

  // Handle keyboard navigation for cities
  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isCityOpen && e.key !== "Enter") {
      setIsCityOpen(true)
      setCityHighlightedIndex(0)
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setCityHighlightedIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setCityHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (cityHighlightedIndex >= 0) {
          handleSelectCity(filteredCities[cityHighlightedIndex])
        }
        break
      case "Escape":
        setIsCityOpen(false)
        break
    }
  }

  // Close city dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityContainerRef.current && !cityContainerRef.current.contains(event.target as Node)) {
        setIsCityOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectState = (state: string) => {
    setSelectedState(state)
    setInputValue(state)
    setIsOpen(false)
    setHighlightedIndex(-1)
    
    if (UNSUPPORTED_STATES.includes(state)) {
      setShowUnsupportedNotification(true)
    } else {
      setShowUnsupportedNotification(false)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && e.key !== "Enter") {
      setIsOpen(true)
      setHighlightedIndex(0)
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredStates.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0) {
          handleSelectState(filteredStates[highlightedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleContinue = () => {
    if (selectedState && !isUnsupportedState && cityValue.trim()) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/lightning-ssn-verification-step-4")
      }, 300)
    }
  }

  const isValid = selectedState.length > 0 && !isUnsupportedState && cityValue.trim().length > 0

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={35} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif text-blue-900">
              Where do you live right now?
            </h1>
            <p className="text-base text-gray-600 font-sans">
              We use this to confirm your eligibility. Availability may vary by state.
            </p>
          </div>

          {/* Unsupported state notification */}
          {showUnsupportedNotification && (
            <div className="flex items-start gap-4 p-4 border-2 border-gray-300 rounded-2xl bg-white">
              <span className="text-3xl flex-shrink-0">😔</span>
              <div className="flex-1">
                <h2 className="font-bold text-red-600 mb-1">We don't work with</h2>
                <p className="text-gray-900">NY or CA state Residents or Businesses.</p>
              </div>
              <button
                onClick={() => {
                  setShowUnsupportedNotification(false)
                  setSelectedState("")
                  setInputValue("")
                  setIsOpen(true)
                  setHighlightedIndex(0)
                  inputRef.current?.focus()
                }}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <div className="space-y-6">
            <div className="relative space-y-2" ref={containerRef}>
              <label htmlFor="state-input" className="block text-gray-700 font-medium text-base font-sans">
                State of residence
              </label>
              
              <input
                ref={inputRef}
                id="state-input"
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setIsOpen(true)
                  setHighlightedIndex(0)
                  setShowUnsupportedNotification(false)
                }}
                onFocus={() => {
                  setIsOpen(true)
                  setShowUnsupportedNotification(false)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Select your state"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 bg-white transition-all duration-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none cursor-pointer"
              />

              {/* Autocomplete dropdown */}
              {isOpen && (
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
                            onMouseEnter={() => setHighlightedIndex(index)}
                            className={`w-full px-6 py-4 text-left font-sans transition-colors ${
                              index === highlightedIndex
                                ? "bg-blue-900"
                                : "bg-blue-950 hover:bg-blue-900"
                            } ${
                              selectedState === state
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

            {/* City of residence input - always visible */}
            <div className="relative space-y-2" ref={cityContainerRef}>
              <label htmlFor="city-input" className="block text-gray-700 font-medium text-base font-sans">
                City of residence
              </label>
              <input
                ref={cityInputRef}
                id="city-input"
                type="text"
                value={cityValue}
                onChange={(e) => {
                  setCityValue(e.target.value)
                }}
                placeholder="e.g. Albuquerque"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 bg-white transition-all duration-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none"
              />
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
              Continue to details
              <img src="/icons/arrow-right.png" alt="" width={20} height={20} className="mt-0.5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
