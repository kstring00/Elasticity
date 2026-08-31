import type { Metadata } from 'next'
import { Fraunces, Karla, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import MotionEnhancer from './components/MotionEnhancer'
import SiteHeader from './components/SiteHeader'
import { INSTAGRAM_URL, hasInstagram } from '../lib/site'
import './globals.css'
import './home-refresh.css'
import './launch.css'
import './cognac-refresh.css'
import './feminine-refresh.css'
import './hero-nav-restyle.css'

const display = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-display', weight: ['400', '500', '600', '700'] })
const sans = Karla({ subsets: ['latin'], display: 'swap', variable: '--font-sans', weight: ['400', '500', '600', '700'] })
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono', weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Mobility, stretching & personalized training | El^sticity',
  description: 'Mobility-first coaching, stretching, recovery, meal-plan support, and personalized training with El^sticity.',
  icons: { icon: '/icon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <MotionEnhancer />
        <div className="site-shell">
          <SiteHeader />
          {children}
          <footer className="site-footer light-footer launch-footer">
            <div>
              <div className="footer-brand">El<span>^</span>sticity</div>
              <p>Release. Restore. Rebuild. Mobility-first coaching with room to move, recover, and grow.</p>
            </div>
            <div className="footer-links">
              <Link href="/#how-it-works">Services</Link>
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
