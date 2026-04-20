"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"

export default function PortalUnsubscribe1Page() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleKeepSubscribed = () => {
    window.location.href = "https://www.fundo.com"
  }

  const handleUnsubscribe = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/portal-unsubscribe-2")
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] flex flex-col">
      <Header />

      <main className="flex-1 px-4 lg:px-8 py-8 lg:py-12 bg-gray-100">
        <div className="max-w-md mx-auto space-y-8 text-center">
          {/* Illustration */}
          <div className="flex justify-center pt-4">
            <img
              src="/images/sad-email.webp"
              alt="Person holding sad email"
              className="object-contain w-40 h-48"
            />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl lg:text-5xl text-blue-900 font-serif text-balance font-normal">
              Before you unsubscribe...
            </h1>
          </div>

          {/* Warning Box */}
          <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white flex items-start gap-4">
            <span className="text-4xl flex-shrink-0 mt-1">🥺</span>
            <div className="flex-1 text-left">
              <p className="text-gray-900 font-sans text-base leading-relaxed">
                If you unsubscribe, <span className="font-bold">you'll miss funding updates and relevant opportunities</span> from Fundo.
              </p>
            </div>
            <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Secondary Text */}
          <p className="text-gray-700 text-base leading-relaxed font-sans">
            You'll still receive essential account notifications when required.
          </p>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleKeepSubscribed}
              className="w-full py-4 px-6 rounded-full font-medium text-base flex items-center justify-center gap-2 transition-all duration-200 font-serif bg-blue-900 hover:bg-blue-800 active:scale-[0.98] active:bg-blue-900 text-white"
            >
              Keep me subscribed
            </button>
            <button
              onClick={handleUnsubscribe}
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-full font-medium text-base border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-[0.98] transition-all duration-200 font-sans disabled:opacity-50"
            >
              Unsubscribe
            </button>
          </div>
        </div>
      </main>

    </div>
  )
}
