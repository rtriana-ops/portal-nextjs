"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface EsignModalProps {
  isOpen: boolean
  onClose: () => void
  isNested?: boolean
}

export function EsignModal({ isOpen, onClose, isNested = false }: EsignModalProps) {
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
        <div className="bg-white rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[85vh] lg:max-h-[90vh] lg:max-w-4xl lg:w-full lg:mx-4 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 py-4">
            <h1 className="font-serif font-bold text-blue-900 text-lg">ESIGN</h1>
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
              <h2 className="font-semibold text-blue-900 text-base">
                Electronic Signature (ESIGN) and Electronic Communication Disclosure and Consent
              </h2>

              <p className="leading-relaxed text-sm">
                The Electronic Signature ("ESIGN") and Electronic Communication Disclosure and Consent Agreement (herein
                referred to as the "Consent Agreement" or "Disclosure") governs how Fundo LLC, its subsidiaries,
                (collectively, referred to herein as "Fundo"), its affiliates, representatives, and marketing partners
                (collectively, referred herein as "Partner" or "Partners") utilizes Electronic Signatures ("ESIGN") for
                signatures and/or to send disclosures, documents, records, emails, notices, and other information in an
                electronic format (herein, individually, a "Record" and collectively, "Electronic Communication") to You
                (herein shall mean, the "User", "You" or Your") regarding Fundo LLC's products and services (herein,
                collectively referred to as "Services").
              </p>

              <p className="leading-relaxed text-sm">
                This Disclosure also applies to agreements governing your use of the Services, and Communications under
                them. All these Communications and agreements are collectively referred to as "Communications". Fundo
                LLC, its subsidiaries, its affiliates, representatives, and marketing partners herein individually and
                collectively referred to as "Fundo", "we," "us," "our," or "ours. Before you use any of our Services
                electronically as defined herein, you must review and consent to the terms outlined within this Consent
                Agreement.
              </p>

              <div className="border-t border-gray-200" />

              <section className="space-y-3">
                <h3 className="font-semibold text-blue-900 text-base">I. Transactions</h3>

                <h4 className="font-semibold text-gray-800 text-sm">Unauthorized Transactions</h4>
                <p className="leading-relaxed text-sm">
                  If you believe your information has been lost or stolen, you should contact Fundo LLC at:
                </p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p>Fundo LLC</p>
                  <p>3323 NE 163rd Street Suite 509</p>
                  <p>North Miami Beach, FL 33160</p>
                  <p>1-866-393-8636</p>
                  <p>support@fundo.com</p>
                  <p>Monday to Friday 9:00 am EST – 6:00 pm EST</p>
                </div>

                <h4 className="font-semibold text-gray-800 text-sm">Preauthorized Payments</h4>
                <p className="leading-relaxed text-sm">
                  The Bill Pay service permits you to use your Internet-enabled device to direct payments from your
                  designated online Bill Pay account to third parties you wish to pay. By setting up an arrangement
                  utilizing the portal, you agree to allow Fundo LLC to withdraw the amount specified by you, on the
                  days specified by you, automatically for the life of each agreement.
                </p>

                <h4 className="font-semibold text-gray-800 text-sm">Right to Stop Payment</h4>
                <p className="leading-relaxed text-sm">
                  If you have told us in advance to make regular transfers out of your account, you can stop any of
                  these payments by calling Fundo LLC at 1-866-393-8636 at least Two (2) business days prior to the
                  scheduled withdrawal date.
                </p>
              </section>

              <div className="border-t border-gray-200" />

              <section className="space-y-3">
                <h3 className="font-semibold text-blue-900 text-base">II. Electronic Signatures and Communication</h3>

                <h4 className="font-semibold text-gray-800 text-sm">ESIGN Act Disclosure</h4>
                <p className="leading-relaxed text-sm">
                  The Electronic Signatures in Global and National Commerce Act (ESIGN) is a United States federal law
                  that facilitates the use of electronic records and signatures in interstate and foreign commerce by
                  ensuring the validity and legal effect of contracts entered into electronically.
                </p>

                <h4 className="font-semibold text-gray-800 text-sm">Scope of Electronic Communications</h4>
                <p className="leading-relaxed text-sm">
                  When you use a product or service to which this disclosure applies, you agree that we may provide you
                  with any Communication in electronic format. Your consent includes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>All legal and regulatory disclosures and Communications associated with your account</li>
                  <li>Privacy policies and notices</li>
                  <li>Billing statements, receipts and account history reports</li>
                  <li>Federal and state tax statements and documents</li>
                </ul>

                <h4 className="font-semibold text-gray-800 text-sm">Hardware and Software Requirements</h4>
                <p className="leading-relaxed text-sm">
                  In order to access, view, and retain Electronic Communications, you must have:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>An Internet browser that supports 128-bit encryption</li>
                  <li>A device capable of accessing the Internet</li>
                  <li>A working email account</li>
                  <li>PDF document viewer software (such as Adobe Acrobat Reader)</li>
                  <li>A printer connected to your device</li>
                </ul>

                <h4 className="font-semibold text-gray-800 text-sm">How to Withdraw Consent</h4>
                <p className="leading-relaxed text-sm">
                  You may withdraw your consent to receive Communications in electronic form by contacting us at
                  support@fundo.com or by calling 1-866-393-8636, Monday-Friday 9:00 am EST to 6:00 pm EST.
                </p>
              </section>

              <div className="border-t border-gray-200" />

              <section className="space-y-3">
                <h3 className="font-semibold text-blue-900 text-base">III. Additional Disclosures and Consent</h3>

                <h4 className="font-semibold text-gray-800 text-sm">TCPA Consent</h4>
                <p className="leading-relaxed text-sm">
                  You consent to us communicating with you using any telephone number, email address, or other contact
                  information you have provided. We may use automated telephone dialing equipment, artificial or
                  pre-recorded voice messages, SMS or text messages, and email.
                </p>

                <h4 className="font-semibold text-gray-800 text-sm">Text Message Services</h4>
                <p className="leading-relaxed text-sm">
                  By providing us with your mobile number and opting-in, you give Fundo permission to send you
                  account-related text messages. Message and data rates may apply. To opt-out, text STOP to any text
                  message we send you.
                </p>
              </section>

              <div className="border-t border-gray-200" />

              <section className="space-y-3">
                <h3 className="font-semibold text-blue-900 text-base">Contact Information</h3>
                <p className="leading-relaxed text-sm">Fundo welcomes questions and comments. Please contact us at:</p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p>Fundo LLC</p>
                  <p>3323 NE 163rd Street, Suite 509</p>
                  <p>North Miami Beach, FL 33160</p>
                  <p>
                    Email:{" "}
                    <a href="mailto:support@fundo.com" className="text-cyan-500 hover:underline">
                      support@fundo.com
                    </a>
                  </p>
                </div>
              </section>

              <p className="text-xs text-gray-500 italic">Last Modified: February 23, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
