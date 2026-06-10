import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllStates, getTotalLocationCount } from '@/lib/queries'
import SearchBox from '@/components/SearchBox'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AA Meeting Finder | United States Directory',
  description:
    'Find Alcoholics Anonymous service offices, intergroups, and central offices across all 50 US states and territories.',
}

export default async function HomePage() {
  const [states, totalCount] = await Promise.all([
    getAllStates(),
    getTotalLocationCount(),
  ])

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDB2NmgtNnYtNmg2em0xMiAwaDZ2Nmg2di02aC02em0tMTIgMHYtNmg2djZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-800/60 backdrop-blur-sm border border-teal-700/50 rounded-full px-4 py-1.5 text-sm text-teal-200 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {totalCount.toLocaleString()} service locations across {states.length} states
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight">
            Find AA Meetings<br className="hidden sm:block" />
            <span className="text-amber-400"> Near You</span>
          </h1>
          <p className="text-teal-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Connecting you with Alcoholics Anonymous service offices, intergroups,
            and central offices across the United States.
          </p>
          <SearchBox />
          <p className="text-teal-400 text-xs mt-4">
            Search by city, state name, or organization name
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
          <p className="text-slate-500 mt-2 text-sm">Four simple steps to find an AA meeting near you</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '1',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ),
              title: 'Find a Meeting',
              desc: 'Search AA meetings by city, state, ZIP code, or online format.',
              color: 'blue',
            },
            {
              step: '2',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
              title: 'Review Details',
              desc: 'View meeting times, locations, formats, and other important information.',
              color: 'emerald',
            },
            {
              step: '3',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              ),
              title: 'Get Guidance',
              desc: 'Need help choosing a meeting? Connect with our support team for assistance.',
              color: 'violet',
            },
            {
              step: '4',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
              title: 'Start Your Recovery Journey',
              desc: 'Attend a meeting, build connections, and take the first step toward lasting recovery.',
              color: 'rose',
            },
          ].map(({ step, icon, title, desc, color }) => (
            <div key={step} className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                color === 'blue' ? 'bg-blue-100 text-blue-700' :
                color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                color === 'violet' ? 'bg-violet-100 text-violet-700' :
                'bg-rose-100 text-rose-700'
              }`}>
                {icon}
              </div>
              <span className="absolute top-5 right-5 text-3xl font-black text-slate-100 select-none">{step}</span>
              <h3 className="font-bold text-slate-800 mb-2 text-sm">{title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── States Grid ── */}
      <section id="states" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Browse by State</h2>
            <p className="text-slate-500 mt-1 text-sm">
              {states.length} states and territories — click any to view all locations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {states.map((state) => (
            <Link
              key={state.id}
              href={`/${state.slug}`}
              className="group relative bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-2 py-1 rounded-md tracking-wide">
                  {state.abbreviation}
                </span>
                <svg
                  className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="font-semibold text-slate-800 text-sm leading-snug mb-1.5 group-hover:text-blue-700 transition-colors">
                {state.name}
              </p>
              <p className="text-xs text-slate-400">
                {state.location_count}{' '}
                {state.location_count === 1 ? 'location' : 'locations'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Info Strip ── */}
      <section className="bg-teal-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Looking for AA Meetings?</h2>
          <p className="text-teal-200 text-sm leading-relaxed max-w-2xl mx-auto">
            This directory lists AA intergroups, central offices, and service locations that
            can help you find local meetings. Contact any listing directly for current meeting
            schedules, locations, and times.
          </p>
        </div>
      </section>

      {/* ── Recovery CTA ── */}
      <section className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Take the First Step<br className="hidden sm:block" /> Toward Recovery?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
              You don&apos;t have to face alcohol challenges alone. Every day, thousands of people find hope,
              support, and lasting recovery through Alcoholics Anonymous. Whether you&apos;re seeking help for
              yourself or someone you care about, a welcoming community is ready to support your journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {[
              {
                emoji: '🤝',
                title: 'A Community That Understands',
                desc: 'Connect with people who have walked a similar path and found strength through shared experiences.',
                border: 'border-teal-700/50',
                bg: 'bg-teal-900/30',
              },
              {
                emoji: '📅',
                title: 'Meetings Available Every Day',
                desc: 'Find in-person and online AA meetings that fit your schedule, wherever you are.',
                border: 'border-emerald-700/50',
                bg: 'bg-emerald-900/20',
              },
              {
                emoji: '🔒',
                title: 'Safe, Private & Confidential',
                desc: 'Attend meetings with confidence knowing your privacy and anonymity are respected.',
                border: 'border-violet-700/50',
                bg: 'bg-violet-900/20',
              },
              {
                emoji: '🔍',
                title: 'Find an AA Meeting Near You',
                desc: 'Search local and online meetings, explore meeting details, and take the next step toward a healthier future.',
                border: 'border-rose-700/50',
                bg: 'bg-rose-900/20',
              },
            ].map(({ emoji, title, desc, border, bg }) => (
              <div key={title} className={`${bg} border ${border} rounded-2xl p-6 flex gap-4`}>
                <span className="text-3xl flex-shrink-0 mt-0.5">{emoji}</span>
                <div>
                  <h3 className="font-bold text-white text-base mb-1.5">{title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="#states"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-2xl transition-colors text-base shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Find a Meeting Near You
            </Link>
            <p className="text-slate-400 text-xs mt-3">Browse our directory of 675+ AA service locations across all 50 states</p>
          </div>
        </div>
      </section>
    </main>
  )
}
