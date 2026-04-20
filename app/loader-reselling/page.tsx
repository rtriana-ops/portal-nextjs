'use client'

import { Header } from '@/components/header'

export default function LoaderResellingPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fd] flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-6 bg-slate-50">
        <div className="text-center space-y-6 w-full max-w-md">
          {/* Loader Animation */}
          <div className="flex justify-center">
            <video
              width="100"
              height="100"
              autoPlay
              loop
              muted
              className="rounded-2xl object-cover"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            >
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Loading%20motion%20with%20rounded%20square%20%281%29-akwuUGs3LDjXMCmzwdcUUKlWKDy8Tl.webm" type="video/webm" />
            </video>
          </div>
          
          {/* Title */}
          <h1 className="text-xl font-bold text-blue-900 font-serif">
            Finding your<br />ideal match...
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-500 text-base font-sans">
            Please, do not close or refresh this page.
          </p>
        </div>
      </div>
    </div>
  )
}
