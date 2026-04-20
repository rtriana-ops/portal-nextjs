'use client'

import { useState } from 'react'
import { ChevronUp } from 'lucide-react'

interface FloatingMenuProps {
  options: string[]
  onOptionSelect: (option: string) => void
  activeOption?: string
}

export function FloatingMenu({ options, onOptionSelect, activeOption }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-[140px] right-4 z-50">
      {/* Menu Items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-[#e5e7eb] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] overflow-hidden">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                onOptionSelect(option)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left text-[14px] font-['Inter:Regular',sans-serif] transition-colors border-b border-[#e5e7eb] last:border-b-0 ${activeOption === option
                ? 'bg-[#2563eb] text-white'
                : 'text-[#111827] hover:bg-[#f3f4f6]'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-[#2563eb] text-white rounded-full shadow-lg hover:bg-[#1d4ed8] transition-colors flex items-center justify-center"
      >
        <ChevronUp
          size={24}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms'
          }}
        />
      </button>
    </div>
  )
}
