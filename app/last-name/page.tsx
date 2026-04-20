"use client"

import type React from "react"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { InputField } from "@/components/input-field"
import { CTAButton } from "@/components/cta-button"

export default function LastNamePage() {
  const router = useRouter()
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0)
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }
  }, [isLoading])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow alphabetic characters and spaces
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "")
    setLastName(filteredValue)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (lastName.trim()) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/income")
      }, 300)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
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
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif text-blue-900">And your last name?</h1>
            <p className="text-muted-foreground text-base">This helps us complete your profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              ref={inputRef}
              label="Last Name"
              type="text"
              placeholder="Your last name"
              value={lastName}
              onChange={handleNameChange}
            />

            <CTAButton type="submit" disabled={!lastName.trim()} isLoading={isSubmitting}>
              Continue
            </CTAButton>
          </form>
        </div>
      </main>
    </div>
  )
}
