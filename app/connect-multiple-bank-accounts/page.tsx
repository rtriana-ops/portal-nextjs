'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { CTAButton } from '@/components/cta-button'

interface BankAccount {
  id: string
  name: string
  type: string
  accountNumber: string
}

export default function ConnectMultipleBankAccountsPage() {
  const router = useRouter()
  const [selectedAccountId, setSelectedAccountId] = useState<string>('account-1')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bankAccounts: BankAccount[] = [
    { id: 'account-1', name: 'Adv SafeBalance Banking', type: 'Checking Bank Account', accountNumber: '***********7793' },
    { id: 'account-2', name: 'Small Business Checking', type: 'Checking Bank Account', accountNumber: '***********6578' },
    { id: 'account-3', name: 'Account ********6578', type: 'Checking Bank Account', accountNumber: '' },
    { id: 'account-4', name: 'Everyday Checking Account 3...', type: 'Checking Bank Account', accountNumber: '***********6578' },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0)
    }
  }, [isLoading])

  const handleContinue = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push('/income')
    }, 300)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] animate-in fade-in slide-in-from-right-2 duration-300">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={60} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif text-blue-900">
              Where should we send your funds?
            </h1>
            <p className="text-muted-foreground text-base">
              Select the account where you receive income and want your funds deposited.
            </p>
          </div>

          {/* Bank Accounts Selection */}
          <div className="space-y-3">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                onClick={() => setSelectedAccountId(account.id)}
                className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm ${
                  selectedAccountId === account.id ? 'border-purple-500' : 'border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      selectedAccountId === account.id ? 'bg-purple-500' : 'bg-gray-300'
                    }`}>
                      <svg
                        className={`w-6 h-6 text-white ${
                          selectedAccountId === account.id ? 'text-white' : 'text-gray-500'
                        }`}
                        viewBox="0 0 26 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.16663 10.125H23.8333L13 3.375L2.16663 10.125Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M23.8333 23.625H2.16663Z" fill="currentColor"/>
                        <path d="M23.8333 23.625H2.16663" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.875 10.125V23.625Z" fill="currentColor"/>
                        <path d="M4.875 10.125V23.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.2916 10.125V23.625Z" fill="currentColor"/>
                        <path d="M10.2916 10.125V23.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.7084 10.125V23.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21.125 10.125V23.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{account.name}</h3>
                      <p className="text-gray-600 text-base">{account.type}</p>
                      {account.accountNumber && <p className="text-gray-600 text-base">{account.accountNumber}</p>}
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAccountId === account.id ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                    }`}
                  >
                    {selectedAccountId === account.id && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Use a different account card */}
            <div
              onClick={() => setSelectedAccountId('different-account')}
              className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm ${
                selectedAccountId === 'different-account' ? 'border-purple-500' : 'border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-gray-900">Use a different account?</h3>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedAccountId === 'different-account' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                  }`}
                >
                  {selectedAccountId === 'different-account' && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">i</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  To link a new bank account you will be re directed to connect with Plaid.
                </p>
              </div>
            </div>
          </div>

          <CTAButton onClick={handleContinue} disabled={isSubmitting} isLoading={isSubmitting}>
            Continue
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
