import { NextRequest, NextResponse } from 'next/server'
import { searchLocations } from '@/lib/queries'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? ''
  if (q.trim().length < 2) {
    return NextResponse.json([])
  }
  const results = await searchLocations(q.trim())
  return NextResponse.json(results)
}
