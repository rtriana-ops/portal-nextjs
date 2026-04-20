'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LayerMockup() {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  const handleContinue = () => {
    router.push('/bank-verification')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40">
      {/* Bottom Sheet */}
      <div className="w-full bg-white rounded-t-3xl shadow-2xl max-h-screen overflow-y-auto">
        {/* Close Button */}
        <div className="sticky top-0 flex justify-end p-6 bg-white rounded-t-3xl">
          <button
            onClick={handleClose}
            className="text-gray-900 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 space-y-8">
          {/* Plaid Illustration */}
          <div className="flex justify-center py-8">
            <div className="w-64 h-32 relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/New_Flow_2025-8MIbl7xz5S9EIcFve9EW7F90BWWwWW.png"
                alt="Plaid Layer Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 font-sans text-pretty">
              Fundo uses <span className="font-black">Plaid</span> to connect your account
            </h1>
          </div>

          {/* Benefits Section */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
            {/* Benefit 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <h2 className="text-lg font-bold text-gray-900">Connect in seconds</h2>
              </div>
              <p className="text-gray-600 text-sm ml-9">
                8000+ apps trust Plaid to quickly connect to financial institutions
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200"></div>

            {/* Benefit 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <h2 className="text-lg font-bold text-gray-900">Keep your data safe</h2>
              </div>
              <p className="text-gray-600 text-sm ml-9">
                Plaid uses best-in-class encryption to help protect your data
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200"></div>

          {/* Privacy Disclaimer */}
          <div className="text-center text-sm text-gray-600">
            <p>
              By continuing, you agree to Plaid's{' '}
              <a href="https://plaid.com/legal/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">
                Privacy Policy
              </a>{' '}
              and to receiving updates on plaid.com
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full py-4 px-6 rounded-2xl bg-gray-900 text-white font-semibold text-lg hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
