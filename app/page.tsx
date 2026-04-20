"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home")
    }, 4000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-[#f7f9fd] flex flex-col animate-in fade-in duration-300">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-48 h-48 relative">
          <Image
            src="/images/logo-1-5bremix-5d-20-283-29.gif"
            alt="Loading animation"
            width={192}
            height={192}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      </main>
    </div>
  )
}
