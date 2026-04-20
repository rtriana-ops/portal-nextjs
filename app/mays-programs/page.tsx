'use client'

// Cache refresh 2024

import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { CTAButton } from '@/components/cta-button'
import { FloatingMenu } from '@/components/floating-menu'
import { Banner1 } from '@/components/banner-1'
import { Banner2 } from '@/components/banner-2'
import { Banner3 } from '@/components/banner-3'
import { showCustomNotification } from '@/components/system-error-toast'
import { ChevronDown, X, Calendar, TicketCheck, BadgePercent, Coins } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import * as Switch from '@radix-ui/react-switch'

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
    id: 'weekly-12',
    name: '12-Week Plan',
    description: 'Lower weekly payments over a longer term',
    baseAmount: 4100,
    frequency: 'Weekly',
    weeks: 12,
    recommended: true,
  },
  {
    id: 'weekly-10',
    name: '10-Week Plan',
    description: 'Best balance of cost & time',
    baseAmount: 4100,
    frequency: 'Weekly',
    weeks: 10,
    recommended: false,
  },
  {
    id: 'weekly-8',
    name: '8-Week Plan',
    description: 'Faster repayment',
    baseAmount: 4100,
    frequency: 'Weekly',
    weeks: 8,
    recommended: false,
  },
  {
    id: 'weekly-6',
    name: '6-Week Plan',
    description: 'Fastest repayment',
    baseAmount: 4100,
    frequency: 'Weekly',
    weeks: 6,
    recommended: false,
  },
]

