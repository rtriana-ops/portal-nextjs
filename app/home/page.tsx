"use client"

import { useState, useEffect, type FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { InputField } from "@/components/input-field"
import { CTAButton } from "@/components/cta-button"
import { FeatureList } from "@/components/feature-list"
import { HeroImage } from "@/components/hero-image"
import { TermsModal } from "@/components/terms-modal"
import { PrivacyPolicyModal } from "@/components/privacy-policy-modal"
import { MessagingTermsModal } from "@/components/messaging-terms-modal"
import { TestimonialSlider } from "@/components/testimonial-slider"
import { DriverImage } from "@/components/driver-image"
import { MobileFeatureBlocks } from "@/components/mobile-feature-blocks"

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false)
  const [isMessagingTermsModalOpen, setIsMessagingTermsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [flow, setFlow] = useState<
    "original" | "plaid" | "portal-email" | "portal-phone" | "deny-email" | "deny-plaid"
  >("original")

  const handlePrivacyPolicyClick = () => {
    setIsPrivacyPolicyModalOpen(true)
  }

  const handleTermsClick = () => {
    setIsTermsModalOpen(true)
  }

  const handleMessagingTermsClick = () => {
    setIsMessagingTermsModalOpen(true)
  }

  useEffect(() => {
    const flowParam = searchParams.get("flow")
    if (
      flowParam === "plaid" ||
      flowParam === "portal-email" ||
      flowParam === "portal-phone" ||
      flowParam === "deny-email" ||
      flowParam === "deny-plaid"
    ) {
      setFlow(flowParam as "plaid" | "portal-email" | "portal-phone" | "deny-email" | "deny-plaid")
    }
  }, [searchParams])

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("This email looks incorrect. Check it and try again.")
      return
    }

    if (!validateEmail(email)) {
      setError("This email looks incorrect. Check it and try again.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/add-number")
    }, 300)
  }

  const toggleFlow = () => {
    const flows: Array<"original" | "plaid" | "portal-email" | "portal-phone" | "deny-email" | "deny-plaid"> = [
      "original",
      "plaid",
      "portal-email",
      "portal-phone",
      "deny-email",
      "deny-plaid",
    ]
    const currentIndex = flows.indexOf(flow)
    const newFlow = flows[(currentIndex + 1) % flows.length]
    setFlow(newFlow)
    router.push(`/home?flow=${newFlow}`)
  }

  const getFlowLabel = () => {
    switch (flow) {
      case "original":
        return "Original (Verify → Names)"
      case "plaid":
        return "Plaid Integration"
      case "portal-email":
        return "Portal (After Email)"
      case "portal-phone":
        return "Portal (After Phone)"
      case "deny-email":
        return "Deny (After Email)"
      case "deny-plaid":
        return "Deny (After Plaid)"
    }
  }

  return (
    <div className="bg-slate-50 animate-in fade-in slide-in-from-right-2 duration-300">
      <div className="px-4 lg:px-8 pt-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={toggleFlow}
            className="hidden lg:block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Flow: {getFlowLabel()} - Click to Switch
          </button>
        </div>
      </div>

      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={20} />
        </div>
      </div>

      <main className="px-4 lg:px-8 pt-6 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-5">
              <h1 className="text-4xl lg:text-5xl font-serif leading-tight text-blue-900 font-normal">
                <b>Fuel your business growth</b> with the support you need.
              </h1>

              <FeatureList />

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <InputField
                  label="Email"
                  type="email"
                  placeholder="you@mymail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError("")
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  error={error}
                />

                <CTAButton type="submit" disabled={!email} isLoading={isSubmitting}>
                  Get Your Advance
                </CTAButton>

                <div className="space-y-1 text-sm text-gray-600">
                  <p className="text-xs leading-relaxed text-center font-sans text-gray-500">
                    By continuing, you agree to our{" "}
                    <button type="button" onClick={handlePrivacyPolicyClick} className="text-cyan-500 hover:underline">
                      Privacy Policy
                    </button>
                    ,{" "}
                    <button type="button" onClick={handleTermsClick} className="text-cyan-500 hover:underline">
                      Terms & Conditions
                    </button>
                    , and consent to receive offers and updates from Fundo via email.
                  </p>

                  <p className="text-xs text-gray-500 leading-relaxed text-center font-sans">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column - Hero Image */}
            <div className="lg:pl-0">
              <HeroImage />
            </div>
          </div>

          <div className="lg:hidden space-y-6 mt-12 pb-12">
            <TestimonialSlider />
            <DriverImage />
            <MobileFeatureBlocks />
          </div>
        </div>
      </main>

      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyPolicyModalOpen} onClose={() => setIsPrivacyPolicyModalOpen(false)} />
      <MessagingTermsModal isOpen={isMessagingTermsModalOpen} onClose={() => setIsMessagingTermsModalOpen(false)} />
    </div>
  )
}
