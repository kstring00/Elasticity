'use client'

import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

const steps = [
  ['Outcome', 'What are we building toward?'],
  ['Real life', 'Make the plan fit your week.'],
  ['Training history', 'Understand your starting point.'],
  ['Equipment', 'Build only with what you can use.'],
  ['Movement readiness', 'Know what should be modified or avoided.'],
  ['Recovery', 'Account for the work outside the workout.'],
  ['Coaching fit', 'Decide how the plan should communicate with you.'],
] as const

type IntakeState = Record<string, string | boolean>

const initialState: IntakeState = {
  primary_goal: '', secondary_goal: '', why_now: '', success_definition: '', target_date: '', biggest_barrier: '',
  days_per_week: '4', available_days: '', minutes_per_session: '60', preferred_time: '', work_activity: '', schedule_constraints: '', travel_frequency: '',
  training_experience: '', recent_consistency: '', previous_programs: '', favorite_training: '', disliked_movements: '', free_weight_confidence: '5', current_cardio: '',
  training_location: '', equipment_access: '', missing_equipment: '', cardio_options: '', substitutions_needed: '',
  movement_discomfort: '', clinician_guidance: '', exercise_clearance: false,
  sleep_hours: '', stress_level: '5', recovery_quality: '', recovery_priorities: '', lifestyle_context: '',
  communication_style: '', accountability_style: '', detail_preference: '', biggest_concern: '', coach_notes: '',
  training_terms_consent: false, marketing_photo_consent: false,
}

function Field({ label, name, value, onChange, type = 'text', placeholder, required = false }: { label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string; required?: boolean }) {
  return <div className="field"><label htmlFor={name}>{label}</label><input id={name} name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} required={required}/></div>
}

function TextArea({ label, name, value, onChange, placeholder, wide = false }: { label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string; wide?: boolean }) {
  return <div className={`field ${wide ? 'wide' : ''}`}><label htmlFor={name}>{label}</label><textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder}/></div>
}

