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
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDB2NmgtNnYtNmg2em0xMiAwaDZ2Nmg2di02aC02em0tMTIgMHYtNmg2djZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-800/60 backdrop-blur-sm border border-blue-700/50 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {totalCount.toLocaleString()} service locations across {states.length} states
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight">
            Find AA Meetings<br className="hidden sm:block" />
            <span className="text-blue-300"> Near You</span>
          </h1>
          <p className="text-blue-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Connecting you with Alcoholics Anonymous service offices, intergroups,
            and central offices across the United States.
          </p>
          <SearchBox />
          <p className="text-blue-400 text-xs mt-4">
            Search by city, state name, or organization name
          </p>
        </div>
      </section>

      {/* ── States Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-md tracking-wide">
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
      <section className="bg-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Looking for AA Meetings?</h2>
          <p className="text-blue-200 text-sm leading-relaxed max-w-2xl mx-auto">
            This directory lists AA intergroups, central offices, and service locations that
            can help you find local meetings. Contact any listing directly for current meeting
            schedules, locations, and times.
          </p>
        </div>
      </section>
    </main>
  )
}
