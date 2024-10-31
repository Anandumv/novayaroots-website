import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Novayaroots - Premium Ayurvedic & Herbal Products | Organic Spices',
  description: 'Discover Novayaroots\' range of premium Ayurvedic herbs, organic spices, and herbal products. Ethically sourced, high-quality ingredients for your wellness journey.',
  keywords: 'Ayurveda, herbal products, organic spices, Ashwagandha, Turmeric, Cardamom, Moringa, wellness',
  authors: [{ name: 'Novayaroots' }],
  creator: 'Novayaroots',
  publisher: 'Novayaroots',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Novayaroots - Premium Ayurvedic & Herbal Products',
    description: 'Explore our range of organic spices, Ayurvedic herbs, and herbal products for your holistic wellness.',
    url: 'https://novayaroots.com',
    siteName: 'Novayaroots',
    images: [
      {
        url: 'https://novayaroots.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Novayaroots Ayurvedic and Herbal Products',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novayaroots - Premium Ayurvedic & Herbal Products',
    description: 'Discover our range of organic spices and Ayurvedic herbs for holistic wellness.',
    images: ['https://novayaroots.com/twitter-image.jpg'],
    creator: '@novayaroots',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-800 to-green-600">
          <div className="flex-grow">
            {children}
          </div>
          <div className="h-16 bg-white rounded-t-[50px] mt-auto" />
        </div>
      </body>
    </html>
  )
}