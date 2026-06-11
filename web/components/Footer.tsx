import Link from 'next/link'

function LogoMark() {
  return (
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f766e" />
          <stop offset="1" stopColor="#134e4a" />
        </linearGradient>
      </defs>
      <rect width="42" height="42" rx="11" fill="url(#footerLogoGrad)" />
      <rect x="2" y="2" width="38" height="38" rx="9" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
      <path d="M21 9 L9 33" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M21 9 L33 33" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="14.5" y1="25" x2="27.5" y2="25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="21" cy="9" r="4" fill="#f59e0b" />
      <circle cx="21" cy="9" r="2" fill="white" fillOpacity="0.6" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <LogoMark />
              <div>
                <p className="font-bold text-white leading-tight">AA Meeting Finder</p>
                <p className="text-xs text-slate-500 leading-none">United States Directory</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A directory of AA service offices, intergroups, and central offices across the United States.
            </p>
            <div className="mt-4">
              <a
                href="tel:+18773131523"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.59a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                +1 (877) 313-1523
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-slate-300 font-semibold text-sm mb-3 uppercase tracking-wider">Browse</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-teal-400 transition-colors">All States</Link></li>
              <li><Link href="/about" className="hover:text-teal-400 transition-colors">About AA Meetings</Link></li>
              <li><Link href="/california" className="hover:text-teal-400 transition-colors">California</Link></li>
              <li><Link href="/new-york" className="hover:text-teal-400 transition-colors">New York</Link></li>
              <li><Link href="/texas" className="hover:text-teal-400 transition-colors">Texas</Link></li>
              <li><Link href="/florida" className="hover:text-teal-400 transition-colors">Florida</Link></li>
            </ul>
          </div>

          {/* Helpline */}
          <div>
            <p className="text-slate-300 font-semibold text-sm mb-3 uppercase tracking-wider">24/7 Helpline</p>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              Free and confidential support available around the clock. You are not alone.
            </p>
            <ul className="space-y-1.5 text-sm">
              {['Free to call', 'Available 24/7', 'Anonymous & confidential', 'Compassionate advisors'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-400">
                  <svg className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-start gap-3 text-xs text-slate-600">
          <p>
            This directory is for informational purposes only. For the most current contact information, please reach out to your local AA intergroup directly.
            AAMeetingFinder.com is not affiliated with Alcoholics Anonymous World Services, Inc.
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors whitespace-nowrap">
              Privacy Policy
            </Link>
            <p>© {new Date().getFullYear()} AA Meeting Finder</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
