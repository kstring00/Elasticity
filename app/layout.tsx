import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import './home-refresh.css'

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['500','600','700'] })
const sans = Manrope({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Elasticity | Personalized Training',
  description: 'Personalized four-week training programs designed around your goals, schedule, experience, and available equipment.',
}

const logoStyle = { filter: 'none', mixBlendMode: 'multiply' as const }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand-lockup" aria-label="Elasticity home">
              <img src="/elasticity-logo.webp" alt="Elasticity" style={logoStyle} />
            </Link>
            <nav className="main-nav" aria-label="Primary navigation">
              <Link href="/onboarding" className="nav-onboarding">Client onboarding</Link>
              <Link href="/#about">About me</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#transformations">Transformations</Link>
              <Link href="/#method">Elasticity method</Link>
              <Link href="/login" className="nav-login">Client login</Link>
            </nav>
          </header>
          {children}
          <footer className="site-footer light-footer">
            <div>
              <img src="/elasticity-logo.webp" alt="Elasticity" style={logoStyle} />
              <p>Personalized training. Built with intention.</p>
            </div>
            <div className="footer-links">
              <Link href="/onboarding">Client onboarding</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#method">Method</Link>
              <Link href="/login">Client login</Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
