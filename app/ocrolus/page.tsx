'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { CTAButton } from '@/components/cta-button'
import { Link2, Clock, Upload, AlertTriangle, X, FileText, AlertCircle } from 'lucide-react'
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
const MAX_FILES = 5

interface UploadedFile {
  id: string
  name: string
  size: string
}

interface FileError {
  fileName: string
  message: string
}

export default function OcrolusPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string>('plaid')
  const [showUploadSheet, setShowUploadSheet] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [validationError, setValidationError] = useState<FileError | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleContinue = () => {
    if (selectedOption === 'plaid') {
      router.push('/bank-verification')
    } else if (selectedOption === 'manual') {
      // Open sheet for manual upload
      setShowUploadSheet(true)
    }
  }

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== fileId))
    setValidationError(null)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setValidationError(null)

    Array.from(files).forEach(file => {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setValidationError({
          fileName: file.name,
          message: 'File size must be less than 20 MB'
        })
        return
      }

      // Validate file type
      if (file.type !== 'application/pdf') {
        setValidationError({
          fileName: file.name,
          message: 'Only PDF files are accepted'
        })
        return
      }

      // Check max files limit
      if (uploadedFiles.length >= MAX_FILES) {
        setValidationError({
          fileName: file.name,
          message: `Maximum ${MAX_FILES} files allowed`
        })
        return
      }

      // Check if file already exists
      if (uploadedFiles.some(f => f.name === file.name)) {
        setValidationError({
          fileName: file.name,
          message: 'This file has already been uploaded'
        })
        return
      }

      // File is valid, add it
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
      setUploadedFiles([...uploadedFiles, { 
        id: Date.now().toString() + Math.random(), 
        name: file.name, 
        size: `${sizeMB} MB` 
      }])
    })
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={75} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-8 lg:py-7">
        <div className="max-w-md mx-auto space-y-3">
          {/* Illustration */}
          <div className="flex justify-center -mx-4">
            <img 
              src="/images/reconnect-bank-account.svg" 
              alt="Connect your bank account" 
              width="208"
              height="auto"
              className="max-w-sm h-auto w-48"
            />
          </div>

          {/* Title and Description */}
          <div className="space-y-2">
            <h1 className="font-bold text-[#05055c] text-3xl">
              Connect your bank account
            </h1>
            <p className="text-gray-600 text-base">
              We need your bank details to continue.
            </p>
          </div>

          {/* Selection Cards */}
          <div className="space-y-4">
            {/* Connect with Plaid Card */}
            <div
              onClick={() => setSelectedOption('plaid')}
              className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm ${
                selectedOption === 'plaid' ? 'border-purple-500' : 'border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-bold font-serif text-2xl text-slate-950">Connect with Plaid</h2>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption === 'plaid' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                  }`}
                >
                  {selectedOption === 'plaid' && <div className="w-3 h-3 rounded-full bg-white" />}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Link2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Your connection is powered by Plaid, trusted by millions.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">This process takes less than a minute.</span>
                </div>
              </div>
            </div>

            {/* Upload Statements Card */}
            <div
              onClick={() => setSelectedOption('manual')}
              className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all shadow-sm ${
                selectedOption === 'manual' ? 'border-purple-500' : 'border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-bold font-serif text-2xl text-slate-950">Upload your statements manually</h2>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption === 'manual' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                  }`}
                >
                  {selectedOption === 'manual' && <div className="w-3 h-3 rounded-full bg-white" />}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Upload className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">LAST 3 MONTHS of your statements ONLY IN PDF format.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Review may take up to 3 business days.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <CTAButton onClick={handleContinue}>
            Continue
          </CTAButton>
        </div>
      </main>

      {/* Upload Documents Sheet */}
      <Sheet open={showUploadSheet} onOpenChange={setShowUploadSheet}>
        <SheetContent 
          side="bottom" 
          className="h-auto max-h-[90vh] rounded-t-3xl p-0 md:rounded-3xl md:max-h-[80vh] md:w-[90%] md:bottom-auto md:top-1/2 md:left-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 lg:w-[50%]"
        >
          <div className="flex flex-col h-full">
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 pt-6">
              <div className="space-y-4">
                {/* Title */}
                <h2 className="font-bold text-gray-900 text-lg">
                  Upload your bank statements manually
                </h2>

                {/* Warning Box */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-700 flex-shrink-0 mt-0.5 min-w-fit" />
                  <p className="text-red-700 text-sm font-sans leading-snug">
                    Manual review take up to 3 Days. For faster processing, we recommend using Plaid.
                  </p>
                </div>

                {/* Validation Error */}
                {validationError && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5 min-w-fit" />
                    <div className="flex-1">
                      <p className="text-red-700 text-sm font-medium">{validationError.fileName}</p>
                      <p className="text-red-600 text-sm">{validationError.message}</p>
                    </div>
                  </div>
                )}

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-4 flex items-center justify-between gap-3 py-2 px-2"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="w-6 h-6 text-gray-600 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 line-clamp-2 text-xs">{file.name}</p>
                            <p className="text-gray-600 text-xs">{file.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(file.id)}
                          className="flex-shrink-0 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    ))}
                    <p className="text-xs text-gray-600 text-center">{uploadedFiles.length} / {MAX_FILES} files</p>
                  </div>
                )}

                {/* Upload Area */}
                {uploadedFiles.length < MAX_FILES && (
                  <label className="border-2 border-dashed border-purple-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-purple-50 transition-colors">
                    <Upload className="w-8 h-8 text-gray-600" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900 text-sm">Drag & drop your documents or click to browse.</p>
                      <p className="text-xs text-gray-600 mt-1">ONLY PDF FILES will be accepted (max 20 MB).</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <div className="px-6 pb-8 pt-4 border-t">
              <CTAButton 
                onClick={() => {
                  setShowUploadSheet(false)
                  router.push('/ocrolus-success')
                }}
                disabled={uploadedFiles.length === 0}
              >
                Upload your statements
              </CTAButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
