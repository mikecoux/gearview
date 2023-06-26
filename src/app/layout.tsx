import NavBar from '@/components/NavBar'
import { NextAuthProvider } from './providers'
import './globals.css'
import { Rubik } from 'next/font/google'
import MobileNavBar from '@/components/MobileNavBar'

const font_rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Gearview | Find Trusted Reviews',
  description: 'Phase 5 project by Michael Marcoux.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font_rubik.className}>
        <NextAuthProvider>
          <MobileNavBar />
          <NavBar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
