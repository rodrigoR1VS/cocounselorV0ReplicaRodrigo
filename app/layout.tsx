import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import ConditionalLayout from '@/components/shared/ConditionalLayout'
import "./globals.css"

export const metadata: Metadata = {
  title: "CoCounselor | Legal Practice Management Software",
  description:
    "All in one management software for Personal Injury Firms. Maximize efficiency, enhance client service, and drive success.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ConditionalLayout>
          <Header />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
        </ConditionalLayout>
      </body>
    </html>
  )
}
