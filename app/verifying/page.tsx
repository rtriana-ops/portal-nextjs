"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Check, X } from "lucide-react"

export default function VerifyingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [visibleBullets, setVisibleBullets] = useState<number[]>([])
  const [showPlaidModal, setShowPlaidModal] = useState(false)
  const [plaidScreen, setPlaidScreen] = useState<"intro" | "confirm">("intro")
  const [isPaidYes, setIsPaidYes] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [allBulletsDone, setAllBulletsDone] = useState(false)

  const flow = searchParams.get("flow")
  const isPlaidFlow = flow === "plaid"

  useEffect(() => {
    if (isPlaidFlow) {
      const plaidDelayTimer = setTimeout(() => {
        setShowPlaidModal(true)
      }, 1500)

      return () => {
        clearTimeout(plaidDelayTimer)
      }
    }

    // Show bullets animation
    const bullet1Timer = setTimeout(() => setVisibleBullets([1]), 0)
    const bullet2Timer = setTimeout(() => setVisibleBullets([1, 2]), 1000)
    const bullet3Timer = setTimeout(() => {
      setVisibleBullets([1, 2, 3])
      setAllBulletsDone(true)
    }, 2000)

    return () => {
      clearTimeout(bullet1Timer)
      clearTimeout(bullet2Timer)
      clearTimeout(bullet3Timer)
    }
  }, [router, isPlaidFlow])

  const handleClosePlaidModal = () => {
    setShowPlaidModal(false)
    setPlaidScreen("intro")
    setIsPaidYes(null)
  }

  const handleContinue = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/first-name")
    }, 300)
  }

  const handleShare = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      handleClosePlaidModal()
      router.push("/transition")
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <main className="px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center space-y-8">
            {/* SVG Illustration */}
            <svg
              className="w-48 h-48"
              viewBox="0 0 384.06 675.9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M179.93,38.32c.46-1.39,1-3.23,1.86-4.4,5.85-7.99,18.03-7.48,24.01-.05,5.94-8.75,16.26-5.48,20.64,3.17l.54,1.05c3.91-2.32,6.65-3.82,11.49-2.76,5.69,1.25,9.95,6.42,8.74,12.38-.2.99-.75,2.17-1.06,3.15,2.34-.28,5.17-.77,7.47-.33,10.53,2.05,13.13,8.71,8.22,17.45,11.5,4.43,14.13,14.78,4.03,22.6,2.65,3.48,5.22,6.46,4.61,11.13-.51,3.9-2.79,6.53-6.2,8.16,4.06,8.07,2.52,11.94-3.74,18.11,1.25,5.16.36,10.32-2.41,14.85-2.79,4.58-7.27,7.89-12.47,9.22-1.62.4-3.3.43-4.97.49-.81,6.94-2.91,17.49-7.25,23.18-.16,9.41-.32,21.02.13,30.33,4.43.55,18.9,4.62,23.75,5.89,25.65,6.93,61.16,16.4,77.38,39.39,26.23,37.17,31.78,92,26.39,136.06-3.44,28.15-14.33,51.91-44.73,56.31l5.94,53.3c.79,6.98,3.2,25.59,3.08,32.26-2.13,1.36-3.41,1.96-5.72,3.03.65,14.17,1.92,28.97,2.75,43.25,1.91,33.43,3.5,66.88,4.75,100.34H89.73c-2.32-30.24-4.2-60.51-5.63-90.8-.46-10.5-.8-21.01-1.04-31.51-.09-4.87.11-12.86-.31-17.43-2.37-1.1-4.77-1.91-6.31-3.97-.7-2.68-.44-12.15-.43-15.38.01-16.84.54-33.67,1.57-50.48.36-6.99.62-17.37,1.63-24.06-15.52-3.28-31.87-8.58-40.53-23.06-16.8-28.08-10.32-80.22-3.89-110.28,6.08-28.43,17.68-63.32,43.21-78.84,21.55-13.09,48.64-18.09,73.46-20.99,4.56-.53,10.41-1.51,14.72-1.81.12-3.7.14-8.62.43-12.2-4.98-2.92-10.49-9.2-13.6-14.06-7.2-11.23-7.15-25.02-6.22-37.82-12.25-3.1-15.23-20.52-5.15-28.71-2.46-2.57-3.39-3.81-5.07-6.92-5.01-9.21-4.61-12.66,3.58-19.17-10.67-7.79-6.36-18.75,5.61-21.57-.83-.98-2.28-2.59-2.72-3.72-4.13-10.53,6.53-19.61,16.56-14.78-.37-3.75-.54-6.4,2.07-9.63,2.08-2.54,5.11-4.1,8.38-4.32,4.28-.33,6.85,1.2,9.88,3.93Z" fill="#010101"/>
              <path d="M202.38,637.5c3.11,12.06,7.42,26.29,9.49,38.39h-13.82c1.19-12.54,2.53-25.92,4.33-38.39Z" fill="#fcfcfa"/>
              <path d="M226.35,423.12c-6.2,2.09-12.65,3.56-18.99,5.17-17.02,4.3-34.54,7.98-51.92,10.53-28.98,4.26-80.26,8.97-104.93-9.59-11.87-8.93-16.96-22.7-18.98-36.97-5.73-40.49,4.58-111.45,29.83-144.55,20.62-27.03,59.62-32.8,91.07-37.03,4.13,16.43,12.95,30.06,22.41,43.77,5.85-5.75,12.97-13.72,19.63-18.53,7.29,7.32,13.15,12.87,19.83,20.97,1.73-1.49,5.41-5.32,7.03-7.04,10.37-10.98,22.98-23.95,29.52-37.55,19.76,4.2,50.1,13.89,66.83,25.2,23.33,15.77,34.83,49.88,39.56,76.99,5.32,33.75,8.4,79.5-10.5,109.47-13.75,21.79-41.71,20.1-63.76,15.32-44.42-9.62-90.35-30.61-127.22-57.23-.05-10.14,2.02-22.18,7.71-30.74,5.07-1.09,13.46-1.71,18.72-2.02,29.11-1.74,60.3-1.24,89.33,1.17,7.26.61,14.52,1.32,21.76,2.12,2.42.26,10.43,1.32,12.25,1.03v-.43c-1.4-1.03-2.56-1.11-4.27-1.47,3.16-1.1,15-4.74,10.12-10.33-.55-.63-.68-.64-.85-1.41,4.29-6.2.05-6.07-3.76-8.45-.24-2.92-.67-5.26-3.77-6.19-6.83-2.05-14.96,1.09-20.94,3.96,1.03-5.05,2.74-10.1,2.78-15.22-2.3,3.97-3.8,11.12-4.63,15.72-10.09,7.39-11.67,7.39-19.66,17.94-22.08-.76-43.96-1.85-66.1-.92-8.43.35-16.7.89-25.1,1.67-1.59-.18-6.54,1.75-7.56,1.55-19.75-3.87-29.27-9.12-49.34-.51.28-3.29,1.78-21.2.17-23.13-1.02,1.71-1.61,20.12-1.77,23.72-3.28,2.88-4.85,4.53-7.52,7.98-.84.77-.53.3-.78,1.56,3.85,1.11,9.3,3.15,13.19,4.52,8.27,2.85,16.49,5.87,24.64,9.05,4.65,1.86,9.12,3.97,13.76,5.88-.05,1.43-.18,2.03.27,3.35,2.29,2.68,8.03,6.24,11.13,8.29,19.21,12.67,39.57,23.49,60.81,32.34Z" fill="#fcfcfa"/>
              <path d="M102.55,359.67c-1.57-.53-2.78-.69-3.73-1.97l.24-.53c1.38-.35,2.87.42,4.27.93-.84.77-.53.3-.78,1.56Z" fill="#010101"/>
              <path d="M228.16,424.35c.62-.09,23.82,8.48,27.01,9.42,19.05,5.65,39.28,11.25,59.33,10.1,1.44,12.11,2.8,24.23,4.08,36.35,1.86,16.03,3.53,32.08,5.03,48.14-8.67,4.05-22.9,7.97-32.44,10.24-36.71,8.73-80.44,17.47-118.21,16.06-24.98-.56-57.16-7.4-80.54-16.35-4.21-1.61-11.07-4.44-14.56-6.99-.24-21.16.24-42.32,1.43-63.44.44-7.98.77-17.66,1.65-25.47,8.11.85,16.67,1.76,24.83,1.79,39.57.13,84.53-8.28,122.39-19.86Z" fill="#fcfcfa"/>
              <path d="M177.49,72.3c10.02,10.53,22.52,10.9,34.19,2.84,5.55,6.88,12.63,5.58,19.65,2.04-.82,8.73,3.53,8.05,8.16,11.54,4.19,3.15-9.86,9.34,1.59,20.56-6.47,15.79-2.65,39.51-18.91,51.16-1.25.89-2.98,2.11-4.46,2.48-1.38-.31-.94-.21-2.07-1.51-8.09-8.73-17.71-10.88-29.02-12.72-11.56-1.88-19.03,1.75-28.22,8.77-.39-.39-.76-.79-1.12-1.2-10.22-11.66-8.04-19.29-7.42-33.91.64-14.83.22-37.75,12.37-48.46,6.33,3.37,9.73,2.57,15.26-1.6Z" fill="#fcfcfa"/>
              <path d="M205.29,99.12c3.83.81,21.46,7.8,21.58,11.84-.95.88-.4.62-1.72.76-3.6-.26-30.4-6.53-19.86-12.59Z" fill="#010101"/>
              <path d="M176.48,98.23c1.35-.11,2.67-.14,3.79.6.73,1.23.59.59.5,1.96-1.34,2.05-3.92,2.81-6.22,3.25-4.91.94-9.63,2-14.47,3.28-1.17.38-1.24.42-2.52.54-1.28-.75-.77-.26-1.55-1.59-.17-5.93,16.24-7.59,20.47-8.04Z" fill="#010101"/>
              <path d="M187.29,111.72c3.64,2.67-6.27,24.39-4.54,28.98.69,1.83,1.56,2.65,3.24,3.52,1.3.17,1.62-.05,2.93-.5l.43-.15.21.56-.54,1.18c-4.66,2.69-9.21-3.42-8.78-6.48,1.2-8.57,4.65-18.8,7.06-27.12Z" fill="#010101"/>
              <path d="M209.38,116.26c5.81.96,4.88,9.66.47,12.41-6.22-1.12-4.37-9.14-.47-12.41Z" fill="#010101"/>
              <path d="M170.12,113.73c6.26.12,4.87,8.31,1.78,11.84-6.42.81-4.71-8.27-1.78-11.84Z" fill="#010101"/>
              <path d="M230.98,179.49c.34.47.43,1.07.43,1.64-.05,10.28-.16,19.41.68,29.7-6.47,7.59-27.96,19.45-37.64,23.33-7.39-4.8-14.22-9.36-20.79-15.25-2.26-2.18-3.44-3.54-5.32-6.03-.3-5.45.28-10.74.06-16.24l.51-.29c2.42.19,1.76,3.42,1.66,5.38-.24,4.82,7.3,5.31,10.67,4.87,19.03-2.47,37.39-12.44,49.74-27.12Z" fill="#fcfcfa"/>
              <path d="M131.9,346.41c8.77.11,20.22,3.35,28.99,5.49-4.45,8.87-6.1,15.21-6.6,25.16-3.11-.86-11.08-4.44-14.47-5.84-11.12-4.61-23.17-8.59-34.56-12.49,6.01-8.75,16.53-11.64,26.64-12.32Z" fill="#fcfcfa"/>
              <path d="M234.83,208.31c2.57.14,11.24,2.73,14.22,3.56-7.8,14.02-22.91,31.23-34.63,42.49-.59-.65-1.16-1.44-1.7-2.14-3.64-4.75-11.63-13.02-16.38-16.65,12.06-6.06,26.68-12.75,36.45-22.49,1.34-1.34,1.76-2.93,2.04-4.77Z" fill="#fcfcfa"/>
              <path d="M163.26,209.21c.9-.09.93-.16,1.75.15.63,1.74,2.47,6.15,3.65,7.44,6.05,6.66,16.07,13.83,23.71,18.23-4.42,3.62-8.66,7.44-12.72,11.46-1.7,1.71-3.16,3.32-4.76,5.12-1.27-2.63-5.47-8.75-7.2-11.61-5.84-9.68-10.3-18.26-13.48-29.14l9.04-1.65Z" fill="#fcfcfa"/>
              <path d="M181.47,156.97c.65-.02,1.3-.03,1.94-.03,5.54,0,21.91,1.91,21.32,9.87-.24,3.22-2.9,6.87-5.36,8.81-2.42,1.92-2.93,1.98-5.88,1.7-6.82-1.7-11.51-3.1-18.6-2.94-2.42-2.33-5.01-4.24-5.63-7.76-1.33-7.57,6.96-8.84,12.21-9.65Z" fill="#fcfcfa"/>
              <path d="M198.92,160.69c.39.39.22.17.25.98-1.57,2.48-5.07,3.84-7.81,4.56-6.47,1.68-10.99-.37-16.31-3.51-.48-.59-.33-.39-.61-1.13l.33-.31c3.88.83,5.75,3.2,10.96,3.43,4.88.22,9.4-.8,13.19-4.02Z" fill="#010101"/>
              <path d="M250.36,123.54c2.9.13,3.79.75,6.26,2.15,5.7,8.96-.32,18.78-8.41,23.54-1.97.73-5.36,1.89-7.15.44-1.26-4.12,3.59-18.33,5.77-22.59.92-1.8,1.81-2.58,3.53-3.55Z" fill="#fcfcfa"/>
              <path d="M297.57,326.51c2.59-.22,6.71.32,7.94,2.91-.98,2.59-4.88,2.55-7.58,3.06-11.18,2.1-19.82,7.94-27.58,16.04-2.75.03-5.18-.3-7.9-.61,9.54-11.14,20.02-19.91,35.11-21.4Z" fill="#fcfcfa"/>
              <path d="M303.57,333.32c8-1.4,9.55,5.97,2.93,6.21-12.18.45-15.91,4.14-25.39,10.13-2.85-.21-5.69-.48-8.53-.81,9.45-10.34,17.79-13.47,30.99-15.53Z" fill="#fcfcfa"/>
              <path d="M145.5,115.97c.53.19.66.28,1.15.54.88,2.11.39,21.19.25,24.8-2.05-1.17-2.72-1.63-4.54-3.11-6.57-6.42-6.97-19.76,3.14-22.22Z" fill="#fcfcfa"/>
              <path d="M304.73,341.23c2.05-.22,3.54-.27,5.39.65,3.69,4.65-10.07,9.04-13.38,9.04-2.16,0-4.06-.08-6.19-.25l-7.2-.76c7.76-5.52,11.99-7.33,21.38-8.67Z" fill="#fcfcfa"/>
            </svg>

            {/* Title with static dots */}
            <h1 className="text-2xl text-black text-center font-bold font-serif">
              Checking your information...
              <span className="inline-flex gap-1 ml-2">
                <span>{""}</span>
                <span>{""}</span>
                <span>{""}</span>
              </span>
            </h1>

            {/* Status list */}
            <div className="w-full space-y-4">
              {/* Bullet 1 - Completed (Green) */}
              <div
                className={`flex items-center gap-3 transition-all duration-[2000ms] ${
                  visibleBullets.includes(1)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  animation: visibleBullets.includes(1)
                    ? "fade-in-slow 1s ease-in-out forwards"
                    : "none",
                }}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <p className="text-gray-900 text-base font-sans font-normal">Checking if you already have an account</p>
              </div>

              {/* Bullet 2 - Completed (Light green) */}
              <div
                className={`flex items-center gap-3 transition-all duration-[2000ms] ${
                  visibleBullets.includes(2)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  animation: visibleBullets.includes(2)
                    ? "fade-in-slow 1s ease-in-out forwards"
                    : "none",
                }}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <p className="text-gray-900 text-base">Seeing if you can skip some steps</p>
              </div>

              {/* Bullet 3 - In progress (Pulsing green dot) */}
              <div
                className={`flex items-center gap-3 transition-all duration-[2000ms] ${
                  visibleBullets.includes(3)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  animation: visibleBullets.includes(3)
                    ? "fade-in-slow 1s ease-in-out forwards"
                    : "none",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"
                  style={{
                    animation: visibleBullets.includes(3)
                      ? "pulse-scale 2s ease-in-out 1s infinite"
                      : "none",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <p className="text-slate-950 font-bold font-sans text-lg">Preparing your next step</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showPlaidModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom duration-300 sm:animate-in sm:zoom-in-95">
            {/* Close button */}
            <button
              onClick={handleClosePlaidModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* First Screen - Intro */}
            {plaidScreen === "intro" && (
              <div className="p-6 pb-8 space-y-6">
                {/* Plaid Logo */}
                <div className="flex justify-center pt-4">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect x="4" y="4" width="6" height="6" fill="white" />
                      <rect x="12" y="4" width="6" height="6" fill="white" />
                      <rect x="20" y="4" width="6" height="6" fill="white" />
                      <rect x="28" y="4" width="6" height="6" fill="white" />
                      <rect x="4" y="12" width="6" height="6" fill="white" />
                      <rect x="12" y="12" width="6" height="6" fill="white" />
                      <rect x="20" y="12" width="6" height="6" fill="white" />
                      <rect x="28" y="12" width="6" height="6" fill="white" />
                      <rect x="4" y="20" width="6" height="6" fill="white" />
                      <rect x="12" y="20" width="6" height="6" fill="white" />
                      <rect x="20" y="20" width="6" height="6" fill="white" />
                      <rect x="28" y="20" width="6" height="6" fill="white" />
                      <rect x="4" y="28" width="6" height="6" fill="white" />
                      <rect x="12" y="28" width="6" height="6" fill="white" />
                      <rect x="20" y="28" width="6" height="6" fill="white" />
                      <rect x="28" y="28" width="6" height="6" fill="white" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-900">
                  You&apos;re eligible to
                  <br />
                  <span className="font-bold">Skip the forms</span>
                </h2>

                {/* Features */}
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      All your info pre-filled instantly using your Plaid account
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      You&apos;ll review every detail before sharing
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">Secured with bank-grade encryption</p>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => setPlaidScreen("confirm")}
                  className="w-full py-4 px-6 rounded-full font-semibold text-base bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Continue
                </button>

                {/* Terms */}
                <p className="text-xs text-center text-gray-500 leading-relaxed">
                  By continuing, you agree to Plaid&apos;s{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Terms
                  </a>
                  .
                </p>
              </div>
            )}

            {/* Second Screen - Confirm Details */}
            {plaidScreen === "confirm" && (
              <div className="p-6 pb-8 space-y-6">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 pt-4">Confirm the details you want to share</h2>

                {/* Details List */}
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">Name</p>
                      <p className="text-gray-900">Leslie Knope</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>

                  {/* Birthday */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">Birthday</p>
                      <p className="text-gray-900">mayo 29, 1990</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>

                  {/* Address */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">Address</p>
                      <p className="text-gray-900 text-sm">
                        123 Main St PO Box 456
                        <br />
                        Pawnee, IN 46001
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>

                  {/* SSN */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">SSN</p>
                      <p className="text-gray-900">***-**-1111</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bank Account */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-medium mb-1">Bank Account</p>
                        <p className="text-gray-900 font-medium">Gingham Bank</p>
                        <p className="text-sm text-gray-600">All accounts selected</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Question */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Is this where you <span className="font-medium">get paid?</span>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsPaidYes(false)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                        isPaidYes === false
                          ? "bg-white text-gray-900 border-2 border-gray-900"
                          : "bg-white text-gray-700 border border-gray-300"
                      }`}
                    >
                      No
                    </button>
                    <button
                      onClick={() => setIsPaidYes(true)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                        isPaidYes === true
                          ? "bg-black text-white border-2 border-black"
                          : "bg-black text-white border border-black"
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-center text-gray-500 leading-relaxed">
                  By sharing you agree that you are providing current information.
                </p>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-base bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Sharing...</span>
                    </>
                  ) : (
                    "Share"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
