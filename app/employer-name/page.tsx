"use client"

import type React from "react"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { CTAButton } from "@/components/cta-button"

export default function EmployerNamePage() {
  const router = useRouter()
  const [employerName, setEmployerName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow letters, spaces, numbers, and common business characters
    const filteredValue = value.replace(/[^a-zA-Z0-9\s&.,'-]/g, "")
    setEmployerName(filteredValue)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (employerName.trim()) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/job-title")
      }, 300)
    }
  }

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
              What's the name of your current employer?
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="employerName" className="block text-gray-700 font-medium text-base font-sans">
                Employer name
              </label>
              <input
                ref={inputRef}
                id="employerName"
                type="text"
                placeholder="e.g. ABC Flooring"
                value={employerName}
                onChange={handleNameChange}
                className="w-full px-4 py-4 border-[1.5px] border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:bg-white focus:outline-none"
              />
            </div>

            <CTAButton type="submit" disabled={!employerName.trim()} isLoading={isSubmitting}>
              Continue
            </CTAButton>
          </form>
        </div>
      </main>
    </div>
  )
}
