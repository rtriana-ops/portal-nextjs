"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { InputField } from "@/components/input-field"
import { CTAButton } from "@/components/cta-button"
import { showSystemErrorToast } from "@/components/system-error-toast"

export default function NotificacionPage() {
  useEffect(() => {
    showSystemErrorToast()
  }, [])

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={40} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif text-blue-900">Notification Test Page</h1>
            <p className="text-muted-foreground text-base">This page displays the system error toast notification.</p>
          </div>

          <div className="space-y-6">
            <InputField label="Test Input" type="text" placeholder="Test placeholder" disabled />

            <CTAButton disabled>Get Your Advance</CTAButton>
          </div>
        </div>
      </main>
    </div>
  )
}
