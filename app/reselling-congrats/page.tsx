"use client"

import { Header } from "@/components/header"

export default function ResellingCongratsPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <main className="px-4 py-12 lg:py-16">
        <div className="max-w-md mx-auto space-y-8 text-center">
          {/* Celebration Image */}
          <div className="flex justify-center items-center h-fit scale-75">
            <img src="/images/reselling-congrats.png" alt="Celebration" className="block" />
          </div>

          {/* Main heading and description */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#05055c] leading-tight font-serif">
              We´ve found a match for you.
            </h1>
            <p className="text-base text-gray-600 font-sans leading-relaxed">
              You will be redirected to our partner´s website to complete your application. 
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
