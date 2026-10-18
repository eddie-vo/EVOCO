import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const SITE_URL = 'https://eddievo.co'
const SITE_NAME = 'Eddie Vo'
const DESCRIPTION =
  'Eddie Vo is a digital marketer and software developer. Eddie Vo Company builds growth engines for ambitious teams: digital marketing, custom Next.js software, AI marketing, automation, and AI video.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Eddie Vo — Digital Marketing, Software & AI Automation',
    template: '%s | Eddie Vo',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Eddie Vo', url: SITE_URL }],
  creator: 'Eddie Vo',
  publisher: 'Eddie Vo Company',
  keywords: [
    'Eddie Vo',
    'Eddie Vo Company',
    'EddieVo',
    'digital marketing',
    'software development',
    'Next.js development',
    'AI marketing',
    'AI automation',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Eddie Vo — Digital Marketing, Software & AI Automation',
    description: DESCRIPTION,
    images: [{ url: '/hero-banner.png', alt: 'Eddie Vo Company' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eddie Vo — Digital Marketing, Software & AI Automation',
    description: DESCRIPTION,
    images: ['/hero-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Eddie Vo',
      url: SITE_URL,
      worksFor: { '@id': `${SITE_URL}/#organization` },
      sameAs: ['https://github.com/eddie-vo'],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Eddie Vo Company',
      alternateName: ['EddieVo', 'EVOCO'],
      url: SITE_URL,
      logo: `${SITE_URL}/ev-logo.png`,
      founder: { '@id': `${SITE_URL}/#person` },
      description: DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1d4ed8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
