import Link from 'next/link'
import { ArrowRight, Check, CircleCheck, Clock3, Dumbbell, Gauge, Instagram, Play, RefreshCw, Sparkles } from 'lucide-react'
import CoachPortrait from './components/CoachPortrait'
import Scorecard from './components/Scorecard'
import { INSTAGRAM_URL, hasInstagram } from '../lib/site'

const sampleDay = [
  ['Barbell Bench Press', '3 × 6–8', '90–120 sec'],
  ['Incline DB Press', '3 × 8–10', '90 sec'],
  ['High Slow Cable Fly', '3 × 10–12', '60 sec'],
  ['Cable Overhead Triceps Extension', '3 × 10–12', '60 sec'],
  ['Cable Triceps Pushdown', '3 × 10–12', '60 sec'],
  ['Triceps Kickbacks', '2 × 12–15', '45–60 sec'],
  ['Heel-Elevated Goblet Squat', '3 × 8–10', '90 sec'],
  ['Quad-Focused Leg Press', '3 × 10–12', '90 sec'],
  ['Leg Extension', '2 × 12–15', '60 sec'],
]

const weeks = [
  ['01', 'Release', 'Create room to move. Mobility, stretching, and controlled preparation help you start from where your body actually is.'],
  ['02', 'Restore', 'Build better movement quality, supporting strength, range, and confidence without forcing progress before your body is ready.'],
  ['03', 'Rebuild', 'Layer in intentional strength, control, and personalized training around your goals, schedule, and current ability.'],
  ['04', 'Re-test', 'Bring key movements back, compare what changed, and use real feedback to decide what comes next.'],
]

const faq = [
  ['What am I actually buying?', 'A custom four-week plan shaped around your goals, schedule, training history, equipment, mobility needs, and current starting point. Your plan can include mobility, stretching, strength work, conditioning, progress tracking, and coach guidance depending on the service selected.'],
  ['Do I need a gym?', 'No. The fit check asks where you train so the plan can match your real setup. Abrielle can also offer in-person training in select situations, including gym access with her or special-case home sessions.'],
  ['Is mobility the main focus?', 'Yes. Mobility, stretching, movement quality, and helping you feel better in your body are central to Elasticity. Personalized training is also available and can be layered in around that foundation.'],
  ['Can you help with a meal plan?', 'Yes. Abrielle is certified to provide meal-plan support within her scope. Your exact nutrition needs can be discussed during onboarding so the service matches what you are actually looking for.'],
  ['I am a beginner. Is this too advanced?', 'No. The fit check and intake are designed to capture your real experience level so the prescription can start where you are instead of where someone else thinks you should be.'],
  ['Do I have to send progress photos?', 'No. Progress photos are optional. Progress can also be measured through movement quality, consistency, strength numbers, energy, range of motion, and how the work feels over time.'],
  ['How fast do I get my program?', 'The launch target is delivery within 72 hours after the full intake is submitted.'],
  ['Can I ask questions while I run it?', 'The Build includes one revision window. The guided option adds structured weekly check-ins and written coach feedback.'],
  ['What happens after four weeks?', 'Month one is a starting block, not a finish line. Your Week 4 feedback can be used to build the next block without starting over from guesses.'],
  ['What if the plan does not fit what I submitted?', 'If the schedule, equipment, or training level does not reflect your submitted intake, request a revision within seven days. One rebuild is included at no additional charge.'],
]

function PricingCards() {
  return (
    <div className="launch-pricing-grid">
      <article className="launch-price-card">
        <div className="price-kicker">Founding client</div>
        <h3>The Build</h3>
        <div className="launch-price"><span>$149</span><strong>$99</strong></div>
        <p>A complete custom four-week plan you can run independently.</p>
        <ul>
          <li><Check size={15}/>Mobility + training built around you</li>
          <li><Check size={15}/>Sets, reps, rest, warm-up and progression rules</li>
          <li><Check size={15}/>Week 1 vs. Week 4 progress tracking</li>
          <li><Check size={15}/>One revision within seven days</li>
        </ul>
        <Link href="/fit" className="button-primary">Start with the fit check <ArrowRight size={15}/></Link>
      </article>

      <article className="launch-price-card featured">
        <div className="price-kicker">My recommendation</div>
        <h3>The Build + Check-Ins</h3>
        <div className="launch-price"><span>$229</span><strong>$149</strong></div>
        <p>The same custom build, plus a weekly feedback loop with your coach.</p>
        <ul>
          <li><Check size={15}/>Everything in The Build</li>
          <li><Check size={15}/>Four structured weekly check-ins</li>
          <li><Check size={15}/>Written coach response after each check-in</li>
          <li><Check size={15}/>Mid-program adjustments when needed</li>
        </ul>
        <Link href="/fit" className="button-primary">Start with the fit check <ArrowRight size={15}/></Link>
      </article>

      <article className="launch-price-card">
        <div className="price-kicker">Longer runway</div>
        <h3>12-Week Progression</h3>
        <div className="launch-price single"><strong>$549</strong></div>
        <p>Three consecutive builds, each informed by what your body and numbers showed in the block before it.</p>
        <ul>
          <li><Check size={15}/>Three four-week programs</li>
          <li><Check size={15}/>Weekly check-ins throughout</li>
          <li><Check size={15}/>Month 2 and 3 built from real results</li>
          <li><Check size={15}/>Progress tracked across all twelve weeks</li>
        </ul>
        <Link href="/fit" className="button-secondary">Start with the fit check <ArrowRight size={15}/></Link>
      </article>
    </div>
  )
}

