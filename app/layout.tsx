import './globals.css'
import type { Metadata } from 'next'
import { Roboto, Aleo } from 'next/font/google'
import Background from '@/components/Background'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

const aleo = Aleo({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-aleo',
})

export const metadata: Metadata = {
  title: 'The Waiter Company',
  description: 'Empowering your cafe business with innovative solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${roboto.variable} ${aleo.variable}`}>
      <body className={roboto.className}>
        <Background />
        {children}
      </body>
    </html>
  )
}

