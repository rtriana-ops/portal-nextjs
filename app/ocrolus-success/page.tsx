'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { CTAButton } from '@/components/cta-button'
import { Upload, MessageCircle } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: string
}

const MAX_FILE_SIZE = 20 * 1024 * 1024
const MAX_FILES = 5

export default function OcrolusSuccessPage() {
  const router = useRouter()
  const [additionalFiles, setAdditionalFiles] = useState<UploadedFile[]>([])
  const [userEmail] = useState('h*****@fundo.com')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleAdditionalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        return
      }

      if (file.type !== 'application/pdf') {
        return
      }

      if (additionalFiles.length >= MAX_FILES) {
        return
      }

      const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
      setAdditionalFiles([...additionalFiles, {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: `${sizeMB} MB`
      }])
    })
  }

  const handleRemoveFile = (fileId: string) => {
    setAdditionalFiles(additionalFiles.filter(f => f.id !== fileId))
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={100} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-8 lg:py-12">
        <div className="max-w-md mx-auto space-y-8">
          {/* Main Title */}
          <div className="text-center space-y-4">
            <img 
              src="/images/man-reviewing-checklist-new.svg" 
              alt="Data verification" 
              width="150" 
              height="196"
              className="mx-auto"
            />
            <h1 className="text-3xl font-bold text-gray-900 lg:text-xl">
              We&apos;re reviewing your bank statement
            </h1>
          </div>

          {/* Notification Box */}
          <div className="bg-white rounded-2xl p-5 flex gap-4 border border-gray-200">
            <div className="bg-green-600 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 text-sm">
                We&apos;ll email you at <span className="font-bold">{userEmail}</span> when your <span className="font-bold">documents are reviewed and next steps are ready</span>.
              </p>
            </div>
          </div>

          {/* Optional Upload Section */}
          <div className="space-y-4">
            <p className="text-center text-gray-900 text-base">
              You can upload additional bank statements if you&apos;d like, but it&apos;s not required.
            </p>

            {/* Upload Area */}
            <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="w-8 h-8 text-gray-500" />
              <div className="text-center">
                <p className="font-medium text-gray-600 text-sm">Drag & drop your documents or click to browse.</p>
                <p className="text-xs text-gray-500 mt-1">ONLY PDF FILES will be accepted (max 20 MB).</p>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleAdditionalFileUpload}
                className="hidden"
              />
            </label>

            {/* Uploaded Additional Files */}
            {additionalFiles.length > 0 && (
              <div className="space-y-2">
                {additionalFiles.map((file) => (
                  <div
                    key={file.id}
                    className="border border-gray-300 rounded-lg p-3 flex items-center justify-between gap-3 border-dashed"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-medium text-gray-900 truncate text-xs">{file.name}</span>
                      <span className="text-xs text-gray-600 flex-shrink-0">{file.size}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Continue Button */}
          <CTAButton onClick={() => router.push('/application-completed')}>
            Upload your statements
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
