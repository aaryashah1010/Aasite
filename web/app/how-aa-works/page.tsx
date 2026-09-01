import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How AA Works | What Makes Alcoholics Anonymous Effective',
  description:
    'Discover what makes Alcoholics Anonymous work — the foundation of real, lasting recovery through community, structure, and the Twelve Steps.',
  alternates: {
    canonical: '/how-aa-works',
  },
}

const faqs = [
  {
    q: 'How does AA contribute to recovery?',
    a: 'AA combines meetings, discussions, and a certain structure of action based on the Twelve Steps to guide your recovery through.',
  },
  {
    q: 'Is it necessary to be fully committed to joining AA?',
    a: 'There is no need for that. Any slight desire for change is enough. Many people come undecided but gradually gain insight.',
  },
  {
    q: 'Can one participate in meetings without talking?',
    a: 'Of course, it is possible. Many members take time to prepare and then start to share. Nothing unusual about it.',
  },
]

export default function HowAAWorksPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-800/60 border border-teal-700/50 rounded-full px-4 py-1.5 text-sm text-teal-200 mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Understanding AA
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            What Makes AA Work
          </h1>
          <p className="text-teal-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A True Road to Recovery That Lasts a Lifetime
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700 font-medium">How AA Works</span>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* Intro card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-amber-400" />
          <div className="p-8">
            <p className="text-slate-600 leading-relaxed text-base">
              Recovery is not about grand promises or overnight transformation. It is about small, steady steps
              taken every single day. That is where Alcoholics Anonymous quietly stands strong. Through
              Alcoholics Anonymous, people discover that healing is possible, even when it feels far away.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mt-4">
              With AA Meeting Finder, we make that first step easier. Whether someone feels ready to speak or
              just wants to listen, we help them find a space where they belong. Because sometimes, just knowing
              you are not alone can begin to change everything.
            </p>
          </div>
        </div>

        {/* Section 1 — Foundation */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-9 h-9 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
            The Foundation Behind AA&apos;s Success
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            AA works because it is all about real stuff — interaction, regularity, and self-reflection. Instead
            of abstract concepts, it offers something concrete:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'An atmosphere free of judgment in which to express yourself',
              'A schedule that helps you through the toughest days',
              'Someone who understands and knows exactly what to advise you',
              'Step-by-step guidelines that help rebuild your whole inner world',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-xl p-4">
                <svg className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-5 italic">
            It is not about instant results. It is about developing new habits — gradually but steadily.
          </p>
        </div>

        {/* Section 2 — Everyday Life */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-9 h-9 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            How AA Fits Into Everyday Life
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            AA is not just some additional thing you need to fit into your life. You start by attending meetings —
            just one session. Gradually, something happens:
          </p>
          <div className="space-y-3">
            {[
              { icon: '😮‍💨', text: 'You feel lighter as you stop keeping it all inside' },
              { icon: '🔍', text: 'You understand the patterns of your behavior better' },
              { icon: '🤝', text: 'You know how other people deal with similar issues' },
              { icon: '💪', text: 'You gain trust in other people and in yourself' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl">{icon}</span>
                <p className="text-slate-700 text-sm">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-sm mt-5 leading-relaxed">
            Using AA Meeting Finder, we will help you take the first step and continue on. Be it online meetings
            or a local group — find what suits you best.
          </p>
        </div>

        {/* Section 3 — Why it works */}
        <div className="bg-gradient-to-br from-teal-900 to-teal-800 text-white rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </span>
            Why AA Continues to Work
          </h2>
          <p className="text-teal-200 text-sm mb-6 leading-relaxed">
            There are various methods to recover and heal yourself. But AA is special because of one thing — it
            understands that people have flaws. Instead of blaming you for them, it shows you how to cope with
            them and live with dignity.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { text: 'It does not seek perfection in you; it asks you to improve', icon: '⭐' },
              { text: 'It does not distance itself from you; it reaches out', icon: '🤲' },
              { text: 'It does not push you forward; it walks alongside', icon: '🚶' },
              { text: 'It does not judge you; it accepts', icon: '❤️' },
            ].map(({ text, icon }) => (
              <div key={text} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                <span className="text-xl">{icon}</span>
                <p className="text-teal-100 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-9 h-9 bg-violet-100 text-violet-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 text-sm mb-2">{q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="font-bold text-slate-800 text-xl mb-2">Ready to Find a Meeting?</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            Browse our directory of AA service offices and intergroups across all 50 states and take your first step today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Find Meetings by State
            </Link>
            <a
              href="tel:+18773131523"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.59a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              Call +1 (877) 313-1523
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
