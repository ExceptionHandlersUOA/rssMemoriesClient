import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { PT_Sans } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import { Toaster } from "@/components/ui/sonner"
import { NuqsAdapter } from "nuqs/adapters/next/app"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Web Memories",
    template: "%s | Web Memories",
  },
  description:
    "Capture, organize, and revisit your favorite web moments with Web Memories. Effortlessly save, categorize, and manage memorable links and content all in one place.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${ptSans.variable} relative antialiased`}
      >
        <NuqsAdapter>
          <Providers>
            <div className="texture" />
            {children}
            <Toaster />
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  )
}
