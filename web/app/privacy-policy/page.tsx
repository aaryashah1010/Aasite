import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AAMeetingFinder.com — how we collect, use, and protect your information.',
}

const sections = [
  {
    title: '1. About Our Website',
    content: `AAMeetingFinder.com is an online directory and informational resource designed to help individuals locate Alcoholics Anonymous (AA) meetings and related recovery resources.\n\nAAMeetingFinder.com is an independent informational website and is not affiliated with, endorsed by, or operated by Alcoholics Anonymous World Services, Inc.\n\nThe information provided on this Website is for informational purposes only and should not be considered medical, legal, or professional advice.`,
  },
  {
    title: '2. Information We Collect',
    content: `We may collect information directly from users and automatically through the use of our Website.\n\nInformation You Voluntarily Provide\nYou may choose to provide information such as your name, email address, phone number, city/state/ZIP code, information submitted through contact forms, and feedback or inquiries. Providing this information is voluntary.\n\nInformation Collected Automatically\nWhen you visit the Website, we may automatically collect: IP address, browser type and version, device information, operating system, pages viewed, referring website, date and time of visit, general geographic location, and usage and interaction data. This helps us understand how visitors use the Website and improve our services.`,
  },
  {
    title: '3. How We Use Information',
    content: `We may use collected information to provide and improve Website functionality, respond to inquiries and support requests, maintain and update meeting listings, analyze Website performance and user behavior, detect fraud or security issues, comply with legal obligations, send updates when requested, and improve user experience.\n\nWe use information only for legitimate business purposes and as permitted by applicable law.`,
  },
  {
    title: '4. Cookies and Tracking Technologies',
    content: `AAMeetingFinder.com may use cookies and similar technologies to improve functionality and analyze Website usage. Cookies may be used to remember user preferences, measure Website traffic, improve Website performance, analyze visitor behavior, and support advertising and analytics services.\n\nMost web browsers allow you to manage or disable cookies through browser settings. Disabling cookies may affect certain Website features.`,
  },
  {
    title: '5. Analytics Services',
    content: `We may use third-party analytics providers, including Google Analytics, to understand how users interact with our Website. These providers may collect information regarding pages visited, session duration, device type, browser information, and approximate location. The information collected is generally used in aggregate form to help us improve our Website.`,
  },
  {
    title: '6. Advertising Partners',
    content: `We may display advertisements provided by third-party advertising networks. Advertising partners may use cookies, pixels, or similar technologies to deliver relevant advertisements, measure advertising effectiveness, limit repeated advertisements, and personalize advertising experiences.\n\nWe do not control the privacy practices of third-party advertisers. Users should review the privacy policies of those providers separately.`,
  },
  {
    title: '7. Information Sharing',
    content: `We do not sell personal information to third parties.\n\nService Providers: We may share information with trusted vendors who assist with website hosting, analytics, security monitoring, email communications, and technical support. These providers may access information only as necessary to perform services on our behalf.\n\nLegal Requirements: We may disclose information when required by applicable law, court order, government request, law enforcement investigation, or protection of legal rights.\n\nBusiness Transactions: If AAMeetingFinder.com is involved in a merger, acquisition, or sale of assets, user information may be transferred as part of that transaction.`,
  },
  {
    title: '8. External Links',
    content: `Our Website may contain links to third-party websites and resources. We are not responsible for the privacy practices, content, or policies of external websites. Users should review the privacy policies of any third-party sites they visit.`,
  },
  {
    title: '9. Data Retention',
    content: `We retain information only for as long as reasonably necessary to provide services, maintain records, resolve disputes, enforce agreements, and meet legal obligations. Retention periods may vary depending on the nature of the information and applicable legal requirements.`,
  },
  {
    title: '10. Data Security',
    content: `We implement reasonable administrative, technical, and physical safeguards designed to protect information from unauthorized access, disclosure, alteration, or destruction.\n\nWhile we strive to protect your information, no method of transmission or storage is completely secure. Therefore, we cannot guarantee absolute security.`,
  },
  {
    title: "11. Children's Privacy",
    content: `AAMeetingFinder.com is not directed toward children under the age of 13. We do not knowingly collect personal information from children. If we become aware that information has been collected from a child without appropriate consent, we will take steps to remove it promptly.`,
  },
  {
    title: '12. Your Privacy Rights',
    content: `Depending on your location and applicable laws, you may have rights regarding your personal information, including access to your information, correction of inaccurate information, deletion of personal information, restriction of processing, data portability, withdrawal of consent, and objection to certain uses of data.\n\nTo exercise applicable rights, please contact us using the information below.`,
  },
  {
    title: '13. International Users',
    content: `If you access the Website from outside the country where our servers are located, your information may be transferred to and processed in other jurisdictions. By using the Website, you consent to such transfers where permitted by law.`,
  },
  {
    title: '14. Changes to This Privacy Policy',
    content: `We may update this Privacy Policy periodically. Changes become effective when posted on this page. Continued use of the Website after updates constitutes acceptance of the revised Privacy Policy. We encourage users to review this page regularly.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-teal-300 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-teal-600">›</span>
            <span className="text-teal-100">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-teal-300 text-sm">Last Updated: June 11, 2026</p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-amber-400" />

          <div className="px-6 sm:px-10 py-10 space-y-8">
            {/* Intro */}
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                At <strong className="text-slate-800">AAMeetingFinder.com</strong> ("Website," "we," "our," or "us"), we value your privacy
                and are committed to protecting the information you share with us. This Privacy Policy explains what information
                we collect, how we use it, when it may be shared, and the choices available to you regarding your information.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mt-3">
                By accessing or using AAMeetingFinder.com, you agree to the practices described in this Privacy Policy.
              </p>
            </div>

            {/* Sections */}
            {sections.map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-teal-600 rounded-full flex-shrink-0" />
                  {title}
                </h2>
                <div className="space-y-2 pl-4">
                  {content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-slate-600 text-sm leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Contact */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h2 className="font-bold text-slate-800 text-base mb-2">Contact Us</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at{' '}
                <a href="mailto:info@aameetingfinder.com" className="text-teal-700 hover:underline font-medium">
                  info@aameetingfinder.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-teal-700 hover:text-teal-900 font-medium"
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
