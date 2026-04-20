'use client'

// Cache refresh 2024

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { CTAButton } from '@/components/cta-button'
import { ChevronDown, X, Calendar } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

const generateRandomWeeklyAmount = (baseAmount: number): string => {
  // Generate a random weekly amount based on base amount
  const variation = Math.random() * 0.3 - 0.15 // -15% to +15%
  const randomAmount = baseAmount * (1 + variation)
  return `$${randomAmount.toFixed(2)}`
}

const generateRandomDuration = (): number => {
  // Generate random duration between 12 and 20 weeks
  return Math.floor(Math.random() * 9) + 12 // 12 to 20
}

const formatNumberWithCommas = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  let result = ''
  for (let i = digits.length - 1, count = 0; i >= 0; i--, count++) {
    if (count > 0 && count % 3 === 0) result = ',' + result
    result = digits[i] + result
  }
  return result
}

const baseRepaymentOptions = [
  {
    id: 'weekly-20',
    baseAmount: 514.00,
    frequency: 'Weekly Remittance',
    recommended: true,
  },
  {
    id: 'weekly-16',
    baseAmount: 642.50,
    frequency: 'Weekly Remittance',
    recommended: false,
  },
  {
    id: 'weekly-12',
    baseAmount: 856.67,
    frequency: 'Weekly Remittance',
    recommended: false,
  },
]

