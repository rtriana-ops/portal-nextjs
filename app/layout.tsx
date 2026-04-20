import type React from "react"
import type { Metadata, Viewport } from "next"
import { Outfit, Roboto, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { DebugHeader } from "@/components/debug-header"
import { Footer } from "@/components/footer"
import { LayoutContent } from "@/components/layout-content"
import "./globals.css"

const _outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-serif",
})

const _roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
})

const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Fundo - Fuel Your Business Growth",
  description: "Get the business funding you need with Fundo",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#00A3E0", // Fundo primary color
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_outfit.variable} ${_roboto.variable} ${_geistMono.variable}`}>
      <body className={`font-sans antialiased bg-[rgba(247,249,253,1)]`}>
        <DebugHeader />
        <LayoutContent>{children}</LayoutContent>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
