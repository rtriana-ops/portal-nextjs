import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fd] flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Not Found SVG */}
          <div className="w-full max-w-xs mx-auto h-32">
            <svg
              viewBox="0 0 354.13 148.09"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <image href="/images/not-found.svg" width="354.13" height="148.09" />
            </svg>
          </div>

          {/* Error Text */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-serif">We couldn't find this page.</h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-md mx-auto font-sans">
              The link may be broken or the page is no longer available.
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="w-full py-4 px-6 rounded-3xl flex items-center justify-center gap-3 transition-all duration-200 text-white font-sans font-normal text-lg bg-blue-900 hover:bg-blue-800 active:scale-[0.98] active:bg-blue-900 max-w-sm"
            >
              Continue application
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
