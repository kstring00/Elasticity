import type { Metadata } from 'next'
import { Instrument_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import Link from 'next/link'
import MotionEnhancer from './components/MotionEnhancer'
import HomeHeroComposite from './components/HomeHeroComposite'
import { INSTAGRAM_URL, hasInstagram } from '../lib/site'
import './globals.css'
import './home-refresh.css'
import './launch.css'
import './cognac-refresh.css'
import './hero-insert.css'

const display = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-display', weight: ['400', '500', '600', '700'] })
const sans = Instrument_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono', weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Mobility + Personalized Training | Elasticity',
  description: 'Mobility-first coaching and personalized training built around your body, schedule, goals, and measurable progress.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <MotionEnhancer />
        <div className="site-shell">
          <header className="site-header launch-header">
            <Link href="/" className="brand-lockup" aria-label="Elasticity home">
              <img src="/elasticity-logo.webp" alt="Elasticity" width={600} height={193} />
            </Link>
            <nav className="main-nav launch-nav" aria-label="Primary navigation">
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/#testimonials">Testimonials</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#about">About</Link>
              <Link href="/fit" className="nav-fit">Take the fit check</Link>
            </nav>
          </header>
          <HomeHeroComposite />
          {children}
          <footer className="site-footer light-footer launch-footer">
            <div>
              <img src="/elasticity-logo-transparent.svg" alt="Elasticity" width={600} height={193} />
              <p>Release. Restore. Rebuild. Mobility-first coaching and personalized training.</p>
            </div>
            <div className="footer-links">
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/#testimonials">Testimonials</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#about">About</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/disclaimer">Training disclaimer</Link>
              {hasInstagram && <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer noopener">Instagram</a>}
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
