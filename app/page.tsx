import Link from 'next/link'
import { ArrowRight, Check, Instagram, Play } from 'lucide-react'
import CoachPortrait from './components/CoachPortrait'
import Scorecard from './components/Scorecard'
import { INSTAGRAM_URL, hasInstagram } from '../lib/site'

const sampleDay = [
  ['Barbell Bench Press', '3 × 6–8', '90–120 sec'],
  ['Incline DB Press', '3 × 8–10', '90 sec'],
  ['High Slow Cable Fly', '3 × 10–12', '60 sec'],
  ['Cable Overhead Triceps Extension', '3 × 10–12', '60 sec'],
  ['Cable Triceps Pushdown', '3 × 10–12', '60 sec'],
  ['Heel-Elevated Goblet Squat', '3 × 8–10', '90 sec'],
  ['Quad-Focused Leg Press', '3 × 10–12', '90 sec'],
]

const phases = [
  ['Release', 'Create space through mobility and stretching. Start with how your body moves today, not where you think it should be.'],
  ['Restore', 'Build range, control, confidence, and recovery habits that make movement feel more available.'],
  ['Rebuild', 'Layer strength and personalized training onto a body that is moving with more intention.'],
]

const faq = [
  ['Is mobility the main focus?', 'Yes. Mobility, stretching, recovery, range, and movement quality are the heart of El^sticity. Personal training is available, but it supports the mobility-first approach rather than replacing it.'],
  ['Can you work with me after physical therapy?', 'Yes, once you have completed rehabilitation and are cleared to return to exercise. Post-rehab mobility work is not medical treatment and does not replace a physician or physical therapist.'],
  ['Can you build meal plans?', 'Yes. Abrielle is certified to build meal plans. The exact level of nutrition support can be discussed during onboarding.'],
  ['Do you train in person?', 'Yes. In-person training is available. If you do not have a gym membership, Abrielle may be able to bring you in as a guest or arrange an at-home session in a special case.'],
  ['Do I need a gym?', 'No. Your plan can be built around the equipment and environment you actually have access to.'],
  ['Do I have to send progress photos?', 'No. Progress photos are optional. Progress can also be measured through range of motion, consistency, strength, energy, control, and how movement feels.'],
  ['How fast do I get my program?', 'The launch target is delivery within 72 hours after the full intake is submitted.'],
  ['What happens after four weeks?', 'Your first four weeks create a baseline. What you learn from that block can shape the next one instead of starting over from guesses.'],
]

function PricingCards() {
  return (
    <div className="launch-pricing-grid">
      <article className="launch-price-card">
        <div className="price-kicker">Founding client</div>
        <h3>The Build</h3>
        <div className="launch-price"><span>$149</span><strong>$99</strong></div>
        <p>A custom four-week plan built around your goals, mobility needs, schedule, and equipment.</p>
        <ul>
          <li><Check size={15}/>Mobility and stretching built around you</li>
          <li><Check size={15}/>Personalized training when it belongs in the plan</li>
          <li><Check size={15}/>Progress tracking and clear instructions</li>
          <li><Check size={15}/>One revision within seven days</li>
        </ul>
        <Link href="/fit" className="button-primary">See if this fits you <ArrowRight size={15}/></Link>
      </article>

      <article className="launch-price-card featured">
        <div className="price-kicker">More support</div>
        <h3>The Build + Check-Ins</h3>
        <div className="launch-price"><span>$229</span><strong>$149</strong></div>
        <p>The same custom build, plus a weekly feedback loop with Abrielle.</p>
        <ul>
          <li><Check size={15}/>Everything in The Build</li>
          <li><Check size={15}/>Four structured weekly check-ins</li>
          <li><Check size={15}/>Written coach response after each check-in</li>
          <li><Check size={15}/>Adjustments when your body or schedule needs them</li>
        </ul>
        <Link href="/fit" className="button-primary">Choose guided support <ArrowRight size={15}/></Link>
      </article>

      <article className="launch-price-card">
        <div className="price-kicker">Longer runway</div>
        <h3>12-Week Progression</h3>
        <div className="launch-price single"><strong>$549</strong></div>
        <p>Three consecutive builds shaped by what you learn in the block before it.</p>
        <ul>
          <li><Check size={15}/>Three four-week programs</li>
          <li><Check size={15}/>Weekly check-ins throughout</li>
          <li><Check size={15}/>Month 2 and 3 built from real feedback</li>
          <li><Check size={15}/>Progress tracked across all twelve weeks</li>
        </ul>
        <Link href="/fit" className="button-secondary">Explore the 12-week option <ArrowRight size={15}/></Link>
      </article>
    </div>
  )
}

