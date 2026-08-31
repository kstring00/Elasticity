'use client'

import { usePathname } from 'next/navigation'
import lakesideHero from '../hero-data/lakeside'

export default function HomeHeroComposite() {
  const pathname = usePathname()
  if (pathname !== '/') return null

  return (
    <div className="home-hero-composite" aria-hidden="true">
      <img
        src={lakesideHero}
        alt=""
        width={1650}
        height={928}
        fetchPriority="high"
        decoding="sync"
      />
    </div>
  )
}
