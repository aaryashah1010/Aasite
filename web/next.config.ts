import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      // Florida SEO slug renames (2026-08) — old URLs are indexed by Google
      {
        source: '/florida/ft-walton-beach-intergroup-comm-of-district-14',
        destination: '/florida/fort-walton-beach-district-14-intergroup',
        permanent: true,
      },
      {
        source:
          '/florida/levygilchrist-dixie-counties-district-27-answering-service-for-levy-gilchrist-and-dixie-counties',
        destination: '/florida/levy-gilchrist-dixie-counties-district-27',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
