import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for AAMeetingFinder.com — please read before using our website.',
}

const sections = [
  {
    title: 'Agreement to Terms of Use',
    body: [
      'By accessing or using AAMeetingFinder.com (the "Website"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use ("Terms"), our Privacy Policy, and all applicable laws and regulations.',
      'If you do not agree with any part of these Terms, you must not access or use AAMeetingFinder.com.',
      'AAMeetingFinder.com reserves the right to update, modify, or revise these Terms at any time without prior notice. Any changes will become effective once posted on the Website. Your continued use of AAMeetingFinder.com after changes are posted constitutes your acceptance of the updated Terms.',
      'You are responsible for reviewing these Terms periodically to stay informed of any updates or changes.',
    ],
  },
  {
    title: 'Accuracy of Information',
    body: [
      'AAMeetingFinder.com strives to provide accurate, reliable, and current information; however, we do not guarantee or warrant the accuracy, completeness, or timeliness of the information provided on this Website.',
      'We do not make any representations regarding the accuracy, availability, or updates of meeting schedules, locations, or details; the availability or continuation of listed meetings, services, or resources; the qualifications, credentials, or suitability of any listed provider; or the effectiveness, outcomes, or suitability of any treatment, recovery, or support program.',
      'The information provided on this Website is intended for general informational purposes only and should not be considered a substitute for professional advice. Users are encouraged to independently verify all information with the relevant organization before attending a meeting or making any decisions.',
    ],
  },
  {
    title: 'Information and Service Connections',
    body: [
      'AAMeetingFinder.com may help users connect with listed meetings, organizations, and service providers through available contact methods, including phone numbers, contact forms, and external links.',
      'Important: Any calls or inquiries made through contact information provided on this website may be answered by volunteers, representatives, or affiliated individuals associated with the meetings or providers listed on AAMeetingFinder.com. By using these contact options, you acknowledge and agree to these Terms of Use.',
      'AAMeetingFinder.com does not receive commissions, referral fees, or financial compensation based on which provider, meeting, or organization a user contacts, unless explicitly disclosed. It does not endorse, guarantee, or verify the availability, quality, qualifications, or suitability of any listed provider or service. It is not responsible for any communication, services, experiences, or outcomes resulting from interactions between users and listed providers.',
      'Users are encouraged to independently evaluate and confirm any provider or service before making decisions based on the information available through AAMeetingFinder.com.',
    ],
  },
  {
    title: 'Information Accuracy and Reliability',
    body: [
      'AAMeetingFinder.com aims to provide helpful, accurate, and current information to assist users in finding meetings, services, and resources. However, we do not guarantee or make any representations regarding the accuracy, completeness, or reliability of the information provided on this website.',
      'AAMeetingFinder.com does not guarantee the accuracy, completeness, or availability of meeting schedules, locations, or details; the availability or continuation of any listed meetings, services, or resources; the qualifications, credentials, or experience of any listed provider or organization; or the effectiveness, results, or suitability of any treatment, recovery, or support program.',
      'All information on this website is provided for general informational purposes only. Users should verify meeting details, services, and provider information directly with the relevant organization before attending a meeting or seeking support.',
    ],
  },
  {
    title: 'Limitation of Responsibility',
    body: [
      'To the fullest extent permitted by applicable law, AAMeetingFinder.com and its owners, operators, affiliates, employees, representatives, and partners shall not be held responsible or liable for any damages or losses resulting from your use of, or inability to use, this website or any information, services, or resources provided through it.',
      'This includes, but is not limited to: any indirect, incidental, special, consequential, or punitive damages; any loss of income, revenue, profits, data, business opportunities, or reputation; any damages resulting from reliance on information, listings, content, or resources available through AAMeetingFinder.com; any issues, disputes, or outcomes arising from interactions with meetings, organizations, providers, or third-party services listed on the website; and any unauthorized access to, use of, or alteration of information or data.',
      'AAMeetingFinder.com provides information and resources for general informational purposes only and does not guarantee specific results, availability, accuracy, or outcomes from using the website or contacting any listed organization or service.',
    ],
  },
  {
    title: 'Dispute Resolution and Arbitration',
    body: [
      'Any dispute, claim, or disagreement arising out of or relating to these Terms of Use, your access to, or your use of AAMeetingFinder.com shall be resolved through binding arbitration in accordance with the applicable rules of the American Arbitration Association.',
      'The arbitration will take place in the State of Florida and will be heard and decided by a single arbitrator. The arbitrator\'s decision and award will be final and binding on all parties. Any judgment on the arbitration award may be entered and enforced in any court with proper jurisdiction.',
      'By using AAMeetingFinder.com, you agree to resolve eligible disputes through arbitration as outlined in this section.',
    ],
  },
]

export default function TermsOfUsePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-teal-300 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-teal-600">›</span>
            <span className="text-teal-100">Terms of Use</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Terms of Use</h1>
          <p className="text-teal-300 text-sm">Please read these terms carefully before using AAMeetingFinder.com</p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-amber-400" />

          <div className="px-6 sm:px-10 py-10 space-y-8">
            {/* Intro notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                These Terms of Use govern your access to and use of <strong className="text-slate-800">AAMeetingFinder.com</strong>.
                AAMeetingFinder.com is an independent informational website and is not affiliated with, endorsed by,
                or operated by Alcoholics Anonymous World Services, Inc.
              </p>
            </div>

            {/* Sections */}
            {sections.map(({ title, body }) => (
              <div key={title}>
                <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-teal-600 rounded-full flex-shrink-0" />
                  {title}
                </h2>
                <div className="pl-4 space-y-3">
                  {body.map((para, i) => (
                    <p key={i} className="text-slate-600 text-sm leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/privacy-policy"
            className="text-sm text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Privacy Policy
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-teal-700 font-medium flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </article>
    </main>
  )
}