export default function Home() {
  return (
    <main className="launch-home">
      <section className="launch-hero">
        <div className="launch-hero-copy">
          <div className="eyebrow">Mobility-first coaching + personalized training</div>
          <div className="hero-script">Release. Restore. Rebuild.</div>
          <h1>Feel better in your body — then build from there.</h1>
          <p className="launch-lead">Elasticity begins with movement: mobility, stretching, range, control, and the way your body actually feels. Training is personalized around that foundation so progress feels intentional, not random.</p>
          <div className="launch-actions">
            <Link href="/fit" className="button-primary">Take the 90-second fit check <ArrowRight size={15}/></Link>
            <a href="#testimonials" className="launch-text-link">See client stories ↓</a>
          </div>
          <p className="trust-line">Free, no card. You see the price before you buy.</p>
        </div>

        <Scorecard />
      </section>

      <section className="core-message section-narrow" aria-label="Elasticity core message">
        <div className="core-orbit" aria-hidden="true"><Sparkles size={18}/></div>
        <div className="eyebrow">The heart behind Elasticity</div>
        <div className="core-words">
          <span>Release.</span>
          <span>Restore.</span>
          <span>Rebuild.</span>
        </div>
        <div className="scripture-block">
          <span>Isaiah 54:2</span>
          <p>“Enlarge the place of your tent.”</p>
          <small>Make room. Stretch wider. Strengthen what supports you.</small>
        </div>
      </section>

      <section className="launch-pain section-narrow">
        <div className="eyebrow">Movement before punishment</div>
        <h2>You do not need to fight your body to make progress.</h2>
        <div className="pain-grid">
          <article><RefreshCw size={20}/><h3>Release tension.</h3><p>Create space through mobility, stretching, and movement that meets you where you are.</p></article>
          <article><CircleCheck size={20}/><h3>Restore confidence.</h3><p>Build range, control, consistency, and a better relationship with how your body moves.</p></article>
          <article><Dumbbell size={20}/><h3>Rebuild strength.</h3><p>Add personalized training with intention instead of stacking random workouts on top of restriction.</p></article>
        </div>
        <p className="pain-pivot">That is the Elasticity approach: <strong>move better, feel better, then build stronger.</strong></p>
      </section>

      <section className="launch-deliverable section-narrow" id="how-it-works">
        <div className="launch-section-head">
          <div className="eyebrow">What your plan can include</div>
          <h2>Built for the body you have today.</h2>
          <p>Your intake gives Abrielle the context to shape the right mix of mobility, stretching, strength, conditioning, and support for you.</p>
        </div>
        <div className="deliverable-grid">
          <article><RefreshCw size={18}/><div><strong>Mobility + stretching</strong><p>Intentional work for range, control, stiffness, and movement quality — not five random stretches before a workout.</p></div></article>
          <article><Gauge size={18}/><div><strong>Progressive training</strong><p>Strength and conditioning can be layered in around your ability, equipment, schedule, and goals.</p></div></article>
          <article><CircleCheck size={18}/><div><strong>Weekly reflection</strong><p>Energy, consistency, soreness, wins, challenges, and what feels different become part of the next decision.</p></div></article>
          <article><Clock3 size={18}/><div><strong>Real-life flexibility</strong><p>Programs are designed around realistic training days and the environment you actually have access to.</p></div></article>
        </div>
      </section>

      <section className="sample-week section-narrow" id="sample-week">
        <div className="launch-section-head">
          <div className="eyebrow">A real day from the program</div>
          <h2>This is a real Monday.</h2>
          <p>One example of how specific the training can get when strength work is part of your build.</p>
        </div>
        <div className="sample-table" role="table" aria-label="Sample Monday training day">
          <div className="sample-row sample-head" role="row"><span role="columnheader">Exercise</span><span role="columnheader">Sets × reps</span><span role="columnheader">Rest</span></div>
          {sampleDay.map(([exercise, reps, rest]) => <div className="sample-row" role="row" key={exercise}><strong role="cell">{exercise}</strong><span role="cell">{reps}</span><span role="cell">{rest}</span></div>)}
        </div>
        <div className="sample-note"><strong>Training is only one lane.</strong> Mobility and stretching can be the center of your plan when that is what your body needs most.</div>
      </section>

      <section className="launch-method" id="method">
        <div className="section-narrow">
          <div className="launch-section-head">
            <div className="eyebrow">The Elasticity method</div>
            <h2>Release. Restore. Rebuild.</h2>
            <p>The framework has a rhythm. Your prescription stays personal.</p>
          </div>
          <div className="week-grid">
            {weeks.map(([number,title,copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <div className="method-closing"><strong>Progress is not just a heavier number.</strong><span>It can also be better range, less restriction, more control, more consistency, and feeling confident enough to keep going.</span></div>
        </div>
      </section>

      <section className="testimonials-section section-narrow" id="testimonials">
        <div className="launch-section-head testimonial-head">
          <div className="eyebrow">Client stories</div>
          <h2>Real people. Real movement. Real feedback.</h2>
          <p>Abrielle already has client training reviews, mobility-session footage, and client-approved stories ready to live here. These cards are intentionally waiting for the real media — no fake testimonials.</p>
        </div>
        <div className="testimonial-grid">
          <article className="testimonial-card">
            <div className="testimonial-avatar">01</div>
            <div className="testimonial-type">Training review</div>
            <p>Client-approved quote + photo will be added here.</p>
            <span>Written testimonial</span>
          </article>
          <article className="testimonial-card video-card">
            <div className="video-preview"><Play size={28} fill="currentColor"/></div>
            <div className="testimonial-type">Mobility session</div>
            <p>Client mobility footage can play directly in this space.</p>
            <span>Video testimonial / session clip</span>
          </article>
          <article className="testimonial-card video-card">
            <div className="video-preview"><Play size={28} fill="currentColor"/></div>
            <div className="testimonial-type">Client story</div>
            <p>Training review video can live here with a short caption.</p>
            <span>Video review</span>
          </article>
        </div>
      </section>

      <section className="fit-section section-narrow">
        <div className="launch-section-head"><div className="eyebrow">Who this is for</div><h2>Find the right kind of support.</h2></div>
        <div className="fit-columns">
          <div><h3>This may fit you if:</h3><ul><li>You want more mobility, flexibility, or confidence in how you move</li><li>You want training personalized around your real starting point</li><li>You value structure without an all-or-nothing mindset</li><li>You are willing to communicate honestly about what your body needs</li></ul></div>
          <div><h3>This is not the right fit if:</h3><ul><li>You have an untreated injury or pain that needs medical evaluation first</li><li>You expect a dramatic visual transformation in 28 days</li><li>You are looking for a quick fix without participating in the process</li></ul><p className="special-case-note">In-person training is available in select situations. If you do not have a gym membership, Abrielle may be able to bring you in as a guest or arrange a special-case home session.</p></div>
        </div>
      </section>

      <section className="launch-pricing section-narrow" id="pricing">
        <div className="launch-section-head"><div className="eyebrow">Founding-client launch pricing</div><h2>Choose the amount of support you want.</h2><p>Founding pricing, first 10 clients only. Prices go up after that.</p></div>
        <PricingCards />
        <div className="continuation-note">Already finished a month with me? Your next block is <strong>$99</strong> — I already know your starting point.</div>
      </section>

      <section className="guarantee section-narrow">
        <div><div className="eyebrow">Fit guarantee</div><h2>If the plan does not match what you submitted, it gets fixed.</h2></div>
        <p>Review the delivered program. If the schedule, equipment, mobility needs, or training level does not reflect your submitted intake, request a rebuild within seven days. One revision is included at no additional charge.</p>
      </section>

      <section className="about-section section-narrow" id="about">
        <CoachPortrait />
        <div>
          <div className="eyebrow">About the coach</div>
          <h2>I'm Abrielle.</h2>
          <p className="about-signature">Release. Restore. Rebuild.</p>
          <p>Mobility and stretching are at the heart of how I work. I love helping people create more space, control, confidence, and freedom in the way they move — and I also build personalized training programs when strength and conditioning are part of the goal.</p>
          <p>I am certified to provide meal-plan support within my scope, and I also offer in-person training in select situations. If you need something that falls outside what I can responsibly provide, I will be direct about that.</p>
          <p className="about-scripture">Isaiah 54:2 is the core behind Elasticity: make room, stretch wider, and strengthen what supports you.</p>
          {hasInstagram && (
            <a className="about-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer noopener">
              <Instagram size={16}/> Follow along on Instagram
            </a>
          )}
        </div>
      </section>

      <section className="faq-section section-narrow" id="faq">
        <div className="launch-section-head"><div className="eyebrow">Questions before you start</div><h2>Know what support you are choosing.</h2></div>
        <div className="faq-list">{faq.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <div className="mobile-fit-cta"><Link href="/fit">Take the fit check <ArrowRight size={14}/></Link></div>
    </main>
  )
}
