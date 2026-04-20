"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { SkeletonLoader } from "@/components/skeleton-loader"
import { CTAButton } from "@/components/cta-button"

export default function HomeAddressPage() {
  const router = useRouter()
  const [address, setAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false)
    }, 1000)
    return () => clearTimeout(skeletonTimer)
  }, [])

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
        router.push("/lightning-state-of-residence-step-2")
      }, 300)
    }
  }

  const isValid = address.trim().length > 0

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      {showSkeleton && <SkeletonLoader />}
      {!showSkeleton && (
        <>
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

            <CTAButton onClick={handleContinue} disabled={!isValid || isSubmitting}>
              Continue
            </CTAButton>
          </div>
        </div>
      </main>
        </>
      )}
    </div>
  )
}
