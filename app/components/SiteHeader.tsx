'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// The home hero is a full-bleed gradient the nav floats over. Everywhere else
// the header keeps its paper background and normal document flow.
export default function SiteHeader() {
  const pathname = usePathname()
  const overHero = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!overHero) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [overHero])

  const classes = ['site-header', 'launch-header']
  if (overHero) classes.push('is-over-hero')
  if (overHero && scrolled) classes.push('is-scrolled')

  return (
    <header className={classes.join(' ')}>
      <div className="nav-rail glass glass--warm">
        <Link href="/" className="brand-lockup feminine-brand" aria-label="El^sticity home">
          <span className="brand-word">El<span className="brand-caret">^</span>sticity</span>
        </Link>
        <nav className="main-nav launch-nav" aria-label="Primary navigation">
          <Link href="/#services">Services</Link>
          <Link href="/#testimonials">Testimonials</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#about">About</Link>
          <Link href="/fit" className="nav-fit">Take the fit check</Link>
        </nav>
      </div>
    </header>
  )
}