export default function OfferCalculationPage() {
  const router = useRouter()
  const [fundingAmount, setFundingAmount] = useState(1500)
  const [fundingInput, setFundingInput] = useState('1500')
  const [inputError, setInputError] = useState<string | null>(null)
  const [selectedRepayment, setSelectedRepayment] = useState('weekly-20')
  const [expandedOption, setExpandedOption] = useState<string | null>(null)
  const [sameDayFunding, setSameDayFunding] = useState(false)
  const [showSameDayFundingTooltip, setShowSameDayFundingTooltip] = useState(false)
  const [showEarlyPaymentTooltip, setShowEarlyPaymentTooltip] = useState(false)
  const [randomSeed, setRandomSeed] = useState(0)

  // Generate dynamic repayment options based on funding amount
  const repaymentOptions = useMemo(() => {
    return baseRepaymentOptions.map(option => ({
      ...option,
      amount: generateRandomWeeklyAmount(option.baseAmount),
      duration: `Your estimated duration is ${generateRandomDuration()} weeks`
    }))
  }, [randomSeed])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '')
    setFundingInput(value)
    setInputError(null)

    if (value === '') return

    const numValue = parseInt(value, 10)

    // Check if it's a valid number
    if (isNaN(numValue)) {
      setInputError('Enter values between 500 and 10000')
      return
    }

    // Check range
    if (numValue < 500 || numValue > 10000) {
      setInputError('Enter values between 500 and 10000')
      return
    }

    // Check if it's in increments of 100
    if (numValue % 100 !== 0) {
      setInputError('Enter values in increments of 100')
      return
    }

    // Valid input
    setFundingAmount(numValue)
    setInputError(null)
  }

  const handleInputBlur = () => {
    if (fundingInput === '') {
      setFundingInput(fundingAmount.toString())
    }
  }

  const isFormValid = selectedRepayment !== null && sameDayFunding

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={40} currentStep={4} totalSteps={10} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-8">
          {/* Title Section */}
          <div>
            <h1 className="text-[#05055c] font-serif font-extrabold mb-2 text-4xl text-blue-900">
              Congratulations, Leslie!
            </h1>
            <p className="text-gray-600 text-base font-sans">
              How much funding are you looking for?
            </p>
          </div>

          {/* Funding Amount Display */}
          <div>
            <div className="flex items-center gap-2 mb-2">
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-blue-900">$</span>
              <input
                type="text"
                value={formatNumberWithCommas(fundingInput)}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 font-bold border-2 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-none bg-transparent border-b border-slate-950 border-t-0 border-l-0 border-r-0 rounded-none text-3xl font-serif text-blue-900"
              />
            </div>

            {/* Error Message */}
            {inputError && (
              <div className="flex items-center gap-2 mt-2 text-red-600">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{inputError}</span>
              </div>
            )}

            {/* Slider */}
            <div className="py-4 pt-6 pb-1">
              <div className="flex items-center gap-2 relative">
                {/* Track background (visual representation) */}
                <div className="absolute left-0 right-0 h-1.5 bg-gray-300 rounded-full -z-10" />
                
                <Slider
                  value={[fundingAmount]}
                  onValueChange={(value) => {
                    setFundingAmount(value[0])
                    setFundingInput(value[0].toString())
                    setInputError(null)
                    setRandomSeed(prev => prev + 1)
                  }}
                  min={500}
                  max={10000}
                  step={100}
                  className="flex-1"
                />
                <span className="flex-shrink-0 text-3xl">👍</span>
              </div>

              {/* Min/Max Labels */}
              <div className="flex justify-between text-sm text-gray-600 mt-4">
                <div>
                  <p className="font-medium text-sm">Start from:</p>
                  <p className="font-bold text-gray-900 text-sm">$500</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">Up to:</p>
                  <p className="font-bold text-gray-900 text-sm">$10000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Repayment Section */}
          <div className="space-y-4">
            <div>
              <h2 className="font-bold text-[#05055c] font-serif mb-2 text-xl">
                Choose how you'd like to repay your advance
              </h2>
              <p className="text-gray-600 text-base">
                Based on your cashflow and funding amount, we have the following offers:
              </p>
            </div>

            {/* Repayment Options */}
            <div className="space-y-3">
              {repaymentOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setSelectedRepayment(option.id)}
                  className={`border-2 rounded-3xl p-6 bg-white cursor-pointer transition-all relative ${
                    selectedRepayment === option.id
                      ? 'border-purple-800'
                      : 'border-gray-300'
                  }`}
                >
                  {/* Recommended Badge */}
                  {option.recommended && (
                    <div className="absolute -top-3 right-8">
                      <span className="bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                        Recommended
                      </span>
                    </div>
                  )}

                  {/* Radio Button - Top Right */}
                  <div className="absolute top-6 right-6">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedRepayment === option.id
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-400 bg-white'
                      }`}
                    >
                      {selectedRepayment === option.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pr-12">
                    {/* Amount and Frequency */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-bold text-2xl text-gray-900">{option.amount}</span>
                      <span className="text-base text-gray-900 font-semibold">/ {option.frequency}</span>
                    </div>

                    {/* Duration */}
                    <p className="text-sm text-gray-600 mb-3">{option.duration}</p>

                    {/* More Details Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedOption(expandedOption === option.id ? null : option.id)
                      }}
                      className="text-base font-bold text-gray-900 flex items-center gap-2 hover:text-gray-700"
                    >
                      {expandedOption === option.id ? 'Less Info' : 'More Details'}
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          expandedOption === option.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Expanded Details */}
                    {expandedOption === option.id && (
                      <div className="mt-6 pt-6 border-t border-gray-300 space-y-4">
                        {/* Weekly Remittance */}
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-2xl text-gray-900">{option.amount}</span>
                            <span className="text-gray-600 font-semibold">/ Weekly Remittance</span>
                          </div>
                          <p className="text-gray-600 text-sm">{option.duration}</p>
                        </div>

                        {/* Processing Fee */}
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-2xl text-gray-900">$350</span>
                            <span className="text-gray-600 font-semibold">/ Processing Fee</span>
                          </div>
                          <p className="text-gray-600 text-sm">Deducted from your funding amount.</p>
                        </div>

                        {/* Disbursed Amount */}
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-2xl text-gray-900">$3,750</span>
                            <span className="text-gray-600 font-semibold">/ Disbursed Amount *</span>
                          </div>
                          <p className="text-gray-600 text-sm">Funds deposited to your account once processing fee is applied</p>
                        </div>

                        {/* Total Cost of Capital */}
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-2xl text-gray-900">$3,270</span>
                            <span className="text-gray-600 font-semibold">/ Total Cost of Capital</span>
                          </div>
                          <p className="text-gray-600 text-sm">Overall cost of your advance, including fees and charges.</p>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-300 my-4" />

                        {/* Info Items */}
                        <div className="space-y-3">
                          {/* Item 1 - Dollar Sign */}
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-bold bg-transparent text-green-500 text-xl">
                              $
                            </div>
                            <p className="text-gray-700 font-sans text-sm">This is a merchant cash advance, not a loan.</p>
                          </div>

                          {/* Item 2 - Division Icon */}
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 bg-transparent">
                              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="7" r="1.5"/>
                                <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="17" r="1.5"/>
                              </svg>
                            </div>
                            <p className="text-gray-700 text-sm font-sans">The duration and total cost shown are based on your sales.</p>
                          </div>

                          {/* Item 3 - Asterisk */}
                          <div className="flex gap-3">
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                              <span className="text-gray-600 font-bold text-lg">*</span>
                            </div>
                            <div>
                              <p className="text-gray-900 text-sm font-sans"><span className="font-bold">Disclaimer:</span> Disbursed amount displayed does not include same day fees if option is selected.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-0">
            {/* Same Day Funding */}
            <div
              onClick={() => setSameDayFunding(!sameDayFunding)}
              className="flex items-center justify-between gap-4 py-5 px-0 border-b border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors relative"
            >
              <div className="flex items-center gap-3 flex-1">
                {/* Blue Calendar Icon */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-sky-600">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                
                {/* Text */}
                <div>
                  <p className="text-gray-900 text-base font-normal">Enable Same Day Funding</p>
                  <p className="text-gray-600 text-sm font-bold">(+$25 fee)</p>
                </div>
              </div>

              {/* Info Icon Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowSameDayFundingTooltip(!showSameDayFundingTooltip)
                }}
                className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center flex-shrink-0 hover:border-gray-700 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-gray-500">i</span>
              </button>
              
              {/* Checkbox */}
              <div
                className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-all border-2 ${
                  sameDayFunding
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-white border-gray-400'
                }`}
              >
                {sameDayFunding && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              {/* Same Day Funding Tooltip */}
              {showSameDayFundingTooltip && (
                <div className="fixed inset-0 z-40" onClick={() => setShowSameDayFundingTooltip(false)} />
              )}
              {showSameDayFundingTooltip && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80 pointer-events-auto">
                  <div className="bg-blue-50 border-2 border-gray-400 rounded-3xl p-6 relative">
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setShowSameDayFundingTooltip(false)}
                      className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                    >
                      <X size={24} />
                    </button>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 mb-3 pr-8 font-serif text-lg">
                      Same Day Funding
                    </h3>

                    {/* Content */}
                    <ul className="space-y-2">
                      <li className="flex gap-3">
                        <span className="text-gray-700 font-bold mt-0.5">•</span>
                        <p className="text-gray-700 text-sm">
                          Deposits typically available by 8 PM EST local time.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-700 font-bold mt-0.5">•</span>
                        <p className="text-gray-700 text-sm">
                          Availability depends on approval and processing times.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-700 font-bold mt-0.5">•</span>
                        <p className="text-gray-700 text-sm">
                          Same-day disbursement not guaranteed; verification may be required.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-700 font-bold mt-0.5">•</span>
                        <p className="text-gray-700 text-sm">
                          This is not a loan. It is a merchant cash advance based on income.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Early Payment Discount */}
            <div className="flex items-center justify-between gap-4 py-5 px-0 border-b border-gray-300 hover:bg-gray-50 transition-colors relative">
              <div className="flex items-center gap-3 flex-1">
                {/* Lightning Icon */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-600">
                  <span className="text-2xl">⚡</span>
                </div>

                {/* Text */}
                <div>
                  <p className="text-gray-900 text-base font-normal">Early Payment Discount</p>
                  <p className="text-gray-600 text-sm font-bold">(Save 10%)</p>
                </div>
              </div>

              {/* Info Icon Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowEarlyPaymentTooltip(!showEarlyPaymentTooltip)
                }}
                className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center flex-shrink-0 hover:border-gray-700 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-gray-500">i</span>
              </button>

              {/* Early Payment Discount Tooltip */}
              {showEarlyPaymentTooltip && (
                <div className="fixed inset-0 z-40" onClick={() => setShowEarlyPaymentTooltip(false)} />
              )}
              {showEarlyPaymentTooltip && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80 pointer-events-auto">
                  <div className="border-2 border-gray-400 rounded-3xl p-6 relative bg-blue-50">
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setShowEarlyPaymentTooltip(false)}
                      className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                    >
                      <X size={24} />
                    </button>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 mb-3 pr-8 font-serif text-lg">
                      Early Payment Discount
                    </h3>

                    {/* Content */}
                    <ul className="space-y-2">
                      <li className="flex gap-3">
                        <span className="text-gray-700 font-bold mt-0.5">•</span>
                        <p className="text-gray-700 text-sm">
                          Save 10% by paying your advance early.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-700 font-bold mt-0.5">•</span>
                        <p className="text-gray-700 text-sm">
                          Discount applies to remaining balance only.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-700 font-bold mt-0.5">•</span>
                        <p className="text-gray-700 text-sm">
                          Early payments cannot exceed your daily sales rate.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <CTAButton className="mt-8" onClick={() => router.push("/view-agreement")}>
            Get Your $6,000 – Pay in 20 Weeks
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
