import Link from 'next/link'
import { ArrowRight, Check, Sparkles, UserRound } from 'lucide-react'

const method = [
  {
    number: '01',
    title: 'Foundation',
    eyebrow: 'Start where you are',
    copy: 'Establish movement quality, realistic training loads, and a starting point that actually fits your experience.',
  },
  {
    number: '02',
    title: 'Balance',
    eyebrow: 'Build the support system',
    copy: 'Strengthen supporting muscles and improve symmetry so your program is built around your whole body—not just favorite lifts.',
  },
  {
    number: '03',
    title: 'Control',
    eyebrow: 'Own the movement',
    copy: 'Use unilateral work, stability, and intentional core training to create better control before adding more demand.',
  },
  {
    number: '04',
    title: 'Progression',
    eyebrow: 'Earn the next step',
    copy: 'Return to key movements, compare performance, and progress only where technique, effort, and recovery support it.',
  },
]

const transformationSlots = ['Transformation 01', 'Transformation 02', 'Transformation 03', 'Transformation 04']

function TransformCard({ label }: { label: string }) {
  return (
    <article className="transform-card">
      <div className="before-after">
        <div className="photo-placeholder"><span>Before</span></div>
        <div className="photo-placeholder after"><span>After</span></div>
        <div className="week-badge">4 weeks</div>
      </div>
      <div className="transform-meta">
        <strong>{label}</strong>
        <span>Client-approved results only</span>
      </div>
    </article>
  )
}

const customPlanFeatures = [
  'Deep client onboarding and training-needs assessment',
  'Four-week personalized strength + conditioning plan',
  'Warm-up, recovery, progression, and rest guidance',
  'Client portal + exercise library access',
  'Downloadable full program',
]

const guidedPlanFeatures = [
  'Everything in the personalized four-week plan',
  'Structured weekly check-ins inside the client portal',
  'Coach notification when each check-in is submitted',
  'Weekly feedback and program-adjustment review',
  'Progress history kept with your client profile',
]

export default function Home() {
  const movingCards = [...transformationSlots, ...transformationSlots]

  return (
    <main>
      <section className="coach-hero" id="about">
        <div className="coach-hero-copy">
          <div className="eyebrow">Personalized training · built around real life</div>
          <h1>Training should fit <em>you.</em></h1>
          <p className="coach-lead">
            Elasticity creates intentional four-week programs around your goals, schedule, training history,
            equipment, recovery, and the way you actually like to move.
          </p>
          <div className="coach-quote-card">
            <span className="quote-mark">“</span>
            <p>
              My goal is to give you a plan that feels clear, realistic, and made for your starting point—not a template you have to force yourself into.
            </p>
            <div className="coach-signoff">Your Elasticity coach</div>
          </div>
          <div className="hero-actions compact-actions">
            <Link className="button-primary" href="/onboarding">Client onboarding <ArrowRight size={15} /></Link>
            <a className="button-secondary" href="#pricing">View pricing</a>
          </div>
        </div>

        <div className="coach-portrait-shell" aria-label="Coach portrait placeholder">
          <div className="coach-portrait-frame">
            <UserRound size={56} strokeWidth={1.15} />
            <span>Coach photo goes here</span>
            <small>Replace with her portrait when ready</small>
          </div>
          <div className="portrait-caption">
            <span>Elasticity</span>
            <strong>Personal training, thoughtfully built.</strong>
          </div>
        </div>
      </section>

      <section className="section pricing pricing-first" id="pricing">
        <div className="section-head pricing-head">
          <div className="eyebrow">Choose your level of support</div>
          <h2 className="section-title">Simple pricing. Fully personalized.</h2>
          <p className="section-copy">
            Both options begin with the same detailed onboarding so the program is built around the person—not a category, body type, or generic fitness level.
          </p>
        </div>

        <div className="pricing-grid">
          <article className="price-card">
            <div className="price-kicker">Personalized program</div>
            <h3>Custom 4-Week Plan</h3>
            <div className="price"><sup>$</sup>129</div>
            <p className="price-summary">For clients who want a complete, custom plan they can confidently execute on their own.</p>
            <ul>
              {customPlanFeatures.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}
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
            <p className="price-summary">For clients who want the same custom build plus a weekly feedback loop with their coach.</p>
            <ul>
              {guidedPlanFeatures.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}
            </ul>
            <form action="/api/checkout" method="post">
              <input type="hidden" name="plan" value="guided" />
              <button className="button-primary" type="submit">Choose guided plan <Sparkles size={15}/></button>
            </form>
          </article>
        </div>
      </section>

      <section className="section transformations" id="transformations">
        <div className="section-head">
          <div className="eyebrow">Four-week transformations</div>
          <h2 className="section-title">See the work.</h2>
          <p className="section-copy">
            Before-and-after photos will sit side by side so the transformation is immediately clear. These are placeholders until real client images and explicit marketing consent are added.
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
        <div className="section-head method-head">
          <div className="eyebrow">The Elasticity Method</div>
          <h2 className="section-title">Not a template. A progression.</h2>
          <p className="section-copy">
            The plan changes with the work you are doing. Each phase has a purpose, and each decision is informed by what you shared during onboarding.
          </p>
        </div>
        <div className="method-grid">
          {method.map((phase) => (
            <article className="method-card" key={phase.number}>
              <div className="method-topline">
                <span className="method-number">{phase.number}</span>
                <span className="method-eyebrow">{phase.eyebrow}</span>
              </div>
              <h3>{phase.title}</h3>
              <p>{phase.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="onboarding-cta">
        <div>
          <div className="eyebrow">Personalization starts before the first workout</div>
          <h2>Tell your coach what you actually need.</h2>
          <p>Goals, schedule, equipment, training history, movement needs, recovery, and coaching preferences all live in one clear onboarding flow.</p>
        </div>
        <Link className="button-dark" href="/onboarding">Begin onboarding <ArrowRight size={15}/></Link>
      </section>
    </main>
  )
}
