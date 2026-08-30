import Link from 'next/link'
import { ArrowRight, BookOpen, Check, ClipboardCheck, Dumbbell, Sparkles } from 'lucide-react'

const method = [
  { number: '01', title: 'Foundation', copy: 'Establish strong movement patterns, appropriate training loads, and a clear starting point.' },
  { number: '02', title: 'Balance', copy: 'Strengthen the supporting muscles and improve symmetry so the program is built around your whole body.' },
  { number: '03', title: 'Control', copy: 'Use unilateral work, stability, and intentional core training to build better movement quality.' },
  { number: '04', title: 'Progression', copy: 'Return to key movements, compare performance, and progress only where technique and recovery support it.' },
]

const transformationSlots = ['Client 01', 'Client 02', 'Client 03', 'Client 04']

function TransformCard({ label }: { label: string }) {
  return (
    <article className="transform-card">
      <div className="before-after">
        <div className="photo-placeholder"><span>Before photo</span></div>
        <div className="photo-placeholder after"><span>After photo</span></div>
        <div className="week-badge">4 week transformation</div>
      </div>
      <div className="transform-meta">
        <strong>{label}</strong>
        <span>Published with consent</span>
      </div>
    </article>
  )
}

export default function Home() {
  const movingCards = [...transformationSlots, ...transformationSlots]

  return (
    <main>
      <section className="hero">
        <div>
          <div className="eyebrow">Personalized training · four weeks at a time</div>
          <h1>Train with intention. <span>Build with purpose.</span></h1>
          <p className="hero-copy">
            A training plan should fit the person using it. Elasticity builds personalized programs around your goals,
            schedule, experience, equipment, recovery, and the way you actually like to train.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#pricing">Build my program <ArrowRight size={15} /></a>
            <Link className="button-secondary" href="/login">Client login</Link>
          </div>
        </div>

        <div className="hero-visual" aria-label="Elasticity four-week training preview">
          <div className="hero-arch">
            <div className="hero-arch-content">
              <div className="micro">Your program · your progression</div>
              <h3>4-Week Athletic Rebuild</h3>
              <p>Strength, conditioning, recovery, and progression organized into one clear training experience.</p>
              <div className="hero-stat-row">
                <div className="hero-stat"><strong>5</strong><span>active days</span></div>
                <div className="hero-stat"><strong>2</strong><span>recovery days</span></div>
                <div className="hero-stat"><strong>4</strong><span>training phases</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section transformations" id="transformations">
        <div className="section-head">
          <div className="eyebrow">Results speak first</div>
          <h2 className="section-title">Four weeks can change a lot.</h2>
          <p className="section-copy">
            Before-and-after stories will live here as paired images so the change is immediately visible. Only client-approved
            transformations are published; these slots are intentionally placeholders until real photos and consent are added.
          </p>
        </div>
        <div className="transform-track-wrap">
          <div className="transform-track">
            {movingCards.map((label, index) => <TransformCard key={`${label}-${index}`} label={label} />)}
          </div>
        </div>
      </section>

      <section className="section method-section" id="method">
        <div className="architecture-lines" />
        <div className="section-head">
          <div className="eyebrow">The Elasticity Method</div>
          <h2 className="section-title">Not a template. A progression.</h2>
          <p className="section-copy">
            Each four-week build has a reason behind it. The method moves from foundation to balance, control, and progression
            so the plan changes with the work you are doing instead of repeating the same week four times.
          </p>
        </div>
        <div className="method-grid">
          {method.map((phase) => (
            <article className="method-card" key={phase.number}>
              <div className="method-number">{phase.number}</div>
              <h3>{phase.title}</h3>
              <p>{phase.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section product-showcase">
        <div className="phone-mock" aria-label="Client portal preview">
          <div className="phone-top" />
          <div className="today-card">
            <small>Week 1 · Monday</small>
            <h3>Chest + Triceps + Quads</h3>
            <div className="exercise-row">
              <div><strong>Barbell Bench Press</strong><span>3 × 6–8 · rest 90–120 sec</span></div><span className="complete-dot">✓</span>
            </div>
            <div className="exercise-row">
              <div><strong>Incline DB Press</strong><span>3 × 8–10 · rest 90 sec</span></div><span className="complete-dot" />
            </div>
            <div className="exercise-row">
              <div><strong>High Slow Cable Fly</strong><span>3 × 10–12 · slow return</span></div><span className="complete-dot" />
            </div>
            <div className="exercise-row">
              <div><strong>Quad-Focused Leg Press</strong><span>3 × 10–12 · controlled depth</span></div><span className="complete-dot" />
            </div>
          </div>
        </div>

        <div className="product-copy">
          <div className="eyebrow" style={{ color: '#e7bf79' }}>Your plan lives here</div>
          <h2 className="section-title">Open the site. Know exactly what to do.</h2>
          <p className="section-copy">
            Clients log in to see the workout assigned for the day, exercise details, rest times, coach notes, and check-ins.
            The full plan can still be downloaded, but the portal is designed to be easier to use while standing in the gym.
          </p>
          <div className="feature-list">
            <div className="feature-item"><Dumbbell size={18}/><div><strong>Today’s workout</strong><br/><span>Sets, reps, rest, tempo, and coach notes in one place.</span></div></div>
            <div className="feature-item"><BookOpen size={18}/><div><strong>Exercise library</strong><br/><span>Reusable movement pages with photos, demo links, cues, and common mistakes.</span></div></div>
            <div className="feature-item"><ClipboardCheck size={18}/><div><strong>Weekly check-ins</strong><br/><span>Clients report adherence, energy, recovery, wins, challenges, and anything that needs attention.</span></div></div>
          </div>
        </div>
      </section>

      <section className="section pricing" id="pricing">
        <div className="section-head">
          <div className="eyebrow">Simple pricing</div>
          <h2 className="section-title">Start with the plan you need.</h2>
          <p className="section-copy">Two clear offers. Both begin with the same detailed intake so the training is built around the client rather than a generic category.</p>
        </div>

        <div className="pricing-grid">
          <article className="price-card">
            <div className="price-kicker">Personalized program</div>
            <h3>Custom 4-Week Plan</h3>
            <div className="price"><sup>$</sup>129</div>
            <ul>
              <li>Deep client intake and training-needs assessment</li>
              <li>Four-week personalized strength + conditioning plan</li>
              <li>Warm-up, recovery, progression, and rest guidance</li>
              <li>Client portal access and exercise library</li>
              <li>Downloadable full program</li>
            </ul>
            <form action="/api/checkout" method="post">
              <input type="hidden" name="plan" value="custom" />
              <button className="button-primary" type="submit">Start my plan <ArrowRight size={15}/></button>
            </form>
          </article>

          <article className="price-card featured">
            <div className="price-kicker">Most supported</div>
            <h3>Plan + Weekly Check-Ins</h3>
            <div className="price"><sup>$</sup>179</div>
            <ul>
              <li>Everything in the personalized four-week plan</li>
              <li>Structured weekly check-in inside the client portal</li>
              <li>Coach is automatically notified when a check-in is submitted</li>
              <li>Weekly feedback and program-adjustment review</li>
              <li>Progress history kept together with the client profile</li>
            </ul>
            <form action="/api/checkout" method="post">
              <input type="hidden" name="plan" value="guided" />
              <button className="button-primary" type="submit">Choose guided plan <Sparkles size={15}/></button>
            </form>
          </article>
        </div>
      </section>

      <section className="section" style={{ background: '#fffaf3' }}>
        <div className="section-head" style={{ marginBottom: 0 }}>
          <div className="eyebrow">Built for the relationship</div>
          <h2 className="section-title">The intake is where personalization starts.</h2>
          <p className="section-copy">
            The onboarding flow captures what the coach actually needs to make decisions: goals, schedule, training history,
            equipment, movement preferences, recovery, constraints, coaching style, and the client’s definition of success.
          </p>
          <div className="hero-actions">
            <Link href="/onboarding" className="button-dark">Preview onboarding <ArrowRight size={15}/></Link>
            <Link href="/coach" className="button-secondary">Preview coach backend</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
