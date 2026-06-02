import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="bg-blue-600 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                AA
              </div>
              <div>
                <p className="font-bold text-white leading-tight">AA Meeting Finder</p>
                <p className="text-xs text-slate-500 leading-none">United States Directory</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A directory of AA service offices, intergroups, and central offices across the United States.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-slate-300 font-semibold text-sm mb-3 uppercase tracking-wider">Browse</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">All States</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About AA Meetings</Link></li>
              <li><Link href="/california" className="hover:text-white transition-colors">California</Link></li>
              <li><Link href="/new-york" className="hover:text-white transition-colors">New York</Link></li>
              <li><Link href="/texas" className="hover:text-white transition-colors">Texas</Link></li>
              <li><Link href="/florida" className="hover:text-white transition-colors">Florida</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-slate-300 font-semibold text-sm mb-3 uppercase tracking-wider">About</p>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400 leading-relaxed">
                A comprehensive directory of AA service offices and intergroups across the United States.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-start gap-3 text-xs text-slate-600">
          <p>
            This directory is for informational purposes only. For the most current contact information, please reach out to your local AA intergroup directly.
          </p>
          <p className="flex-shrink-0">© {new Date().getFullYear()} AA Meeting Finder</p>
        </div>
      </div>
    </footer>
  )
}
