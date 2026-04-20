'use client'

import { Outfit } from 'next/font/google'
import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { CTAButton } from '@/components/cta-button'
import { ChevronDown } from 'lucide-react'

const outfit = Outfit({ subsets: ['latin'] })

interface FAQItem {
  id: string
  question: string
  answer: string
  isOpen: boolean
}

const initialFAQs: FAQItem[] = [
  {
    id: 'credit-score',
    question: 'Does this affect my credit score?',
    answer: 'No, this does not affect your credit score. We do a soft credit check that does not impact your credit score.',
  },
  {
    id: 'funding-speed',
    question: 'How fast can I get funded?',
    answer: 'Most of our customers receive funding within 24-48 hours. In some cases, it can be as fast as the same day.',
  },
  {
    id: 'requirements',
    question: 'What are the requirements?',
    answer: 'You must be at least 18 years old, have a valid bank account, and be a U.S. citizen or permanent resident.',
  },
]

const audienceItems = [
  {
    id: 'self-employed',
    icon: '🔧',
    title: 'Self-employed',
    description: 'Independent contractors such as barbers, cleaners, etc.',
  },
  {
    id: 'contractors',
    icon: '🚗',
    title: 'Contractors',
    description: 'Independent transport such as truck drivers, dispatchers, etc.',
  },
  {
    id: 'gig-workers',
    icon: '📱',
    title: 'Gig Workers',
    description: '1099 Gig Workers on Uber, Doordash, Taskrabbit, etc.',
  },
  {
    id: 'small-businesses',
    icon: '🏢',
    title: 'Small Businesses',
    description: 'Business owners such as electricians, plumbers, etc.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Apply Online',
    description: 'Take two minutes to submit your basic info.',
  },
  {
    number: 2,
    title: 'Get Approved',
    description: 'Connect your bank securely to receive a fast decision.',
  },
  {
    number: 3,
    title: 'Get Funded',
    description: 'Funds deposited as fast as the same business day.',
  },
]

export default function Iteration1EmailPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const toggleFAQ = (id: string) => {
    setFaqs(faqs.map(faq =>
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("This email looks incorrect. Check it and try again.")
      return
    }

    if (!validateEmail(email)) {
      setError("This email looks incorrect. Check it and try again.")
      return
    }

    setError('')
    setIsSubmitting(true)
    setTimeout(() => {
      console.log('Email submitted:', email)
      setIsSubmitting(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={75} />
        </div>
      </div>

      <main className="px-4 lg:px-8 pt-4 lg:py-7">
        {/* Hero Section */}
        <section className="bg-transparent py-3 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <h1 className={`text-[28px] lg:text-5xl font-bold mb-6 lg:mb-9 ${outfit.className}`}>
              Let's start <span className="text-cyan-500">your application</span>
            </h1>

            <div className="grid grid-cols-1 gap-8 lg:gap-[72px] lg:grid-cols-[1fr_520px] max-w-[1200px] mx-auto">
              {/* Left Column - Image and Copy */}
              <div className="flex flex-col justify-start">
                {/* Hero Image Card */}
                <div className="relative rounded-3xl overflow-hidden" style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url('https://vurlgcqw75u06wd2.public.blob.vercel-storage.com/baclk-man-delivering-product.webp')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  minHeight: '360px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Built for independent workers
                  </div>

                  {/* Text Overlay */}
                  <div className="p-6 text-white">
                    <h2 className={`text-2xl font-bold mb-3 ${outfit.className}`}>Get the support to move forward.</h2>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_6927_158)">
                            <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01" />
                            <path d="M12 22C14.7614 22 17.2614 20.8807 19.0711 19.0711C20.8807 17.2614 22 14.7614 22 12C22 9.2386 20.8807 6.7386 19.0711 4.92893C17.2614 3.11929 14.7614 2 12 2C9.2386 2 6.7386 3.11929 4.92893 4.92893C3.11929 6.7386 2 9.2386 2 12C2 14.7614 3.11929 17.2614 4.92893 19.0711C6.7386 20.8807 9.2386 22 12 22Z" stroke="#06B6D4" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M8 12L11 15L17 9" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <defs>
                            <clipPath id="clip0_6927_158">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Get up to $10,000
                      </li>
                      <li className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_6927_158)">
                            <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01" />
                            <path d="M12 22C14.7614 22 17.2614 20.8807 19.0711 19.0711C20.8807 17.2614 22 14.7614 22 12C22 9.2386 20.8807 6.7386 19.0711 4.92893C17.2614 3.11929 14.7614 2 12 2C9.2386 2 6.7386 3.11929 4.92893 4.92893C3.11929 6.7386 2 9.2386 2 12C2 14.7614 3.11929 17.2614 4.92893 19.0711C6.7386 20.8807 9.2386 22 12 22Z" stroke="#06B6D4" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M8 12L11 15L17 9" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <defs>
                            <clipPath id="clip0_6927_158">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        No credit check
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="flex flex-col justify-start lg:sticky lg:top-24">
                <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-lg text-sm">
                  <h2 className={`text-lg font-bold mb-3 ${outfit.className}`}>First, enter your email</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError('')
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${error && !isFocused
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-blue-400'
                          }`}
                        style={{ minHeight: '58px' }}
                        required
                      />
                      {error && !isFocused && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                    </div>

                    <CTAButton
                      type="submit"
                      disabled={email.length < 3}
                      isLoading={isSubmitting}
                    >
                      Get Your Advance
                    </CTAButton>
                  </form>

                  <p className="text-xs text-gray-600 mt-6 leading-relaxed text-center">
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </a>
                    ,{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms and Conditions
                    </a>
                    {' '}and consent to receive offers and updates from Fundo via email.
                    <br />
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms of Service
                    </a>
                    {' '}apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Audience Section */}
        <section className="px-4 lg:px-8 py-16 lg:py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="inline-block border border-gray-300 rounded-full bg-gray-50 px-4 py-2 mb-3">
                <p className={`text-xs font-normal text-gray-600 uppercase tracking-wide ${outfit.className}`}>
                  Our Audience
                </p>
              </div>
              <h2 className={`text-4xl lg:text-5xl font-bold ${outfit.className}`}>
                Who we <span className="text-cyan-500">work with</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {audienceItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className={`text-lg font-bold text-gray-900 mb-2 ${outfit.className}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="px-4 lg:px-8 py-16 lg:py-16 bg-transparent border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="inline-block border border-gray-300 rounded-full bg-gray-50 px-4 py-2 mb-3">
                <p className={`text-xs font-normal text-gray-600 uppercase tracking-wide ${outfit.className}`}>
                  What to Expect
                </p>
              </div>
              <h2 className={`text-4xl lg:text-5xl font-bold ${outfit.className}`}>
                Support that helps you <span className="text-cyan-500">move forward</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl">
                Completing our online application is simple, quick, and doesn't affect your credit score at all.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold text-gray-900 ${outfit.className}`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 lg:px-8 py-16 lg:py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-4xl lg:text-5xl font-bold ${outfit.className}`}>
                Frequently Asked <span className="text-cyan-500">Questions</span>
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-left font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-500 flex-shrink-0 transition-transform ${faq.isOpen ? 'transform rotate-180' : ''
                        }`}
                    />
                  </button>

                  {faq.isOpen && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-white">
                      <p className="text-gray-600 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
