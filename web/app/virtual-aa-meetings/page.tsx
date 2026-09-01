import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Virtual AA Meetings | Online Alcoholics Anonymous Support',
  description:
    'Find online and virtual AA meetings from the comfort of your home. Join Alcoholics Anonymous meetings via phone or video — free, anonymous, and available anytime.',
  alternates: {
    canonical: '/virtual-aa-meetings',
  },
}

const benefits = [
  {
    title: 'Comfortable Environment',
    desc: 'It has become easier for users to participate when they are able to join meetings from the comfort of their homes.',
    icon: '🏠',
    color: 'bg-teal-50 border-teal-100',
  },
  {
    title: 'Help When Needed',
    desc: 'You can always join a discussion whenever you need help without waiting for hours or even days.',
    icon: '⚡',
    color: 'bg-amber-50 border-amber-100',
  },
  {
    title: 'Respect Your Privacy',
    desc: 'There is no pressure to share more than you are willing to. You can turn off your camera or provide only your first name.',
    icon: '🔒',
    color: 'bg-emerald-50 border-emerald-100',
  },
  {
    title: 'Broad Community',
    desc: 'We connect users from different parts of the world — you will understand you are not the only one struggling with this issue.',
    icon: '🌍',
    color: 'bg-violet-50 border-violet-100',
  },
]

const steps = [
  { step: '1', text: 'Find a convenient meeting by browsing AA Meeting Finder' },
  { step: '2', text: 'Choose an hour that works best for you' },
  { step: '3', text: 'Join the meeting via phone or video conference' },
  { step: '4', text: 'Attend the discussion in the way you find most convenient' },
]

const faqs = [
  {
    q: 'Are online meetings effective?',
    a: 'Absolutely. As long as you attend discussions, you are participating in the AA movement. The format does not reduce the impact — many members find online meetings even more accessible.',
  },
  {
    q: 'Do I have to share stories right away?',
    a: 'No. People usually join a meeting and just listen to others\' stories. Only when they become more confident do they start talking.',
  },
  {
    q: 'Will I remain anonymous?',
    a: 'Yes, you can enter the meeting with your nickname or first name, and nobody will recognize you.',
  },
  {
    q: 'What do I need to attend a meeting?',
    a: 'The only things needed are your smartphone, laptop, or tablet and an Internet connection.',
  },
]

export default function VirtualAAMeetingsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-800/60 border border-teal-700/50 rounded-full px-4 py-1.5 text-sm text-teal-200 mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Online Support
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Find Support Your Way
          </h1>
          <p className="text-amber-400 text-xl md:text-2xl font-semibold mb-4">Online &amp; Virtual AA Meetings</p>
          <p className="text-teal-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Recovery support available from wherever you are — no commute, no pressure, just connection.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700 font-medium">Virtual AA Meetings</span>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-amber-400" />
          <div className="p-8 space-y-4">
            <p className="text-slate-600 leading-relaxed text-base">
              Recovery often feels harder before it even begins. The hesitation, the self-doubt, the quiet fear
              of being judged can stop many people from taking that first step. We understand that. Not everyone
              feels ready to walk into a physical room and speak. That does not mean the need for support is any
              less real — it simply means the approach needs to change.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Online AA meetings offer that change. They bring connection, understanding, and guidance directly
              to you. With AA Meeting Finder, we help make that first step feel lighter, simpler, and possible.
            </p>
          </div>
        </div>

        {/* What are online meetings */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-3">
            <span className="w-9 h-9 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            What Online AA Meetings Really Mean
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Online AA meetings are the same as traditional ones except for the fact that they happen online —
            there are no physical spaces to gather. In short, they are virtual meetings aimed at helping each
            other overcome addiction and learn useful skills.
          </p>
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
            <p className="text-teal-800 text-sm leading-relaxed">
              We usually observe people joining online discussions hesitantly, but soon they relax and find the
              courage to open up and communicate. The virtual format removes many of the barriers that stop people
              from seeking help in person.
            </p>
          </div>
        </div>

        {/* How to join — steps */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-9 h-9 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            How to Use Virtual Meetings in Daily Life
          </h2>
          <div className="space-y-4">
            {steps.map(({ step, text }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-teal-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {step}
                </div>
                <p className="text-slate-700 text-sm pt-1.5 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-5 bg-slate-50 rounded-xl p-4 leading-relaxed">
            You can either choose to attend a discussion every day or do this when you are experiencing
            difficulties. There is no fixed commitment required.
          </p>
        </div>

        {/* Why users prefer */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 px-1">Why Many Users Prefer Our Approach</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map(({ title, desc, icon, color }) => (
              <div key={title} className={`bg-white border rounded-2xl p-6 shadow-sm ${color}`}>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-slate-800 text-base mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-9 h-9 bg-violet-100 text-violet-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 text-sm mb-2">{q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-teal-900 to-teal-800 text-white rounded-2xl p-8 text-center">
          <h3 className="font-bold text-xl mb-2">Ready to Join a Virtual Meeting?</h3>
          <p className="text-teal-200 text-sm mb-6 max-w-md mx-auto">
            Browse our directory or call our helpline — we will help you find the right meeting for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-teal-900 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors text-sm shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Meetings
            </Link>
            <a
              href="tel:+18773131523"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.59a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              Call +1 (877) 313-1523
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
