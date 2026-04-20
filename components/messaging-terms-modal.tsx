"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface MessagingTermsModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenPrivacyPolicy?: () => void
  onOpenEsign?: () => void
  isNested?: boolean
}

export function MessagingTermsModal({
  isOpen,
  onClose,
  onOpenPrivacyPolicy,
  onOpenEsign,
  isNested = false,
}: MessagingTermsModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && !isNested) {
      document.body.style.overflow = "hidden"
    } else if (!isOpen && !isNested) {
      document.body.style.overflow = "unset"
    }
    return () => {
      if (!isNested) {
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen, isNested])

  if (!isOpen) return null

  const zIndex = isNested ? "z-[60]" : "z-50"

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/50 ${zIndex} animate-in fade-in duration-200`} onClick={onClose} />

      <div
        className={`fixed inset-x-0 bottom-0 lg:inset-0 lg:flex lg:items-center lg:justify-center ${zIndex} animate-in slide-in-from-bottom lg:fade-in duration-300`}
      >
        <div className="bg-white rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[85vh] lg:max-h-[90vh] lg:max-w-2xl lg:w-full lg:mx-4 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 py-4">
            <h1 className="font-serif font-bold text-blue-900 text-lg">Messaging Terms</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div ref={contentRef} className="overflow-y-auto p-6 space-y-4 flex-1">
            <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
              {/* Contact Authorization */}
              <section className="space-y-3">
                <h2 className="font-semibold text-blue-900 text-base">Contact Authorization</h2>
                <p className="leading-relaxed">
                  Fundo LLC and its representatives, affiliates, third-party partners, or agents may contact you via
                  phone call (including automated dialers) or text message at the number provided.
                </p>
                <p className="leading-relaxed">
                  This includes calls to wireless numbers which may result in charges to you. This consent remains valid
                  even if the provided number is listed on any Do-Not-Call registry.
                </p>
                <p className="leading-relaxed">
                  You can opt out of receiving specific communications from Fundo LLC as outlined in the Messaging
                  Terms,{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      onOpenPrivacyPolicy?.()
                    }}
                    className="text-cyan-500 hover:underline"
                  >
                    Privacy Policy
                  </button>
                  , and{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      onOpenEsign?.()
                    }}
                    className="text-cyan-500 hover:underline"
                  >
                    ESIGN
                  </button>
                  .
                </p>
              </section>

              <div className="border-t border-gray-200" />

              {/* Text Message Services */}
              <section className="space-y-3">
                <h2 className="font-semibold text-blue-900 text-base">Text Message Services</h2>
                <p className="leading-relaxed">
                  By providing us with your mobile number and opting-in, you give Fundo LLC permission to send you
                  account-related text messages, like payment reminders and notifications, as well as promotional
                  messages, like special offers and discounts, in conjunction with the services you have requested.
                </p>
                <p className="leading-relaxed">Number of messages will vary by account.</p>
                <p className="leading-relaxed">
                  By providing us with your mobile number and opting-in, you agree you have ownership rights or
                  permission to use the number given to us.
                </p>
                <p className="leading-relaxed">Message and data rates may apply.</p>
              </section>

              <div className="border-t border-gray-200" />

              {/* Opt-Out & Support */}
              <section className="space-y-3">
                <h2 className="font-semibold text-blue-900 text-base">Opt-Out & Support</h2>
                <p className="leading-relaxed">
                  To opt-out, text STOP to any text message we send you. An opt-out confirmation message will be sent
                  back to you.
                </p>
                <p className="leading-relaxed">
                  To request support, text HELP to any text message we send you or email us at{" "}
                  <a href="mailto:support@fundo.com" className="text-cyan-500 hover:underline">
                    support@fundo.com
                  </a>
                  .
                </p>
              </section>

              <div className="border-t border-gray-200" />

              {/* Additional Information */}
              <section className="space-y-3">
                <h2 className="font-semibold text-blue-900 text-base">Additional Information</h2>
                <p className="leading-relaxed">
                  If your handset does not support MMS, any MMS messages sent may be delivered as SMS messages.
                </p>
                <p className="leading-relaxed">Wireless carriers are not liable for undelivered or delayed messages.</p>
                <p className="leading-relaxed">
                  No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.
                  All the above categories exclude text messaging originator opt-in data and consent; this information
                  will not be shared with any third parties.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
