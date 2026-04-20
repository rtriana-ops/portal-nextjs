'use client'

import { Header } from '@/components/header'
import { CTAButton } from '@/components/cta-button'
import { Shield, MessageSquare, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ResellingWaOCStep7Page() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const isValid = selectedOption !== null

  const handleContinue = () => {
    if (isValid) {
      setIsSubmitting(true)
      setTimeout(() => {
        if (selectedOption === 'bank') {
          router.push('/reselling-WaOC-step-3')
        } else if (selectedOption === 'options') {
          router.push('/transition')
        }
      }, 300)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <main className="px-4 py-8 lg:py-12">
        <div className="max-w-md mx-auto space-y-8">
          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '30%' }} />
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#05055c] leading-tight font-serif">
              We're unable to approve this request right now.
            </h1>
            <p className="text-base text-gray-600 font-sans">
              We've reviewed your application and can't move forward at this time.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {/* Option 1: Another Bank Account */}
            <button
              onClick={() => setSelectedOption('bank')}
              className={`w-full border-2 rounded-3xl p-6 bg-white cursor-pointer transition-all shadow-sm text-left ${
                selectedOption === 'bank' ? 'border-purple-500' : 'border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold font-serif text-2xl text-slate-950 leading-tight">
                  Have another bank account?
                </h3>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption === 'bank' ? 'border-purple-500 bg-purple-500' : 'border-gray-400'
                  }`}
                >
                  {selectedOption === 'bank' && <div className="w-3 h-3 rounded-full bg-white" />}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <img src="/images/bank.svg" alt="Bank" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-700 font-sans">
                  You can connect a different account to retry verification.
                </p>
              </div>
            </button>

            {/* Option 2: Looking for Other Options */}
            <button
              onClick={() => setSelectedOption('options')}
              className={`w-full border-2 rounded-3xl p-6 bg-white cursor-pointer transition-all shadow-sm text-left ${
                selectedOption === 'options' ? 'border-purple-500' : 'border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold font-serif text-2xl text-slate-950 leading-tight">
                  Looking for other options?
                </h3>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption === 'options' ? 'border-purple-500 bg-purple-500' : 'border-gray-400'
                  }`}
                >
                  {selectedOption === 'options' && <div className="w-3 h-3 rounded-full bg-white" />}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <img src="/images/experiment.svg" alt="Experiment" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-700 font-sans">
                  Explore alternative funding options through our partners.
                </p>
              </div>
            </button>
          </div>

          {/* Continue Button */}
          <CTAButton onClick={handleContinue} disabled={!isValid || isSubmitting}>
            Continue
          </CTAButton>

          {/* Qualification Alert */}
          {showAlert && (
            <div className="bg-blue-200 border border-blue-300 rounded-2xl p-6 relative">
              <button
                type="button"
                onClick={() => setShowAlert(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex gap-3 pr-8">
                <Shield className="w-6 h-6 flex-shrink-0 mt-0.5 text-slate-900" />
                <div>
                  <h3 className="font-bold text-base mb-1 font-serif text-slate-900">You may still qualify!</h3>
                  <p className="text-sm font-sans text-slate-900 leading-relaxed">
                    If you're self-employed, a 1099 contractor, or a business owner, we may have other options for you.
                  </p>
                  <p className="text-sm font-sans text-slate-900 mt-2">
                    Contact us to learn more.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Box */}
          <div className="p-5 bg-white border-2 border-gray-300 rounded-2xl">
            <div className="space-y-2 text-left">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-6 h-6 text-gray-800 flex-shrink-0 mt-0.5" />
                <h3 className="text-lg font-bold text-gray-900 font-sans">Have Questions?</h3>
              </div>
              <div className="space-y-1 pl-9">
                <p className="text-sm text-gray-900 font-sans">support@fundo.com</p>
                <p className="text-sm text-gray-900 font-sans">1-866-393-8636 (9am and 5:00 EST)</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
