'use client'

import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { AgreementCheckbox } from '@/components/agreement-checkbox'
import { BannerMaysProgramsContent } from '@/components/banner-mays-programs-content'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { CTAButton } from '@/components/cta-button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function ViewAgreementMaysProgramsPage() {
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [checkedItems, setCheckedItems] = useState([true, true, true])
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
  const [iframeContent, setIframeContent] = useState('')
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    const loadAgreement = async () => {
      try {
        const response = await fetch('https://vurlgcqw75u06wd2.public.blob.vercel-storage.com/agreement_poc_responsive.html')
        const html = await response.text()
        setIframeContent(html)
      } catch (error) {
        console.error('Error loading agreement:', error)
        setIframeContent('<p>Error loading agreement</p>')
      }
    }
    loadAgreement()
  }, [])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const checkScrollability = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
        if (iframeDoc) {
          const hasScroll = iframeDoc.documentElement.scrollHeight > iframeDoc.documentElement.clientHeight
          setShowScrollButton(hasScroll)
        }
      } catch (error) {
        console.error('Error checking scrollability:', error)
      }
    }

    iframe.addEventListener('load', checkScrollability)
    const timer = setTimeout(checkScrollability, 500)

    return () => {
      iframe.removeEventListener('load', checkScrollability)
      clearTimeout(timer)
    }
  }, [iframeContent])

  const handleScrollToBottom = () => {
    const iframe = iframeRef.current
    if (!iframe) return

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (iframeDoc) {
        iframeDoc.documentElement.style.scrollBehavior = 'smooth'
        iframeDoc.documentElement.scrollTop = iframeDoc.documentElement.scrollHeight
      }
    } catch (error) {
      console.error('Error scrolling iframe:', error)
    }
  }

  const handleCheckChange = (index: number) => {
    const newChecked = [...checkedItems]
    newChecked[index] = !newChecked[index]
    setCheckedItems(newChecked)
  }

  const checklistItems = [
    'You hereby acknowledge the bank account information provided on the agreement and can be seen by clicking here is accurate and belongs to the merchant signing below',
    'I USER NAME consent to the processing and storage of my personal information and the terms outlined in this agreement.'
  ]

  const legalText = 'The individual executing this agreement has the authority to execute this document and authorizes Fundo LLC to withdraw payments using the method described in the agreement.'

  // First two checkboxes are required, third is optional
  const isFormValid = checkedItems[0] && checkedItems[1]

  const handleSign = () => {
    if (isFormValid) {
      router.push('/documents-verification')
    }
  }

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

      {/* Banner Content - Centered without background */}
      <style>{`
        .banner-mays-programs-wrapper > div > div {
          background-image: linear-gradient(to right, #5BE4CF, #72F5E0) !important;
        }
        .banner-mays-programs-wrapper h2,
        .banner-mays-programs-wrapper p:not(.font-medium) {
          text-align: center !important;
        }
        .banner-mays-programs-wrapper .flex-1 {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .banner-mays-programs-wrapper .flex.items-start.gap-3 {
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        }
        .banner-mays-programs-wrapper button {
          position:relative !important;
          right: 0px !important;
        }
      `}</style>
      <div className="banner-mays-programs-wrapper">
        {showBanner && <BannerMaysProgramsContent onClose={() => setShowBanner(false)} />}
      </div>

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={50} currentStep={5} totalSteps={10} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-6">
          <h1 className="text-3xl text-[#05055c] font-serif text-blue-900 font-extrabold">Review agreement</h1>
          <p className="text-gray-600 leading-relaxed text-base">
            By checking the boxes, you acknowledge that you have read and agree to the terms below.
          </p>
        </div>

        {/* Agreement Card - HTML Content */}
        <div className="max-w-md lg:max-w-[1020px] mx-auto px-4 lg:px-0 relative">
          <iframe
            ref={iframeRef}
            srcDoc={iframeContent}
            className="w-full border-2 border-gray-300 shadow-sm h-[550px] rounded-xl pr-0 mt-8 pl-0"
            title="Agreement Preview"
            sandbox="allow-same-origin"
          />

          {/* Scroll To Button - Overlaid on iframe */}
          {showScrollButton && (
            <div className="absolute bottom-0 left-0 right-0 w-full bg-gray-100/50 backdrop-blur-sm flex items-center justify-center py-3 z-10 rounded-b-xl">
              <button
                onClick={handleScrollToBottom}
                className="hover:opacity-80 transition-opacity duration-300 flex items-center justify-center"
              >
                <ChevronDown size={24} className="text-gray-900" />
              </button>
            </div>
          )}
        </div>

        {/* Checklist Component */}
        <div className="max-w-md mx-auto space-y-6 pt-6">
          {/* First Checklist Item with Links */}
          <AgreementCheckbox
            checked={checkedItems[0] || false}
            onChange={() => handleCheckChange(0)}
            label={
              <span>
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
              </span>
            }
          />

          {/* Rest of Checklist Items */}
          {checklistItems.map((item, index) => (
            <div key={index + 1}>
              <AgreementCheckbox
                checked={checkedItems[index + 1] || false}
                onChange={() => handleCheckChange(index + 1)}
                label={
                  index === 0 ? (
                    <span>
                      {item}{' '}
                      <button
                        onClick={() => setIsLearnMoreOpen(!isLearnMoreOpen)}
                        className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-1"
                      >
                        Learn More
                        {isLearnMoreOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </span>
                  ) : (
                    item
                  )
                }
              />
              {index === 0 && isLearnMoreOpen && (
                <p className="text-gray-600 text-xs leading-relaxed mt-3 p-3 bg-gray-50 rounded border border-gray-200 ml-6">
                  {legalText}
                </p>
              )}
            </div>
          ))}

          {/* Verify Button */}
          <CTAButton className="mt-8" onClick={handleSign} disabled={!isFormValid}>
            Sign & Continue
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
