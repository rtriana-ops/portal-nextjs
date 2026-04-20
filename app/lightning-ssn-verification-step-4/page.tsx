"use client"

import type React from "react"
import { Shield } from "lucide-react"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { SkeletonLoader } from "@/components/skeleton-loader"
import { CTAButton } from "@/components/cta-button"
import { Eye, EyeOff, X } from "lucide-react"

export default function SSNVerificationPage() {
  const router = useRouter()
  const [ssn, setSSN] = useState("")
  const [showSSN, setShowSSN] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showInfoBanner, setShowInfoBanner] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])

  const formatSSN = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`
    }
  }

  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9)
    setSSN(formatSSN(value))
  }

  const isValid = ssn.replace(/\D/g, "").length === 9

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isValid) {
      const ssnNumbers = ssn.replace(/\D/g, "")
      
      // Check if SSN ends with 2
      if (ssnNumbers.endsWith("2")) {
        setIsSubmitting(true)
        setTimeout(() => {
          router.push("/deny-email-ssn")
        }, 300)
        return
      }
      
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/bank-verification")
      }, 300)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={60} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif text-blue-900">
              Let's verify your identity — what's your SSN?
            </h1>
            <p className="text-gray-600 text-base">
              As a regulated financial service provider, we're required to collect your SSN to verify your identity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="ssn" className="block text-gray-700 font-medium text-base font-sans">
                Social Security number
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  id="ssn"
                  type={showSSN ? "text" : "password"}
                  placeholder="e.g XXX-XX-XXXX"
                  value={ssn}
                  onChange={handleSSNChange}
                  maxLength={11}
                  className="w-full px-4 py-4 pr-12 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowSSN(!showSSN)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showSSN ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {showInfoBanner && (
              <div className="bg-green-200 border border-green-300 rounded-2xl p-6 relative">
                <button
                  type="button"
                  onClick={() => setShowInfoBanner(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex gap-3 pr-8">
                  <img src="/icons/shield-check.svg" alt="Shield" className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-base mb-1 font-serif text-slate-900">Your information is protected</h3>
                    <p className="text-sm font-sans text-slate-900">
                      Your SSN is encrypted and used only for identity verification. No credit check is performed.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <CTAButton type="submit" disabled={!isValid} isLoading={isSubmitting}>
              Continue
            </CTAButton>
          </form>
        </div>
      </main>
    </div>
  )
}
