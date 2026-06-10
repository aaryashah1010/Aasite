import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getStateBySlug,
  getLocationsByState,
  getAreaResources,
  type Location,
  type AreaResource,
} from '@/lib/queries'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = await getStateBySlug(stateSlug)
  if (!state) return {}
  return {
    title: `AA Meetings in ${state.name}`,
    description: `Find Alcoholics Anonymous service offices, intergroups, and central offices in ${state.name}.`,
  }
}

// ── Group locations by city ───────────────────────────────────────────────────
function groupByCity(locations: Location[]): [string, Location[]][] {
  const map = new Map<string, Location[]>()
  for (const loc of locations) {
    const list = map.get(loc.city) ?? []
    list.push(loc)
    map.set(loc.city, list)
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
}

function cityAnchor(city: string) {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

// ── Location card ─────────────────────────────────────────────────────────────
function LocationCard({ loc, stateSlug }: { loc: Location; stateSlug: string }) {
  return (
    <Link
      href={`/${stateSlug}/${loc.slug}`}
      className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-teal-400 hover:shadow-md transition-all duration-150 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-800 group-hover:text-teal-700 transition-colors text-sm leading-snug">
          {loc.service_name}
        </h3>
        <svg
          className="w-4 h-4 text-slate-300 group-hover:text-blue-500 flex-shrink-0 mt-0.5 transition-colors"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {loc.city}
      </div>

      <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-teal-600 group-hover:text-teal-800">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        View Details
      </div>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state: stateSlug } = await params

  const [state, locations, areaResources] = await Promise.all([
    getStateBySlug(stateSlug),
    getLocationsByState(stateSlug),
    getAreaResources(stateSlug),
  ])

  if (!state) notFound()

  const cities = groupByCity(locations)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-teal-600 transition-colors">
          Home
        </Link>
        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-800 font-medium">{state.name}</span>
      </nav>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="bg-teal-800 text-white text-sm font-bold px-3 py-1 rounded-lg tracking-wide">
              {state.abbreviation}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              AA Meetings in {state.name}
            </h1>
          </div>
          <p className="text-slate-500 text-sm">
            {locations.length} service {locations.length === 1 ? 'location' : 'locations'} across{' '}
            {cities.length} {cities.length === 1 ? 'city' : 'cities'}
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All States
        </Link>
      </div>

      {/* Jump to city nav — shown only when there are multiple cities */}
      {cities.length > 4 && (
        <div className="mb-8 p-4 bg-white border border-slate-200 rounded-xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Jump to city
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map(([city]) => (
              <a
                key={city}
                href={`#${cityAnchor(city)}`}
                className="text-xs bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
              >
                {city}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* City sections */}
      <div className="space-y-10">
        {cities.map(([city, locs]) => (
          <section key={city} id={cityAnchor(city)}>
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-200">
              <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2 className="text-lg font-bold text-slate-800">{city}</h2>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                {locs.length} {locs.length === 1 ? 'org' : 'orgs'}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locs.map((loc) => (
                <LocationCard key={loc.id} loc={loc} stateSlug={stateSlug} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Statewide Area Resources */}
      {areaResources.length > 0 && (
        <section className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-amber-100 text-amber-700 p-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Statewide AA Area Resources</h2>
              <p className="text-xs text-slate-500">AA area websites covering broader regions of {state.name}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {areaResources.map((ar: AreaResource) => (
              <div key={ar.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded-md flex-shrink-0 mt-0.5">
                  Area {ar.area_number}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-700 text-sm leading-snug">{ar.area_label}</p>
                  {ar.website_url ? (
                    <a
                      href={ar.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1.5 font-medium"
                    >
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {ar.website_url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  ) : (
                    <p className="text-xs text-slate-400 mt-1">No website listed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back to top */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          Back to top
        </a>
      </div>
    </main>
  )
}
