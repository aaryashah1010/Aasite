'use client'

const HELPLINE = '+18773131523'
const HELPLINE_DISPLAY = '+1 (877) 313-1523'

export default function FloatingCallButton() {
  return (
    <>
      {/* Floating button — bottom right, desktop */}
      <a
        href={`tel:${HELPLINE}`}
        aria-label="Call helpline"
        className="fixed bottom-6 right-5 z-50 hidden sm:flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-white pl-4 pr-5 py-3 rounded-full shadow-xl transition-all duration-150"
      >
        <span className="relative flex h-5 w-5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-30" />
          <svg className="relative w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.59a1 1 0 01-.25 1.01l-2.2 2.2z" />
          </svg>
        </span>
        <span className="text-sm font-bold leading-none">Get Help Now</span>
      </a>

      {/* Sticky bottom bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-teal-900 text-white px-4 py-3 flex items-center justify-between shadow-2xl border-t border-teal-700">
        <div className="leading-tight">
          <p className="text-xs text-teal-300 font-medium">24/7 Free & Confidential Helpline</p>
          <p className="text-sm font-bold">{HELPLINE_DISPLAY}</p>
        </div>
        <a
          href={`tel:${HELPLINE}`}
          className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm px-4 py-2 rounded-full flex items-center gap-2 active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.59a1 1 0 01-.25 1.01l-2.2 2.2z" />
          </svg>
          Call Now
        </a>
      </div>
    </>
  )
}
