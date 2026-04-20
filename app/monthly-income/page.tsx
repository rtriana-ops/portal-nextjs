"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { CTAButton } from "@/components/cta-button"
import { useRouter } from "next/navigation"

export default function MonthlyIncomePage() {
  const [income, setIncome] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setIncome(value)
    setError("")
  }

  const formatIncome = (value: string) => {
    if (!value) return ""
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (income && Number(income) > 0) {
      router.push("/pay-schedule")
    }
  }

  const isValid = income && Number(income) > 0

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
              What is your net monthly income?
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="income" className="block text-gray-700 font-medium text-base font-sans">
                Monthly income
              </label>
              <input
                ref={inputRef}
                type="text"
                id="income"
                value={income ? formatIncome(income) : ""}
                onChange={handleIncomeChange}
                placeholder="e.g. Enter amount"
              className={`w-full px-4 py-4 border-[1.5px] rounded-xl text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300/80"
                  : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:bg-white"
              }`}
              />
              <p className="text-gray-500 text-sm mt-1">Your monthly take-home pay.</p>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <CTAButton type="submit" disabled={!isValid}>
              Continue
            </CTAButton>
          </form>
        </div>
      </main>
    </div>
  )
}
