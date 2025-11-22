import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Vinod Santharam',
  description: 'Personal website and portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-200 bg-white">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
                  Vinod Santharam
                </Link>
                <div className="flex gap-6">
                  <Link href="/" className="text-gray-700 hover:text-blue-600">
                    Home
                  </Link>
                  <Link href="/blog" className="text-gray-700 hover:text-blue-600">
                    Blog
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-blue-600">
                    About
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-gray-200 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} Vinod Santharam. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

