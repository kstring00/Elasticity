'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

type FitState = { location: string; days: string; experience: string; goals: string[]; pain: string; firstName: string; email: string }
const emptyFit: FitState = { location: '', days: '', experience: '', goals: [], pain: '', firstName: '', email: '' }

export default function PlanPage() {
  const [fit, setFit] = useState<FitState>(emptyFit)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('elasticity-fit')
    if (saved) {
      try { setFit({ ...emptyFit, ...JSON.parse(saved) }) } catch { /* ignore stale data */ }
    }
    setLoaded(true)
  }, [])

  const schedule = useMemo(() => {
    if (fit.days === '2') return 'two full-body strength days with conditioning folded into the week'
    if (fit.days === '3') return 'three strength-and-core days with recovery between them'
    if (fit.days === '4') return 'three strength-and-core days plus one conditioning day'
    return 'three strength-and-core days, two conditioning days, and two recovery days'
  }, [fit.days])

  if (!loaded) return <main className="plan-page"><div className="plan-shell">Loading your fit…</div></main>

  if (!fit.location || !fit.days || !fit.experience) {
    return <main className="plan-page"><div className="plan-shell"><section className="plan-result-card"><div className="eyebrow">Fit check needed</div><h1>Start with the 90-second fit check.</h1><p>The result page only works when there is something real to reflect back to you.</p><Link href="/fit" className="button-primary">Take the fit check <ArrowRight size={15}/></Link></section></div></main>
  }

  return (
    <main className="plan-page"><div className="plan-shell">
      <Link href="/fit" className="plan-back"><ArrowLeft size={14}/> Edit my answers</Link>
      <section className="plan-result-card">
        <div className="eyebrow">Your fit result</div>
        <h1>{fit.firstName ? `${fit.firstName}, here is` : 'Here is'} what the first build could look like.</h1>
        <p className="plan-summary">Based on what you told us: <strong>{fit.location.toLowerCase()}</strong>, <strong>{fit.days} training days</strong>, <strong>{fit.experience.toLowerCase()}</strong>{fit.goals.length ? `, focused on ${fit.goals.join(' + ').toLowerCase()}` : ''}.</p>
        <div className="plan-roadmap">
          <div><span>Schedule</span><strong>{schedule}</strong></div>
          <div><span>Week 1</span><strong>Establish conservative starting loads and record the numbers.</strong></div>
          <div><span>Weeks 2–3</span><strong>Build support, symmetry, stability, and control around those lifts.</strong></div>
          <div><span>Week 4</span><strong>Bring key Week 1 movements back and compare what changed.</strong></div>
        </div>
      </section>

      <section className="plan-pricing">
        <div className="launch-section-head"><div className="eyebrow">Founding-client pricing</div><h2>Choose how much coach involvement you want.</h2></div>
        <div className="launch-pricing-grid">
          <article className="launch-price-card"><div className="price-kicker">Founding client</div><h3>The Build</h3><div className="launch-price"><span>$149</span><strong>$99</strong></div><ul><li><Check size={15}/>Custom four-week program</li><li><Check size={15}/>Progression + Week 1/4 scorecard</li><li><Check size={15}/>One revision within seven days</li></ul><form action="/api/checkout" method="post"><input type="hidden" name="plan" value="build"/><input type="hidden" name="email" value={fit.email}/><button className="button-primary" type="submit">Choose The Build <ArrowRight size={15}/></button></form></article>
          <article className="launch-price-card featured"><div className="price-kicker">Most people should pick this</div><h3>Build + Check-Ins</h3><div className="launch-price"><span>$229</span><strong>$149</strong></div><ul><li><Check size={15}/>Everything in The Build</li><li><Check size={15}/>Four structured weekly check-ins</li><li><Check size={15}/>Written feedback + adjustment review</li></ul><form action="/api/checkout" method="post"><input type="hidden" name="plan" value="guided"/><input type="hidden" name="email" value={fit.email}/><button className="button-primary" type="submit">Choose guided <ArrowRight size={15}/></button></form></article>
          <article className="launch-price-card"><div className="price-kicker">Longer runway</div><h3>12-Week Progression</h3><div className="launch-price single"><strong>$549</strong></div><ul><li><Check size={15}/>Three four-week builds</li><li><Check size={15}/>Weekly check-ins throughout</li><li><Check size={15}/>Months 2–3 built from real results</li></ul><form action="/api/checkout" method="post"><input type="hidden" name="plan" value="progression"/><input type="hidden" name="email" value={fit.email}/><button className="button-secondary" type="submit">Choose 12 weeks <ArrowRight size={15}/></button></form></article>
        </div>
      </section>

      <section className="plan-guarantee"><div className="eyebrow">Fit guarantee</div><h2>If the plan does not match the intake, request a rebuild.</h2><p>If the schedule, equipment, or training level does not reflect what you submitted, request one revision within seven days of delivery at no additional charge. The guarantee covers fit to the submitted intake, not a specific body or performance result.</p></section>
    </div></main>
  )
}
