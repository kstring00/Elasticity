'use client'

import { FormEvent, useEffect, useState } from 'react'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [status, setStatus] = useState('')
  const [next, setNext] = useState('/portal')
  const [paid, setPaid] = useState(false)
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setNext(params.get('next') || '/portal')
    setPaid(params.get('paid') === '1')
  }, [])

  async function submit(event: FormEvent) {
    event.preventDefault()
    const supabase = createBrowserSupabaseClient()
    if (!supabase) {
      setStatus('Supabase is not connected yet. The interface is ready; project credentials still need to be added.')
      return
    }

    setStatus('Working…')
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      })
      if (error) return setStatus(error.message)
      setStatus('Account created. Check your email if confirmation is required, then continue to your intake.')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return setStatus(error.message)
    window.location.assign(next)
  }

  return (
    <main className="auth-page">
      <section className="auth-art">
        <div className="auth-art-copy">
          <div className="eyebrow" style={{ color: 'var(--on-deep-muted)' }}>Elasticity client portal</div>
          <h1>Your plan should feel like it belongs to you.</h1>
          <p style={{ opacity: .72, lineHeight: 1.7 }}>Sign in to access your assigned program, exercise library, downloads, check-ins, and progress history.</p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-box">
          <LockKeyhole size={26} color="var(--deep)" />
          <h2>{paid ? 'Your purchase is complete.' : 'Welcome back.'}</h2>
          <p className="form-note">{paid ? 'Create or sign into your account so we can connect your order to your onboarding.' : 'Use the account connected to your Elasticity program.'}</p>

          <div className="auth-tabs">
            <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Sign in</button>
            <button className={`auth-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => setMode('signup')}>Create account</button>
          </div>

          <form className="form-stack" onSubmit={submit}>
            {mode === 'signup' && (
              <div className="field">
                <label htmlFor="full-name">Full name</label>
                <input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
            )}
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="button-primary" type="submit">{mode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={15}/></button>
          </form>
          {status && <div className="status-note">{status}</div>}
          {!configured && <p className="form-note" style={{ marginTop: 14 }}>Preview mode: Supabase credentials are not connected to this build yet.</p>}
        </div>
      </section>
    </main>
  )
}
