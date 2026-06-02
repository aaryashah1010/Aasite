import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-blue-800 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:bg-blue-700 transition-colors">
            AA
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-slate-800 leading-tight text-base">AA Meeting Finder</p>
            <p className="text-xs text-slate-400 leading-none">United States Directory</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors font-medium"
          >
            All States
          </Link>
          <Link
            href="/about"
            className="text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors font-medium"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
