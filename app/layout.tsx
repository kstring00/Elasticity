import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['500','600','700'] })
const sans = Manrope({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Elasticity | Personalized Training',
  description: 'Personalized four-week training programs designed around your goals, schedule, experience, and available equipment.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand-lockup" aria-label="Elasticity home">
              <img src="/elasticity-logo.webp" alt="Elasticity" />
            </Link>
            <nav className="main-nav" aria-label="Primary navigation">
              <Link href="/#method">Method</Link>
              <Link href="/exercises">Exercises</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/login" className="nav-login">Client login</Link>
            </nav>
          </header>
          {children}
          <footer className="site-footer">
            <div>
              <img src="/elasticity-logo.webp" alt="Elasticity" />
              <p>Personalized training. Built with intention.</p>
            </div>
            <div className="footer-links">
              <Link href="/login">Client login</Link>
              <Link href="/coach">Coach dashboard</Link>
              <Link href="/exercises">Exercise library</Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
