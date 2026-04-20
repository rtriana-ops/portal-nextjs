'use client'

import { useState, useEffect } from 'react'
import { X, Clock, Zap } from 'lucide-react'

interface Banner1Props {
  onClose: () => void
}

export function Banner1({ onClose }: Banner1Props) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 10,
    minutes: 9,
    seconds: 45,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const padZero = (num: number) => String(num).padStart(2, '0')

  const backgroundImage = isMobile
    ? 'url(/images/banner-1-person-mobile.png)'
    : 'url(/images/banner-1-person-desktop.png)'

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div
        className="w-full max-w-md px-4 py-4 md:py-4 max-h-[200px]"
        style={{
          backgroundImage: `${backgroundImage}, linear-gradient(to right, #5BE4CF, #72F5E0)`,
          backgroundSize: 'contain, cover',
          backgroundPosition: 'right, 0 0',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex items-start gap-3 md:gap-3">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-2 md:gap-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-3 md:px-4 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(to right, #038D5B, #0369A1)' }}>
              <Zap size={14} className="text-white" />
              <p className="font-['Roboto',sans-serif] font-medium leading-[14px] text-white text-[11px] md:text-[12px] tracking-[-0.3px]">
                Limited-Time Offer
              </p>
            </div>

            {/* Main Text */}
            <h2 className="font-['Outfit',sans-serif] font-bold leading-[1.2] text-[#0f172a] text-[18px] md:text-[20px] tracking-[-0.5px]">
              <span className="text-[18px] text-[#115E59] font-semibold">Get FREE Same Day Funding</span>
              <br />
              <span className="text-[18px] text-[#172554] font-normal">Sign before 3:00 PM today. </span>
            </h2>

            {/* Subtitle */}
            <p className="font-['Roboto',sans-serif] font-normal leading-[16px] text-[#0f172a] text-[12px] md:text-[13px] tracking-[-0.3px]">
              Available until 3:00 PM today
            </p>

            {/* Countdown */}
            <div className="flex items-center gap-3 md:gap-4 pt-1">
              <Clock size={18} className="text-[#0f172a] flex-shrink-0" />
              <div className="flex gap-4 md:gap-6">
                <div className="flex flex-col items-center gap-0.5">
                  <p className="font-['Roboto',sans-serif] font-bold leading-[24px] text-[#0f172a] text-[20px] md:text-[24px] tracking-[-0.5px]">
                    {padZero(timeLeft.hours)}
                  </p>
                  <p className="font-['Roboto',sans-serif] font-normal leading-[12px] text-[#0f172a] text-[10px] md:text-[11px] tracking-[-0.3px]">
                    hrs
                  </p>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <p className="font-['Roboto',sans-serif] font-bold leading-[24px] text-[#0f172a] text-[20px] md:text-[24px] tracking-[-0.5px]">
                    {padZero(timeLeft.minutes)}
                  </p>
                  <p className="font-['Roboto',sans-serif] font-normal leading-[12px] text-[#0f172a] text-[10px] md:text-[11px] tracking-[-0.3px]">
                    min
                  </p>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <p className="font['Roboto',sans-serif] font-bold leading-[24px] text-[#0f172a] text-[20px] md:text-[24px] tracking-[-0.5px]">
                    {padZero(timeLeft.seconds)}
                  </p>
                  <p className="font-['Roboto',sans-serif] font-normal leading-[12px] text-[#0f172a] text-[10px] md:text-[11px] tracking-[-0.3px]">
                    sec
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white bg-transparent flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
            aria-label="Close banner"
          >
            <X size={14} className="text-white md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div >
  )
}
