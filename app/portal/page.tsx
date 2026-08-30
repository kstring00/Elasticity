import Link from 'next/link'
import { CalendarDays, Download, Library, MessageSquareText } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const sampleWorkout = [
  ['BB', 'Barbell Bench Press', '3 × 6–8 · 90–120 sec'],
  ['ID', 'Incline DB Press', '3 × 8–10 · 90 sec'],
  ['CF', 'High Slow Cable Fly', '3 × 10–12 · 60 sec'],
  ['GS', 'Heel-Elevated Goblet Squat', '3 × 8–10 · 90 sec'],
  ['LP', 'Quad-Focused Leg Press', '3 × 10–12 · 90 sec'],
]

export default async function PortalPage() {
  const supabase = await createServerSupabaseClient()
  let name = 'Client'
  let hasProgram = true
  let workout = sampleWorkout
  let programTitle = '4-Week Athletic Rebuild'
  let week = 1

  if (supabase) {
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) redirect('/login?next=/portal')

    const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', auth.user.id).maybeSingle()
    name = profile?.full_name?.split(' ')[0] || auth.user.email?.split('@')[0] || 'Client'

    const { data: program } = await supabase
      .from('programs')
      .select('id,title,current_week,status,program_days(id,week_number,day_name,focus,sort_order,program_exercises(id,sets,reps,rest_seconds,coach_note,sort_order,exercises(name,slug)))')
      .eq('client_id', auth.user.id)
      .in('status', ['assigned', 'active'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!program) {
      hasProgram = false
      workout = []
    } else {
      programTitle = program.title
      week = program.current_week || 1
      const days = ((program.program_days || []) as any[]).filter((day) => day.week_number === week).sort((a,b) => a.sort_order - b.sort_order)
      const day = days[0]
      if (day?.program_exercises?.length) {
        workout = day.program_exercises.sort((a:any,b:any) => a.sort_order - b.sort_order).map((item:any) => [
          (item.exercises?.name || 'EX').split(' ').map((part:string) => part[0]).join('').slice(0,2).toUpperCase(),
          item.exercises?.name || 'Exercise',
          `${item.sets || '—'} × ${item.reps || '—'}${item.rest_seconds ? ` · ${item.rest_seconds} sec` : ''}`,
        ])
      }
    }
  }

  return (
    <main className="portal-page">
      <div className="portal-top">
        <div>
          <div className="eyebrow">Client portal</div>
          <h1 className="portal-title">Good to see you, {name}.</h1>
        </div>
        <Link href="/exercises" className="button-secondary"><Library size={15}/> Exercise library</Link>
      </div>

      {!hasProgram ? (
        <section className="panel" style={{ maxWidth: 760 }}>
          <div className="eyebrow">Next step</div>
          <h2>Your coach is building your program.</h2>
          <p className="section-copy">If you have not completed onboarding yet, finish the intake so the coach has the information needed to personalize your plan.</p>
          <Link className="button-primary" href="/onboarding">Complete onboarding</Link>
        </section>
      ) : (
        <div className="dashboard-grid">
          <section className="panel">
            <div className="workout-heading">
              <div><span className="week-chip">Week {week} · Today</span><h2 style={{ marginTop: 14 }}>{programTitle}</h2><p className="form-note">Chest + Triceps + Quads · quality over weight</p></div>
              <CalendarDays size={22} color="#a9561e"/>
            </div>
            <div className="workout-list">
              {workout.map(([initials, exercise, prescription]) => (
                <div className="workout-item" key={exercise}>
                  <div className="exercise-thumb">{initials}</div>
                  <div><h3>{exercise}</h3><p>{prescription}</p></div>
                  <button className="workout-check" aria-label={`Mark ${exercise} complete`} />
                </div>
              ))}
            </div>
          </section>

          <div className="quick-stack">
            <section className="panel panel-dark">
              <div className="eyebrow" style={{ color: '#e7bf79' }}>This week</div>
              <h2>Your training at a glance.</h2>
              <div className="mini-stat-grid">
                <div className="mini-stat"><strong>3</strong><span>strength days</span></div>
                <div className="mini-stat"><strong>2</strong><span>cardio days</span></div>
                <div className="mini-stat"><strong>2</strong><span>recovery days</span></div>
                <div className="mini-stat"><strong>{week}/4</strong><span>current week</span></div>
              </div>
            </section>

            <section className="panel">
              <h2>Weekly check-in</h2>
              <p className="form-note">Tell your coach how the plan is actually landing: adherence, energy, difficulty, recovery, wins, and anything that needs attention.</p>
              <Link href="/portal/check-in" className="button-primary" style={{ marginTop: 12 }}><MessageSquareText size={15}/> Complete check-in</Link>
            </section>

            <section className="panel">
              <h2>Full plan</h2>
              <p className="form-note">Prefer a document? Your assigned program can also be kept as a downloadable PDF.</p>
              <button className="button-secondary" style={{ marginTop: 12 }}><Download size={15}/> Download plan</button>
            </section>
          </div>
        </div>
      )}
    </main>
  )
}
