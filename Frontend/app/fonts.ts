import { Aleo, Roboto } from 'next/font/google'

export const aleo = Aleo({
  subsets: ['latin'],
  variable: '--font-aleo',
  display: 'swap',
})

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

