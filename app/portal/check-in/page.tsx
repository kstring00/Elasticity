'use client'

import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

export default function CheckInPage() {
  const [form, setForm] = useState({
    week_number: '1', workouts_completed: '4', energy: '7', workout_difficulty: '7', sleep_quality: '7', soreness: '5', confidence: '7',
    wins: '', challenges: '', exercises_uncomfortable: '', notes: '',
  })
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function change(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setStatus('')
  }

  async function submit() {
    const supabase = createBrowserSupabaseClient()
    if (!supabase) return setStatus('Connect Supabase to submit this check-in to the coach.')

    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) return window.location.assign('/login?next=/portal/check-in')

    const { data: program } = await supabase
      .from('programs')
      .select('id')
      .eq('client_id', auth.user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!program) return setStatus('You do not have an active program yet. Your coach can activate one from the owner dashboard.')

    setSubmitting(true)
    const { error } = await supabase.from('check_ins').upsert({
      client_id: auth.user.id,
      program_id: program.id,
      week_number: Number(form.week_number),
      workouts_completed: Number(form.workouts_completed),
      energy: Number(form.energy),
      workout_difficulty: Number(form.workout_difficulty),
      sleep_quality: Number(form.sleep_quality),
      soreness: Number(form.soreness),
      confidence: Number(form.confidence),
      wins: form.wins || null,
      challenges: form.challenges || null,
      exercises_uncomfortable: form.exercises_uncomfortable || null,
      notes: form.notes || null,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    }, { onConflict: 'client_id,program_id,week_number' })
    setSubmitting(false)

    if (error) return setStatus(error.message)
    setStatus('Check-in submitted. Your coach has been notified and can review it from the owner dashboard.')
  }

  return (
    <main className="intake-page intake-refresh">
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <Link href="/portal" className="button-secondary" style={{ marginBottom: 20 }}><ArrowLeft size={14}/> Back to portal</Link>
        <section className="intake-card">
          <div className="eyebrow">Weekly check-in</div>
          <h1 className="intake-title">How did the plan actually feel?</h1>
          <p className="intake-description">A few numbers make patterns easier to see; your words explain the reason behind them. This should take about two minutes.</p>
          <div className="form-grid">
            <div className="field"><label>Week</label><input name="week_number" type="number" min="1" max="52" value={form.week_number} onChange={change}/></div>
            <div className="field"><label>Workouts completed</label><input name="workouts_completed" type="number" min="0" max="14" value={form.workouts_completed} onChange={change}/></div>
            {(['energy','workout_difficulty','sleep_quality','soreness','confidence'] as const).map((name) => (
              <div className="range-field" key={name}>
                <label>{name.replaceAll('_', ' ')}: <strong>{form[name]}/10</strong></label>
                <input name={name} type="range" min="1" max="10" value={form[name]} onChange={change}/>
              </div>
            ))}
            <div className="field wide"><label>Biggest win this week</label><textarea name="wins" value={form.wins} onChange={change}/></div>
            <div className="field wide"><label>What was hardest or got in the way?</label><textarea name="challenges" value={form.challenges} onChange={change}/></div>
            <div className="field wide"><label>Any exercise that felt uncomfortable or needs review?</label><textarea name="exercises_uncomfortable" value={form.exercises_uncomfortable} onChange={change}/></div>
            <div className="field wide"><label>Anything else you want your coach to know?</label><textarea name="notes" value={form.notes} onChange={change}/></div>
          </div>
          {status && <div className="status-note">{status}</div>}
          <button className="button-primary" onClick={submit} disabled={submitting} style={{ marginTop: 24 }}>
            {submitting ? 'Submitting…' : 'Submit check-in'} <Send size={15}/>
          </button>
        </section>
      </div>
    </main>
  )
}
