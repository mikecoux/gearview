import NavBar from '@/components/NavBar'
import './globals.css'
import { Schibsted_Grotesk } from 'next/font/google'

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
        <NavBar />
        {children}
      </body>
    </html>
  )
}
