"use client"

import type React from "react"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { SkeletonLoader } from "@/components/skeleton-loader"
import { InputField } from "@/components/input-field"
import { CTAButton } from "@/components/cta-button"

export default function FirstNamePage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "")
    setFirstName(filteredValue)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (firstName.trim()) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/last-name")
      }, 300)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      {showSkeleton && <SkeletonLoader />}
      {!showSkeleton && (
        <>
          <Header />

          <div className="px-4 lg:px-8 mt-6 lg:mt-8">
            <div className="max-w-7xl mx-auto">
              <ProgressBar progress={40} />
            </div>
          </div>

          <main className="px-4 lg:px-8 py-6 lg:py-8">
            <div className="max-w-md mx-auto space-y-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif text-blue-900">What's your first name?</h1>
                <p className="text-muted-foreground text-base">We'll use it to set up your profile.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  ref={inputRef}
                  label="First Name"
                  type="text"
                  placeholder="Your name"
                  value={firstName}
                  onChange={handleNameChange}
                />

                <CTAButton type="submit" disabled={!firstName.trim()} isLoading={isSubmitting}>
                  Continue
                </CTAButton>
              </form>
            </div>
          </main>
        </>
      )}
    </div>
  )
}
