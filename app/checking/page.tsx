"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import Image from "next/image"

export default function CheckingPage() {
  const [checks, setChecks] = useState([false, false, false])

  useEffect(() => {
    const timers = [
      setTimeout(() => setChecks([true, false, false]), 800),
      setTimeout(() => setChecks([true, true, false]), 1600),
      setTimeout(() => setChecks([true, true, true]), 2400),
    ]

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  const checkItems = [
    "Making sure your info looks right.",
    "Confirming your account status.",
    "Getting your next step ready.",
  ]

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <main className="px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-md mx-auto text-center space-y-12">
          <div className="flex justify-center">
            <Image
              src="/loader-animation.gif"
              alt="Loading"
              width={280}
              height={280}
              className="w-64 h-64 lg:w-72 lg:h-72"
            />
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-primary">Checking your number.</h1>

          <div className="space-y-4 text-left">
            {checkItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`
                  w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300
                  ${checks[index] ? "bg-success" : "bg-muted"}
                `}
                >
                  {checks[index] && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7L5.5 10.5L12 4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <p
                  className={`text-base transition-colors duration-300 ${checks[index] ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
