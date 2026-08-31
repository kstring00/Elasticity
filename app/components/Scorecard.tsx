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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInstant(true)
      setRevealed(SCORECARD_ROWS.length)
      return
    }

    const el = ref.current
    if (!el) return
    const timers: number[] = []
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      observer.disconnect()
      SCORECARD_ROWS.forEach((_, i) => timers.push(window.setTimeout(() => setRevealed(i + 1), i * STAGGER_MS)))
    }, { threshold: 0.35 })
    observer.observe(el)

    return () => {
      observer.disconnect()
      timers.forEach(window.clearTimeout)
    }
  }, [])

  return (
    <div className="scorecard-shell" ref={ref} aria-label="Week 1 to Week 4 progress scorecard preview">
      <div className="scorecard-title">Elasticity progress scorecard</div>
      <table className="scorecard-table">
        <thead>
          <tr><th>Movement</th><th>Week 1</th><th>Week 4</th></tr>
        </thead>
        <tbody>
          {SCORECARD_ROWS.map(([name, week1, week4], i) => (
            <tr key={name}>
              <td>{name}</td>
              <td className="week1">{week1}</td>
              <td className={`week4${i < revealed ? ' is-in' : ''}`} data-instant={instant ? '' : undefined}>{week4}<span aria-hidden="true"> ↑</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="scorecard-foot">The promise is measurement, not a dramatic 28-day photo.</div>
    </div>
  )
}
