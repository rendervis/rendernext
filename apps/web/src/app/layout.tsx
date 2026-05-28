import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { SiteFooter } from '@/components/organisms/SiteFooter'
import { SiteHeader } from '@/components/organisms/SiteHeader'
import './globals.css'
import { StructuredData } from '@/components/seo/StructuredData'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rendernext.eu'),
  title: {
    default:
      'RenderNext — Web App Development, SaaS MVPs & Interactive 3D Product Experiences',
    template: '%s — RenderNext',
  },
  description:
    'RenderNext is a small product development company building custom web apps, SaaS platforms, dashboards, product websites, and interactive 3D product presentation tools for businesses with real workflows.',
  keywords: [
    'web app development',
    'custom web application development',
    'SaaS MVP development',
    'product development company',
    'product website development',
    'dashboard development',
    'workflow software',
    'interactive product experience',
    '3D product configurator',
    'AR product viewer',
    '3D product visualization',
    'RenderNext',
  ],
  alternates: {
    canonical: 'https://www.rendernext.eu',
  },
  icons: {
    icon: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/favicon.svg', color: '#ffddb8' }],
  },
  openGraph: {
    type: 'website',
    url: 'https://www.rendernext.eu/',
    siteName: 'RenderNext',
    title:
      'RenderNext — Web App Development, SaaS MVPs & Interactive Product Experiences',
    description:
      'Custom web apps, SaaS platforms, product websites, dashboards, and 3D product presentation tools for businesses that need practical software.',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'RenderNext — Web App Development, SaaS MVPs & Interactive Product Experiences',
    description:
      'Custom web apps, SaaS platforms, product websites, dashboards, and 3D product presentation tools for real business workflows.',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-site-verification': '88st--ci-qjg77Xp6sWrJovVpx7VYBiwZyvcUGV2rSA',
  },
}

export const viewport: Viewport = {
  themeColor: '#131313',
  colorScheme: 'dark',
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth antialiased`}
    >
      <body className="bg-background text-on-surface min-h-screen font-sans">
        <StructuredData />
        <SiteHeader />
        <main className="pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
