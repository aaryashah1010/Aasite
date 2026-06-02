import pool from './db'

// ─── Types ───────────────────────────────────────────────────────────────────

export type State = {
  id: number
  name: string
  abbreviation: string
  slug: string
  location_count: number
}

export type StateInfo = {
  id: number
  name: string
  abbreviation: string
  slug: string
}

export type Contact = {
  label: string
  value: string
  type: string
}

export type Location = {
  id: number
  city: string
  service_name: string
  website_url: string | null
  slug: string
  contacts: Contact[]
}

export type LocationDetail = Location & {
  state_name: string
  state_slug: string
  state_abbreviation: string
}

export type AreaResource = {
  id: number
  area_number: string
  area_label: string
  website_url: string | null
}

export type SearchResult = {
  id: number
  city: string
  service_name: string
  slug: string
  state_name: string
  state_slug: string
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getAllStates(): Promise<State[]> {
  const { rows } = await pool.query<State>(`
    SELECT s.id, s.name, s.abbreviation, s.slug,
           COUNT(sl.id)::int AS location_count
    FROM states s
    LEFT JOIN service_locations sl ON sl.state_id = s.id AND sl.is_active = true
    GROUP BY s.id, s.name, s.abbreviation, s.slug
    ORDER BY s.name
  `)
  return rows
}

export async function getTotalLocationCount(): Promise<number> {
  const { rows } = await pool.query<{ count: string }>(
    'SELECT COUNT(*)::text AS count FROM service_locations WHERE is_active = true'
  )
  return parseInt(rows[0]?.count ?? '0', 10)
}

export async function getStateBySlug(slug: string): Promise<StateInfo | null> {
  const { rows } = await pool.query<StateInfo>(
    'SELECT id, name, abbreviation, slug FROM states WHERE slug = $1',
    [slug]
  )
  return rows[0] ?? null
}

export async function getLocationsByState(stateSlug: string): Promise<Location[]> {
  const { rows } = await pool.query<Location>(`
    SELECT sl.id, sl.city, sl.service_name, sl.website_url, sl.slug,
           COALESCE(
             json_agg(
               json_build_object('label', cm.label, 'value', cm.value, 'type', cm.type)
               ORDER BY cm.sort_order
             ) FILTER (WHERE cm.id IS NOT NULL),
             '[]'::json
           ) AS contacts
    FROM service_locations sl
    JOIN states s ON s.id = sl.state_id
    LEFT JOIN contact_methods cm ON cm.service_location_id = sl.id
    WHERE s.slug = $1 AND sl.is_active = true
    GROUP BY sl.id, sl.city, sl.service_name, sl.website_url, sl.slug
    ORDER BY sl.city, sl.service_name
  `, [stateSlug])
  return rows
}

export async function getLocationDetail(
  stateSlug: string,
  locationSlug: string
): Promise<LocationDetail | null> {
  const { rows } = await pool.query<LocationDetail>(`
    SELECT sl.id, sl.city, sl.service_name, sl.website_url, sl.slug,
           s.name AS state_name, s.slug AS state_slug, s.abbreviation AS state_abbreviation,
           COALESCE(
             json_agg(
               json_build_object('label', cm.label, 'value', cm.value, 'type', cm.type)
               ORDER BY cm.sort_order
             ) FILTER (WHERE cm.id IS NOT NULL),
             '[]'::json
           ) AS contacts
    FROM service_locations sl
    JOIN states s ON s.id = sl.state_id
    LEFT JOIN contact_methods cm ON cm.service_location_id = sl.id
    WHERE s.slug = $1 AND sl.slug = $2 AND sl.is_active = true
    GROUP BY sl.id, sl.city, sl.service_name, sl.website_url, sl.slug,
             s.name, s.slug, s.abbreviation
  `, [stateSlug, locationSlug])
  return rows[0] ?? null
}

export type ContentPage = {
  title: string
  body: string
  meta_title: string | null
  meta_description: string | null
}

export async function getContentPage(slug: string): Promise<ContentPage | null> {
  const { rows } = await pool.query<ContentPage>(
    'SELECT title, body, meta_title, meta_description FROM content_pages WHERE slug = $1',
    [slug]
  )
  return rows[0] ?? null
}

export async function getAreaResources(stateSlug: string): Promise<AreaResource[]> {
  const { rows } = await pool.query<AreaResource>(`
    SELECT ar.id, ar.area_number, ar.area_label, ar.website_url
    FROM area_resources ar
    JOIN states s ON s.id = ar.state_id
    WHERE s.slug = $1
    ORDER BY ar.sort_order, ar.area_number::int
  `, [stateSlug])
  return rows
}

export async function searchLocations(q: string): Promise<SearchResult[]> {
  const { rows } = await pool.query<SearchResult>(`
    SELECT sl.id, sl.city, sl.service_name, sl.slug,
           s.name AS state_name, s.slug AS state_slug
    FROM service_locations sl
    JOIN states s ON s.id = sl.state_id
    WHERE (sl.city ILIKE $1 OR sl.service_name ILIKE $1 OR s.name ILIKE $1)
      AND sl.is_active = true
    ORDER BY s.name, sl.city, sl.service_name
    LIMIT 20
  `, [`%${q}%`])
  return rows
}

export async function getAllStateSlugs(): Promise<string[]> {
  const { rows } = await pool.query<{ slug: string }>(
    'SELECT slug FROM states ORDER BY name'
  )
  return rows.map((r) => r.slug)
}

export async function getAllLocationSlugs(): Promise<
  { state_slug: string; location_slug: string }[]
> {
  const { rows } = await pool.query<{ state_slug: string; location_slug: string }>(`
    SELECT s.slug AS state_slug, sl.slug AS location_slug
    FROM service_locations sl
    JOIN states s ON s.id = sl.state_id
    WHERE sl.is_active = true
    ORDER BY s.name, sl.city, sl.service_name
  `)
  return rows
}
