import type { Metadata } from 'next'
import { Syne, Outfit, JetBrains_Mono } from 'next/font/google'
import { siteUrl, siteTitle, siteDescription, siteName } from '@/lib/site'
import './globals.css'

/* ─── Fonts ──────────────────────────────────────────────────────────── */
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

/* ─── SEO Metadata ───────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'Yassin Koubeisy',
    'Software Developer',
    'Computer Science',
    'Carleton University',
    'Ottawa',
    'AI',
    'Machine Learning',
    'Cybersecurity',
    'Java',
    'Python',
    'Full Stack',
  ],
  authors: [{ name: 'Yassin Koubeisy' }],
  creator: 'Yassin Koubeisy',
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* ─── Root Layout ────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg antialiased">{children}</body>
    </html>
  )
}
