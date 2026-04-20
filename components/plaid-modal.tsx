"use client"

import { X, Plug, Shield } from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"

interface PlaidModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PlaidModal({ isOpen, onClose }: PlaidModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 lg:inset-0 lg:flex lg:items-center lg:justify-center z-50 animate-in slide-in-from-bottom lg:fade-in duration-300">
        <div className="bg-white rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[85vh] lg:max-h-[90vh] lg:max-w-2xl lg:w-full lg:mx-4 overflow-hidden flex flex-col">
          {/* Close Button - Top Left */}
          <div className="p-4 lg:p-6">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="overflow-y-auto px-6 pb-6 space-y-6 flex-1">
            {/* Plaid Logo - Centered */}
            <div className="flex justify-center">
              <Image src="/plaid-logo.png" alt="Plaid Logo" width={120} height={40} className="h-10 w-auto" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-center text-gray-900">{"Fundo uses Plaid to connect your account (Simulated Plaid iFrame)"}</h2>

            {/* Bullet Points */}
            <div className="space-y-4">
              {/* Connect Effortlessly */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Plug className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base">Connect effortlessly</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Plaid lets you securely connect your financial accounts in seconds.
                  </p>
                </div>
              </div>

              {/* Your Data Belongs to You */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base">Your data belongs to you</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Plaid doesn't sell personal info, and will only use it with your permission.
                  </p>
                </div>
              </div>
            </div>

            {/* Continue button */}
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-colors">
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
