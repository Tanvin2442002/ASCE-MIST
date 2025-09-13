import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import NavigationWrapper from "@/components/navigation-wrapper"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "ASCE Student Chapter, MIST",
  description: "Created with Next.js",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <NavigationWrapper />
        </Suspense>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">ASCE Student Chapter</h3>
                <p className="text-gray-300 text-sm">Military Institute of Science and Technology</p>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/activities" className="hover:text-white">
                      Activities
                    </Link>
                  </li>
                  <li>
                    <Link href="/membership" className="hover:text-white">
                      Membership
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-3">Activities</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <Link href="/activities/site-visit" className="hover:text-white">
                      Site Visits
                    </Link>
                  </li>
                  <li>
                    <Link href="/activities/seminar" className="hover:text-white">
                      Seminars
                    </Link>
                  </li>
                  <li>
                    <Link href="/activities/workshop" className="hover:text-white">
                      Workshops
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-3">Contact Info</h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>MIST Campus</p>
                  <p>Dhaka, Bangladesh</p>
                  <p>Email: asce@MIST.ac.bd</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 ASCE Student Chapter, MIST. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
