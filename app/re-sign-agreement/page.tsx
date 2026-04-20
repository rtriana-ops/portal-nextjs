'use client'

import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { Checkbox } from '@/components/ui/checkbox'
import { CTAButton } from '@/components/cta-button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function ReSignAgreementPage() {
  const [checkedItems, setCheckedItems] = useState([false, false, false])
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  const handleCheckChange = (index: number) => {
    const newChecked = [...checkedItems]
    newChecked[index] = !newChecked[index]
    setCheckedItems(newChecked)
  }

  const checklistItems = [
    'You hereby acknowledge the bank account information provided on the agreement and can be seen by clickinghereis accurate and belongs to the merchant signing below',
    'I consent to the processing and storage of my personal information and the terms outlined in this agreement.'
  ]

  const legalText = 'This is a legal binding text that it is a short version of a previous longer version of this text. Length of the text should not matter in legal matters.'

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <style>{`
        iframe[title="Agreement Preview"]::-webkit-scrollbar {
          width: 8px;
        }
        iframe[title="Agreement Preview"]::-webkit-scrollbar-track {
          background: white;
        }
        iframe[title="Agreement Preview"]::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        iframe[title="Agreement Preview"]::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={50} currentStep={5} totalSteps={10} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-6">
          <h1 className="text-3xl text-[#05055c] font-serif text-blue-900 font-extrabold">Re-sign agreement.</h1>
          <p className="text-gray-600 leading-relaxed text-base">
            By checking the boxes, you acknowledge that you have read and agree to the terms below.
          </p>

          {/* Agreement Card - Figma Embed */}
          <iframe
            src="https://thus-break-70192079.figma.site/"
            className="w-full border-2 border-gray-300 shadow-sm h-[550px] rounded-xl"
            title="Agreement Preview"
            allowFullScreen
          />

          {/* Checklist Component */}
          <div className="space-y-6 pt-6">
            {/* First Checklist Item with Links */}
            <div className="flex items-start gap-4">
              <Checkbox
                checked={checkedItems[0] || false}
                onCheckedChange={() => handleCheckChange(0)}
                className="mt-1"
              />
              <p className="text-gray-600 leading-relaxed text-xs">
                By checking this box, you agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                  Payment Rights Purchase and Sale Agreement
                </a>
                , <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                  Terms and Conditions
                </a>
                , <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                  ACH Agreement
                </a>
                , and Electronic Signature Policy.
              </p>
            </div>

            {/* Rest of Checklist Items */}
            {checklistItems.map((item, index) => (
              <div key={index + 1} className="flex items-start gap-4">
                <Checkbox
                  checked={checkedItems[index + 1] || false}
                  onCheckedChange={() => handleCheckChange(index + 1)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="text-gray-600 leading-relaxed text-xs">
                    {index === 0 ? (
                      <>
                        {item}{' '}
                        <button
                          onClick={() => setIsLearnMoreOpen(!isLearnMoreOpen)}
                          className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-1"
                        >
                          Learn More
                          {isLearnMoreOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </>
                    ) : (
                      item
                    )}
                  </p>
                  {index === 0 && isLearnMoreOpen && (
                    <p className="text-gray-600 text-xs leading-relaxed mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                      {legalText}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Verify Button */}
            <CTAButton className="mt-8">
              Sign & Continue
            </CTAButton>
          </div>
        </div>
      </main>
    </div>
  )
}
