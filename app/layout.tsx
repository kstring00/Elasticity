import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import './home-refresh.css'
import './launch.css'

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['500','600','700'] })
const sans = Manrope({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Custom 4-Week Training Programs | Elasticity',
  description: 'Custom training programs built around your schedule, training history, gym access, and measurable Week 1 to Week 4 progress.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <div className="site-shell">
          <header className="site-header launch-header">
            <Link href="/" className="brand-lockup" aria-label="Elasticity home">
              <img src="/elasticity-logo-transparent.svg" alt="Elasticity" />
            </Link>
            <nav className="main-nav launch-nav" aria-label="Primary navigation">
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#about">About</Link>
              <Link href="/fit" className="nav-fit">Take the fit check</Link>
            </nav>
          </header>
          {children}
          <footer className="site-footer light-footer launch-footer">
            <div>
              <img src="/elasticity-logo-transparent.svg" alt="Elasticity" />
              <p>Custom four-week training programs built around measurable progress.</p>
            </div>
            <div className="footer-links">
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#about">About</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/disclaimer">Training disclaimer</Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
