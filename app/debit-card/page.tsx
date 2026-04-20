'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { InputField } from '@/components/input-field'
import { CTAButton } from '@/components/cta-button'
import { Lock, Shield, ChevronDown, ChevronUp, X } from 'lucide-react'

export default function DebitCardPage() {
  const router = useRouter()
  const [cardNumber, setCardNumber] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [expiryError, setExpiryError] = useState('')
  const [cvv, setCvv] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(true)
  const [signature, setSignature] = useState('')
  const [cardNumberError, setCardNumberError] = useState('')
  const [nameOnCardError, setNameOnCardError] = useState('')
  const [isAuthTermsOpen, setIsAuthTermsOpen] = useState(false)
  const [showInfoBanner, setShowInfoBanner] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/)
    if (match) {
      return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ')
    }
    return value
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const cleaned = input.replace(/\D/g, '')
    
    // Limit to 16 digits max
    if (cleaned.length > 16) {
      setCardNumberError('Card number cannot exceed 16 digits')
      return
    }
    
    const formatted = formatCardNumber(input)
    setCardNumber(formatted)
    
    if (formatted.replace(/\s/g, '').length === 0) {
      setCardNumberError('Card number is required')
    } else if (formatted.replace(/\s/g, '').length < 16) {
      setCardNumberError('')
    } else {
      setCardNumberError('')
    }
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    
    // Allow deletion
    if (cleaned.length === 0) {
      return ''
    }
    
    // Validate month (first 2 digits must be 01-12)
    if (cleaned.length === 1) {
      const month = parseInt(cleaned)
      // Only allow 0, 1
      if (month > 1) {
        return ''
      }
      return cleaned
    }
    
    if (cleaned.length >= 2) {
      const month = parseInt(cleaned.slice(0, 2))
      // Month must be between 01 and 12
      if (month < 1 || month > 12) {
        return cleaned.slice(0, 1)
      }
      
      if (cleaned.length === 2) {
        return cleaned
      }
      
      // Format as MM/YY
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    
    return cleaned
  }

  const validateExpiry = (value: string): string => {
    if (!value || value.length < 5) {
      return '' // Not yet complete, don't show error
    }

    const parts = value.split('/')
    if (parts.length !== 2) return ''

    const month = parseInt(parts[0])
    const year = parseInt(parts[1])

    // Get current date
    const now = new Date()
    const currentMonth = now.getMonth() + 1 // getMonth returns 0-11
    const currentYear = now.getFullYear() % 100 // Get last 2 digits

    // Check if year is in the past
    if (year < currentYear) {
      return 'Card has expired'
    }

    // If same year, check if month is in the past
    if (year === currentYear && month < currentMonth) {
      return 'Card has expired'
    }

    return ''
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setExpiry(formatted)
    
    // Validate expiry date
    const error = validateExpiry(formatted)
    setExpiryError(error)
  }

  const handleNameOnCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    // Only allow letters and spaces
    const cleaned = input.replace(/[^a-zA-Z\s]/g, '')
    setNameOnCard(cleaned)
    
    // Validate minimum 3 letters
    const lettersOnly = cleaned.replace(/\s/g, '')
    if (cleaned.length === 0) {
      setNameOnCardError('')
    } else if (lettersOnly.length < 3) {
      setNameOnCardError('Name must contain at least 3 letters')
    } else {
      setNameOnCardError('')
    }
  }

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))
  }

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignature(e.target.value)
  }

  const isFormValid = () => {
    const cleanedCardNumber = cardNumber.replace(/\s/g, '')
    const cleanedExpiry = expiry.replace(/\D/g, '')
    const lettersOnly = nameOnCard.replace(/\s/g, '')
    
    return (
      cleanedCardNumber.length === 16 &&
      lettersOnly.length >= 3 &&
      cleanedExpiry.length === 4 &&
      !expiryError &&
      cvv.length === 3 &&
      isAuthorized
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!cardNumber.replace(/\s/g, '')) {
      setCardNumberError('Card number is required')
      return
    }

    if (!isAuthorized) {
      alert('You must authorize the charge to continue')
      return
    }

    // Navigate to application completed page
    router.push('/application-completed')
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={75} currentStep={7} totalSteps={10} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-[#05055c] mb-2 text-blue-900 font-serif">
            {"Add your debit card for payments\n"}
          </h1>
          <p className="text-gray-600 mb-8">
            Use the debit card linked to your selected bank account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Number */}
            <div>
              <label className="block text-gray-700 font-medium text-base font-sans mb-2">
                Card Number
              </label>
              <input
                ref={inputRef}
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-4 border rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:outline-none ${
                  cardNumberError
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300/80"
                    : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80"
                }`}
              />
              {cardNumberError && (
                <p className="text-red-600 text-sm font-medium mt-1">{cardNumberError}</p>
              )}
            </div>

            {/* Name on Card */}
            <div>
              <label className="block text-gray-700 font-medium text-base font-sans mb-2">
                Name on Card
              </label>
              <input
                type="text"
                value={nameOnCard}
                onChange={handleNameOnCardChange}
                placeholder="As shown on your card"
                className={`w-full px-4 py-4 border rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:outline-none ${
                  nameOnCardError
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300/80"
                    : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80"
                }`}
              />
              {nameOnCardError && (
                <p className="text-red-600 text-sm font-medium mt-1">{nameOnCardError}</p>
              )}
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-gray-700 font-medium text-base font-sans mb-2">
                  Expiration date
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className={`w-full px-4 py-4 border rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:outline-none ${
                    expiryError
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300/80"
                      : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80"
                  }`}
                />
                {expiryError && (
                  <p className="text-red-600 text-sm font-medium mt-1">{expiryError}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium text-base font-sans mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={handleCVVChange}
                  placeholder="123"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl text-base text-left transition-all duration-200 bg-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:outline-none text-center"
                />
              </div>
            </div>

            <hr className="my-6" />

            {/* Authorization Checkbox */}
            <div
              onClick={() => setIsAuthorized(!isAuthorized)}
              className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer transition-all bg-white hover:border-gray-300"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all mt-0.5 ${
                    isAuthorized ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"
                  }`}
                >
                  {isAuthorized && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    I {nameOnCard || 'USER NAME'} authorize Fundo to charge this card according to my agreement.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAuthTermsOpen(!isAuthTermsOpen)}
                    className="hover:text-blue-800 font-medium mt-2 inline-flex items-center gap-1 text-xs text-cyan-500"
                  >
                    View authorization terms
                    {isAuthTermsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {isAuthTermsOpen && (
                    <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-gray-700 text-xs leading-relaxed">
                        By entering my card information above, I authorize Fundo LLC to charge the debit card provided in this authorization according to the terms outlined in the Payment Rights Purchase and Sale Agreement for the repayment of a Merchant Cash Advance. I certify that I am an authorized user of this debit card and that I will not dispute the payment with my financial institution; so long as the transaction corresponds to the terms indicated in this form.
                      </p>
                    </div>
                  )}
                </div>
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
                    <h3 className="font-bold text-base mb-1 font-serif text-slate-900">Your card details are secure</h3>
                    <p className="text-sm font-sans text-slate-900">
                      Encrypted and used only to process your request.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <CTAButton type="submit" className="mt-8" disabled={!isFormValid()}>
              Add & Continue
            </CTAButton>
          </form>

          {/* Footer Security Info */}
          <div className="flex justify-center gap-8 mt-12 pb-8 text-sm text-gray-600 border-t border-gray-200 pt-8">
            <div className="text-center">
              <p>256-bit SSL</p>
            </div>
            <div className="flex items-center gap-2 text-center">
              <Shield size={16} className="text-green-600" />
              <p>Bank-grade security</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
