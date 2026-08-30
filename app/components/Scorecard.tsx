'use client'

import { useEffect, useRef, useState } from 'react'

// TODO: replace with Abrielle's real numbers before launch
export const SCORECARD_ROWS: ReadonlyArray<readonly [string, string, string]> = [
  ['Bench press', '135', '155'],
  ['Leg press', '270', '320'],
  ['Lat pulldown', '100', '120'],
  ['T-bar row', '70', '90'],
  ['Romanian deadlift', '135', '165'],
  ['DB shoulder press', '25', '35'],
  ['Energy level', '5', '8'],
]

const STAGGER_MS = 90

export default function Scorecard() {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(0)
  const [instant, setInstant] = useState(false)

  useEffect(() => {
    // Reduced motion: both columns filled immediately, no observer, no animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInstant(true)
      setRevealed(SCORECARD_ROWS.length)
      return
    }

    const el = ref.current
    if (!el) return

    const timers: number[] = []
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect() // fire once, never on re-scroll
        SCORECARD_ROWS.forEach((_, i) => {
          timers.push(window.setTimeout(() => setRevealed(i + 1), i * STAGGER_MS))
        })
      },
      { threshold: 0.35 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      timers.forEach(window.clearTimeout)
    }
  }, [])

  return (
    <div className="scorecard-shell" ref={ref} aria-label="Week 1 to Week 4 progress scorecard preview">
      <div className="scorecard-head">
        <span className="eyebrow">Elasticity progress scorecard</span>
        <strong>Week 1 → Week 4</strong>
      </div>
      <div className="scorecard-grid scorecard-labels">
        <span>Movement</span><span>Week 1</span><span>Week 4</span>
      </div>
      {SCORECARD_ROWS.map(([name, week1, week4], i) => (
        <div className="scorecard-grid" key={name}>
          <strong>{name}</strong>
          <span className="num week1">{week1}</span>
          <span
            className={`num week4${i < revealed ? ' is-in' : ''}`}
            data-instant={instant ? '' : undefined}
          >
            {week4}
          </span>
        </div>
      ))}
      <div className="scorecard-foot">The promise is measurement, not a dramatic 28-day photo.</div>
    </div>
  )
}
