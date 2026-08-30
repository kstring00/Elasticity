'use client'

import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Save, Sparkles } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

const steps = [
  ['Goals', 'What are we building toward?'],
  ['Your week', 'Make the plan fit real life.'],
  ['Training', 'Understand your starting point.'],
  ['Equipment', 'Use what you actually have.'],
  ['Movement', 'Know what needs modification.'],
  ['Recovery', 'Account for life outside the gym.'],
  ['Coaching', 'Make the plan easy to follow.'],
] as const

type IntakeState = Record<string, string | boolean>

const initialState: IntakeState = {
  primary_goal: '', secondary_goal: '', why_now: '', success_definition: '', target_date: '', motivation_notes: '', biggest_barrier: '',
  available_days: '', minutes_per_session: '60', preferred_time: '', work_activity: '', current_activity_level: '', schedule_constraints: '',
  training_experience: '', current_training_frequency: '', previous_programs: '', favorite_training: '', disliked_movements: '', confidence_level: '5',
  training_location: '', equipment_access: '', equipment_notes: '', missing_equipment: '', cardio_options: '',
  movement_discomfort: '', clinician_guidance: '', movement_concerns: '', exercise_clearance: false,
  sleep_hours: '', sleep_quality: '5', stress_level: '5', recovery_constraints: '', nutrition_context: '',
  coaching_style: '', accountability_preference: '', communication_preference: '', preferred_checkin_day: '', feedback_preferences: '', anything_else: '',
  terms_ack: false, progress_photo_consent: false,
}

function splitList(value: string) {
  return value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean)
}

function numberOrNull(value: string) {
  if (!value.trim()) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function Field({ label, name, value, onChange, type = 'text', placeholder, required = false }: { label: string; name: string; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string; required?: boolean }) {
  return <div className="field"><label htmlFor={name}>{label}</label><input id={name} name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} required={required} /></div>
}

function TextArea({ label, name, value, onChange, placeholder, wide = false }: { label: string; name: string; value: string; onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string; wide?: boolean }) {
  return <div className={`field ${wide ? 'wide' : ''}`}><label htmlFor={name}>{label}</label><textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} /></div>
}

