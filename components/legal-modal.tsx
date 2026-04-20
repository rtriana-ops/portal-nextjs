'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LegalModal({ isOpen, onClose }: LegalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 lg:inset-0 lg:flex lg:items-center lg:justify-center z-50 animate-in slide-in-from-bottom lg:fade-in duration-300">
        <div className="bg-white rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[85vh] lg:max-h-[90vh] lg:max-w-2xl lg:w-full lg:mx-4 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 py-4">
            <h1 className="font-serif font-bold text-blue-900 text-lg">Legal Information</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 space-y-4 flex-1">
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="text-gray-800 leading-relaxed">
                This is a legal binding text that it is a short version of a previous longer version of this text. Length of the text should not matter in legal matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
