'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

type FitState = { location: string; days: string; experience: string; goals: string[]; pain: string; firstName: string; email: string }
const emptyFit: FitState = { location: '', days: '', experience: '', goals: [], pain: '', firstName: '', email: '' }

const screens = [
  { key: 'location', title: 'Where would you like to move?', helper: 'Your setup helps Abrielle decide what kind of mobility or training support makes sense.', options: ['Commercial gym','Home gym with equipment','At home with minimal equipment','I need help figuring that out'] },
  { key: 'days', title: 'How many days can you realistically make room for this?', helper: 'Answer for your real week, not your perfect week.', options: ['2','3','4','5+'] },
  { key: 'experience', title: 'Where are you right now?', helper: 'There is no right answer. This just gives El^sticity a useful starting point.', options: ['New to structured movement','Getting back after time off','Consistent, but mobility feels limited','Training consistently and want better movement'] },
  { key: 'goals', title: 'What would feel most worthwhile?', helper: 'Pick up to two.', options: ['Move with less restriction','Improve mobility or flexibility','Feel stronger and more stable','Return to exercise after rehab clearance','Build a consistent routine','Add personalized training'] },
  { key: 'pain', title: 'Anything hurting right now?', helper: 'This is a screening question, not a diagnosis.', options: ['No','Minor, and I know how to manage it','Yes, but I have been evaluated and cleared','Yes, and I have not had it evaluated'] },
] as const

export default function FitPage() {
  const [step, setStep] = useState(-1)
  const [data, setData] = useState<FitState>(emptyFit)

  useEffect(() => {
    const saved = localStorage.getItem('elasticity-fit')
    if (!saved) return
    try { setData({ ...emptyFit, ...JSON.parse(saved) }) } catch { localStorage.removeItem('elasticity-fit') }
  }, [])

  const progress = useMemo(() => step < 0 ? 0 : Math.min(100, ((step + 1) / 6) * 100), [step])
  const current = step >= 0 && step < screens.length ? screens[step] : null

  function save(next: FitState) { setData(next); localStorage.setItem('elasticity-fit', JSON.stringify(next)) }
  function choose(value: string) {
    if (!current) return
    if (current.key === 'goals') {
      const goals = data.goals.includes(value) ? data.goals.filter((g) => g !== value) : data.goals.length < 2 ? [...data.goals, value] : data.goals
      save({ ...data, goals }); return
    }
    save({ ...data, [current.key]: value })
    setTimeout(() => setStep((s) => Math.min(5, s + 1)), 120)
  }
  function canContinue() {
    if (step < 0) return true
    if (step === 3) return data.goals.length > 0
    if (step === 5) return Boolean(data.firstName.trim() && /.+@.+\..+/.test(data.email))
    return true
  }
  function finish() { localStorage.setItem('elasticity-fit', JSON.stringify(data)); window.location.assign('/plan') }

  const hardStop = data.pain === 'Yes, and I have not had it evaluated'

  return (
    <main className="fit-page"><div className="fit-shell">
      <div className="fit-progress"><span style={{ width: `${progress}%` }} /></div>
      {step === -1 && <section className="fit-card fit-intro"><div className="eyebrow">A quick fit check · about 90 seconds</div><h1>Let's find the kind of support that fits your body right now.</h1><p>Five tap questions, then your name and email. No card. No essay. You will see the recommended path and pricing next.</p><button className="button-primary" onClick={() => setStep(0)}>Begin <ArrowRight size={15}/></button></section>}
      {current && <section className="fit-card"><div className="fit-kicker">Question {step + 1} of 5</div><h1>{current.title}</h1><p>{current.helper}</p><div className="fit-options">{current.options.map((option) => { const selected = current.key === 'goals' ? data.goals.includes(option) : data[current.key as keyof FitState] === option; return <button key={option} className={selected ? 'selected' : ''} onClick={() => choose(option)}>{selected && <Check size={16}/>}<span>{option}</span></button> })}</div><div className="fit-nav"><button className="button-secondary" onClick={() => setStep((s) => Math.max(-1, s - 1))}><ArrowLeft size={14}/> Back</button>{step === 3 && <button className="button-primary" onClick={() => setStep(4)} disabled={!canContinue()}>Continue <ArrowRight size={14}/></button>}</div></section>}
      {step === 5 && !hardStop && <section className="fit-card"><div className="fit-kicker">Last step</div><h1>Where should your fit summary go?</h1><p>This keeps your answers together for checkout and deeper onboarding if you decide to continue.</p><div className="fit-email-grid"><label><span>First name</span><input value={data.firstName} onChange={(e) => save({ ...data, firstName: e.target.value })} autoComplete="given-name" /></label><label><span>Email</span><input type="email" value={data.email} onChange={(e) => save({ ...data, email: e.target.value })} autoComplete="email" /></label></div><p className="fit-micro">No password here. If you purchase, Stripe can use this email at checkout.</p><div className="fit-nav"><button className="button-secondary" onClick={() => setStep(4)}><ArrowLeft size={14}/> Back</button><button className="button-primary" onClick={finish} disabled={!canContinue()}>See my fit <ArrowRight size={14}/></button></div></section>}
      {step === 5 && hardStop && <section className="fit-card fit-stop"><div className="eyebrow">A good fit check can say “not yet”</div><h1>Have the limiting issue evaluated first.</h1><p>El^sticity can support mobility after rehabilitation or medical clearance, but it is not a substitute for medical evaluation, physical therapy, or rehabilitation itself.</p><div className="fit-nav"><button className="button-secondary" onClick={() => setStep(4)}><ArrowLeft size={14}/> Change answer</button><Link href="/" className="button-primary">Back to El^sticity</Link></div></section>}
    </div></main>
  )
}
