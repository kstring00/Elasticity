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
    if (saved) { try { setFit({ ...emptyFit, ...JSON.parse(saved) }) } catch { /* ignore stale data */ } }
    setLoaded(true)
  }, [])

  const rhythm = useMemo(() => {
    if (fit.days === '2') return 'two focused movement days with room to recover between them'
    if (fit.days === '3') return 'three intentional sessions with mobility and recovery built through the week'
    if (fit.days === '4') return 'four sessions with mobility, strength, and recovery balanced around your goals'
    return 'a flexible five-plus-day rhythm with shorter mobility work and planned recovery'
  }, [fit.days])

  if (!loaded) return <main className="plan-page"><div className="plan-shell">Loading your fit…</div></main>
  if (!fit.location || !fit.days || !fit.experience) return <main className="plan-page"><div className="plan-shell"><section className="plan-result-card"><div className="eyebrow">Fit check needed</div><h1>Start with the 90-second fit check.</h1><p>The result page works best when there is something real to reflect back to you.</p><Link href="/fit" className="button-primary">Take the fit check <ArrowRight size={15}/></Link></section></div></main>

  return (
    <main className="plan-page"><div className="plan-shell">
      <Link href="/fit" className="plan-back"><ArrowLeft size={14}/> Edit my answers</Link>
      <section className="plan-result-card">
        <div className="eyebrow">Your El^sticity fit</div>
        <h1>{fit.firstName ? `${fit.firstName}, here is` : 'Here is'} what your first block could feel like.</h1>
        <p className="plan-summary">You told us: <strong>{fit.location.toLowerCase()}</strong>, <strong>{fit.days} days</strong>, <strong>{fit.experience.toLowerCase()}</strong>{fit.goals.length ? `, with a focus on ${fit.goals.join(' + ').toLowerCase()}` : ''}.</p>
        <div className="plan-roadmap">
          <div><span>Rhythm</span><strong>{rhythm}</strong></div>
          <div><span>Release</span><strong>Start with mobility, range, and the restrictions that matter most to you.</strong></div>
          <div><span>Restore</span><strong>Build control, confidence, consistency, and recovery around that starting point.</strong></div>
          <div><span>Rebuild</span><strong>Layer personalized strength or conditioning in when it supports your goals.</strong></div>
        </div>
      </section>

      <section className="plan-pricing">
        <div className="launch-section-head"><div className="eyebrow">Founding-client pricing</div><h2>Choose how much coach involvement you want.</h2></div>
        <div className="launch-pricing-grid">
          <article className="launch-price-card"><div className="price-kicker">Founding client</div><h3>The Build</h3><div className="launch-price"><span>$149</span><strong>$99</strong></div><ul><li><Check size={15}/>Mobility-first custom four-week plan</li><li><Check size={15}/>Training layered in when appropriate</li><li><Check size={15}/>One revision within seven days</li></ul><form action="/api/checkout" method="post"><input type="hidden" name="plan" value="build"/><input type="hidden" name="email" value={fit.email}/><button className="button-primary" type="submit">Choose The Build <ArrowRight size={15}/></button></form></article>
          <article className="launch-price-card featured"><div className="price-kicker">More support</div><h3>Build + Check-Ins</h3><div className="launch-price"><span>$229</span><strong>$149</strong></div><ul><li><Check size={15}/>Everything in The Build</li><li><Check size={15}/>Four structured weekly check-ins</li><li><Check size={15}/>Written feedback + adjustment review</li></ul><form action="/api/checkout" method="post"><input type="hidden" name="plan" value="guided"/><input type="hidden" name="email" value={fit.email}/><button className="button-primary" type="submit">Choose guided support <ArrowRight size={15}/></button></form></article>
          <article className="launch-price-card"><div className="price-kicker">Longer runway</div><h3>12-Week Progression</h3><div className="launch-price single"><strong>$549</strong></div><ul><li><Check size={15}/>Three four-week builds</li><li><Check size={15}/>Weekly check-ins throughout</li><li><Check size={15}/>Months 2–3 built from real feedback</li></ul><form action="/api/checkout" method="post"><input type="hidden" name="plan" value="progression"/><input type="hidden" name="email" value={fit.email}/><button className="button-secondary" type="submit">Choose 12 weeks <ArrowRight size={15}/></button></form></article>
        </div>
      </section>

      <section className="plan-guarantee"><div className="eyebrow">Fit guarantee</div><h2>If the plan does not match the intake, request a rebuild.</h2><p>If the schedule, equipment, mobility needs, or training level does not reflect what you submitted, request one revision within seven days of delivery at no additional charge.</p></section>
    </div></main>
  )
}
