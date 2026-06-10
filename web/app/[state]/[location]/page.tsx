import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLocationDetail } from '@/lib/queries'

export const dynamic = 'force-dynamic'

const HELPLINE = '+18777614567'
const HELPLINE_DISPLAY = '+1 (877) 761-4567'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; location: string }>
}): Promise<Metadata> {
  const { state, location } = await params
  const loc = await getLocationDetail(state, location)
  if (!loc) return {}
  return {
    title: `${loc.service_name} — ${loc.city}, ${loc.state_name}`,
    description: `AA service location in ${loc.city}, ${loc.state_name}. Find Alcoholics Anonymous support and meeting information.`,
  }
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ state: string; location: string }>
}) {
  const { state: stateSlug, location: locationSlug } = await params
  const loc = await getLocationDetail(stateSlug, locationSlug)

  if (!loc) notFound()

  return (
    <main className="pb-24 sm:pb-0">
      {/* ── Hero banner ── */}
      <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-teal-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-teal-300 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-teal-600">›</span>
            <Link href={`/${stateSlug}`} className="hover:text-white transition-colors">{loc.state_name}</Link>
            <span className="text-teal-600">›</span>
            <span className="text-teal-100 truncate max-w-xs">{loc.city}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-md tracking-wide">
              {loc.state_abbreviation}
            </span>
            <span className="flex items-center gap-1.5 text-teal-300 text-sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {loc.city}, {loc.state_name}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold leading-snug mb-5">{loc.service_name}</h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'AA Service Location', color: 'bg-teal-800/70 border-teal-700 text-teal-100' },
              { label: 'Free to Attend', color: 'bg-emerald-900/70 border-emerald-700 text-emerald-200' },
              { label: '100% Confidential', color: 'bg-amber-900/70 border-amber-700 text-amber-200' },
            ].map(({ label, color }) => (
              <span key={label} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${color}`}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* About card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-amber-400" />
              <div className="p-6">
                <h2 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </span>
                  About This Location
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  <strong className="text-slate-800">{loc.service_name}</strong> is an Alcoholics Anonymous
                  service office located in <strong className="text-slate-800">{loc.city}, {loc.state_name}</strong>.
                  This office helps connect individuals with local AA meetings, provides information on meeting
                  schedules, and offers guidance for those beginning or continuing their recovery journey.
                </p>
              </div>
            </div>

            {/* Steps card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-800 text-base mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
                Getting Started
              </h2>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Call the helpline', desc: 'Speak with a compassionate advisor at any time — no commitment required.', color: 'bg-teal-600' },
                  { step: '2', title: 'Find a local meeting', desc: 'This office can point you to nearby AA meetings that fit your schedule.', color: 'bg-teal-600' },
                  { step: '3', title: 'Attend your first meeting', desc: 'Walk in, listen, and connect. No pressure — you are welcome as you are.', color: 'bg-amber-500' },
                ].map(({ step, title, desc, color }) => (
                  <div key={step} className="flex gap-4">
                    <div className={`${color} text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}>
                      {step}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{title}</p>
                      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to expect */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                What to Expect at AA Meetings
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Open to anyone with a desire to stop drinking',
                  'What is shared in the room stays in the room',
                  'No fees or dues required to attend',
                  'You can attend as a visitor with no obligations',
                  'Meetings led by members, not therapists',
                  'A supportive, judgment-free community',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-5">

            {/* Helpline card — amber/warm */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-b from-amber-500 to-orange-600 p-6 text-white text-center">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.59a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold mb-1">Need Help Now?</h2>
                <p className="text-orange-100 text-xs leading-relaxed">
                  Free &amp; confidential. Speak with a compassionate advisor 24/7.
                </p>
              </div>
              <div className="bg-white p-5">
                <a
                  href={`tel:${HELPLINE}`}
                  className="flex items-center justify-center gap-2.5 bg-teal-700 hover:bg-teal-600 active:scale-95 text-white font-bold text-base px-5 py-4 rounded-xl transition-all shadow-sm w-full whitespace-nowrap"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.59a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                  {HELPLINE_DISPLAY}
                </a>
                <p className="text-slate-400 text-xs text-center mt-3">Calls answered 24 hours a day</p>
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
                  {[['🔒', 'Private'], ['💰', 'Free'], ['⏰', '24/7'], ['🤝', 'Caring']].map(([icon, label]) => (
                    <div key={label} className="text-xs text-slate-500">
                      <div className="text-base">{icon}</div>
                      <div className="font-semibold text-slate-700">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location info */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">City</span>
                  <span className="font-semibold text-slate-800">{loc.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">State</span>
                  <span className="font-semibold text-slate-800">{loc.state_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Type</span>
                  <span className="font-semibold text-slate-800">Service Office</span>
                </div>
              </div>
            </div>

            {/* Back link */}
            <Link
              href={`/${stateSlug}`}
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-300 px-5 py-3 rounded-xl font-medium text-sm transition-all shadow-sm w-full"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {loc.state_name}
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-8 leading-relaxed max-w-2xl mx-auto">
          This directory provides contact information for AA service offices. For current meeting schedules and times, contact the helpline or visit your local AA office.
        </p>
      </div>
    </main>
  )
}
