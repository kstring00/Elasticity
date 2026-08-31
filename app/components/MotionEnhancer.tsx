'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SELECTOR = [
  // the hero holds the LCP image; never fade it in
  '.launch-home > section:not(.hero-photo)',
  '.fit-page .fit-card',
  '.plan-page section',
  '.legal-page section',
].join(', ')

export default function MotionEnhancer() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const frame = window.requestAnimationFrame(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
      if (!elements.length) return

      elements.forEach((element) => element.classList.add('motion-ready'))

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('motion-in')
            observer.unobserve(entry.target)
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )

      elements.forEach((element) => observer.observe(element))

      ;(window as Window & { __elasticityMotionObserver?: IntersectionObserver }).__elasticityMotionObserver = observer
    })

    return () => {
      window.cancelAnimationFrame(frame)
      const motionWindow = window as Window & { __elasticityMotionObserver?: IntersectionObserver }
      motionWindow.__elasticityMotionObserver?.disconnect()
      delete motionWindow.__elasticityMotionObserver
    }
  }, [pathname])

  return null
}
