import Link from 'next/link'
import { ArrowRight, Check, CircleCheck, Clock3, Dumbbell, Gauge, Instagram, RefreshCw } from 'lucide-react'
import CoachPortrait from './components/CoachPortrait'
import { INSTAGRAM_URL } from '../lib/site'

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
  ['01', 'Establish', 'Big compound movers set your starting loads. Nothing is maxed. You write the numbers down.'],
  ['02', 'Support', 'Accessory and symmetry work strengthens the muscles that support the lifts from Week 1.'],
  ['03', 'Control', 'Single-side work, stability, and anti-rotation training expose and address left-right differences.'],
  ['04', 'Re-test', 'Week 1 lifts return so you can compare what changed instead of guessing whether the month worked.'],
]

const faq = [
  ['What am I actually buying?', 'A custom four-week training program with a structured warm-up, exercise tables with sets, reps and rest, progression guidance, weekly check-in prompts, and a Week 1 vs. Week 4 progress scorecard.'],
  ['Do I need a gym?', 'The sample program shown here assumes a commercial gym. The fit check asks where you train before checkout so equipment access can be reviewed honestly before you buy.'],
  ['I am a beginner. Is this too advanced?', 'Starting loads are selected conservatively and the program does not ask you to train to failure. Tell the coach your real experience level in the fit check and intake so the prescription can match it.'],
  ['What if I miss a workout?', 'You do not cram missed sessions into the next day. Four out of five workouts can still be a successful week. Resume the schedule instead of trying to punish yourself for a miss.'],
  ['Will I lose weight?', 'Elasticity does not promise a specific scale or visual outcome in four weeks. The program is designed to make training progress measurable through performance, consistency, and the numbers you record.'],
  ['Do I have to send progress photos?', 'No. Progress photos are not required. The core progress mechanic is the Week 1 vs. Week 4 scorecard.'],
  ['How fast do I get my program?', 'The launch target is delivery within 72 hours after the full intake is submitted. If that turnaround changes, the site should be updated before taking payment.'],
  ['Can I ask questions while I run it?', 'The Build includes one revision window. The guided option adds structured weekly check-ins and written coach feedback.'],
  ['What happens after four weeks?', 'Month one is a starting block, not a finish line. Your Week 4 numbers can be used to build the next block instead of starting over from guesses.'],
  ['What if the plan does not fit what I submitted?', 'If the equipment, schedule, or training level does not match your submitted intake, request a revision within seven days. The launch policy includes one rebuild at no additional charge.'],
]

