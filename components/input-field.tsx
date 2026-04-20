"use client"

import { forwardRef, type InputHTMLAttributes } from "react"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-foreground mb-2 font-sans">{label}</label>
        <div className="relative group">
          <input
            ref={ref}
            disabled={disabled}
            className={`w-full px-4 py-4 rounded-xl border-[1.5px] text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300/80"
                : disabled
                  ? "bg-disabled border-border cursor-not-allowed text-disabled-foreground"
                  : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/80 focus:bg-white"
            }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <div className="flex items-center gap-2 mt-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-red-500 flex-shrink-0">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <line x1="5" y1="5" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="11" y1="5" x2="5" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </div>
    )
  },
)

InputField.displayName = "InputField"