function SelectField({ label, name, value, onChange, children }: { label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLSelectElement>) => void; children: ReactNode }) {
  return <div className="field"><label htmlFor={name}>{label}</label><select id={name} name={name} value={value} onChange={onChange}>{children}</select></div>
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<IntakeState>(initialState)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('elasticity-intake')
    if (saved) {
      try { setData({ ...initialState, ...JSON.parse(saved) }) } catch { /* ignore stale draft */ }
    }
  }, [])

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step])

  function change(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = event.target as HTMLInputElement
    const next = { ...data, [target.name]: target.type === 'checkbox' ? target.checked : target.value }
    setData(next)
    localStorage.setItem('elasticity-intake', JSON.stringify(next))
  }

  async function saveDraft(nextStep = step) {
    localStorage.setItem('elasticity-intake', JSON.stringify(data))
    const supabase = createBrowserSupabaseClient()
    if (!supabase) return
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) return
    await supabase.from('intakes').upsert({ client_id: auth.user.id, responses: data, current_step: nextStep + 1, status: 'draft' }, { onConflict: 'client_id' })
  }

  function coachSummary() {
    const parts = [
      `Goal: ${data.primary_goal || 'not stated'}`,
      `${data.days_per_week || '?'} days/week`,
      `${data.minutes_per_session || '?'} min/session`,
      `Experience: ${data.training_experience || 'not stated'}`,
      `Location: ${data.training_location || 'not stated'}`,
      `Equipment: ${data.equipment_access || 'not stated'}`,
      `Schedule constraints: ${data.schedule_constraints || 'none stated'}`,
      `Movement notes: ${data.movement_discomfort || data.clinician_guidance || 'none stated'}`,
      `Coaching preference: ${data.accountability_style || data.communication_style || 'not stated'}`,
    ]
    return parts.join(' | ')
  }

  async function finish() {
    if (!data.training_terms_consent) {
      setStatus('Please confirm the training-readiness and information-use acknowledgement before submitting.')
      return
    }

    const supabase = createBrowserSupabaseClient()
    if (!supabase) {
      setStatus('Preview saved locally. Connect the Elasticity Supabase project to submit this intake to the coach dashboard.')
      return
    }

    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) {
      setStatus('Your answers are saved on this device. Sign in to securely submit them to your coach.')
      setTimeout(() => window.location.assign('/login?next=/onboarding'), 900)
      return
    }

    const { error } = await supabase.from('intakes').upsert({
      client_id: auth.user.id,
      responses: data,
      current_step: steps.length,
      coach_summary: coachSummary(),
      consent_to_training_terms: Boolean(data.training_terms_consent),
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    }, { onConflict: 'client_id' })

    if (error) return setStatus(error.message)
    localStorage.removeItem('elasticity-intake')
    setStatus('Intake submitted. Your coach now has a structured brief and has been notified that it is ready for review.')
  }

  async function next() {
    const nextStep = Math.min(step + 1, steps.length - 1)
    await saveDraft(nextStep)
    setStep(nextStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function content() {
    switch (step) {
      case 0:
        return <>
          <h2 className="intake-title">What would make these four weeks matter?</h2>
          <p className="intake-description">Start with the outcome, not the exercises. The coach should understand what you want to change, why now matters, and what success would actually look like to you.</p>
          <div className="form-grid">
            <Field label="Primary goal" name="primary_goal" value={String(data.primary_goal)} onChange={change} placeholder="Example: rebuild strength and conditioning" required/>
            <Field label="Secondary goal" name="secondary_goal" value={String(data.secondary_goal)} onChange={change} placeholder="Example: improve core control"/>
            <TextArea label="Why are you starting now?" name="why_now" value={String(data.why_now)} onChange={change} placeholder="What changed, or what made this feel worth prioritizing?" wide/>
            <TextArea label="At the end of four weeks, what would make you say this worked?" name="success_definition" value={String(data.success_definition)} onChange={change} placeholder="Use your own words. Strength, consistency, confidence, endurance, performance…" wide/>
            <Field label="Important date or event (optional)" name="target_date" value={String(data.target_date)} onChange={change} type="date"/>
            <Field label="Biggest thing that has gotten in the way before" name="biggest_barrier" value={String(data.biggest_barrier)} onChange={change} placeholder="Time, uncertainty, boredom, recovery, consistency…"/>
          </div>
        </>
      case 1:
        return <>
          <h2 className="intake-title">Build around your real week.</h2>
          <p className="intake-description">A perfect plan that cannot survive your schedule is not a good plan. These answers help the coach choose the right training frequency and session size before selecting exercises.</p>
          <div className="form-grid">
            <SelectField label="Realistic training days per week" name="days_per_week" value={String(data.days_per_week)} onChange={change}><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></SelectField>
            <SelectField label="Time available per session" name="minutes_per_session" value={String(data.minutes_per_session)} onChange={change}><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option><option value="75">75 minutes</option><option value="90">90+ minutes</option></SelectField>
            <Field label="Days that usually work" name="available_days" value={String(data.available_days)} onChange={change} placeholder="Mon, Tue, Thu, Sat"/>
            <Field label="Preferred training time" name="preferred_time" value={String(data.preferred_time)} onChange={change} placeholder="Before work, lunch, evenings…"/>
            <SelectField label="Typical workday activity" name="work_activity" value={String(data.work_activity)} onChange={change}><option value="">Select</option><option>Mostly seated</option><option>Mixed sitting and walking</option><option>On my feet most of the day</option><option>Physically demanding</option></SelectField>
            <SelectField label="How often does travel disrupt your routine?" name="travel_frequency" value={String(data.travel_frequency)} onChange={change}><option value="">Select</option><option>Rarely</option><option>About monthly</option><option>A few times a month</option><option>Weekly</option></SelectField>
            <TextArea label="Schedule constraints the coach should design around" name="schedule_constraints" value={String(data.schedule_constraints)} onChange={change} placeholder="Long workdays, childcare, rotating shifts, commute, specific recovery days…" wide/>
          </div>
        </>
      case 2:
        return <>
          <h2 className="intake-title">Tell us how you already train.</h2>
          <p className="intake-description">This is not a test of how advanced you are. It prevents the coach from assuming familiarity with movements, loading, gym equipment, or training volume that may not fit you.</p>
          <div className="form-grid">
            <SelectField label="Strength-training experience" name="training_experience" value={String(data.training_experience)} onChange={change}><option value="">Select</option><option>Brand new</option><option>Less than 1 year</option><option>1–3 years</option><option>3+ years</option><option>Returning after a long break</option></SelectField>
            <SelectField label="Consistency over the last 3 months" name="recent_consistency" value={String(data.recent_consistency)} onChange={change}><option value="">Select</option><option>Little or no structured training</option><option>1–2 days most weeks</option><option>3–4 days most weeks</option><option>5+ days most weeks</option><option>Very inconsistent / varies a lot</option></SelectField>
            <TextArea label="Programs or training approaches you have tried" name="previous_programs" value={String(data.previous_programs)} onChange={change} placeholder="What did you like or dislike about them?"/>
            <TextArea label="Training you enjoy" name="favorite_training" value={String(data.favorite_training)} onChange={change} placeholder="Free weights, machines, circuits, running, intervals, classes…"/>
            <TextArea label="Exercises or styles you strongly dislike" name="disliked_movements" value={String(data.disliked_movements)} onChange={change} placeholder="The coach can often reach the same goal another way."/>
            <TextArea label="Current cardio, sports, or other activity" name="current_cardio" value={String(data.current_cardio)} onChange={change} placeholder="Type, frequency, and roughly how hard it feels."/>
            <div className="range-field wide"><label>Confidence using free weights: <strong>{data.free_weight_confidence}/10</strong></label><input type="range" name="free_weight_confidence" min="1" max="10" value={String(data.free_weight_confidence)} onChange={change}/></div>
          </div>
        </>
      case 3:
        return <>
          <h2 className="intake-title">Only prescribe what you can actually use.</h2>
          <p className="intake-description">The exercise library is reusable, but your program is not. Equipment access tells the coach which movements belong in your plan and which need substitutions.</p>
          <div className="form-grid">
            <SelectField label="Primary training location" name="training_location" value={String(data.training_location)} onChange={change}><option value="">Select</option><option>Full commercial gym</option><option>Apartment / small gym</option><option>Home gym</option><option>Home with limited equipment</option><option>Mostly outdoors</option></SelectField>
            <Field label="Cardio options available" name="cardio_options" value={String(data.cardio_options)} onChange={change} placeholder="Treadmill, bike, elliptical, rower, outdoor running…"/>
            <TextArea label="Equipment you reliably have access to" name="equipment_access" value={String(data.equipment_access)} onChange={change} placeholder="Barbells, dumbbells, cables, machines, bands, bench, rack…" wide/>
            <TextArea label="Equipment you do NOT have" name="missing_equipment" value={String(data.missing_equipment)} onChange={change} placeholder="Especially equipment commonly assumed in workout plans."/>
            <TextArea label="Any movement that needs a home/gym alternative?" name="substitutions_needed" value={String(data.substitutions_needed)} onChange={change} placeholder="Example: I travel twice a month and need dumbbell alternatives."/>
          </div>
        </>
      case 4:
        return <>
          <h2 className="intake-title">Know what should be modified before we load it.</h2>
          <p className="intake-description">Elasticity is training guidance, not medical care. Share only the movement information the coach needs. If a qualified healthcare professional has given you exercise restrictions, their guidance should take priority over the program.</p>
          <div className="form-grid">
            <TextArea label="Any movements that currently cause pain, unusual discomfort, or do not feel appropriate for you?" name="movement_discomfort" value={String(data.movement_discomfort)} onChange={change} placeholder="Name the movement and what you notice. You do not need to provide a diagnosis." wide/>
            <TextArea label="Has a qualified healthcare professional told you to avoid or modify any exercise?" name="clinician_guidance" value={String(data.clinician_guidance)} onChange={change} placeholder="If yes, describe the exercise guidance or restrictions they gave you." wide/>
            <label className="checkbox-card wide"><input type="checkbox" name="exercise_clearance" checked={Boolean(data.exercise_clearance)} onChange={change}/><span><strong>I understand that unusual, sharp, sudden, or worsening pain is a reason to stop and seek appropriate professional guidance.</strong><br/><small>This lets the coach know you understand the difference between training effort and a potential problem.</small></span></label>
          </div>
        </>
      case 5:
        return <>
          <h2 className="intake-title">Recovery is part of the prescription.</h2>
          <p className="intake-description">Training stress does not happen in isolation. These questions help the coach avoid programming volume that looks reasonable on paper but conflicts with your sleep, work demands, or recovery.</p>
          <div className="form-grid">
            <Field label="Average sleep per night" name="sleep_hours" value={String(data.sleep_hours)} onChange={change} placeholder="Example: 6.5–7 hours"/>
            <SelectField label="How do you usually recover between workouts?" name="recovery_quality" value={String(data.recovery_quality)} onChange={change}><option value="">Select</option><option>Usually feel ready by the next session</option><option>Sometimes carry soreness/fatigue</option><option>Often feel under-recovered</option><option>Not sure yet</option></SelectField>
            <div className="range-field"><label>Current life stress: <strong>{data.stress_level}/10</strong></label><input type="range" name="stress_level" min="1" max="10" value={String(data.stress_level)} onChange={change}/></div>
            <Field label="Preferred recovery days" name="recovery_priorities" value={String(data.recovery_priorities)} onChange={change} placeholder="Example: Wednesday and Sunday"/>
            <TextArea label="Anything about work, school, caregiving, sleep, or daily life that changes your recovery?" name="lifestyle_context" value={String(data.lifestyle_context)} onChange={change} placeholder="Optional context that helps make the training realistic." wide/>
          </div>
        </>
      default:
        return <>
          <h2 className="intake-title">How should your coach coach you?</h2>
          <p className="intake-description">Two clients can have the same physical goal and need completely different communication. This final step helps the plan feel clear, motivating, and usable for you.</p>
          <div className="form-grid">
            <SelectField label="Communication style" name="communication_style" value={String(data.communication_style)} onChange={change}><option value="">Select</option><option>Direct and concise</option><option>Detailed and educational</option><option>Encouraging and supportive</option><option>A mix depending on the situation</option></SelectField>
            <SelectField label="Accountability style" name="accountability_style" value={String(data.accountability_style)} onChange={change}><option value="">Select</option><option>Give me the plan and let me execute</option><option>Check in and ask how it went</option><option>I want firm accountability</option><option>I am still figuring that out</option></SelectField>
            <SelectField label="How much exercise explanation do you want?" name="detail_preference" value={String(data.detail_preference)} onChange={change}><option value="">Select</option><option>Just tell me what to do</option><option>Short cues are perfect</option><option>Explain the reason behind movements</option><option>I like a lot of detail</option></SelectField>
            <Field label="Biggest concern about starting this plan" name="biggest_concern" value={String(data.biggest_concern)} onChange={change} placeholder="What might make you hesitate or lose confidence?"/>
            <TextArea label="Anything else you want your coach to know before she builds your program?" name="coach_notes" value={String(data.coach_notes)} onChange={change} wide/>
            <label className="checkbox-card wide"><input type="checkbox" name="training_terms_consent" checked={Boolean(data.training_terms_consent)} onChange={change}/><span><strong>I confirm these answers are accurate enough to guide my training plan and understand Elasticity is not a substitute for medical evaluation or treatment.</strong></span></label>
            <label className="checkbox-card wide"><input type="checkbox" name="marketing_photo_consent" checked={Boolean(data.marketing_photo_consent)} onChange={change}/><span><strong>Optional: I am open to being asked about using progress photos/testimonials later.</strong><br/><small>This is not permission to publish anything. Separate explicit approval is still required before a transformation is made public.</small></span></label>
            <div className="ai-ready wide"><Sparkles size={18}/><p><strong>AI-ready coach brief:</strong> the structured intake is stored in a way that can later generate a concise coach summary, highlight conflicting constraints, and surface unanswered questions. AI should assist the coach’s review—not automatically prescribe a program.</p></div>
          </div>
        </>
    }
  }

  return (
    <main className="intake-page">
      <div className="intake-shell">
        <aside className="intake-aside">
          <div className="eyebrow">Client onboarding</div>
          <h1>Build the person before the program.</h1>
          <p className="form-note">Your answers autosave on this device. When signed in, drafts are also saved securely to your client record.</p>
          <div className="step-list">
            {steps.map(([label], index) => <button key={label} className={`step-pill ${index === step ? 'active' : ''}`} onClick={() => setStep(index)}><span className="step-index">{index + 1}</span><span>{label}</span></button>)}
          </div>
        </aside>

        <section className="intake-card">
          <div className="intake-progress"><span style={{ width: `${progress}%` }}/></div>
          <div className="eyebrow">Step {step + 1} of {steps.length} · {steps[step][1]}</div>
          {content()}
          {status && <div className="status-note">{status}</div>}
          <div className="intake-actions">
            <button className="button-secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft size={15}/> Back</button>
            {step < steps.length - 1 ? <button className="button-primary" onClick={next}>Save & continue <ArrowRight size={15}/></button> : <button className="button-primary" onClick={finish}>Submit to coach <CheckCircle2 size={16}/></button>}
          </div>
        </section>
      </div>
    </main>
  )
}
