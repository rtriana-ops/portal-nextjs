'use client'

import { useState, useEffect } from 'react'
import { X, Clock, Zap, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Banner2Props {
  isOpen: boolean
  onClose: () => void
}

export function Banner2({ isOpen, onClose }: Banner2Props) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 12,
  })

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          return { hours: 0, minutes: 0, seconds: 0 }
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  const padZero = (num: number) => String(num).padStart(2, '0')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Hero Section with Image and Overlay */}
        <div className="relative h-56 md:h-64 overflow-hidden max-h-[195px]">
          <Image
            src="/images/banner-2-hero.webp"
            alt="Limited time offer"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(106, 105, 105, 0.50) 50%, #070707 100%)',
              opacity: 0.6
            }}
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            {/* Top Row: Badge and Close Button */}
            <div className="flex justify-between items-start">
              <div className="inline-flex items-center gap-2 bg-[#FCD34D] px-3 py-1.5 rounded-full">
                <Zap size={14} className="text-black" />
                <p className="font-['Outfit',sans-serif] font-bold text-black text-xs md:text-sm">
                  Limited-Time Offer
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border-2 border-white bg-white bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 transition-colors"
                aria-label="Close banner"
              >
                <X size={18} className="text-black" />
              </button>
            </div>

            {/* Heading Text */}
            <div className="flex flex-col gap-2">
              <h2 className="font-['Outfit',sans-serif] font-regular text-white text-2xl md:text-2xl leading-tight">
                <span>Get FREE Same Day Funding</span>
                <br />
                <span className="text-[#10B981] font-bold">Sign before 3:00 PM today.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-4 flex flex-col gap-6">
          {/* Subtitle */}
          {/* <p className="font-['Roboto',sans-serif] text-center text-gray-700 text-sm md:text-base leading-relaxed">
            Finish your application today to unlock this exclusive benefit and get your funds instantly.
          </p> */}

          {/* Divider */}
          {/* <div className="h-px bg-gray-200" /> */}

          {/* Time Remaining Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-[#FF8C42]" />
              <p className="font-['Outfit',sans-serif] font-semibold text-gray-900">
                Time remaining today
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <div className="flex flex-col items-center">
                <p className="font-['Outfit',sans-serif] font-bold text-3xl md:text-4xl text-gray-900">
                  {padZero(timeLeft.hours)}
                </p>
                <p className="font-['Roboto',sans-serif] text-gray-400 text-xs md:text-sm mt-1">
                  Hours
                </p>
              </div>

              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="w-1 h-1 rounded-full bg-gray-300" />
              </div>

              <div className="flex flex-col items-center">
                <p className="font-['Outfit',sans-serif] font-bold text-3xl md:text-4xl text-gray-900">
                  {padZero(timeLeft.minutes)}
                </p>
                <p className="font-['Roboto',sans-serif] text-gray-400 text-xs md:text-sm mt-1">
                  Mins
                </p>
              </div>

              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="w-1 h-1 rounded-full bg-gray-300" />
              </div>

              <div className="flex flex-col items-center">
                <p className="font-['Outfit',sans-serif] font-bold text-3xl md:text-4xl text-[#FF8C42]">
                  {padZero(timeLeft.seconds)}
                </p>
                <p className="font-['Roboto',sans-serif] text-[#FF8C42] text-xs md:text-sm mt-1">
                  Secs
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200" />

          {/* Continue Button */}
          <button className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-['Outfit',sans-serif] font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            Continue
            <ChevronRight size={20} />
          </button>

          {/* Footer Text */}
          <p className="text-center font-['Roboto',sans-serif] text-gray-700 text-xs md:text-sm">
            Same Day Funding — <span className="font-semibold">FREE TODAY ONLY</span>
          </p>
        </div>
      </div>
    </div>
  )
}
