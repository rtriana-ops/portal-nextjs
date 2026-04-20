"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"

export default function HomeAddressPage() {
  const router = useRouter()
  const [address, setAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])

  const handleContinue = () => {
    if (address.trim()) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/lightning-state-of-residence-step-3")
      }, 300)
    }
  }

  const isValid = address.trim().length > 0

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={33} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif text-blue-900">
              What's your home address?
            </h1>
            <p className="text-base text-gray-600 font-sans">
              We use this to confirm your identity and continue your application.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="address" className="block text-gray-700 font-medium text-base font-sans">
                Home address
              </label>
              <input
                ref={inputRef}
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 123 Main St, Apt 4B"
                className="w-full px-4 py-4 border-[1.5px] border-gray-200 rounded-xl text-gray-900 bg-white transition-all duration-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none"
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