export default function Home() {
  return (
    <main className="launch-home">
      <section className="launch-hero">
        <div className="launch-hero-copy">
          <div className="hero-tag">Mobility, stretching, recovery + personalized training</div>
          <h1 className="hero-rhythm"><span>Release.</span><span>Restore.</span><span>Rebuild.</span></h1>
          <p className="launch-lead">El^sticity starts with how your body moves and feels. Mobility and stretching come first; strength, conditioning, and personal training are added when they support what you actually need.</p>
          <div className="launch-actions">
            <Link href="/fit" className="button-primary">Book a mobility fit check <ArrowRight size={15}/></Link>
            <a href="#services" className="launch-text-link">See the services ↓</a>
          </div>
          <p className="trust-line">A quick fit check first. No card required.</p>
        </div>
        <Scorecard />
      </section>

      <section className="scripture-section section-narrow" aria-label="Isaiah 54:2">
        <div className="caret-divider" aria-hidden="true">^</div>
        <div className="scripture-reference">Isaiah 54:2 · ESV</div>
        <blockquote>“Enlarge the place of your tent, and let the curtains of your habitations be stretched out; do not hold back…”</blockquote>
        <p>This is the heart of El^sticity: make room, stretch wider, strengthen what supports you, and build from there.</p>
      </section>

      <section className="services-section section-narrow" id="services">
        <div className="launch-section-head">
          <div className="section-label">What Abrielle offers</div>
          <h2>Mobility is the center. Everything else supports it.</h2>
          <p>Each service starts with your real body, real schedule, and real goals — not a generic template.</p>
        </div>
        <div className="services-grid">
          <article className="service-card primary-service">
            <span className="service-index">^01</span>
            <div><h3>Mobility and stretching</h3><p>Personalized sessions and programming for range, stiffness, control, movement quality, and helping your body feel more available day to day.</p><Link href="/fit">Book a mobility session <ArrowRight size={15}/></Link></div>
          </article>
          <article className="service-card recovery-service">
            <span className="service-index">^02</span>
            <div><h3>Recovery and post-rehab mobility</h3><p>For clients who have completed physical therapy or rehabilitation and are cleared to return to exercise. This is not medical treatment and does not replace a physician or PT.</p></div>
          </article>
          <article className="service-card">
            <span className="service-index">^03</span>
            <div><h3>Meal plans</h3><p>Abrielle is certified to build meal plans, so nutrition support can be added when it fits the client and the coaching relationship.</p></div>
          </article>
          <article className="service-card training-service">
            <span className="service-index">^04</span>
            <div><h3>Personal training</h3><p>Strength and conditioning are available too — because sometimes moving better makes you want to do more. Training stays personalized and mobility-aware.</p></div>
          </article>
        </div>
        <div className="access-note"><span>^</span><p><strong>In-person access:</strong> sessions are available in person. No gym membership? By arrangement, Abrielle may bring you in as her guest or train you at home in a special case.</p></div>
      </section>

      <section className="sample-week section-narrow" id="sample-week">
        <div className="launch-section-head">
          <div className="section-label">When training is part of your plan</div>
          <h2>A real Monday, aligned clearly.</h2>
          <p>This is one example of the detail you can expect when strength work belongs in your build.</p>
        </div>
        <div className="sample-table" role="table" aria-label="Sample Monday training day">
          <div className="sample-row sample-head" role="row"><span role="columnheader">Exercise</span><span role="columnheader">Sets × reps</span><span role="columnheader">Rest</span></div>
          {sampleDay.map(([exercise, reps, rest]) => <div className="sample-row" role="row" key={exercise}><strong role="cell">{exercise}</strong><span role="cell">{reps}</span><span role="cell">{rest}</span></div>)}
        </div>
        <div className="sample-note"><span>^</span><p>Mobility and stretching can be the whole focus of your plan. Training is not automatically the headline.</p></div>
      </section>

      <section className="launch-method" id="method">
        <div className="section-narrow">
          <div className="launch-section-head">
            <div className="section-label">The El^sticity method</div>
            <h2>Release. Restore. Rebuild.</h2>
            <p>A simple rhythm with enough room to adapt to you.</p>
          </div>
          <div className="method-line" aria-hidden="true"><span>^</span><i></i><span>^</span><i></i><span>^</span></div>
          <div className="week-grid">
            {phases.map(([title, copy], index) => <article key={title}><span>^0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <div className="method-closing"><strong>Progress can look like more range, less restriction, better control, stronger movement, or simply feeling like yourself again.</strong></div>
        </div>
      </section>

      <section className="testimonials-section section-narrow" id="testimonials">
        <div className="launch-section-head testimonial-head">
          <div className="section-label">Client stories</div>
          <h2>Real experiences will live here.</h2>
          <p>Written reviews, training reviews, and mobility-session videos will only be published after each client gives permission.</p>
        </div>
        <div className="testimonial-grid intentional-two">
          <article className="testimonial-card">
            <div className="testimonial-top"><span className="testimonial-service">Mobility</span><span className="testimonial-name">Client first name</span></div>
            <div className="testimonial-quote-mark">“</div>
            <p>Client-approved written review will be added here.</p>
            <small>Written review slot</small>
          </article>
          <article className="testimonial-card video-card">
            <div className="video-placeholder" role="img" aria-label="Vertical client video placeholder">
              <div className="video-phone"><Play size={28}/><span>9:16 client video</span></div>
            </div>
            <div className="testimonial-top"><span className="testimonial-service">Mobility session</span><span className="testimonial-name">Client first name</span></div>
            <p>Approved phone-shot training or mobility footage can be placed here with a poster image, native controls, captions when available, and no autoplay.</p>
            <small>Video loads only when real approved media is added.</small>
          </article>
        </div>
      </section>

      <section className="fit-section section-narrow">
        <div className="launch-section-head"><div className="section-label">A good fit matters</div><h2>Know what this coaching is — and what it is not.</h2></div>
        <div className="fit-columns">
          <div><h3>This may fit you if:</h3><ul><li><span>^</span>You want more mobility, flexibility, or confidence in how you move</li><li><span>^</span>You want support after finishing rehab and receiving clearance to exercise</li><li><span>^</span>You want personalized training without an all-or-nothing mindset</li><li><span>^</span>You want nutrition support from a coach certified to build meal plans</li></ul></div>
          <div><h3>This is not the right fit if:</h3><ul><li><span>^</span>You have an untreated injury or pain that needs medical evaluation first</li><li><span>^</span>You expect a dramatic visual transformation in 28 days without participating in the process</li></ul></div>
        </div>
      </section>

      <section className="launch-pricing section-narrow" id="pricing">
        <div className="launch-section-head"><div className="section-label">Founding-client pricing</div><h2>Choose the amount of support you want.</h2><p>Start with the fit check so the next step matches what you actually need.</p></div>
        <PricingCards />
      </section>

      <section className="guarantee section-narrow">
        <div><div className="section-label">Fit guarantee</div><h2>If the plan does not match what you submitted, it gets fixed.</h2></div>
        <p>If the delivered plan misses your schedule, equipment, mobility needs, or training level, request a revision within seven days. One revision is included.</p>
      </section>

      <section className="about-section section-narrow" id="about">
        <CoachPortrait />
        <div>
          <div className="section-label">About the coach</div>
          <h2>I'm Abrielle.</h2>
          <p className="about-signature">Release. Restore. Rebuild.</p>
          <p>Mobility and stretching are the heart of how I coach. I want people to feel more capable in their bodies, create space where things feel restricted, and build strength from a better foundation.</p>
          <p>I also offer personal training, meal-plan support within my certification, and select in-person sessions. If you are coming out of rehabilitation, I work after medical or PT clearance — not in place of it.</p>
          {hasInstagram && <a className="about-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer noopener"><Instagram size={16}/> Follow Abrielle on Instagram</a>}
        </div>
      </section>

      <section className="faq-section section-narrow" id="faq">
        <div className="launch-section-head"><div className="section-label">Questions before you book</div><h2>Know what happens next.</h2></div>
        <div className="faq-list">{faq.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <div className="mobile-fit-cta"><Link href="/fit">Book a mobility fit check <ArrowRight size={14}/></Link></div>
    </main>
  )
}