function PricingCards() {
  return (
    <div className="launch-pricing-grid">
      <article className="launch-price-card">
        <div className="price-kicker">Founding client</div>
        <h3>The Build</h3>
        <div className="launch-price"><span>$149</span><strong>$99</strong></div>
        <p>A complete custom four-week program you can run independently.</p>
        <ul>
          <li><Check size={15}/>Custom four-week program</li>
          <li><Check size={15}/>Sets, reps, rest, warm-up and progression rules</li>
          <li><Check size={15}/>Week 1 vs. Week 4 progress scorecard</li>
          <li><Check size={15}/>One revision within seven days</li>
        </ul>
        <Link href="/fit" className="button-primary">Start with the fit check <ArrowRight size={15}/></Link>
      </article>

      <article className="launch-price-card featured">
        <div className="price-kicker">Most people should pick this</div>
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
        <p>Three consecutive builds, each informed by the numbers from the block before it.</p>
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
          <div className="eyebrow">Custom 4-week training programs</div>
          <h1>After four weeks, you'll have <em>proof</em> — not a feeling.</h1>
          <p className="launch-lead">Most people train for months without knowing whether it is working. Elasticity gives the month a structure, records the starting point, and brings key movements back in Week 4 so progress can be compared instead of guessed.</p>
          <div className="launch-actions">
            <Link href="/fit" className="button-primary">Take the 90-second fit check <ArrowRight size={15}/></Link>
            <a href="#sample-week" className="launch-text-link">See a real training day ↓</a>
          </div>
          <p className="trust-line">Free, no card. You see the offer before checkout.</p>
        </div>

        <div className="scorecard-shell" aria-label="Week 1 to Week 4 progress scorecard preview">
          <div className="scorecard-head"><span>Elasticity progress scorecard</span><strong>Week 1 → Week 4</strong></div>
          <div className="scorecard-grid scorecard-labels"><span>Movement</span><span>Week 1</span><span>Week 4</span></div>
          {['Bench press','Leg press','Lat pulldown','T-bar row','Romanian deadlift','DB shoulder press','Energy level'].map((name) => (
            <div className="scorecard-grid" key={name}><strong>{name}</strong><span>record</span><span>re-test</span></div>
          ))}
          <div className="scorecard-foot">The promise is measurement, not a dramatic 28-day photo.</div>
        </div>
      </section>

      <section className="launch-pain section-narrow">
        <div className="eyebrow">The problem is usually not effort</div>
        <h2>You are putting in work. What is missing is structure.</h2>
        <div className="pain-grid">
          <article><Dumbbell size={20}/><h3>You keep going.</h3><p>Three or four days a week can still feel random when there is no progression to follow.</p></article>
          <article><RefreshCw size={20}/><h3>You repeat what is familiar.</h3><p>The same machines become a habit, but a habit is not automatically a program.</p></article>
          <article><Gauge size={20}/><h3>You cannot prove what changed.</h3><p>If you never record the starting numbers, there is nothing objective to compare a month later.</p></article>
        </div>
        <p className="pain-pivot">That is the gap Elasticity is designed to close: <strong>measurement with a plan behind it.</strong></p>
      </section>

      <section className="launch-deliverable section-narrow" id="how-it-works">
        <div className="launch-section-head">
          <div className="eyebrow">THE DELIVERABLE</div>
          <h2>What lands in your inbox</h2>
          <p>A four-week program written for your schedule and your gym, with the reasoning included — not a one-page exercise list.</p>
        </div>
        <div className="deliverable-grid">
          <article><Clock3 size={18}/><div><strong>A structured four-week build</strong><p>Training and recovery days organized into a sequence instead of the same week printed four times.</p></div></article>
          <article><Gauge size={18}/><div><strong>RPE and progression rules</strong><p>Start with controlled effort, leave good reps in reserve, and add load only when the rep range is earned.</p></div></article>
          <article><Dumbbell size={18}/><div><strong>Exact exercise prescriptions</strong><p>Sets, reps, rest windows, and notes make the training usable on the gym floor.</p></div></article>
          <article><CircleCheck size={18}/><div><strong>Weekly reflection</strong><p>Completion, energy, difficulty, and anything that felt off become part of the next decision.</p></div></article>
        </div>
      </section>

      <section className="sample-week section-narrow" id="sample-week">
        <div className="launch-section-head">
          <div className="eyebrow">A real day from the program</div>
          <h2>This is a real Monday.</h2>
          <p>Week 1, Day 1: chest, triceps, quads, then anterior core. The value is in the specificity.</p>
        </div>
        <div className="sample-table" role="table" aria-label="Sample Monday training day">
          <div className="sample-row sample-head" role="row"><span>Exercise</span><span>Sets × reps</span><span>Rest</span></div>
          {sampleDay.map(([exercise, reps, rest]) => <div className="sample-row" role="row" key={exercise}><strong>{exercise}</strong><span>{reps}</span><span>{rest}</span></div>)}
        </div>
        <div className="sample-note"><strong>Then anterior core:</strong> bench knee tucks 3 × 10–12 and ab roller 2 × 6–10. Record the key Week 1 loads so Week 4 has something real to compare against.</div>
      </section>

      <section className="launch-method" id="method">
        <div className="section-narrow">
          <div className="launch-section-head">
            <div className="eyebrow">The Elasticity method</div>
            <h2>Four weeks that actually go somewhere.</h2>
            <p>The framework is systematic. The prescription is personal.</p>
          </div>
          <div className="week-grid">
            {weeks.map(([number,title,copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <div className="method-closing"><strong>Week 4 is not a finale. It is a measurement.</strong><span>Your next block starts from the numbers you earned, not from zero.</span></div>
        </div>
      </section>

      <section className="fit-section section-narrow">
        <div className="launch-section-head"><div className="eyebrow">Who this is for</div><h2>Be honest before you buy.</h2></div>
        <div className="fit-columns">
          <div><h3>This may fit you if:</h3><ul><li>You can identify realistic training days each week</li><li>You have trained before or can be honest about being new</li><li>You want structure and progression more than a quick scale promise</li><li>You are willing to record what you actually did</li></ul></div>
          <div><h3>This is not the right fit if:</h3><ul><li>You are looking for a meal plan, nutrition prescription, or rehabilitation</li><li>You have an untreated issue that currently limits exercise</li><li>You expect a dramatic visual transformation in 28 days</li><li>You want in-person coaching on the gym floor</li></ul></div>
        </div>
      </section>

      <section className="launch-pricing section-narrow" id="pricing">
        <div className="launch-section-head"><div className="eyebrow">Founding-client launch pricing</div><h2>Pick the amount of coaching you actually want.</h2><p>Founding pricing, first 10 clients only. Prices go up after that.</p></div>
        <PricingCards />
        <div className="continuation-note">Already finished a month with me? Your next block is <strong>$99</strong> — I already know your numbers.</div>
      </section>

      <section className="guarantee section-narrow">
        <div><div className="eyebrow">Fit guarantee</div><h2>If the plan does not match what you submitted, it gets fixed.</h2></div>
        <p>Review the delivered program. If the schedule, equipment, or training level does not reflect your submitted intake, request a rebuild within seven days. One revision is included at no additional charge. This is a fit guarantee, not a promise of a specific body or performance result.</p>
      </section>

      <section className="about-section section-narrow" id="about">
        {/* CoachPortrait renders /coach.jpg. A real photo of Abrielle is REQUIRED before launch —
            the file does not exist yet, so the monogram fallback is what ships until it is added. */}
        <CoachPortrait />
        <div>
          <div className="eyebrow">About the coach</div>
          <h2>I'm Abrielle.</h2>
          {/* TODO: replace bracketed sections with Abrielle's own words before launch */}
          <p>[CREDENTIALS — certification and issuing body, education, years training, years coaching. One or two sentences, plain.]</p>
          <p>[WHY I PROGRAM THIS WAY — a specific story. A training mistake, an injury, a plateau you couldn't explain, a program that wrecked you. This is the paragraph people remember. 3–5 sentences.]</p>
          <p>I program training. I'm not a dietitian and I don't write meal plans, and I don't do rehab. If you need either, I'll tell you who to talk to.</p>
          <a className="about-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer noopener">
            <Instagram size={16}/> Follow along on Instagram
          </a>
        </div>
      </section>

      <section className="faq-section section-narrow" id="faq">
        <div className="launch-section-head"><div className="eyebrow">Questions before you start</div><h2>Know what you are buying.</h2></div>
        <div className="faq-list">{faq.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <div className="mobile-fit-cta"><Link href="/fit">Take the fit check <ArrowRight size={14}/></Link></div>
    </main>
  )
}
