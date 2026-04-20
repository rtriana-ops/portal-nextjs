import type React from "react"

export default function PortalBaseDesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
