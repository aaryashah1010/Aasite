import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-8xl font-black text-slate-100 mb-2 select-none">404</div>
      <h1 className="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h1>
      <p className="text-slate-500 mb-8 leading-relaxed">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-sm shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Back to Home
      </Link>
    </main>
  )
}
