"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"

export default function CustomerPortalPage() {
  const router = useRouter()

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/portal")
    }, 3000)

    return () => {
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#f7f9fd] flex flex-col animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-xl w-full text-center space-y-8">
          {/* Illustration */}
          <div className="relative w-full h-[166px] max-w-[213px] mx-auto">
            <Image
              src="/images/transition-to-portal.png"
              alt="Customer portal illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-brand leading-tight font-serif text-blue-950">
              Taking you to the customer portal
            </h1>
            <p className="text-base lg:text-lg text-foreground font-sans">
              You'll be able to sign in and continue your application there.
            </p>
          </div>

          {/* Help Link */}
          <div className="pt-8">
            <p className="text-base font-sans text-foreground">
              Taking too long?{" "}
              <button
                onClick={() => router.push("/portal")}
                className="text-accent underline hover:no-underline font-medium transition-all"
              >
                Click Here
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
