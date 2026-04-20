'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { InputField } from '@/components/input-field'
import { CTAButton } from '@/components/cta-button'

export default function DateOfBirthPage() {
  const router = useRouter()
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const monthRef = useRef<HTMLInputElement>(null)
  const dayRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false)
    }, 1000)
    return () => clearTimeout(skeletonTimer)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (monthRef.current) {
      monthRef.current.focus()
    }
  }, [])

  // Handle Month input (1-12, max 2 digits)
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (value === '0') {
      value = ''
    } else if (value.length === 2) {
      const monthNum = parseInt(value)
      if (monthNum > 12) {
        value = value.slice(0, 1)
      } else if (monthNum < 1 && value !== '') {
        value = ''
      } else if (monthNum >= 1 && monthNum <= 9) {
        value = '0' + monthNum
      }
    } else if (value.length === 1) {
      const monthNum = parseInt(value)
      if (monthNum === 0) {
        value = ''
      }
    }
    
    setMonth(value)
    
    // Auto-move to day if month is complete
    if (value.length === 2 && dayRef.current) {
      dayRef.current.focus()
    }
  }

  // Handle Day input (1-31, max 2 digits)
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (value === '0') {
      value = ''
    } else if (value.length === 2) {
      const dayNum = parseInt(value)
      if (dayNum > 31) {
        value = value.slice(0, 1)
      } else if (dayNum < 1 && value !== '') {
        value = ''
      } else if (dayNum >= 1 && dayNum <= 9) {
        value = '0' + dayNum
      }
    } else if (value.length === 1) {
      const dayNum = parseInt(value)
      if (dayNum === 0) {
        value = ''
      }
    }
    
    setDay(value)
    
    // Auto-move to year if day is complete
    if (value.length === 2 && yearRef.current) {
      yearRef.current.focus()
    }
  }

  // Handle Year input (current year max, 4 digits)
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (value.length <= 4) {
      if (value.length === 4) {
        const yearNum = parseInt(value)
        const currentYear = new Date().getFullYear()
        if (yearNum > currentYear) {
          value = value.slice(0, -1)
        }
      }
      setYear(value)
    }
  }

  const isFormValid = () => {
    if (!month || !day || !year) return false
    
    const monthNum = parseInt(month)
    const dayNum = parseInt(day)
    const yearNum = parseInt(year)
    const currentYear = new Date().getFullYear()
    
    // Validate ranges
    if (monthNum < 1 || monthNum > 12) return false
    if (dayNum < 1 || dayNum > 31) return false
    if (yearNum > currentYear) return false
    if (yearNum < 1900) return false
    
    return true
  }

  const handleContinue = () => {
    if (isFormValid()) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push('/lightning-ssn-verification-step-4')
      }, 300)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] flex flex-col">
      {showSkeleton && <SkeletonLoader />}
      {!showSkeleton && (
        <>
          <Header />

          <div className="px-4 lg:px-8 mt-6 lg:mt-8">
            <div className="max-w-7xl mx-auto">
              <ProgressBar progress={60} />
            </div>
          </div>

          <main className="px-4 lg:px-8 py-6 lg:py-8">
            <div className="max-w-md mx-auto space-y-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-serif text-blue-900 mb-3 font-normal">
                  <b className="font-serif text-blue-900">What's your date of birth?</b>
                </h1>
                <p className="text-gray-600 text-base leading-relaxed">
                  We use this information to verify who you are.
                </p>
              </div>

              <div className="space-y-8">
                {/* Date Fields */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Month */}
                  <InputField
                    ref={monthRef}
                    label="Month"
                    type="text"
                    value={month}
                    onChange={handleMonthChange}
                    placeholder="MM"
                    maxLength={2}
                    inputMode="numeric"
                  />

                  {/* Day */}
                  <InputField
                    ref={dayRef}
                    label="Day"
                    type="text"
                    value={day}
                    onChange={handleDayChange}
                    placeholder="DD"
                    maxLength={2}
                    inputMode="numeric"
                  />

                  {/* Year */}
                  <InputField
                    ref={yearRef}
                    label="Year"
                    type="text"
                    value={year}
                    onChange={handleYearChange}
                    placeholder="YYYY"
                    maxLength={4}
                    inputMode="numeric"
                  />
                </div>

                {/* Continue Button */}
                <CTAButton 
                  onClick={handleContinue} 
                  disabled={!isFormValid() || isSubmitting}
                  isLoading={isSubmitting}
                >
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
