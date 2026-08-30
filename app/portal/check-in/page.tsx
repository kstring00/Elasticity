'use client'

import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

export default function CheckInPage() {
  const [form, setForm] = useState({ week_number: '1', adherence: '100', energy: '7', difficulty: '7', recovery: '7', wins: '', challenges: '', pain_or_discomfort: '', notes: '' })
  const [status, setStatus] = useState('')

  function change(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) { setForm({ ...form, [e.target.name]: e.target.value }) }

  async function submit() {
    const supabase = createBrowserSupabaseClient()
    if (!supabase) return setStatus('Preview mode: connect Supabase to submit this check-in to the coach.')
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) return window.location.assign('/login?next=/portal/check-in')

    const { data: program } = await supabase.from('programs').select('id').eq('client_id', auth.user.id).in('status', ['assigned','active']).order('created_at', { ascending: false }).limit(1).maybeSingle()
    const { error } = await supabase.from('check_ins').insert({
      client_id: auth.user.id,
      program_id: program?.id || null,
      week_number: Number(form.week_number),
      adherence: Number(form.adherence),
      energy: Number(form.energy),
      difficulty: Number(form.difficulty),
      recovery: Number(form.recovery),
      wins: form.wins,
      challenges: form.challenges,
      pain_or_discomfort: form.pain_or_discomfort,
      notes: form.notes,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    })
    if (error) return setStatus(error.message)
    setStatus('Check-in submitted. Your coach has been notified and can review it from the owner dashboard.')
  }

  return (
    <main className="intake-page">
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <Link href="/portal" className="button-secondary" style={{ marginBottom: 20 }}><ArrowLeft size={14}/> Back to portal</Link>
        <section className="intake-card">
          <div className="eyebrow">Weekly check-in</div>
          <h1 className="intake-title">How did the plan actually feel?</h1>
          <p className="intake-description">Numbers make patterns easier to see; your words explain the reason behind them. This should take about two minutes.</p>
          <div className="form-grid">
            <div className="field"><label>Week</label><input name="week_number" type="number" min="1" max="4" value={form.week_number} onChange={change}/></div>
            <div className="field"><label>Workouts completed (%)</label><input name="adherence" type="number" min="0" max="100" value={form.adherence} onChange={change}/></div>
            {(['energy','difficulty','recovery'] as const).map((name) => <div className="range-field" key={name}><label style={{ textTransform: 'capitalize' }}>{name}: <strong>{form[name]}/10</strong></label><input name={name} type="range" min="1" max="10" value={form[name]} onChange={change}/></div>)}
            <div className="field wide"><label>Biggest win this week</label><textarea name="wins" value={form.wins} onChange={change}/></div>
            <div className="field wide"><label>What was hardest or got in the way?</label><textarea name="challenges" value={form.challenges} onChange={change}/></div>
            <div className="field wide"><label>Any pain, unusual discomfort, or movement that needs review?</label><textarea name="pain_or_discomfort" value={form.pain_or_discomfort} onChange={change}/></div>
            <div className="field wide"><label>Anything else you want your coach to know?</label><textarea name="notes" value={form.notes} onChange={change}/></div>
          </div>
          {status && <div className="status-note">{status}</div>}
          <button className="button-primary" onClick={submit} style={{ marginTop: 24 }}>Submit check-in <Send size={15}/></button>
        </section>
      </div>
    </main>
  )
}
