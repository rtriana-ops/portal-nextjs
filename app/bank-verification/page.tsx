'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { CTAButton } from '@/components/cta-button'
import { SecurityInfoCards } from '@/components/security-info-cards'
import { BankRequirementsCard } from '@/components/bank-requirements-card'

export default function BankVerificationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true)
  const [showLayerMockup, setShowLayerMockup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0)
    }
  }, [isLoading])

  const handleSubmit = () => {
    setShowLayerMockup(true)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={60} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif text-blue-900">Securely verify your bank</h1>
            <p className="text-muted-foreground text-base">We use a secure connection to verify your eligibility faster.</p>
          </div>

          <SecurityInfoCards />

          <BankRequirementsCard onCheckChange={setIsCheckboxChecked} />

          <CTAButton onClick={handleSubmit} disabled={isSubmitting || !isCheckboxChecked}>
            Securely Verify my Bank
          </CTAButton>
        </div>
      </main>

      {/* Layer Mockup Modal */}
      {showLayerMockup && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/50">
          <div className="w-full lg:w-[540px] bg-white rounded-t-3xl lg:rounded-3xl p-8 max-h-[90vh] overflow-y-auto lg:max-h-[80vh]">
            {/* Close Button */}
            <button
              onClick={() => setShowLayerMockup(false)}
              className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-900" />
            </button>

            {/* Content */}
            <div className="max-w-md mx-auto text-center pt-4 space-y-2.5">
              {/* Title */}
              <h2 className="font-bold text-gray-900 text-lg">
                Fundo uses <span className="font-black">Plaid</span> to connect your account
              </h2>

              {/* Prototype Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 px-2 py-2">
                <p className="text-xs text-blue-800">
                  Note: This prototype only shows the first Plaid screen. Clicking Continue moves the user forward as if the Plaid flow were completed.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {/* Benefit 1 */}
                <div className="bg-gray-50 p-6 rounded-2xl text-left px-2.5 py-2.5">
                  <div className="flex gap-3 mb-2">
                    <span className="text-2xl">⚡</span>
                    <h3 className="font-bold text-gray-900">Connect in seconds</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    8000+ apps trust Plaid to quickly connect to financial institutions
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="bg-gray-50 p-6 rounded-2xl text-left px-2.5 py-2.5">
                  <div className="flex gap-3 mb-2">
                    <span className="text-2xl">🛡️</span>
                    <h3 className="font-bold text-gray-900">Keep your data safe</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Plaid uses best-in-class encryption to help protect your data
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-sm text-gray-600 border-t pt-6">
                By continuing, you agree to Plaid's{" "}
                <a href="#" className="underline text-gray-900 hover:text-gray-700">
                  Privacy Policy
                </a>{" "}
                and to receiving updates on plaid.com
              </div>

              {/* Continue Button */}
              <button
                onClick={() => {
                  setShowLayerMockup(false)
                  setIsSubmitting(true)
                  setTimeout(() => {
                    router.push("/loader-calculation")
                  }, 300)
                }}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
