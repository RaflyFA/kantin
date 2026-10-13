import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kantin Kopma UNSIL',
  description: 'Menu favorit mahasiswa UNSIL, harga bersahabat, dan pesan praktis lewat WhatsApp.',
  icons: {
    icon: [
      {
        url: '/Logo_Kantin - Copy.png',
      },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
      },
    ],
    shortcut: '/Logo_Kantin - Copy.png',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${fredoka.variable} ${nunito.variable} scroll-smooth`}>
      <body className="antialiased bg-cream text-ink font-sans m-0 selection:bg-orange-kopma selection:text-maroon">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
