"use client"

import type React from "react"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { InputField } from "@/components/input-field"
import { CTAButton } from "@/components/cta-button"
import { TermsModal } from "@/components/terms-modal"
import { PrivacyPolicyModal } from "@/components/privacy-policy-modal"
import { MessagingTermsModal } from "@/components/messaging-terms-modal"
import { EsignModal } from "@/components/esign-modal"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function AddNumberPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [accountCallsConsent, setAccountCallsConsent] = useState(true)
  const [promotionalConsent, setPromotionalConsent] = useState(true)
  const [error, setError] = useState("")
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false)
  const [isMessagingTermsModalOpen, setIsMessagingTermsModalOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
  const [isEsignModalOpen, setIsEsignModalOpen] = useState(false)
  const [isNestedPrivacyPolicyOpen, setIsNestedPrivacyPolicyOpen] = useState(false)
  const [isNestedEsignOpen, setIsNestedEsignOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10)
    if (cleaned.length === 0) return ""
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const numericOnly = input.replace(/[^\d\s]/g, "")
    setPhoneNumber(formatPhoneNumber(numericOnly))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (phoneNumber.replace(/\D/g, "").length < 10) {
      return
    }

    if (!accountCallsConsent) {
      setError("You must agree to receive account-related calls and texts to continue.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/first-name")
    }, 300)
  }

  const handlePrivacyPolicyClick = () => {
    setIsPrivacyPolicyModalOpen(true)
  }

  const handleTermsClick = () => {
    setIsTermsModalOpen(true)
  }

  const handleMessagingTermsClick = () => {
    setIsMessagingTermsModalOpen(true)
  }

  const handleEsignClick = () => {
    setIsEsignModalOpen(true)
  }

  const handleNestedPrivacyPolicyOpen = () => {
    setIsNestedPrivacyPolicyOpen(true)
  }

  const handleNestedEsignOpen = () => {
    setIsNestedEsignOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={30} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif text-blue-900 mb-3 font-normal">
              <b className="font-serif text-blue-900">Add your mobile number!</b>
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              This helps us verify your identity and protect your information.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <InputField
              ref={inputRef}
              label="Mobile Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />

            <CTAButton type="submit" disabled={phoneNumber.replace(/\D/g, "").length < 10} isLoading={isSubmitting}>
              Continue
            </CTAButton>

            <div className="space-y-4">
              {/* First checkbox - Required */}
              <div className="space-y-2">
                <label className="flex items-start cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    checked={accountCallsConsent}
                    onChange={(e) => {
                      setAccountCallsConsent(e.target.checked)
                      if (error) setError("")
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                  />
                  <span className="leading-relaxed text-gray-500 font-sans text-xs">
                    I agree to receive account-related calls and texts from Fundo at this number, including automated
                    messages.
                  </span>
                </label>
                <div className="ml-6 leading-4">
                  <button
                    type="button"
                    onClick={() => setIsLearnMoreOpen(!isLearnMoreOpen)}
                    className="text-cyan-500 hover:underline text-xs font-sans leading-4 flex items-center gap-1"
                  >
                    Learn more
                    {isLearnMoreOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                  {isLearnMoreOpen && (
                    <div className="mt-2 text-xs text-gray-500 leading-relaxed space-y-2">
                      <p>
                        Fundo LLC and its representatives, affiliates, third-party partners, or agents may contact you
                        via phone call (including automated dialers) or text message at the number provided.
                      </p>
                      <p>
                        This includes calls to wireless numbers which may result in charges to you. This consent remains
                        valid even if the provided number is listed on any Do-Not-Call registry.
                      </p>
                      <p>
                        You can opt out of receiving specific communications from Fundo LLC as outlined in the{" "}
                        <button
                          type="button"
                          onClick={handleMessagingTermsClick}
                          className="text-cyan-500 hover:underline"
                        >
                          Messaging Terms
                        </button>
                        ,{" "}
                        <button
                          type="button"
                          onClick={handlePrivacyPolicyClick}
                          className="text-cyan-500 hover:underline"
                        >
                          Privacy Policy
                        </button>
                        , and{" "}
                        <button type="button" onClick={handleEsignClick} className="text-cyan-500 hover:underline">
                          ESIGN
                        </button>
                        .
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Second checkbox - Optional */}
              <div className="space-y-2">
                <label className="flex items-start cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    checked={promotionalConsent}
                    onChange={(e) => setPromotionalConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                  />
                  <span className="leading-relaxed font-sans text-xs text-gray-500">
                    Send me promotional offers via text
                  </span>
                </label>
                <p className="text-xs text-gray-500 ml-7 leading-relaxed font-sans">
                  * Message and data rates may apply. Message frequency varies. Reply STOP to opt-out anytime. See our{" "}
                  <button type="button" onClick={handleMessagingTermsClick} className="text-cyan-500 hover:underline">
                    Messaging Terms
                  </button>
                  .
                </p>
              </div>

              {/* Error message */}
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </form>
        </div>
      </main>

      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyPolicyModalOpen} onClose={() => setIsPrivacyPolicyModalOpen(false)} />
      <MessagingTermsModal
        isOpen={isMessagingTermsModalOpen}
        onClose={() => setIsMessagingTermsModalOpen(false)}
        onOpenPrivacyPolicy={handleNestedPrivacyPolicyOpen}
        onOpenEsign={handleNestedEsignOpen}
      />
      <EsignModal isOpen={isEsignModalOpen} onClose={() => setIsEsignModalOpen(false)} />

      <PrivacyPolicyModal
        isOpen={isNestedPrivacyPolicyOpen}
        onClose={() => setIsNestedPrivacyPolicyOpen(false)}
        isNested={true}
      />
      <EsignModal isOpen={isNestedEsignOpen} onClose={() => setIsNestedEsignOpen(false)} isNested={true} />
    </div>
  )
}
