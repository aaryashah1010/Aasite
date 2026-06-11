import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCallButton from '@/components/FloatingCallButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  verification: {
    google: 'ype0eJkPh6VvVAGOnRAxVArPWj6IAiPb8Fk5YyqBzJ8',
  },
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-32GTZR56FY"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-32GTZR56FY');
        `}</Script>
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  )
}
