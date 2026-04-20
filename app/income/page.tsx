"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { CTAButton } from "@/components/cta-button"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function IncomePage() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [showInfoBanner, setShowInfoBanner] = useState(true)
  const router = useRouter()

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleContinue = () => {
    if (selectedOption === "business-owner") {
      router.push("/business-owner-company-name")
    } else if (selectedOption === "independent-contractor") {
      router.push("/independent-contractor-company-name")
    } else if (selectedOption === "not-sure") {
      router.push("/current-situation")
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={20} currentStep={2} totalSteps={10} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-6">
          <h1 className="text-3xl text-[#05055c] font-serif text-blue-900 font-extrabold">Income Information</h1>

          {showInfoBanner && (
            <div className="border-2 border-gray-300 rounded-2xl p-4 bg-white relative">
              <button
                onClick={() => setShowInfoBanner(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-start gap-3 pr-6">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full border-2 border-green-600 flex items-center justify-center">
                    <span className="text-green-600 text-sm font-bold">i</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-green-600 font-semibold text-base mb-1 font-sans">How this helps</h3>
                  <p className="text-gray-700 text-sm font-sans">
                    This helps us show you the right options and avoid unnecessary steps later.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div
            onClick={() => handleOptionSelect("business-owner")}
            className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm ${
              selectedOption === "business-owner" ? "border-purple-500" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-bold font-serif text-2xl text-slate-950">I'm a Business Owner</h2>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedOption === "business-owner" ? "border-purple-500 bg-purple-500" : "border-gray-300"
                }`}
              >
                {selectedOption === "business-owner" && <div className="w-3 h-3 rounded-full bg-white" />}
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Best if you earn income through your own business.</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                >
                  <g clipPath="url(#clip0_8360_1073)">
                    <path
                      d="M9.5 0.791626V18.2083M13.4583 3.95829H7.52083C6.78596 3.95829 6.08119 4.25022 5.56156 4.76985C5.04193 5.28948 4.75 5.99426 4.75 6.72913C4.75 7.464 5.04193 8.16877 5.56156 8.6884C6.08119 9.20803 6.78596 9.49996 7.52083 9.49996H11.4792C12.214 9.49996 12.9188 9.79189 13.4384 10.3115C13.9581 10.8311 14.25 11.5359 14.25 12.2708C14.25 13.0057 13.9581 13.7104 13.4384 14.2301C12.9188 14.7497 12.214 15.0416 11.4792 15.0416H4.75"
                      stroke="#24993F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8360_1073">
                      <rect width="19" height="19" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-gray-700 text-sm">Accepts payments from customers.</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                >
                  <g clipPath="url(#clip0_8360_1077)">
                    <path d="M19 0H0V19H19V0Z" fill="white" fillOpacity="0.01" />
                    <path d="M19 0H0V19H19V0Z" fill="white" fillOpacity="0.01" />
                    <path
                      d="M15.8335 1.58337H3.16692C2.72971 1.58337 2.37527 1.93781 2.37526 2.37502L2.375 16.625C2.37499 17.0622 2.72944 17.4167 3.16667 17.4167H15.8335C16.2708 17.4167 16.6252 17.0623 16.6252 16.625V2.37504C16.6252 1.93782 16.2708 1.58337 15.8335 1.58337Z"
                      stroke="#C4320A"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M13.8541 3.95837H5.14575V7.52087H13.8541V3.95837Z" stroke="#C4320A" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M4.75 11.0834L7.52083 13.8542" stroke="#C4320A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.52083 11.0834L4.75 13.8542" stroke="#C4320A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.3333 10.9972H1.66659" stroke="#C4320A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_8360_1077">
                      <rect width="19" height="19" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-gray-700 text-sm">Manages business expenses.</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                >
                  <path d="M11.3333 8.33337L14.3333 5.33337L11.3333 2.33337" fill="#6B6B6B" />
                  <path
                    d="M11.3333 8.33337L14.3333 5.33337L11.3333 2.33337"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.66659 5.33057H14.3333"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.66675 14L1.66675 11L4.66675 8"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.3333 10.9972H1.66659"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700 text-sm">Income from multiple clients or platforms.</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => handleOptionSelect("independent-contractor")}
            className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm ${
              selectedOption === "independent-contractor" ? "border-purple-500" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-bold font-serif text-2xl text-slate-950">I'm an Independent Contractor</h2>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedOption === "independent-contractor" ? "border-purple-500 bg-purple-500" : "border-gray-300"
                }`}
              >
                {selectedOption === "independent-contractor" && <div className="w-3 h-3 rounded-full bg-white" />}
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Best if you work for yourself and earn income per job, contract, or gig.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                >
                  <g clipPath="url(#clip0_8363_1395)">
                    <path d="M19 0H0V19H19V0Z" fill="white" fillOpacity="0.01" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.34383 12.6667C5.89036 12.6667 6.33341 12.2236 6.33341 11.6771C6.33341 11.1306 5.89036 10.6875 5.34383 10.6875C4.7973 10.6875 4.35425 11.1306 4.35425 11.6771C4.35425 12.2236 4.7973 12.6667 5.34383 12.6667Z"
                      fill="#04BF8A"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.6563 12.6667C14.2029 12.6667 14.6459 12.2236 14.6459 11.6771C14.6459 11.1306 14.2029 10.6875 13.6563 10.6875C13.1098 10.6875 12.6667 11.1306 12.6667 11.6771C12.6667 12.2236 13.1098 12.6667 13.6563 12.6667Z"
                      fill="#04BF8A"
                    />
                    <path
                      d="M2.77075 14.6458C2.11492 14.6458 1.58325 14.1142 1.58325 13.4583V9.78092C1.58325 8.88104 2.09184 8.05841 2.89686 7.65629L3.1668 7.52143L4.08116 3.59889C4.24824 2.88213 4.88715 2.375 5.62313 2.375H13.4164C14.1579 2.375 14.8001 2.88958 14.9617 3.61323L15.8345 7.52143L16.1038 7.65605C16.9083 8.05838 17.4166 8.88072 17.4166 9.78029V13.4583C17.4166 14.1142 16.8849 14.6458 16.2291 14.6458H15.4386V15.0417C15.4386 15.9161 14.7292 16.625 13.8547 16.625C12.9802 16.625 12.2708 15.9161 12.2708 15.0417V14.6458H6.72909V15.0418C6.72909 15.9162 6.02027 16.625 5.14587 16.625C4.27147 16.625 3.56263 15.9162 3.56263 15.0418V14.6458H2.77075Z"
                      stroke="#04BF8A"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.54175 8.70837H13.4584L12.8045 5.76579C12.724 5.4036 12.4028 5.14587 12.0317 5.14587H6.96845C6.5974 5.14587 6.27614 5.4036 6.19566 5.76579L5.54175 8.70837Z"
                      stroke="#04BF8A"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8363_1395">
                      <rect width="19" height="19" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-sm text-slate-700">Gig workers(Uber, Doordash, TaskRabbit, etc).</span>
              </div>
              <div className="flex items-start gap-3">
                <img src="/images/freelancers.png" alt="Freelancers icon" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">Freelancers or 1099 contractors.</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                >
                  <path d="M11.3333 8.33337L14.3333 5.33337L11.3333 2.33337" fill="#6B6B6B" />
                  <path
                    d="M11.3333 8.33337L14.3333 5.33337L11.3333 2.33337"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.66659 5.33057H14.3333"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.66675 14L1.66675 11L4.66675 8"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.3333 10.9972H1.66659"
                    stroke="#333333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700 text-sm">Income from multiple clients or platforms.</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedOption("not-sure")}
            className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm ${
              selectedOption === "not-sure" ? "border-purple-500" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-bold font-serif text-2xl text-slate-950">Other income situations</h2>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedOption === "not-sure" ? "border-purple-500 bg-purple-500" : "border-gray-300"
                }`}
              >
                {selectedOption === "not-sure" && <div className="w-3 h-3 rounded-full bg-white" />}
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Choose this option if you do not earn contractor or business income.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                >
                  <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="2"/>
                  <path d="M6 10L9 13L14 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-700 text-sm">W-2 employee.</span>
              </div>
              
              <div className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                >
                  <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="2"/>
                  <path d="M6 10L9 13L14 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-700 text-sm">Unemployed.</span>
              </div>
              
              <div className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                >
                  <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="2"/>
                  <path d="M6 10L9 13L14 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-700 text-sm">Retired or disabled.</span>
              </div>
              
              <div className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                >
                  <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="2"/>
                  <path d="M6 10L9 13L14 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-700 text-sm">Other non-contractor income.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="px-4 lg:px-8 pb-6">
        <div className="max-w-md mx-auto">
          <CTAButton onClick={handleContinue} disabled={!selectedOption}>
            Add a few details
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
