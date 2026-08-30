import Link from 'next/link'
import { CalendarDays, Download, Library, MessageSquareText } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const sampleWorkout = [
  ['DB', 'Dumbbell Press', '3 × 8–10 · 90 sec'],
  ['RW', 'Cable Row', '3 × 10–12 · 75 sec'],
  ['SQ', 'Goblet Squat', '3 × 8–10 · 90 sec'],
]

function getCurrentWeek(startDate: string | null, lengthWeeks: number) {
  if (!startDate) return 1
  const start = new Date(`${startDate}T00:00:00`)
  const today = new Date()
  const diffDays = Math.floor((today.getTime() - start.getTime()) / 86400000)
  return Math.min(Math.max(Math.floor(diffDays / 7) + 1, 1), lengthWeeks || 4)
}

export default async function PortalPage() {
  const supabase = await createServerSupabaseClient()
  let name = 'Client'
  let hasProgram = true
  let workout = sampleWorkout
  let programTitle = 'Your personalized program'
  let dayTitle = 'Today’s session'
  let dayFocus = 'Your coach’s prescribed work for today.'
  let week = 1
  let strengthDays = 0
  let cardioDays = 0
  let recoveryDays = 0
  let downloadUrl: string | null = null

  if (supabase) {
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) redirect('/login?next=/portal')

    const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', auth.user.id).maybeSingle()
    name = profile?.full_name?.split(' ')[0] || auth.user.email?.split('@')[0] || 'Client'

    const { data: program } = await supabase
      .from('programs')
      .select('id,title,length_weeks,start_date,status,pdf_storage_path,program_days(id,week_number,day_index,title,focus,day_type,sort_order,program_exercises(id,sets,reps,rest_seconds,tempo,rpe_target,prescription_note,sort_order,exercises(name,slug)))')
      .eq('client_id', auth.user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!program) {
      hasProgram = false
      workout = []
    } else {
      programTitle = program.title
      week = getCurrentWeek(program.start_date, program.length_weeks || 4)

      const weekDays = ((program.program_days || []) as any[])
        .filter((day) => day.week_number === week)
        .sort((a, b) => a.sort_order - b.sort_order)

      strengthDays = weekDays.filter((day) => day.day_type === 'strength' || day.day_type === 'mixed').length
      cardioDays = weekDays.filter((day) => day.day_type === 'cardio').length
      recoveryDays = weekDays.filter((day) => day.day_type === 'recovery' || day.day_type === 'mobility').length

      const jsDay = new Date().getDay()
      const mondayBasedDay = ((jsDay + 6) % 7) + 1
      const todayPlan = weekDays.find((day) => day.day_index === mondayBasedDay) || weekDays[0]

      if (todayPlan) {
        dayTitle = todayPlan.title || 'Today’s session'
        dayFocus = todayPlan.focus || 'Follow the prescription your coach assigned for this day.'
        if (todayPlan.program_exercises?.length) {
          workout = todayPlan.program_exercises
            .sort((a: any, b: any) => a.sort_order - b.sort_order)
            .map((item: any) => {
              const exerciseName = item.exercises?.name || item.custom_exercise_name || 'Exercise'
              const initials = exerciseName.split(' ').map((part: string) => part[0]).join('').slice(0, 2).toUpperCase()
              const details = [
                item.sets && item.reps ? `${item.sets} × ${item.reps}` : item.sets || item.reps,
                item.rest_seconds ? `rest ${item.rest_seconds}` : null,
                item.tempo ? `tempo ${item.tempo}` : null,
                item.rpe_target ? `RPE ${item.rpe_target}` : null,
              ].filter(Boolean).join(' · ')
              return [initials, exerciseName, details || item.prescription_note || 'See coach notes']
            })
        } else {
          workout = []
        }
      } else {
        workout = []
      }

      if (program.pdf_storage_path) {
        const { data: signed } = await supabase.storage.from('program-files').createSignedUrl(program.pdf_storage_path, 3600)
        downloadUrl = signed?.signedUrl || null
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
          <p className="section-copy">Complete onboarding if you have not already so your coach has the information needed to personalize your plan.</p>
          <Link className="button-primary" href="/onboarding">Complete onboarding</Link>
        </section>
      ) : (
        <div className="dashboard-grid">
          <section className="panel">
            <div className="workout-heading">
              <div>
                <span className="week-chip">Week {week} · Today</span>
                <h2 style={{ marginTop: 14 }}>{dayTitle}</h2>
                <p className="form-note">{programTitle} · {dayFocus}</p>
              </div>
              <CalendarDays size={22} color="var(--deep)"/>
            </div>
            <div className="workout-list">
              {workout.length ? workout.map(([initials, exercise, prescription]) => (
                <div className="workout-item" key={exercise}>
                  <div className="exercise-thumb">{initials}</div>
                  <div><h3>{exercise}</h3><p>{prescription}</p></div>
                  <button className="workout-check" aria-label={`Mark ${exercise} complete`} />
                </div>
              )) : <p className="form-note">No exercises are assigned to this day yet.</p>}
            </div>
          </section>

          <div className="quick-stack">
            <section className="panel panel-dark">
              <div className="eyebrow" style={{ color: 'var(--on-deep-muted)' }}>This week</div>
              <h2>Your training at a glance.</h2>
              <div className="mini-stat-grid">
                <div className="mini-stat"><strong>{strengthDays}</strong><span>strength days</span></div>
                <div className="mini-stat"><strong>{cardioDays}</strong><span>cardio days</span></div>
                <div className="mini-stat"><strong>{recoveryDays}</strong><span>recovery / mobility</span></div>
                <div className="mini-stat"><strong>{week}</strong><span>current week</span></div>
              </div>
            </section>

            <section className="panel">
              <h2>Weekly check-in</h2>
              <p className="form-note">Tell your coach how the plan is landing: completed workouts, energy, difficulty, recovery, wins, and anything that needs attention.</p>
              <Link href="/portal/check-in" className="button-primary" style={{ marginTop: 12 }}><MessageSquareText size={15}/> Complete check-in</Link>
            </section>

            <section className="panel">
              <h2>Full plan</h2>
              <p className="form-note">Prefer a document? Your coach can also keep a downloadable copy of your assigned program here.</p>
              {downloadUrl
                ? <a href={downloadUrl} className="button-secondary" style={{ marginTop: 12 }}><Download size={15}/> Download plan</a>
                : <button className="button-secondary" style={{ marginTop: 12 }} disabled><Download size={15}/> PDF not uploaded yet</button>}
            </section>
          </div>
        </div>
      )}
    </main>
  )
}
