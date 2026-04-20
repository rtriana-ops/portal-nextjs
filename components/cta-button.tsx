import type { ButtonHTMLAttributes, ReactNode } from "react"

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
}

export function CTAButton({ children, disabled, className, isLoading = false, ...props }: CTAButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`w-full py-4 px-6 flex items-center justify-center gap-3 transition-all duration-200 text-white font-sans font-normal text-lg rounded-2xl ${
        disabled || isLoading
          ? "cursor-not-allowed opacity-50"
          : "bg-blue-900 hover:bg-blue-800 active:scale-[0.98] active:bg-blue-900"
      }
        ${className}
      `}
      style={disabled || isLoading ? { backgroundColor: "#0D7BC5", ...props.style } : props.style}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {children}
          <span className="text-lg">→</span>
        </>
      )}
    </button>
  )
}
