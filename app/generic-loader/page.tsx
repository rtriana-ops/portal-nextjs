'use client'

import { Footer } from '@/components/footer'

export default function GenericLoaderPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4" style={{ minWidth: '500px' }}>
          {/* Spinner */}
          <div className="flex justify-center -mb-2">
            <video
              width="100"
              height="100"
              autoPlay
              loop
              muted
              className="rounded-none object-cover"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            >
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Loading%20motion%20with%20rounded%20square%20%281%29-akwuUGs3LDjXMCmzwdcUUKlWKDy8Tl.webm" type="video/webm" />
            </video>
          </div>
          
          {/* Loading Text */}
          <h2 className="font-bold text-blue-900 font-serif text-xl">
            Loading text...
          </h2>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
