import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AA Meeting Finder | United States Directory',
    template: '%s | AA Meeting Finder',
  },
  description:
    'Find Alcoholics Anonymous service offices, intergroups, and central offices across all 50 US states and territories.',
  keywords: [
    'AA meetings',
    'Alcoholics Anonymous',
    'intergroup',
    'central office',
    'service office',
    'sobriety',
    'recovery',
  ],
  openGraph: {
    type: 'website',
    siteName: 'AA Meeting Finder',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
