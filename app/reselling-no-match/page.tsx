"use client"

import { Header } from "@/components/header"
import { CTAButton } from "@/components/cta-button"
import { MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResellingNoMatchPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <main className="px-4 py-12 lg:py-16">
        <div className="max-w-md mx-auto space-y-8 text-center">
          {/* Illustration */}
          <div className="flex justify-center">
            <img src="/images/denied-illustration.svg" alt="Person with documents" className="object-contain w-44 h-48" style={{ width: '172px', height: '193px' }} />
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#05055c] leading-tight font-serif">
              We couldn't find a funding option this time.
            </h1>
          </div>

          {/* Contact box */}
          <div className="p-6 bg-white border-2 border-gray-300 rounded-3xl">
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-6 h-6 text-gray-800 flex-shrink-0 mt-0.5" />
                <h2 className="text-xl font-bold text-gray-900 font-sans">Have Questions?</h2>
              </div>
              <div className="space-y-1 pl-9">
                <p className="text-base text-gray-900 font-sans">support@fundo.com</p>
                <p className="text-base text-gray-900 font-sans">1-866-393-8636 (9am and 5:00 EST)</p>
              </div>
            </div>
          </div>

          {/* Visit Homepage Button */}
          <CTAButton onClick={() => window.location.href = "https://fundo.com/"}>
            Visit our homepage
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
