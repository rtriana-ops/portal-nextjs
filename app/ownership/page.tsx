"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { CTAButton } from "@/components/cta-button"
import { useRouter } from "next/navigation"

export default function OwnershipPage() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleContinue = () => {
    if (selectedOption) {
      router.push("/loader-layer-mockup")
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={35} currentStep={4} totalSteps={10} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-8 lg:py-12">
        <div className="max-w-md mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl lg:text-4xl text-[#05055c] font-serif mb-4 text-blue-900 font-bold">
              How much of the business do you own?
            </h1>
            <p className="text-gray-600 text-base">This helps us understand your role in the business.</p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {/* 51% or more */}
            <div
              onClick={() => setSelectedOption("51-or-more")}
              className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm relative ${
                selectedOption === "51-or-more" ? "border-blue-800" : "border-gray-300"
              }`}
            >
              {/* Radio Button */}
              <div className="absolute top-6 right-6">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === "51-or-more" ? "border-blue-800" : "border-gray-300"
                  }`}
                >
                  {selectedOption === "51-or-more" && <div className="w-3 h-3 rounded-full bg-blue-800" />}
                </div>
              </div>

              <div className="pr-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">51% or more</h3>
                <div className="flex items-start gap-3">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <path
                      d="M9.49992 7.91671C11.2488 7.91671 12.6666 6.49894 12.6666 4.75004C12.6666 3.00114 11.2488 1.58337 9.49992 1.58337C7.75102 1.58337 6.33325 3.00114 6.33325 4.75004C6.33325 6.49894 7.75102 7.91671 9.49992 7.91671Z"
                      stroke="#16A34A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.625 17.4166C16.625 13.4816 13.435 10.2916 9.5 10.2916C5.56498 10.2916 2.375 13.4816 2.375 17.4166"
                      stroke="#16A34A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-gray-700 text-base">You own most of the business.</span>
                </div>
              </div>
            </div>

            {/* 50% or less */}
            <div
              onClick={() => setSelectedOption("50-or-less")}
              className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm relative ${
                selectedOption === "50-or-less" ? "border-blue-800" : "border-gray-300"
              }`}
            >
              {/* Radio Button */}
              <div className="absolute top-6 right-6">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === "50-or-less" ? "border-blue-800" : "border-gray-300"
                  }`}
                >
                  {selectedOption === "50-or-less" && <div className="w-3 h-3 rounded-full bg-blue-800" />}
                </div>
              </div>

              <div className="pr-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">50% or less</h3>
                <div className="flex items-start gap-3">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <g clipPath="url(#clip0_8390_891)">
                      <path d="M19 0H0V19H19V0Z" fill="white" fillOpacity="0.01" />
                      <path
                        d="M9.50008 7.91667C11.0304 7.91667 12.2709 6.67612 12.2709 5.14583C12.2709 3.61555 11.0304 2.375 9.50008 2.375C7.96979 2.375 6.72925 3.61555 6.72925 5.14583C6.72925 6.67612 7.96979 7.91667 9.50008 7.91667Z"
                        stroke="#020617"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.75 2.8717C4.03216 3.37241 3.5625 4.20428 3.5625 5.14589C3.5625 6.1538 4.10067 7.03604 4.90532 7.52089"
                        stroke="#020617"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.25 2.8717C14.9678 3.37241 15.4375 4.20428 15.4375 5.14589C15.4375 6.08746 14.9678 6.91938 14.25 7.42007"
                        stroke="#020617"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.75 15.8334V15.625H14.25V15.8334C14.25 14.3579 14.25 13.4898 14.0089 12.8124C13.6876 12.2623 13.0711 11.6458 12.2952 11.3244C11.7132 11.0834 10.9755 11.0834 9.5 11.0834C8.02453 11.0834 7.28678 11.0834 6.70482 11.3244C5.92891 11.6458 5.31244 12.2623 4.99106 12.8124C4.75 13.4898 4.75 14.3579 4.75 15.8334Z"
                        stroke="#020617"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.4165 16.625V16.15C17.4165 14.3765 17.4165 13.4898 17.0714 12.8124C16.7678 12.2165 16.2833 11.7321 15.6875 11.4285"
                        stroke="#020617"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.58325 16.625V16.15C1.58325 14.3765 1.58325 13.4898 1.9284 12.8124C2.23199 12.2165 2.71644 11.7321 3.31228 11.4285"
                        stroke="#020617"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_8390_891">
                        <rect width="19" height="19" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-gray-700 text-base">You own part of the business.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <CTAButton onClick={handleContinue} disabled={!selectedOption}>
            Continue
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
