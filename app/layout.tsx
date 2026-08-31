import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import Link from 'next/link'
import MotionEnhancer from './components/MotionEnhancer'
import HomeHeroComposite from './components/HomeHeroComposite'
import { INSTAGRAM_URL, hasInstagram } from '../lib/site'
import './globals.css'
import './home-refresh.css'
import './launch.css'
import './cognac-refresh.css'
import './hero-insert.css'
import './feminine-refresh.css'
import './editorial-hero.css'

const display = Newsreader({ subsets: ['latin'], display: 'swap', variable: '--font-display', weight: ['400'], style: ['normal', 'italic'] })
const sans = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans', weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: 'Mobility, stretching & personalized training | El^sticity',
  description: 'Mobility-first coaching, stretching, recovery, and personalized training with El^sticity.',
  icons: { icon: '/icon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <MotionEnhancer />
        <div className="site-shell">
          <HomeHeroComposite />
          <header className="site-header launch-header">
            <Link href="/" className="brand-lockup editorial-brand" aria-label="El^sticity home">
              <span className="brand-caret" aria-hidden="true">^</span>
              <span className="brand-word">Elasticity</span>
            </Link>
            <nav className="main-nav launch-nav" aria-label="Primary navigation">
              <Link href="/#services">Services</Link>
              <Link href="/#testimonials">Testimonials</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#about">About</Link>
              <Link href="/fit" className="nav-fit">Take the fit check</Link>
            </nav>
          </header>
          {children}
          <footer className="site-footer light-footer launch-footer">
            <div>
              <div className="footer-brand">El<span>^</span>sticity</div>
              <p>Release. Restore. Rebuild. Mobility-first coaching with room to move, recover, and grow.</p>
            </div>
            <div className="footer-links">
              <Link href="/#services">Services</Link>
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
