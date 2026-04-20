'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { CTAButton } from '@/components/cta-button'
import { Zap, CheckCircle, X } from 'lucide-react'

export default function DocumentsVerificationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLayerMockup, setShowLayerMockup] = useState(false)

  const handleContinue = () => {
    setShowLayerMockup(true)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={60} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-8">
          {/* Illustration */}
          <div className="flex justify-center">
            <svg className="w-[150px] h-[98px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 389.68 255.6">
              <rect width="389.68" height="255.6" fill="white"/>
              <g id="Smart_ID_card">
                <g>
                  <path d="M352.75,252.54H36.3c-19.19,0-34.8-15.61-34.8-34.8V36.53C1.51,17.35,17.12,1.73,36.3,1.73h316.45c19.19,0,34.8,15.61,34.8,34.8v181.21c0,19.19-15.61,34.8-34.8,34.8ZM36.3,3.35C18.01,3.35,3.12,18.24,3.12,36.53v181.21c0,18.3,14.88,33.18,33.18,33.18h316.45c18.3,0,33.18-14.88,33.18-33.18V36.53c0-18.3-14.88-33.18-33.18-33.18H36.3Z"/>
                  <g>
                    <path d="M266.87,90.04h-96.49c-4.65,0-8.42-3.77-8.42-8.42s3.77-8.42,8.42-8.42h96.49c4.65,0,8.42,3.77,8.42,8.42s-3.77,8.42-8.42,8.42Z" fill="#e2eaff"/>
                    <path d="M313.37,119.7h-142.99c-4.65,0-8.42-3.77-8.42-8.42s3.77-8.42,8.42-8.42h142.99c4.65,0,8.42,3.77,8.42,8.42s-3.77,8.42-8.42,8.42Z" fill="#e2eaff"/>
                    <path d="M197.93,216.32h-83.96c-.45,0-.81-.36-.81-.81s.36-.81.81-.81h83.96c.45,0,.81.36.81.81s-.36.81-.81.81Z"/>
                    <path d="M102.05,216.32H36.92c-.45,0-.81-.36-.81-.81s.36-.81.81-.81h65.12c.45,0,.81.36.81.81s-.36.81-.81.81Z"/>
                    <path d="M239.41,193.05h-67.21c-.45,0-.81-.36-.81-.81s.36-.81.81-.81h67.21c.45,0,.81.36.81.81s-.36.81-.81.81Z"/>
                    <path d="M157.82,193.05H36.92c-.45,0-.81-.36-.81-.81s.36-.81.81-.81h120.9c.45,0,.81.36.81.81s-.36.81-.81.81Z"/>
                    <path d="M238.61,170.31h-112.66c-.45,0-.81-.36-.81-.81s.36-.81.81-.81h112.66c.45,0,.81.36.81.81s-.36.81-.81.81Z"/>
                    <path d="M113.97,170.31H36.13c-.45,0-.81-.36-.81-.81s.36-.81.81-.81h77.84c.45,0,.81.36.81.81s-.36.81-.81.81Z"/>
                  </g>
                  <g>
                    <ellipse cx="90.47" cy="96.45" rx="53.55" ry="53.32" fill="#fff"/>
                    <path d="M90.47,150.58c-29.97,0-54.36-24.28-54.36-54.13s24.38-54.13,54.36-54.13,54.36,24.28,54.36,54.13-24.38,54.13-54.36,54.13ZM90.47,43.94c-29.08,0-52.74,23.56-52.74,52.51s23.66,52.51,52.74,52.51,52.74-23.56,52.74-52.51-23.66-52.51-52.74-52.51Z"/>
                  </g>
                  <g>
                    <path d="M345.34,216.32h-64.71c-5.8,0-10.51-4.72-10.51-10.51v-39.68c0-5.8,4.72-10.51,10.51-10.51h64.71c5.8,0,10.51,4.72,10.51,10.51v39.68c0,5.8-4.72,10.51-10.51,10.51ZM280.63,157.23c-4.91,0-8.9,3.99-8.9,8.9v39.68c0,4.91,3.99,8.9,8.9,8.9h64.71c4.91,0,8.9-3.99,8.9-8.9v-39.68c0-4.91-3.99-8.9-8.9-8.9h-64.71Z" fill="#5479f7"/>
                    <path d="M335.98,200.54h-45.99c-5.8,0-10.51-4.72-10.51-10.51v-8.13c0-5.8,4.72-10.51,10.51-10.51h45.99c5.8,0,10.51,4.72,10.51,10.51v8.13c0,5.8-4.72,10.51-10.51,10.51ZM289.99,173c-4.91,0-8.9,3.99-8.9,8.9v8.13c0,4.91,3.99,8.9,8.9,8.9h45.99c4.91,0,8.9-3.99,8.9-8.9v-8.13c0-4.91-3.99-8.9-8.9-8.9h-45.99Z" fill="#5479f7"/>
                    <g>
                      <path d="M330.34,216.32c-.45,0-.81-.36-.81-.81v-15.77c0-.45.36-.81.81-.81s.81.36.81.81v15.77c0,.45-.36.81-.81.81Z" fill="#5479f7"/>
                      <path d="M294.47,216.32c-.45,0-.81-.36-.81-.81v-15.52c0-.45.36-.81.81-.81s.81.36.81.81v15.52c0,.45-.36.81-.81.81Z" fill="#5479f7"/>
                      <path d="M312.41,216.32c-.45,0-.81-.36-.81-.81v-15.52c0-.45.36-.81.81-.81s.81.36.81.81v15.52c0,.45-.36.81-.81.81Z" fill="#5479f7"/>
                    </g>
                    <g>
                      <path d="M330.34,173c-.45,0-.81-.36-.81-.81v-15.78c0-.45.36-.81.81-.81s.81.36.81.81v15.78c0,.45-.36.81-.81.81Z" fill="#5479f7"/>
                      <path d="M294.47,173c-.45,0-.81-.36-.81-.81v-15.52c0-.45.36-.81.81-.81s.81.36.81.81v15.52c0,.45-.36.81-.81.81Z" fill="#5479f7"/>
                      <path d="M312.41,173c-.45,0-.81-.36-.81-.81v-15.52c0-.45.36-.81.81-.81s.81.36.81.81v15.52c0,.45-.36.81-.81.81Z" fill="#5479f7"/>
                    </g>
                  </g>
                </g>
                <path d="M69.49,130.45c1.89-.22,4.32-.63,6.11-.75.05-1.54.06-3.58.18-5.06-2.07-1.21-4.35-3.82-5.64-5.83-2.99-4.66-2.97-10.38-2.58-15.7-5.08-1.29-6.32-8.52-2.14-11.91-1.02-1.07-1.41-1.58-2.1-2.87-2.08-3.82-1.91-5.25,1.49-7.96-4.43-3.23-2.64-7.78,2.33-8.95-.34-.41-.95-1.07-1.13-1.54-1.71-4.37,2.71-8.14,6.87-6.13-.15-1.56-.22-2.66.86-4,.86-1.05,2.12-1.7,3.48-1.79,1.78-.14,2.84.5,4.1,1.63h0c.19-.57.41-1.33.77-1.82,2.43-3.32,7.48-3.1,9.96-.02,2.47-3.63,6.75-2.27,8.57,1.32l.22.44c1.62-.96,2.76-1.59,4.77-1.15,2.36.52,4.13,2.66,3.63,5.14-.08.41-.31.9-.44,1.31.97-.12,2.15-.32,3.1-.14,4.37.85,5.45,3.61,3.41,7.24,4.77,1.84,5.86,6.13,1.67,9.38,1.1,1.44,2.17,2.68,1.91,4.62-.21,1.62-1.16,2.71-2.57,3.39,1.68,3.35,1.05,4.96-1.55,7.52.52,2.14.15,4.28-1,6.16-1.16,1.9-3.02,3.27-5.17,3.83-.67.17-1.37.18-2.06.2-.34,2.88-1.21,7.26-3.01,9.62-.07,3.91-.13,8.72.05,12.59,1.84.23,7.84,1.92,9.86,2.44" fill="#010101"/>
                <path d="M80.29,73.68c4.16,4.37,9.35,4.52,14.19,1.18,2.3,2.86,5.24,2.32,8.15.85-.34,3.62,1.46,3.34,3.39,4.79,1.74,1.31-4.09,3.88.66,8.53-2.69,6.55-1.1,16.4-7.85,21.23-.52.37-1.24.88-1.85,1.03-.57-.13-.39-.09-.86-.63-3.36-3.62-7.35-4.52-12.04-5.28-4.8-.78-7.9.73-11.71,3.64-.16-.16-.32-.33-.46-.5-4.24-4.84-3.34-8.01-3.08-14.07.27-6.15.09-15.67,5.13-20.11,2.63,1.4,4.04,1.07,6.33-.66h0Z" fill="#fcfcfa"/>
                <path d="M91.83,84.81c1.59.34,8.91,3.24,8.96,4.91-.39.37-.17.26-.71.32-1.49-.11-12.62-2.71-8.24-5.22h0Z" fill="#010101"/>
                <path d="M79.87,84.45c.56-.05,1.11-.06,1.57.25.3.51.24.24.21.81-.56.85-1.63,1.17-2.58,1.35-2.04.39-4,.83-6,1.36-.49.16-.51.17-1.05.22-.53-.31-.32-.11-.64-.66-.07-2.46,6.74-3.15,8.49-3.34h0Z" fill="#010101"/>
                <path d="M84.36,90.04c1.51,1.11-2.6,10.12-1.88,12.03.29.76.65,1.1,1.34,1.46.54.07.67-.02,1.22-.21l.18-.06.09.23-.22.49c-1.93,1.12-3.82-1.42-3.64-2.69.5-3.56,1.93-7.8,2.93-11.25h0Z" fill="#010101"/>
                <path d="M93.53,91.93c2.41.4,2.03,4.01.2,5.15-2.58-.46-1.81-3.79-.2-5.15Z" fill="#010101"/>
                <path d="M77.23,90.88c2.6.05,2.02,3.45.74,4.91-2.66.34-1.95-3.43-.74-4.91Z" fill="#010101"/>
                <path d="M76.49,132.02c-.12-2.26.12-4.46.02-6.74l.21-.12c1,.08.73,1.42.69,2.23-.1,2,3.03,2.2,4.43,2.02,7.9-1.03,15.52-5.16,20.64-11.25h0c.14.2.18.45.18.68-.02,4.27-.07,8.06.28,12.33" fill="#fcfcfa"/>
                <path d="M103.24,132.11c.56-.56.73-1.22.85-1.98h0c1.07.06,4.66,1.13,5.9,1.48" fill="#fcfcfa"/>
                <path d="M70.63,131.19l3.75-.68h0c.37-.04.39-.07.73.06.26.72,1.03,2.55,1.51,3.09" fill="#fcfcfa"/>
                <path d="M81.94,108.82c.27,0,.54-.01.81-.01,2.3,0,9.09.79,8.85,4.1-.1,1.34-1.2,2.85-2.22,3.66-1,.8-1.22.82-2.44.71-2.83-.71-4.78-1.29-7.72-1.22-1-.97-2.08-1.76-2.34-3.22-.55-3.14,2.89-3.67,5.07-4Z" fill="#fcfcfa"/>
                <path d="M89.19,110.37c.16.16.09.07.1.41-.65,1.03-2.1,1.59-3.24,1.89-2.69.7-4.56-.15-6.77-1.46-.2-.24-.14-.16-.25-.47l.14-.13c1.61.34,2.39,1.33,4.55,1.42,2.03.09,3.9-.33,5.47-1.67h0Z" fill="#010101"/>
                <path d="M110.53,94.95c1.2.05,1.57.31,2.6.89,2.37,3.72-.13,7.79-3.49,9.77-.82.3-2.22.78-2.97.18-.52-1.71,1.49-7.61,2.39-9.37.38-.75.75-1.07,1.46-1.47h0Z" fill="#fcfcfa"/>
                <path d="M67.02,91.81c.22.08.27.12.48.22.37.88.16,8.79.1,10.29-.85-.49-1.13-.68-1.88-1.29-2.73-2.66-2.89-8.2,1.3-9.22h0Z" fill="#fcfcfa"/>
              </g>
            </svg>
          </div>

          {/* Title and Description */}
          <div>
            <h1 className="text-3xl lg:text-4xl text-[#05055c] font-serif mb-4 text-blue-900 font-bold text-center">
              Documents verification
            </h1>
            <p className="text-gray-600 text-sm text-center">
              Your identity will be verified securely through Plaid, a trusted financial technology provider used by many financial institutions.
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            {/* Fast and Secure Card */}
            <div className="flex gap-3 p-4 border-2 border-gray-200 rounded-2xl bg-white">
              <div className="flex-shrink-0">
                <Zap className="w-5 h-5 text-gray-800 mt-0.5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Fast and Secure</h3>
                <p className="text-gray-600 text-sm">Identity verification usually takes only a few minutes and your information is encrypted.</p>
              </div>
            </div>

            {/* Trusted Technology Card */}
            <div className="flex gap-3 p-4 border-2 border-gray-200 rounded-2xl bg-white">
              <div className="flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Trusted technology</h3>
                <p className="text-gray-600 text-sm">Plaid helps financial institutions securely verify identity and protect your data.</p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <CTAButton onClick={handleContinue} disabled={isSubmitting}>
            Continue
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
                Fundo uses <span className="font-black">PLAID TO VERIFY</span> your identity
              </h2>

              {/* Prototype Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 py-1.5">
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
                    router.push("/debit-card")
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
