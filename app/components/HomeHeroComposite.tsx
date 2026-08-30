'use client'

import { usePathname } from 'next/navigation'
import { HERO_PHOTO_DATA_URI } from '../hero-photo'

export default function HomeHeroComposite() {
  const pathname = usePathname()
  if (pathname !== '/') return null

  return (
    <section className="home-hero-composite" aria-label="Elasticity golden-hour lakeside training hero">
      <img
        src={HERO_PHOTO_DATA_URI}
        alt="Athlete stretching beside a lake at golden hour with mountains in the distance."
      />
    </section>
  )
}