function SelectField({ label, name, value, onChange, children }: { label: string; name: string; value: string; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; children: ReactNode }) {
  return <div className="field"><label htmlFor={name}>{label}</label><select id={name} name={name} value={value} onChange={onChange}>{children}</select></div>
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<IntakeState>(initialState)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('elasticity-intake')
    if (!saved) return
    try { setData({ ...initialState, ...JSON.parse(saved) }) } catch { localStorage.removeItem('elasticity-intake') }
  }, [])

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step])

  function change(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = event.target as HTMLInputElement
    const next = { ...data, [target.name]: target.type === 'checkbox' ? target.checked : target.value }
    setData(next)
    localStorage.setItem('elasticity-intake', JSON.stringify(next))
    setStatus('')
  }

  function databasePayload(nextStatus: 'draft' | 'submitted') {
    return {
      status: nextStatus,
      primary_goals: splitList(String(data.primary_goal)),
      secondary_goals: splitList(String(data.secondary_goal)),
      success_definition: String(data.success_definition) || null,
      target_date: String(data.target_date) || null,
      why_now: String(data.why_now) || null,
      motivation_notes: String(data.motivation_notes) || null,
      training_experience: String(data.training_experience) || null,
      current_training_frequency: String(data.current_training_frequency) || null,
      previous_programs: String(data.previous_programs) || null,
      current_activity_level: String(data.current_activity_level) || null,
      available_days: splitList(String(data.available_days)),
      session_length_minutes: numberOrNull(String(data.minutes_per_session)),
      preferred_training_time: String(data.preferred_time) || null,
      training_location: String(data.training_location) || null,
      equipment_access: { available: splitList(String(data.equipment_access)), unavailable: splitList(String(data.missing_equipment)), cardio: splitList(String(data.cardio_options)) },
      equipment_notes: String(data.equipment_notes) || null,
      movement_preferences: splitList(String(data.favorite_training)),
      movement_dislikes: splitList(String(data.disliked_movements)),
      injuries_limitations: String(data.clinician_guidance) || null,
      movement_concerns: splitList(String(data.movement_concerns)),
      pain_notes: String(data.movement_discomfort) || null,
      medical_clearance_ack: Boolean(data.exercise_clearance),
      sleep_hours: numberOrNull(String(data.sleep_hours)),
      sleep_quality: numberOrNull(String(data.sleep_quality)),
      stress_level: numberOrNull(String(data.stress_level)),
      work_activity_level: String(data.work_activity) || null,
      recovery_constraints: [String(data.schedule_constraints), String(data.recovery_constraints)].filter(Boolean).join('\n') || null,
      nutrition_context: String(data.nutrition_context) || null,
      barriers: splitList(String(data.biggest_barrier)),
      confidence_level: numberOrNull(String(data.confidence_level)),
      coaching_style: String(data.coaching_style) || null,
      accountability_preference: String(data.accountability_preference) || null,
      communication_preference: String(data.communication_preference) || null,
      preferred_checkin_day: String(data.preferred_checkin_day) || null,
      feedback_preferences: String(data.feedback_preferences) || null,
      anything_else: String(data.anything_else) || null,
      terms_ack: Boolean(data.terms_ack),
      progress_photo_consent: Boolean(data.progress_photo_consent),
      submitted_at: nextStatus === 'submitted' ? new Date().toISOString() : null,
    }
  }

  async function saveDraft(nextStep = step) {
    localStorage.setItem('elasticity-intake', JSON.stringify(data))
    const supabase = createBrowserSupabaseClient()
    if (!supabase) return
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) return

    setSaving(true)
    const { error } = await supabase.from('intakes').upsert({ client_id: auth.user.id, ...databasePayload('draft') }, { onConflict: 'client_id' })
    setSaving(false)

    if (error) {
      setStatus(`Your answers are saved on this device. Secure cloud save needs attention: ${error.message}`)
      return
    }
    if (nextStep === step) setStatus('Draft saved securely.')
  }

  async function finish() {
    if (!data.terms_ack) {
      setStatus('Please confirm the training-readiness acknowledgement before submitting.')
      return
    }

    const supabase = createBrowserSupabaseClient()
    if (!supabase) {
      setStatus('Your intake is saved on this device. Sign in once the site is connected to submit it securely.')
      return
    }

    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) {
      setStatus('Your answers are saved. Sign in to securely submit them to your coach.')
      setTimeout(() => window.location.assign('/login?next=/onboarding'), 900)
      return
    }

    setSaving(true)
    const { error } = await supabase.from('intakes').upsert({ client_id: auth.user.id, ...databasePayload('submitted') }, { onConflict: 'client_id' })
    setSaving(false)

    if (error) return setStatus(error.message)
    localStorage.removeItem('elasticity-intake')
    setStatus('Intake submitted. Your coach has been notified that it is ready for review.')
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
          <p className="intake-description">Start with the outcome, not the exercises. Give your coach enough context to understand what you want to change and why it matters now.</p>
          <div className="form-grid">
            <Field label="Primary goal" name="primary_goal" value={String(data.primary_goal)} onChange={change} placeholder="Build strength, improve conditioning, return to consistency…" required />
            <Field label="Secondary goal" name="secondary_goal" value={String(data.secondary_goal)} onChange={change} placeholder="Core control, endurance, confidence…" />
            <TextArea label="Why are you starting now?" name="why_now" value={String(data.why_now)} onChange={change} placeholder="What changed or made this worth prioritizing?" wide />
            <TextArea label="At the end of four weeks, what would make you say this worked?" name="success_definition" value={String(data.success_definition)} onChange={change} placeholder="Use your own definition of success." wide />
            <Field label="Important date or event (optional)" name="target_date" value={String(data.target_date)} onChange={change} type="date" />
            <Field label="Biggest barrier before now" name="biggest_barrier" value={String(data.biggest_barrier)} onChange={change} placeholder="Time, uncertainty, boredom, recovery…" />
            <TextArea label="Anything motivating you that your coach should understand?" name="motivation_notes" value={String(data.motivation_notes)} onChange={change} wide />
          </div>
        </>
      case 1:
        return <>
          <h2 className="intake-title">Build around your real week.</h2>
          <p className="intake-description">A plan is only useful if it survives your schedule. Be realistic here; the goal is fit, not perfection.</p>
          <div className="form-grid">
            <Field label="Days that usually work" name="available_days" value={String(data.available_days)} onChange={change} placeholder="Mon, Tue, Thu, Sat" />
            <SelectField label="Time available per session" name="minutes_per_session" value={String(data.minutes_per_session)} onChange={change}><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option><option value="75">75 minutes</option><option value="90">90 minutes</option></SelectField>
            <Field label="Preferred training time" name="preferred_time" value={String(data.preferred_time)} onChange={change} placeholder="Before work, lunch, evenings…" />
            <SelectField label="Typical workday activity" name="work_activity" value={String(data.work_activity)} onChange={change}><option value="">Select</option><option>Mostly seated</option><option>Mixed sitting and walking</option><option>On my feet most of the day</option><option>Physically demanding</option></SelectField>
            <SelectField label="Current activity outside planned workouts" name="current_activity_level" value={String(data.current_activity_level)} onChange={change}><option value="">Select</option><option>Low</option><option>Lightly active</option><option>Moderately active</option><option>Very active</option></SelectField>
            <TextArea label="Schedule constraints" name="schedule_constraints" value={String(data.schedule_constraints)} onChange={change} placeholder="Commute, rotating shifts, caregiving, fixed recovery days, travel…" wide />
          </div>
        </>
      case 2:
        return <>
          <h2 className="intake-title">Tell us how you already train.</h2>
          <p className="intake-description">This prevents the coach from assuming familiarity, volume, or exercise confidence that does not match your starting point.</p>
          <div className="form-grid">
            <SelectField label="Strength-training experience" name="training_experience" value={String(data.training_experience)} onChange={change}><option value="">Select</option><option>Brand new</option><option>Less than 1 year</option><option>1–3 years</option><option>3+ years</option><option>Returning after a long break</option></SelectField>
            <SelectField label="Current training frequency" name="current_training_frequency" value={String(data.current_training_frequency)} onChange={change}><option value="">Select</option><option>Not currently training</option><option>1–2 days/week</option><option>3–4 days/week</option><option>5+ days/week</option><option>Varies a lot</option></SelectField>
            <TextArea label="Programs or approaches you have tried" name="previous_programs" value={String(data.previous_programs)} onChange={change} placeholder="What worked? What did not?" wide />
            <TextArea label="Training or movements you enjoy" name="favorite_training" value={String(data.favorite_training)} onChange={change} placeholder="Free weights, machines, circuits, running…" />
            <TextArea label="Exercises or styles you strongly dislike" name="disliked_movements" value={String(data.disliked_movements)} onChange={change} placeholder="Your coach can often reach the same goal another way." />
            <div className="range-field wide"><label>Confidence training independently: <strong>{data.confidence_level}/10</strong></label><input type="range" name="confidence_level" min="1" max="10" value={String(data.confidence_level)} onChange={change} /></div>
          </div>
        </>
      case 3:
        return <>
          <h2 className="intake-title">Only prescribe what you can actually use.</h2>
          <p className="intake-description">Equipment access determines which exercises belong in your program and which need substitutions.</p>
          <div className="form-grid">
            <SelectField label="Primary training location" name="training_location" value={String(data.training_location)} onChange={change}><option value="">Select</option><option>Full commercial gym</option><option>Apartment / small gym</option><option>Home gym</option><option>Home with limited equipment</option><option>Mostly outdoors</option></SelectField>
            <Field label="Cardio options available" name="cardio_options" value={String(data.cardio_options)} onChange={change} placeholder="Treadmill, bike, elliptical, outdoor walking…" />
            <TextArea label="Equipment you reliably have access to" name="equipment_access" value={String(data.equipment_access)} onChange={change} placeholder="Dumbbells, cables, machines, bands, bench…" wide />
            <TextArea label="Equipment you do not have" name="missing_equipment" value={String(data.missing_equipment)} onChange={change} />
            <TextArea label="Anything important about your gym or setup?" name="equipment_notes" value={String(data.equipment_notes)} onChange={change} placeholder="Busy hours, limited space, travel setup, machine availability…" wide />
          </div>
        </>
      case 4:
        return <>
          <h2 className="intake-title">Know what should be modified before we load it.</h2>
          <p className="intake-description">Elasticity is training guidance, not medical care. Share the movement information your coach needs. Professional medical guidance should always take priority.</p>
          <div className="form-grid">
            <TextArea label="Any movements that currently cause pain or unusual discomfort?" name="movement_discomfort" value={String(data.movement_discomfort)} onChange={change} placeholder="Name the movement and what you notice. A diagnosis is not required." wide />
            <TextArea label="Has a qualified professional told you to avoid or modify any exercise?" name="clinician_guidance" value={String(data.clinician_guidance)} onChange={change} placeholder="Describe the exercise guidance or restrictions." wide />
            <TextArea label="Other movement concerns" name="movement_concerns" value={String(data.movement_concerns)} onChange={change} placeholder="Balance, range of motion, confidence with a movement…" wide />
            <label className="checkbox-card wide"><input type="checkbox" name="exercise_clearance" checked={Boolean(data.exercise_clearance)} onChange={change} /><span><strong>I understand that sharp, sudden, unusual, or worsening pain is a reason to stop and seek appropriate professional guidance.</strong></span></label>
          </div>
        </>
      case 5:
        return <>
          <h2 className="intake-title">Recovery is part of the prescription.</h2>
          <p className="intake-description">Training stress does not happen in isolation. This helps your coach choose a workload that fits the rest of your life.</p>
          <div className="form-grid">
            <Field label="Average sleep per night" name="sleep_hours" value={String(data.sleep_hours)} onChange={change} placeholder="Example: 7" />
            <div className="range-field"><label>Sleep quality: <strong>{data.sleep_quality}/10</strong></label><input type="range" name="sleep_quality" min="1" max="10" value={String(data.sleep_quality)} onChange={change} /></div>
            <div className="range-field"><label>Current life stress: <strong>{data.stress_level}/10</strong></label><input type="range" name="stress_level" min="1" max="10" value={String(data.stress_level)} onChange={change} /></div>
            <TextArea label="Recovery constraints" name="recovery_constraints" value={String(data.recovery_constraints)} onChange={change} placeholder="Sleep changes, long shifts, sports, caregiving, high-stress days…" wide />
            <TextArea label="Nutrition context your coach should know" name="nutrition_context" value={String(data.nutrition_context)} onChange={change} placeholder="Optional. Keep this focused on what affects training and recovery." wide />
          </div>
        </>
      default:
        return <>
          <h2 className="intake-title">How should your coach coach you?</h2>
          <p className="intake-description">The same physical goal can need completely different communication. Finish by making the plan easier for you to use.</p>
          <div className="form-grid">
            <SelectField label="Coaching style" name="coaching_style" value={String(data.coaching_style)} onChange={change}><option value="">Select</option><option>Direct and concise</option><option>Detailed and educational</option><option>Encouraging and supportive</option><option>A mix depending on the situation</option></SelectField>
            <SelectField label="Accountability preference" name="accountability_preference" value={String(data.accountability_preference)} onChange={change}><option value="">Select</option><option>Give me the plan and let me execute</option><option>Check in and ask how it went</option><option>I want firm accountability</option><option>I am still figuring that out</option></SelectField>
            <SelectField label="Preferred communication" name="communication_preference" value={String(data.communication_preference)} onChange={change}><option value="">Select</option><option>Portal messages</option><option>Email</option><option>Text if offered</option><option>No preference</option></SelectField>
            <Field label="Preferred check-in day" name="preferred_checkin_day" value={String(data.preferred_checkin_day)} onChange={change} placeholder="Friday, Sunday…" />
            <TextArea label="How do you prefer feedback?" name="feedback_preferences" value={String(data.feedback_preferences)} onChange={change} placeholder="Short action points, more explanation, direct corrections…" wide />
            <TextArea label="Anything else your coach should know?" name="anything_else" value={String(data.anything_else)} onChange={change} wide />
            <label className="checkbox-card wide"><input type="checkbox" name="terms_ack" checked={Boolean(data.terms_ack)} onChange={change} /><span><strong>I confirm these answers are accurate enough to guide my training plan and understand Elasticity is not a substitute for medical evaluation or treatment.</strong></span></label>
            <label className="checkbox-card wide"><input type="checkbox" name="progress_photo_consent" checked={Boolean(data.progress_photo_consent)} onChange={change} /><span><strong>Optional: I consent to storing progress photos privately in my client profile if I choose to upload them.</strong><br/><small>This does not grant permission to publish them. Public transformation use requires separate explicit approval.</small></span></label>
            <div className="ai-ready wide"><Sparkles size={18} /><p><strong>Coach-assist ready:</strong> this structured intake can later be summarized to surface constraints, unanswered questions, and useful follow-up points. AI assists review; the coach makes the programming decisions.</p></div>
          </div>
        </>
    }
  }

  return (
    <main className="intake-page intake-refresh">
      <div className="intake-page-head">
        <div>
          <div className="eyebrow">Client onboarding</div>
          <h1>Before the program, understand the person.</h1>
          <p>Your answers save as you go. The goal is one thoughtful intake—not a wall of questions.</p>
        </div>
        <div className="intake-step-counter"><strong>{step + 1}</strong><span>of {steps.length}</span></div>
      </div>

      <div className="intake-shell">
        <aside className="intake-aside">
          <div className="intake-aside-label">Your intake</div>
          <div className="step-list">
            {steps.map(([label, helper], index) => (
              <button key={label} className={`step-pill ${index === step ? 'active' : ''} ${index < step ? 'done' : ''}`} onClick={() => setStep(index)}>
                <span className="step-index">{index + 1}</span>
                <span><strong>{label}</strong><small>{helper}</small></span>
              </button>
            ))}
          </div>
          <button className="save-draft-link" onClick={() => saveDraft()} disabled={saving}><Save size={14} /> {saving ? 'Saving…' : 'Save draft'}</button>
        </aside>

        <section className="intake-card">
          <div className="intake-progress"><span style={{ width: `${progress}%` }} /></div>
          <div className="intake-context"><span>Step {step + 1}</span><strong>{steps[step][1]}</strong></div>
          {content()}
          {status && <div className="status-note">{status}</div>}
          <div className="intake-actions">
            <button className="button-secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0 || saving}><ArrowLeft size={15} /> Back</button>
            {step < steps.length - 1
              ? <button className="button-primary" onClick={next} disabled={saving}>{saving ? 'Saving…' : 'Save & continue'} <ArrowRight size={15} /></button>
              : <button className="button-primary" onClick={finish} disabled={saving}>{saving ? 'Submitting…' : 'Submit to coach'} <CheckCircle2 size={16} /></button>}
          </div>
        </section>
      </div>
    </main>
  )
}
