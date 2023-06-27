import NavBar from '@/components/NavBar'
import { NextAuthProvider } from './providers'
import './globals.css'
import { Schibsted_Grotesk } from 'next/font/google'
import MobileNavBar from '@/components/MobileNavBar'

const font_schib = Schibsted_Grotesk({ subsets: ['latin'] })

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
      <body className={font_schib.className}>
        <NextAuthProvider>
          <MobileNavBar />
          <NavBar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
