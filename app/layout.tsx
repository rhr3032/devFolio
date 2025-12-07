import type React from "react"
import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

const firaCode = Fira_Code({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevFolio | Raisul R.",
  description: "Raisul R. Portfolio",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.className} antialiased`}>
        <AnimatedBackground />
        <div className="min-h-screen flex flex-col relative z-10">
          <Navbar />
          <main className="flex-1 flex">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
