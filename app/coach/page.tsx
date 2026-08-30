import Link from 'next/link'
import { Bell, ClipboardList, Dumbbell, Plus, UsersRound } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

type QueueItem = { name: string; detail: string; status: string }
type Notice = { title: string; body: string; age: string }

export default async function CoachPage() {
  const supabase = await createServerSupabaseClient()
  let metrics = { clients: 0, intakes: 0, programs: 0, unread: 0 }
  let queue: QueueItem[] = [
    { name: 'New client intake', detail: 'Goal, schedule, equipment, training history, recovery, and coaching preferences ready for review.', status: 'Needs review' },
    { name: 'Program build queue', detail: 'Create a four-week program by selecting reusable exercises and setting client-specific prescriptions.', status: 'Build next' },
  ]
  let notices: Notice[] = [
    { title: 'Weekly check-in submitted', body: 'Client check-ins appear here immediately after submission.', age: 'Notification preview' },
    { title: 'Intake submitted', body: 'A new onboarding brief will create an owner notification too.', age: 'Notification preview' },
  ]
  let previewMode = true

  if (supabase) {
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) redirect('/login?next=/coach')
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', auth.user.id).maybeSingle()
    if (!profile || !['coach','admin'].includes(profile.role)) redirect('/portal')
    previewMode = false

    const [clients, intakes, programs, notifications] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
      supabase.from('intakes').select('*', { count: 'exact', head: true }).eq('status', 'submitted'),
      supabase.from('programs').select('*', { count: 'exact', head: true }).in('status', ['draft','assigned','active']),
      supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('recipient_id', auth.user.id).is('read_at', null),
    ])
    metrics = { clients: clients.count || 0, intakes: intakes.count || 0, programs: programs.count || 0, unread: notifications.count || 0 }

    const { data: intakeRows } = await supabase.from('intakes').select('id,coach_summary,submitted_at,profiles!intakes_client_id_fkey(full_name,email)').eq('status','submitted').order('submitted_at',{ascending:false}).limit(5)
    if (intakeRows?.length) queue = intakeRows.map((row:any) => ({ name: row.profiles?.full_name || row.profiles?.email || 'Client intake', detail: row.coach_summary || 'Structured onboarding is ready to review.', status: 'Needs review' }))

    const { data: notificationRows } = await supabase.from('notifications').select('title,body,created_at').eq('recipient_id',auth.user.id).order('created_at',{ascending:false}).limit(6)
    if (notificationRows?.length) notices = notificationRows.map((row:any) => ({ title: row.title, body: row.body, age: new Date(row.created_at).toLocaleDateString() }))
  }

  return (
    <main className="coach-page">
      <div className="coach-header">
        <div>
          <div className="eyebrow">Elasticity owner backend</div>
          <h1 className="coach-title">Run the coaching business from one place.</h1>
        </div>
        <button className="button-primary"><Plus size={15}/> New program</button>
      </div>

      {previewMode && <div className="status-note" style={{ marginBottom: 22, background: '#2a1d16', color: '#e5cba8' }}>Preview mode. Once the dedicated Supabase project is connected, these cards become live client and notification data.</div>}

      <section className="coach-metrics">
        <div className="coach-metric"><strong>{metrics.clients}</strong><span>clients</span></div>
        <div className="coach-metric"><strong>{metrics.intakes}</strong><span>intakes to review</span></div>
        <div className="coach-metric"><strong>{metrics.programs}</strong><span>active / building</span></div>
        <div className="coach-metric"><strong>{metrics.unread}</strong><span>unread alerts</span></div>
      </section>

      <div className="coach-layout">
        <section className="coach-panel">
          <h2><ClipboardList size={20} style={{ marginRight: 8, verticalAlign: 'middle', color: '#e7bf79' }}/> Intake & build queue</h2>
          <div className="queue-list">
            {queue.map((item, index) => <div className="queue-row" key={`${item.name}-${index}`}><div><strong>{item.name}</strong><p>{item.detail}</p></div><span className="status-chip">{item.status}</span></div>)}
          </div>
          <div className="owner-tools">
            <div className="owner-tool"><UsersRound size={18} color="#e7bf79"/><strong>Clients</strong><span>Intake, orders, progress, programs, notes.</span></div>
            <div className="owner-tool"><Dumbbell size={18} color="#e7bf79"/><strong>Program builder</strong><span>Pull exercises from the shared movement library.</span></div>
            <Link href="/exercises" className="owner-tool"><strong>Exercise library</strong><span>Add media once; reuse it in every future plan.</span></Link>
            <div className="owner-tool"><strong>Transformations</strong><span>Publish only photos with separate marketing approval.</span></div>
          </div>
        </section>

        <section className="coach-panel">
          <h2><Bell size={19} style={{ marginRight: 8, verticalAlign: 'middle', color: '#e7bf79' }}/> Notifications</h2>
          <div className="notification-list">
            {notices.map((notice, index) => <div className="notification-row" key={`${notice.title}-${index}`}><div><strong>{notice.title}</strong><p>{notice.body}</p></div><span className="status-chip">{notice.age}</span></div>)}
          </div>
          <p style={{ opacity: .48, fontSize: 11, lineHeight: 1.7, marginTop: 18 }}>Database triggers create an in-app owner notification when an intake or weekly check-in is submitted. Email/SMS can be layered on later without changing the client workflow.</p>
        </section>
      </div>
    </main>
  )
}
