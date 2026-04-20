"use client"

import { AlertTriangle, AlertCircle, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function showSystemErrorToast() {
  console.log("[v0] showSystemErrorToast called")

  const toastInstance = toast({
    variant: "system",
    duration: 8000,
    description: (
      <div className="flex items-center gap-3 justify-between w-full bg-blue-600">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
          <span className="text-white text-sm font-medium">Something went wrong. Please try again later.</span>
        </div>
        <button
          onClick={() => toastInstance.dismiss()}
          className="text-white/50 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ),
  })

  console.log("[v0] Toast triggered")
}

export function showCustomNotification(message: string, options?: { duration?: number; position?: "top" | "bottom" }) {
  console.log("[v0] showCustomNotification called with message:", message, "options:", options)

  const { duration = 8000, position = "top" } = options || {}

  const toastInstance = toast({
    variant: "system",
    duration,
    description: (
      <div className="flex items-center gap-3 justify-between w-full">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />
          <span className="text-white text-sm font-medium">{message}</span>
        </div>
        <button
          onClick={() => toastInstance.dismiss()}
          className="text-white/50 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ),
  })

  console.log("[v0] Custom notification triggered at position:", position)
}

export function showExpiredNotification() {
  console.log("[v0] showExpiredNotification called")

  showCustomNotification("This offer has expired. Please check back later for new opportunities.", { position: "top" })
}
