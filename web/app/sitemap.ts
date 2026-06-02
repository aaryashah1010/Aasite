import type { MetadataRoute } from 'next'
import { getAllStateSlugs, getAllLocationSlugs } from '@/lib/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aameeting.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [stateSlugs, locationSlugs] = await Promise.all([
    getAllStateSlugs(),
    getAllLocationSlugs(),
  ])

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...stateSlugs.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...locationSlugs.map(({ state_slug, location_slug }) => ({
      url: `${SITE_URL}/${state_slug}/${location_slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
