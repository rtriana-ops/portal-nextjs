"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
  isNested?: boolean
}

export function PrivacyPolicyModal({ isOpen, onClose, isNested = false }: PrivacyPolicyModalProps) {
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
            <h1 className="font-serif font-bold text-blue-900 text-lg">Privacy Policy</h1>
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
              <h2 className="font-bold text-blue-900 text-base">Fundo, LLC Privacy & Information Security Policy</h2>

              <p className="text-sm">
                Fundo LLC a Florida limited liability corporation, together with its applicable subsidiaries,
                affiliates, third-parties, representatives, assignees, and successors (collectively, "Fundo", the
                "Company", "we", "us" or "our") are committed to your personal privacy and your security online. This
                Policy discloses the privacy practices for the Company's family of Websites (collectively, the "Site" or
                "Website"), as well as related products and services we may offer to you (collectively referred to as
                the "Services"). This Policy also covers how personal and other information that we receive or collect
                about you is treated. Please read the information below to learn the following regarding your use of
                this Site and our Services.
              </p>

              <p className="text-sm">
                You acknowledge that this Privacy Policy is designed to be read in connection with the Site Terms of
                Service, which is available at https://fundo.com/terms-of-service, and that by accessing or using our
                Site, you agree to be bound by the Site's terms and conditions, as well as this Policy.
              </p>

              <p className="text-sm">
                We reserve the right to change this Privacy Policy from time to time. We will notify you about
                significant changes in the way we treat personal information by sending a notice to the primary email
                address specified in your account, by placing a prominent notice on our site, or by updating any privacy
                information on this page. Your continued use of the Site and or Services available through this Site
                after such modifications will constitute your: (a) acknowledgment of the modified Policy; and (b) your
                agreement to abide and be bound by that Policy.
              </p>

              <p className="text-sm">
                If you have any questions about this Policy, please feel free to contact us at: support@fundo.com.
              </p>

              <p className="text-sm font-bold">
                IMPORTANT: BY USING THE SITE AND/OR OFFERINGS AVAILABLE ON THIS SITE, YOU GIVE YOUR CONSENT THAT ALL
                PERSONAL DATA THAT YOU SUBMIT MAY BE PROCESSED BY US IN THE MANNER AND FOR THE PURPOSES DESCRIBED BELOW.
                IF YOU DO NOT AGREE TO THESE TERMS AND CONDITIONS, DO NOT USE THE SITE.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">Information we collect about you</h3>
              <p className="text-sm">
                In order to better provide you with the Services relating to your merchant cash advance, we collect two
                types of information about our users: Personally Identifiable Information ("PII") and Aggregate
                Information.
              </p>

              <p className="text-sm">
                Personally Identifiable Information refers to information that lets us know the specifics of who you
                are. When you engage in certain activities on this Site, such as registering for an account, downloading
                or purchasing a product or service, submitting content and/or posting content in the user forums, email
                or SMS/MMS messages, or sending us feedback, we may ask you to provide certain information about
                yourself.
              </p>

              <p className="text-sm">
                Examples of PII may include but is not limited to your first and last name, email address, mailing
                address (including zip code), employer, job title and department, telephone and facsimile numbers,
                references, date of birth, and other identifying information. When applying for products or services on
                the Site, you may be asked to provide a debit card number.
              </p>

              <p className="text-sm">
                Aggregate Information refers to information that does not by itself identify a specific individual. We
                gather certain information about you based upon where you visit on our Site and what other sites may
                have directed you to us. This information, which is collected in a variety of different ways, is
                compiled and analyzed on both a personal and an aggregated basis.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">How we collect information</h3>
              <p className="text-sm">We collect information about you in three ways:</p>

              <p className="text-sm">
                <strong>(I) Information You Provide:</strong> When you use the Website, including applying for an
                advance both online and on the telephone, you will generally be required to provide Personally
                Identifying Information, which may include your e-mail address, name, address, telephone number, date of
                birth, and Social Security Number, as well as any financial information.
              </p>

              <p className="text-sm">
                <strong>(II) Information from Third-Parties:</strong> Third parties, such as credit bureaus, credit
                reporting agencies and public record data, may provide us with information about you. We may combine
                this information with information we already have about you.
              </p>

              <p className="text-sm">
                <strong>(III) Information from Your Use of the Website:</strong> We may collect additional user behavior
                information during your use of the website. This may include device information, log information,
                location information, and other information.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">How we use information we collect</h3>
              <p className="text-sm">
                Our primary use of your information is to administer, maintain and improve your experience on the
                Website generally as well as provide you with customized personalization services and interactive
                communications.
              </p>

              <p className="text-sm">
                When processing certain information on the Website, such as payment information with affiliated banking
                institutions or payment processors, the transaction is encrypted, using Secure Socket Layer (SSL)
                encryption technology to encrypt all data entered into our website and ensure the connection is secure.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">
                Updating information or opt-out of receiving communications
              </h3>
              <p className="text-sm">
                If you change your mind and decide that you no longer want to receive promotional e-mails, SMS/Text
                Communications, and direct mailings, you may opt-out at any time by simply sending an e-mail request to
                support@fundo.com.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">Information we share</h3>
              <p className="text-sm">
                We do provide some of our product and service offerings through contractual arrangements made with
                affiliates, service providers, representatives, partners and other third-parties. We and our Service
                Partners may need to use some PII in order to perform tasks between our respective sites, or to deliver
                products or services to you.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">How we protect your information</h3>
              <p className="text-sm">
                At our Site you can be assured that your PII is secure, consistent with current industry standards. We
                strive to take appropriate security measures to protect against unauthorized access to or unauthorized
                alteration, disclosure or destruction of your PII.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">Cookies and other technologies</h3>
              <p className="text-sm">
                Depending on how you use our Site, we may store cookies on your computer or mobile device in order to
                collect certain aggregate data about our users and to customize certain aspects of your specific user
                experience. A cookie is a small data text file which is stored on your computer that uniquely identifies
                your browser.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">Your rights</h3>
              <p className="text-sm">
                Our Company would like to make sure you are fully aware of all of your data protection rights. Every
                user is entitled to the following:
              </p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>The right to access</li>
                <li>The right to rectification</li>
                <li>The right to erasure</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
              </ul>

              <p className="text-sm">
                If you would like to exercise any of these rights, please contact us by sending an email to
                support@fundo.com or by mailing a letter to Fundo LLC, 3323 NE 163rd Street, Suite 509, North Miami
                Beach, FL 33160.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">Children's online privacy act ("COPA")</h3>
              <p className="text-sm">
                The website is intended for persons 18 years of age and older. We do not knowingly collect personal
                information from persons under 18 years of age.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">Sale of Personal Data</h3>
              <p className="text-sm">
                We may sell certain categories of your personal data to third parties for commercial purposes. The types
                of data sold may include contact information, demographic details, and behavioral data. We are committed
                to transparency regarding the sale of your personal data and provide you with the ability to opt-out at
                any time. For more information or to exercise your opt-out rights, please contact us at
                support@fundo.com.
              </p>

              <h3 className="font-bold text-blue-900 text-base mt-6">How you can contact us</h3>
              <p className="text-sm">
                You may email us at support@fundo.com to request access to, update, correct, or delete any personal
                information that you have provided to us.
              </p>

              <p className="text-sm">
                If you have questions or concerns regarding this policy, please contact us by emailing us at
                support@fundo.com
              </p>

              <p className="text-sm mt-6 text-gray-500">
                <strong>Last Modified:</strong> June 11, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
