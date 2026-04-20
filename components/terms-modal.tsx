"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

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
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 py-4">
            <h1 className="font-serif font-bold text-blue-900 text-lg">Terms and Conditions</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div ref={contentRef} className="overflow-y-auto p-6 space-y-4 flex-1">
            <div className="prose prose-sm max-w-none text-gray-700">
              <h2 className="text-lg font-bold text-gray-900">Fundo, LLC Terms and Conditions</h2>

              <p className="text-sm">
                Please read the following Terms and Conditions carefully before using this website or our Services
                (collectively, and individually referred herein as the "Terms", "Terms of Service," or "Terms of Use").
                Welcome to the Fundo LLC website, owned and operated by Fundo, a Florida Limited Liability Corporation
                ("Fundo," "Company," "we," "us," or "our"). These Terms govern your access to and use of the Website,
                www.fundo.com, including any subdomain thereof, as well as any online features, services, account, use
                of social forums, blogs, posts, and programs offered by Company (collectively, the "Site" or "Website"),
                and the products and services offered to you by Fundo.
              </p>

              <p>
                All use of the Website and the Content (as defined herein), including your Account on the Website (your
                "Account"), is subject to these Terms and Fundo's Privacy Policy. By accessing or using the Website, you
                agree to the following Terms, Fundo's Privacy Policy (the "Privacy Policy"), which can be found here:
                www.fundo.com/privacy-policy, and all disclaimers and terms and conditions that appear elsewhere on this
                Website.
              </p>

              <p>
                You should review these Terms regularly as they may change at any time at the sole discretion of
                Company. If you do not agree to any portion of these Terms, you should not access or otherwise use the
                Website. "Content" refers to any text, materials, documents, images, graphics, logos, design, audio,
                video and any other information provided from or on, uploaded to and downloaded from the Website.
              </p>

              <p>
                We will make an effort to update this web page with any changes to these Terms and to the services
                described in these Terms and you are encouraged to review these Terms frequently (the date of the most
                recent revision to these Terms appear at the end of these Terms).
              </p>

              <h3 className="text-base font-bold text-gray-900 mt-6">About the terms of service</h3>

              <p>
                These Terms constitute a binding legal contract between you and Fundo LLC and are in addition to any
                other agreements between you and Fundo, including any other agreement, that govern your use of products,
                account, services, content, tools, and information available on the Website. If there is any
                contradiction between these Terms and any other agreement you enter into with Fundo, the other agreement
                shall take precedence, but only to the extent of such conflicting terms.
              </p>

              <p>
                Terms related to the use of online services to your accounts that you have with Company (herein, your
                "Account") are set forth hereof. You affirm that you are either more than 18 years of age, an
                emancipated minor or possess legal parental or guardian consent and are fully able and competent to
                enter into the terms, conditions, obligations, affirmations, representations and warranties set forth in
                these Terms, and to abide by and comply with these Terms. In any case, you affirm that you are over the
                age of 13, as THE WEBSITE IS NOT INTENDED FOR ANY CHILD UNDER 13 THAT IS UNACCOMPANIED BY HIS OR HER
                PARENT OR LEGAL GUARDIAN.
              </p>

              <h3 className="text-base font-bold text-gray-900 mt-6">Modifications</h3>

              <p>
                By using or accessing the Website, you agree that Fundo may modify the Terms of Service or the Website
                at any time without prior notice. Your continued use of the Website after any modification of the Terms
                of Service will indicate your acceptance of the relevant modification and the Terms of Service as so
                modified.
              </p>

              <p>
                It is your responsibility to review these Terms from time to time to see if modifications have been
                made. Any modification is effective immediately from and after Fundo's posting of such modification on
                the Website, or other update of the Website or the Terms of Service. You will know if these Terms of
                Service have been modified since your last visit to the Website by referring to the "Last Modified" date
                at the end of this page.
              </p>

              <h3 className="text-base font-bold text-gray-900 mt-6">Privacy Policy</h3>

              <p>
                Your privacy is extremely important to us. We encourage you to read the Privacy Policy, which can be
                found here: www.fundo.com/privacy-policy and explains how we treat your personal and aggregate
                information and protect your privacy when you are using the Website. By using the Website, you agree
                that Fundo may use your information as set forth in the Privacy Policy. The Privacy Policy is hereby
                incorporated in these Terms by reference in its entirety.
              </p>

              <h3 className="text-base font-bold text-gray-900 mt-6">Acceptable use of the website</h3>

              <p>
                The Website is for your own personal use only. The Website is designed for individuals/merchants
                contemplating entering into a merchant cash advance or individuals/merchants interested in learning more
                about Fundo and its products and services. You may only use the Website for one of these purposes.
              </p>

              <p>
                Without limiting the generality of the preceding paragraph, you are expressly prohibited from: (a) any
                resale or commercial use of the Website; (b) any collection and use of any descriptions, prices or any
                other information posted on the Website for any purpose other than your own personal use or as otherwise
                permitted in an agreement between Fundo and yourself ("Permitted Use"), including any purpose
                competitive to Fundo or any commercial purpose, including marketing; (c) any downloading or copying of
                any materials contained in the Website for any reason other than for a Permitted Use; or (d) otherwise
                interfering with the ordinary operation or mission of the Website or Fundo's products or services.
              </p>

              <h3 className="text-base font-bold text-gray-900 mt-6">
                Disclaimer of warranties; Limitation of liability
              </h3>

              <p>
                The Website is provided to you on an "as is" and "as available" basis. Your use of the Website and any
                material you may access, download, or otherwise obtain from or through the Website is at your own
                discretion and risk, and you will be solely responsible for any damage to your computer system or loss
                of data that results therefrom.
              </p>

              <p className="font-bold uppercase">
                FUNDO DOES NOT WARRANT AS TO, OR GUARANTEE, THE ADEQUACY, SUFFICIENCY, ACCURACY, COMPLETENESS OR
                AVAILABILITY OF THE CONTENT OR THE WEBSITE AND FUNDO SHALL HAVE NO LIABILITY FOR ANY ERRORS, OMISSIONS,
                MISLEADING STATEMENTS, OR INTERRUPTIONS THEREIN.
              </p>

              <h3 className="text-base font-bold text-gray-900 mt-6">Termination</h3>

              <p>
                Fundo may terminate your right to use the Website, or block you from future use, at any time in its sole
                discretion, with or without cause, and without notice to you. Some circumstances in which Fundo may
                exercise this right to terminate your right to use the Website include: (a) you have breached any
                provision of the Terms of Service; (b) you have engaged in conduct which Fundo, in its sole discretion,
                considers to be unacceptable; (c) Fundo is required by law to do so; or (d) Fundo no longer provides the
                Website.
              </p>

              <h3 className="text-base font-bold text-gray-900 mt-6">Choice of law</h3>

              <p>
                The Terms of Service and all disputes, claims or controversies arising out of or relating in any way to
                the Terms of Service, the Website or the Content shall be governed by and construed in accordance with
                the laws of the State of New York without regard to the rules or principles of conflict of laws.
              </p>

              <h3 className="text-base font-bold text-gray-900 mt-6">Contact information</h3>

              <p>
                Fundo welcomes questions and comments about these Terms and Conditions. Questions or comments should be
                directed to support@fundo.com.
              </p>

              <p className="text-sm text-gray-600 mt-6">Last Modified: March 9, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
