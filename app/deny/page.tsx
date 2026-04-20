"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"

export default function DenyPage() {
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const flow = searchParams.get("flow")
    setProgress(100)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={progress} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 font-serif text-blue-900">
              We're unable to continue at this time
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              We're unable to move forward with your application based on the information provided.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mt-4">
              In some cases, this can happen due to internal review or account-related restrictions. If you believe this
              is an error, our team is here to help.
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 leading-relaxed">
              Please contact us using the chat available on this page so we can review your situation.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
