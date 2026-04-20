'use client'

import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"
import React from "react"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPortalBasePage = pathname === "/portal-base-design"
  const footerBg = isPortalBasePage ? "bg-transparent" : "bg-white"

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-[rgba(232,232,232,1)]">{children}</div>
      <Footer bgColor={footerBg} />
    </div>
  )
}
