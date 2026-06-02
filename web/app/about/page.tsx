import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentPage } from '@/lib/queries'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContentPage('what-is-an-aa-meeting')
  return {
    title: page?.meta_title ?? 'About AA Meetings',
    description:
      page?.meta_description ??
      'Learn about Alcoholics Anonymous meetings — what they are, how to select one, and how to get the most out of your first meeting.',
  }
}

export default async function AboutPage() {
  const page = await getContentPage('what-is-an-aa-meeting')
  if (!page) notFound()

  // Split body on double newline — each chunk is either a heading or a paragraph
  const blocks = page.body
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean)

  // Detect section headings: short lines (≤80 chars) with no sentence-ending punctuation
  function isHeading(text: string) {
    return text.length <= 80 && !/[.!?]$/.test(text)
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-700/50 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {page.title}
          </h1>
          <p className="text-blue-200 text-base leading-relaxed max-w-xl mx-auto">
            Understanding Alcoholics Anonymous and how meetings can support the journey to recovery.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-slate-700 font-medium">About</span>
        </nav>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-1.5 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" />

          <div className="px-8 py-10 space-y-6">
            {blocks.map((block, idx) =>
              isHeading(block) ? (
                <div key={idx} className="pt-4 first:pt-0">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1 h-6 bg-blue-700 rounded-full flex-shrink-0" />
                    <h2 className="text-lg font-bold text-slate-800">{block}</h2>
                  </div>
                </div>
              ) : (
                <p key={idx} className="text-slate-600 leading-relaxed text-base">
                  {block}
                </p>
              )
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-slate-800 text-lg mb-2">
            Ready to Find a Meeting?
          </h3>
          <p className="text-slate-500 text-sm mb-5">
            Browse our directory of AA service offices and intergroups across all 50 states.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Find Meetings by State
          </Link>
        </div>
      </article>
    </main>
  )
}
