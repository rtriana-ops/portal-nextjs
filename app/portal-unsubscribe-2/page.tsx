"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"

export default function PortalUnsubscribe2Page() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResubscribe = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/portal-unsubscribe-3")
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] flex flex-col">
      <Header />

      <main className="flex-1 px-4 lg:px-8 py-8 lg:py-12 bg-gray-100">
        <div className="max-w-md mx-auto space-y-8 text-center">
          {/* Illustration */}
          <div className="flex justify-center pt-4">
            <img
              src="/images/sad-email.webp"
              alt="Person holding sad email"
              className="object-contain w-40 h-48"
            />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl lg:text-5xl text-blue-900 font-serif text-balance font-normal">
              You've been unsubscribed
            </h1>
          </div>

          {/* Warning Box */}
          <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white flex items-start gap-4">
            <span className="text-4xl flex-shrink-0 mt-1">🥺</span>
            <div className="flex-1 text-left">
              <p className="text-gray-900 font-sans text-base leading-relaxed">
                We're sorry to see you go — but <span className="font-bold">you're always welcome back.</span>
              </p>
            </div>
            <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Secondary Text */}
          <p className="text-gray-700 text-base leading-relaxed font-sans">
            <span className="font-bold">Changed your mind?</span> You can resubscribe anytime with one tap.
          </p>

          {/* Button */}
          <div className="space-y-4 pt-4">
            <button
              onClick={handleResubscribe}
              className="w-full py-4 px-6 rounded-full font-medium text-base flex items-center justify-center gap-2 transition-all duration-200 font-serif bg-blue-900 hover:bg-blue-800 active:scale-[0.98] active:bg-blue-900 text-white"
            >
              Re-subscribe
            </button>
            
            {/* Confirmation Text */}
            <p className="text-gray-600 text-sm font-sans">
              Your email preferences have been updated successfully.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {/* Copyright */}
          <p className="text-center text-gray-600 text-sm font-sans mb-8">
            @ 2025 Fundo | All Rights Reserved
          </p>

          {/* Links */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Link href="/faq" className="text-gray-700 text-sm font-sans hover:text-blue-600 transition-colors">
              FAQ
            </Link>
            <Link href="/terms" className="text-gray-700 text-sm font-sans hover:text-blue-600 transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/privacy" className="text-gray-700 text-sm font-sans hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/esign" className="text-gray-700 text-sm font-sans hover:text-blue-600 transition-colors">
              Esign
            </Link>
            <Link href="/messaging" className="text-gray-700 text-sm font-sans hover:text-blue-600 transition-colors">
              Messaging Terms
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 002.856-3.51 10 10 0 01-2.858.175c-.996 1.114-2.313 2.353-3.851 3.788a6.006 6.006 0 01-5.22-1.03c-1.504-1.004-2.822-2.26-3.99-3.702a4 4 0 00-.556 2.012 4 4 0 001.291 3.278c-.313-.01-.62-.01-.92-.03a4 4 0 003.946 3.28c-1.04.27-2.067.27-3.085 0a4 4 0 003.718 2.782a8.104 8.104 0 01-5.038 1.712 11.98 11.98 0 006.555 1.912c7.866 0 12.153-6.5 12.153-12.153 0-.185 0-.37-.007-.556a8.674 8.674 0 002.126-2.209z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.79.263-1.473.606-2.157 1.287-.68.684-1.024 1.369-1.287 2.157-.266.788-.467 1.658-.527 2.936C.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.527 2.936.263.79.606 1.473 1.287 2.157.684.68 1.369 1.024 2.157 1.287.788.266 1.658.467 2.936.527C8.333 23.985 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.936-.527.79-.263 1.473-.606 2.157-1.287.68-.684 1.024-1.369 1.287-2.157.266-.788.467-1.658.527-2.936.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.527-2.936-.263-.79-.606-1.473-1.287-2.157-.684-.68-1.369-1.024-2.157-1.287-.788-.266-1.658-.467-2.936-.527C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.171.054 1.805.244 2.227.408.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.171-.244 1.805-.408 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.171-.054-1.805-.244-2.227-.408-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.171.244-1.805.408-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
