"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { X } from "lucide-react"

export default function PlaidConnectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPlaidModal, setShowPlaidModal] = useState(false)
  const [plaidScreen, setPlaidScreen] = useState<"intro" | "confirm">("intro")
  const [isPaidYes, setIsPaidYes] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContinueWithPlaid = () => {
    setShowPlaidModal(true)
    setPlaidScreen("intro")
  }

  const handleClosePlaidModal = () => {
    setShowPlaidModal(false)
    setPlaidScreen("intro")
    setIsPaidYes(null)
  }

  const handleShare = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      handleClosePlaidModal()
      const currentFlow = searchParams.get("flow")
      if (currentFlow === "deny-plaid") {
        router.push("/deny?flow=deny-plaid")
      } else {
        router.push("/transition")
      }
    }, 300)
  }

  const handleContinueWithoutPlaid = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/")
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] flex flex-col animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full space-y-8 text-center">
          {/* Illustration */}
          <div className="relative w-full h-[130px] max-w-[163px] mx-auto">
            <Image
              src="/images/plaid-intro.svg"
              alt="Secure bank connection illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl lg:text-4xl font-bold text-brand font-serif leading-tight">
            Good news! You qualify for a faster application
          </h1>

          {/* Benefits List */}
          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-green-600 flex items-center justify-center flex-shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M20 16v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
                  <polyline points="12.5 2.5 12.5 11.5 21.5 11.5" />
                </svg>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">Securely connect your bank using Plaid</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center flex-shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-800"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">Faster application with fewer steps</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 pt-4">
            <button
              onClick={handleContinueWithPlaid}
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-full font-medium text-base flex items-center justify-center gap-2 transition-all duration-200 text-white font-serif bg-blue-900 hover:bg-blue-800 active:scale-[0.98] active:bg-blue-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Continue with Plaid</span>
                </>
              ) : (
                <>
                  Continue with Plaid
                  <Image src="/icons/arrow-right.png" alt="" width={20} height={20} className="mt-0.5" />
                </>
              )}
            </button>

            <button
              onClick={handleContinueWithoutPlaid}
              disabled={isSubmitting}
              className="text-accent underline hover:no-underline font-sans text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue without Plaid
            </button>
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
                  className="w-full py-4 px-6 rounded-xl font-semibold text-base bg-black text-white hover:bg-gray-800 transition-colors"
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
                  className="w-full py-4 px-6 rounded-xl font-semibold text-base bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Share</span>
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
