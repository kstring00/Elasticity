'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HERO_COMPOSITE_DATA_URI } from '../hero-data'

export default function HomeHeroComposite() {
  const pathname = usePathname()
  if (pathname !== '/') return null

  return (
    <section className="home-hero-composite" aria-label="Elasticity personalized training hero">
      <img
        src={HERO_COMPOSITE_DATA_URI}
        alt="Elasticity custom training hero with a golden-hour lakeside athlete, Week 1 to Week 4 progress scorecard, and four-week training message."
      />
      <Link className="hero-hotspot hero-hotspot-fit" href="/fit" aria-label="Take the 90-second fit check" />
      <a className="hero-hotspot hero-hotspot-sample" href="#sample-week" aria-label="See a real training day" />
      <a className="hero-hotspot hero-hotspot-scroll" href="#how-it-works" aria-label="Scroll to learn more" />
    </section>
  )
}
