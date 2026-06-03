import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLocationDetail } from '@/lib/queries'

export const dynamic = 'force-dynamic'

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
    description: `Contact information for ${loc.service_name} in ${loc.city}, ${loc.state_name}. Alcoholics Anonymous service office contact details, phone numbers, and website.`,
  }
}

// ── Icon helpers ──────────────────────────────────────────────────────────────
function PhoneIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function GlobeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )
}

function FaxIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function LocationPage({
  params,
}: {
  params: Promise<{ state: string; location: string }>
}) {
  const { state: stateSlug, location: locationSlug } = await params
  const loc = await getLocationDetail(stateSlug, locationSlug)

  if (!loc) notFound()

  const phoneContacts = loc.contacts.filter((c) => c.type === 'phone')
  const faxTddContacts = loc.contacts.filter((c) => c.type === 'fax' || c.type === 'tdd')
  const hasAnyContact = phoneContacts.length > 0 || faxTddContacts.length > 0 || loc.website_url

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href={`/${stateSlug}`} className="hover:text-blue-600 transition-colors">
          {loc.state_name}
        </Link>
        <svg className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-700 font-medium truncate max-w-xs">{loc.service_name}</span>
      </nav>

      {/* Main card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Card header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg tracking-wide">
              {loc.state_abbreviation}
            </span>
            <span className="text-blue-200 text-sm flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {loc.city}, {loc.state_name}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold leading-snug">{loc.service_name}</h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Phone contacts */}
          {phoneContacts.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Phone Numbers
              </h2>
              <div className="space-y-2">
                {phoneContacts.map((c) => (
                  <a
                    key={c.label + c.value}
                    href={`tel:${c.value.replace(/\D/g, '')}`}
                    className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 active:scale-[0.99] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500 text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors">
                        <PhoneIcon />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 leading-none mb-1">{c.label}</p>
                        <p className="font-bold text-slate-800 text-base tracking-wide">{c.value}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 flex-shrink-0">
                      Tap to Call
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Fax / TDD */}
          {faxTddContacts.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Fax / TDD
              </h2>
              <div className="space-y-2">
                {faxTddContacts.map((c) => (
                  <div
                    key={c.label + c.value}
                    className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <div className="bg-slate-400 text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaxIcon />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 leading-none mb-1">{c.label}</p>
                      <p className="font-semibold text-slate-700 text-base">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Website */}
          {loc.website_url && (
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Website
              </h2>
              <a
                href={loc.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 active:scale-[0.99] transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                    <GlobeIcon />
                  </div>
                  <span className="text-blue-700 font-medium text-sm truncate">
                    {loc.website_url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </span>
                </div>
                <span className="text-xs font-semibold text-blue-500 group-hover:text-blue-700 flex items-center gap-1 flex-shrink-0 ml-3">
                  Visit
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            </div>
          )}

          {/* No contact info */}
          {!hasAnyContact && (
            <div className="text-center py-6 text-slate-400">
              <p className="text-sm">No contact information available for this listing.</p>
              <p className="text-xs mt-1">Please contact your local AA area office for more information.</p>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
        Contact information is provided for informational purposes. Please verify directly with the organization for current meeting times and locations.
      </p>

      {/* Back link */}
      <div className="mt-6 flex justify-center">
        <Link
          href={`/${stateSlug}`}
          className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-300 px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {loc.state_name}
        </Link>
      </div>
    </main>
  )
}
