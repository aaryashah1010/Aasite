import Link from 'next/link'

function LogoMark({ gradId }: { gradId: string }) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f766e" />
          <stop offset="1" stopColor="#134e4a" />
        </linearGradient>
      </defs>
      {/* Background tile */}
      <rect width="42" height="42" rx="11" fill={`url(#${gradId})`} />
      {/* Subtle inner ring */}
      <rect x="2" y="2" width="38" height="38" rx="9" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
      {/* Left leg of A */}
      <path d="M21 9 L9 33" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Right leg of A */}
      <path d="M21 9 L33 33" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Crossbar */}
      <line x1="14.5" y1="25" x2="27.5" y2="25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Amber beacon at the apex */}
      <circle cx="21" cy="9" r="4" fill="#f59e0b" />
      <circle cx="21" cy="9" r="2" fill="white" fillOpacity="0.6" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <LogoMark gradId="headerLogoGrad" />
          <div className="hidden sm:block">
            <p className="font-bold text-slate-800 leading-tight text-base tracking-tight">AA Meeting Finder</p>
            <p className="text-xs text-slate-400 leading-none">United States Directory</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-2 rounded-lg transition-colors font-medium"
          >
            All States
          </Link>
          <Link
            href="/about"
            className="text-sm text-slate-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-2 rounded-lg transition-colors font-medium"
          >
            About
          </Link>
          <a
            href="tel:+18773131523"
            className="ml-2 hidden sm:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.59a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            Get Help
          </a>
        </nav>
      </div>
    </header>
  )
}