export default function MaysProgramsPage() {
  const router = useRouter()
  const infoIconRef = useRef<HTMLButtonElement>(null)
  const [fundingAmount, setFundingAmount] = useState(1500)
  const [fundingInput, setFundingInput] = useState('1500')
  const [inputError, setInputError] = useState<string | null>(null)
  const [selectedRepayment, setSelectedRepayment] = useState('weekly-12')
  const [expandedOption, setExpandedOption] = useState<string | null>(null)
  const [addOnEnabled, setAddOnEnabled] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [showBanner1, setShowBanner1] = useState(true)
  const [randomSeed, setRandomSeed] = useState(0)
  const [selectedMenuOption, setSelectedMenuOption] = useState('Program')
  const [showBanner2Modal, setShowBanner2Modal] = useState(false)
  const [showBanner3Modal, setShowBanner3Modal] = useState(false)

  const handleMenuOptionSelect = (option: string) => {
    if (option === 'Banner 1') {
      setSelectedMenuOption('Banner 1')
    } else if (option === 'Banner 2') {
      setShowBanner2Modal(true)
    } else if (option === 'Banner 3') {
      setShowBanner3Modal(true)
    } else if (option === 'Expired') {
      // Edita el texto aquí
      showCustomNotification("Free Same Day Funding is no longer available for this offer.", { position: "top" })
      setSelectedMenuOption(option)
    } else {
      setSelectedMenuOption(option)
    }
  }

  // Generate dynamic repayment options based on funding amount
  const repaymentOptions = useMemo(() => {
    return baseRepaymentOptions.map(option => ({
      ...option,
      weeklyAmount: Math.round(fundingAmount / option.weeks),
      totalRepayment: fundingAmount,
      fees: '$0'
    }))
  }, [fundingAmount])

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

  const isFormValid = selectedRepayment !== null

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      {/* Banner based on selected menu option */}
      {selectedMenuOption === 'Banner 1' && <Banner1 onClose={() => setSelectedMenuOption('Program')} />}
      <Banner2 isOpen={showBanner2Modal} onClose={() => setShowBanner2Modal(false)} />
      <Banner3 isOpen={showBanner3Modal} onClose={() => setShowBanner3Modal(false)} />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={40} currentStep={4} totalSteps={10} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8 pb-[100px]">
        <div className="max-w-md mx-auto space-y-6">
          {/* Title Section */}
          <div className="mb-0">
            <h1 className="text-[#05055c] font-serif font-extrabold mb-0 text-3xl text-blue-900">
              Congratulations, Leslie!
            </h1>
            <p className="text-gray-600 text-base font-sans">
              Choose the offer that works best for you.
            </p>
          </div>

          {/* Slider Section */}
          <div className="py-4 pt-6 pb-1 px-6">
            {/* Current Value Display */}
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-[#0f172a]">${fundingAmount.toLocaleString()}</p>
            </div>

            {/* Slider Container */}
            <div className="flex items-center gap-3 relative mb-6">
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
                className="flex-1 [&>span]:bg-[#dcfce7] [&_[role=slider]]:bg-[#22c55e] [&_[role=slider]]:shadow-lg [&_[role=slider]]:border-4 [&_[role=slider]]:border-white"
              />
              <span className="flex-shrink-0 text-2xl">👍</span>
            </div>

            {/* Min/Max Labels */}
            <div className="flex justify-between text-sm text-gray-600">
              <div>
                <p className="font-medium text-sm text-[#6b7280]">Start from:</p>
                <p className="font-bold text-[#111827] text-lg">$500</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm text-[#6b7280]">Up to:</p>
                <p className="font-bold text-[#111827] text-lg">$10000</p>
              </div>
            </div>
          </div>

          {/* Repayment Section */}
          <div className="space-y-4">
            <div>
              <h2 className="font-bold text-[#05055c] font-serif mb-2 text-xl">
                Select Your Repayment Plan.
              </h2>
            </div>

            {/* Repayment Options */}
            <div className="space-y-3">
              {repaymentOptions.map((plan, index) => {
                const isSelected = selectedRepayment === plan.id
                const isExpanded = expandedOption === plan.id

                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-[12px] p-[22px] transition-all cursor-pointer ${isSelected ? 'border-2 border-[#2563eb]' : 'border-2 border-[#e5e7eb]'
                      } relative`}
                    onClick={() => setSelectedRepayment(plan.id)}
                  >
                    {/* Recommended Badge */}
                    {plan.recommended && (
                      <div className="absolute right-[18px] top-[-10px]">
                        <div className="bg-[#22c55e] px-[12px] py-[4px] rounded-full">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[14px] text-white tracking-[-0.5px]">
                            Recommended
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="flex flex-col gap-[8px]">
                      {/* Plan Header */}
                      <div className="flex gap-[8px] items-center">
                        {/* Radio Button - Blue Circle */}
                        {isSelected && (
                          <div className="rounded-full size-[24px] bg-[#0075ff] flex items-center justify-center flex-shrink-0">
                            <div className="size-[10px] rounded-full bg-white" />
                          </div>
                        )}
                        {!isSelected && (
                          <div className="rounded-full size-[24px] border-2 border-[#d1d5db]" />
                        )}
                        <p className="font-['Outfit',sans-serif] font-semibold leading-[24px] text-[#111827] text-[16px] tracking-[-0.5px]">
                          {plan.name}{" / "}<span className="font-['Roboto',sans-serif] font-normal text-[#5b5d61]">{plan.description}</span>
                        </p>
                      </div>

                      {/* Plan Details */}
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-[8px] mb-2 pt-[8px]">
                          <div className="flex items-baseline gap-[8px]">
                            <p className="font-['Roboto',sans-serif] font-normal leading-[20px] text-[#4b5563] text-[14px] tracking-[-0.5px]">
                              Weekly Remittance
                            </p>

                          </div>
                          <div className="bg-[#f0fdf4] flex gap-[8px] items-center px-[12px] py-[6px] rounded-[8px] w-fit">
                            <span className="text-green-600">🏷️</span>
                            <p className="font-['Outfit',sans-serif] font-bold leading-[20px] text-[#15803d] text-[14px] tracking-[-0.5px]">
                              Fees = $0
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[8px] items-center px-[12px] py-[6px] rounded-[8px] w-fit">
                          <p className="font-['Outfit',sans-serif] font-bold leading-[28px] text-[#111827] text-[20px] tracking-[-0.5px]">
                            ${plan.weeklyAmount.toLocaleString()}
                          </p>
                          <button
                            className="font-['Roboto',sans-serif] font-medium leading-[20px] text-[#2563eb] text-[14px] text-center tracking-[-0.5px] flex items-center gap-[4px]"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!isSelected) {
                                setSelectedRepayment(plan.id)
                                setExpandedOption(plan.id)
                              } else {
                                setExpandedOption(isExpanded ? null : plan.id)
                              }
                            }}
                          >
                            View Full Offer
                            <ChevronDown
                              size={20}
                              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="flex flex-col gap-[12px] pt-[12px] border-t border-[#e5e7eb]">
                        {/* Processing Fee */}
                        <div className="flex items-center justify-between gap-[12px]">
                          <div className="flex items-center gap-[12px] flex-1">
                            <TicketCheck size={20} className="text-[#9ca3af] flex-shrink-0" />
                            <p className="font-['Roboto',sans-serif] font-normal leading-[20px] text-[#4b5563] text-[14px] tracking-[-0.5px]">
                              Processing Fee
                            </p>
                          </div>
                          <div className="flex gap-[4px] items-center flex-shrink-0">
                            <p className="font-['Roboto',sans-serif] font-normal leading-[20px] text-[#9ca3af] text-[14px] tracking-[-0.5px] line-through">
                              $450
                            </p>
                            <div className="bg-[#111827] px-[8px] py-[2px] rounded-[4px]">
                              <p className="font-['Outfit',sans-serif] font-bold leading-[16px] text-white text-[12px] tracking-[-0.5px]">
                                FREE
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Factor Rate */}
                        <div className="flex items-center justify-between gap-[12px]">
                          <div className="flex items-center gap-[12px] flex-1">
                            <BadgePercent size={20} className="text-[#9ca3af] flex-shrink-0" />
                            <p className="font-['Roboto',sans-serif] font-normal leading-[20px] text-[#4b5563] text-[14px] tracking-[-0.5px]">
                              Factor Rate
                            </p>
                          </div>
                          <p className="font-['Outfit',sans-serif] font-bold leading-[28px] text-[#111827] text-[18px] tracking-[-0.5px] flex-shrink-0">
                            1.40
                          </p>
                        </div>

                        {/* Total Cost of Capital */}
                        <div className="flex items-start justify-between gap-[12px]">
                          <div className="flex flex-col gap-[4px] flex-1">
                            <div className="flex items-center gap-[12px]">
                              <Coins size={20} className="text-[#9ca3af] flex-shrink-0" />
                              <p className="font-['Outfit',sans-serif] font-bold leading-[20px] text-[#111827] text-[14px] tracking-[-0.5px]">
                                Total Cost of Capital
                              </p>
                            </div>
                            <p className="font-['Roboto',sans-serif] font-normal leading-[1.3] text-[#6b7280] text-[12px] ml-[32px]">
                              This is the total amount you’ll repay.
                            </p>
                          </div>
                          <p className="font-['Outfit',sans-serif] font-bold leading-[32px] text-[#111827] text-[18px] tracking-[-0.5px] flex-shrink-0">
                            ${plan.totalRepayment.toLocaleString()}
                          </p>
                        </div>

                        {/* Disbursed Amount - Highlighted */}
                        <div className="bg-[#dcfce7] rounded-[12px] p-[16px] flex items-start justify-between gap-[12px]">
                          <div className="flex flex-col gap-[0px] flex-1">
                            <div className="flex items-center gap-[12px]">
                              <span className="text-[18px] flex-shrink-0">💵</span>
                              <p className="font-['Outfit',sans-serif] font-bold leading-[20px] text-[#111827] text-[14px] tracking-[-0.5px]">
                                Disbursed Amount
                              </p>
                            </div>
                            <p className="font-['Roboto',sans-serif] font-normal leading-[1.2] text-[#6b7280] text-[12px] italic ml-[32px]">
                              No processing fee. <br>
                              </br>You get exactly what you asked for.
                            </p>
                          </div>
                          <p className="font-['Outfit',sans-serif] font-bold leading-[28px] text-[#111827] text-[24px] tracking-[-0.5px] flex-shrink-0">
                            ${fundingAmount.toLocaleString()}
                          </p>
                        </div>

                        {/* Disclaimers Box */}
                        <div className="bg-[#f9fafb] flex flex-col gap-[8px] p-[16px] rounded-[12px] border border-[#e5e7eb]">
                          <div className="flex gap-[8px] items-start">
                            <p className="font-['Outfit',sans-serif] font-bold leading-[20px] text-[#6b7280] text-[14px] tracking-[-0.5px] flex-shrink-0">
                              *
                            </p>
                            <p className="font-['Roboto',sans-serif] font-normal leading-[1.4] text-[#6b7280] text-[13px]">
                              This is a merchant cash advance, not a loan.
                            </p>
                          </div>
                          <div className="flex gap-[8px] items-start">
                            <p className="font-['Outfit',sans-serif] font-bold leading-[20px] text-[#6b7280] text-[14px] tracking-[-0.5px] flex-shrink-0">
                              *
                            </p>
                            <p className="font-['Roboto',sans-serif] font-normal leading-[1.4] text-[#6b7280] text-[13px]">
                              Early payoff is not available.
                            </p>
                          </div>
                          <div className="flex gap-[8px] items-start">
                            <p className="font-['Outfit',sans-serif] font-bold leading-[20px] text-[#6b7280] text-[14px] tracking-[-0.5px] flex-shrink-0">
                              *
                            </p>
                            <p className="font-['Roboto',sans-serif] font-normal leading-[1.4] text-[#6b7280] text-[13px]">
                              Duration and total cost depend on your sales.
                            </p>
                          </div>
                          <div className="flex gap-[8px] items-start">
                            <p className="font-['Outfit',sans-serif] font-bold leading-[20px] text-[#6b7280] text-[14px] tracking-[-0.5px] flex-shrink-0">
                              *
                            </p>
                            <p className="font-['Roboto',sans-serif] font-normal leading-[1.4] text-[#6b7280] text-[13px]">
                              <span className="font-bold">Disclaimer:</span> Disbursed amount displayed does not include same day fees if option is selected.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Add-On Options */}
            <div className="space-y-4 mb-0">
              {/* Add Same Day Funding */}
              <div className="bg-white rounded-[12px] p-[16px] border border-[#e5e7eb] flex items-center justify-between relative">
                <div className="flex gap-[8px] items-center">
                  <button
                    ref={infoIconRef}
                    onClick={() => setTooltipOpen(!tooltipOpen)}
                    className="flex items-center justify-center size-[16px] cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="7" stroke="#6b7280" strokeWidth="1" fill="none" />
                      <text x="8" y="12" fontSize="10" fill="#6b7280" textAnchor="middle">
                        ?
                      </text>
                    </svg>
                  </button>
                  <div className="flex flex-col">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#111827] text-[14px] tracking-[-0.5px]">
                      Add Same Day Funding
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[#6b7280] text-[12px] tracking-[-0.5px]">
                    </p>
                  </div>
                </div>

                <Switch.Root
                  className="w-[42px] h-[24px] bg-[#e5e5e5] rounded-full relative data-[state=checked]:bg-[#0075ff] outline-none cursor-pointer transition-colors"
                  checked={addOnEnabled}
                  onCheckedChange={setAddOnEnabled}
                >
                  <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                </Switch.Root>

                {/* Tooltip */}
                {tooltipOpen && (
                  <div className="fixed inset-0 z-40" onClick={() => setTooltipOpen(false)} />
                )}
                {tooltipOpen && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-80 pointer-events-auto">
                    <div className="bg-blue-50 border-2 border-gray-300 rounded-xl p-4 relative">
                      <button
                        type="button"
                        onClick={() => setTooltipOpen(false)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                      >
                        <X size={20} />
                      </button>
                      <h3 className="font-bold text-gray-900 mb-2 pr-8 text-sm">
                        Same Day Funding
                      </h3>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li className="flex gap-2">
                          <span className="font-bold">•</span>
                          <p>Receive funds the same business day of approval.</p>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold">•</span>
                          <p>Deposits typically available by 8 PM EST local time.</p>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold">•</span>
                          <p>Availability depends on approval and processing times.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>


            {/* Sticky Bottom - Redesigned */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] shadow-[0px_-3px_10px_0px_rgba(0,0,0,0.08)] z-50">
              <div className="max-w-md mx-auto px-4 py-4 space-y-3">
                {/* Main CTA Button */}
                <CTAButton
                  onClick={() => router.push('/view-agreement-mays-programs')}
                  disabled={!isFormValid}
                >
                  Get Your ${fundingAmount.toLocaleString()} – Pay in {repaymentOptions.find(o => o.id === selectedRepayment)?.weeks || 12} Weeks
                </CTAButton>

                {/* Bottom Info Row */}
                <div className="flex items-center justify-between">
                  <p className="font-['Roboto',sans-serif] font-bold text-[#111827] text-sm">
                    Same Day Funding — <span className="text-[#15803d]">FREE TODAY ONLY</span>
                  </p>
                  <div className="bg-[#dcfce7] rounded-full px-3 py-1.5 flex items-center gap-1.5 flex-shrink-0">
                    <svg className="w-4 h-4 text-[#15803d]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Roboto',sans-serif] font-bold text-[#15803d] text-xs whitespace-nowrap">
                      Secure & Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Padding to prevent content from being hidden by sticky button */}
          <div className="h-[100px]" />
        </div>
      </main>

      {/* Floating Menu */}
      <FloatingMenu
        options={['Expired', 'Program', 'Banner 1', 'Banner 2', 'Banner 3']}
        onOptionSelect={handleMenuOptionSelect}
        activeOption={selectedMenuOption}
      />
    </div>
  )
}
