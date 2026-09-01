import Link from 'next/link'
import { ArrowRight, Check, Instagram, MapPin, Play } from 'lucide-react'
import CoachPortrait from './components/CoachPortrait'
import HeroSection from './components/HeroSection'
import PlanExcerpt from './components/PlanExcerpt'
import ScriptureSection from './components/ScriptureSection'
import ServiceArt from './components/ServiceArt'
import { INSTAGRAM_URL, hasInstagram } from '../lib/site'


const phases = [
  ['Release', 'Create space through mobility and stretching. Start with how your body moves today, not where you think it should be.'],
  ['Restore', 'Build range, control, confidence, and recovery habits that make movement feel more available.'],
  ['Rebuild', 'Layer strength and personalized training onto a body that is moving with more intention.'],
]

const services = [
  {
    art: 'mobility' as const,
    index: '01',
    title: 'Mobility and stretching',
    copy: 'Personalized sessions and programming for range, stiffness, control, movement quality, and helping your body feel more available day to day.',
    href: '/fit',
    cta: 'Book a mobility session',
  },
  {
    art: 'recovery' as const,
    index: '02',
    title: 'Recovery and post-rehab mobility',
    copy: 'For clients who have completed physical therapy or rehabilitation and are cleared to return to exercise. This is not medical treatment and does not replace a physician or PT.',
    href: '/fit',
    cta: 'See if this fits you',
  },
  {
    art: 'training' as const,
    index: '03',
    title: 'Personal training',
    copy: 'Strength and conditioning are available too — because sometimes moving better makes you want to do more. Training stays personalized and mobility-aware.',
    href: '/fit',
    cta: 'Book a training session',
  },
]

const faq = [
  ['Is mobility the main focus?', 'Yes. Mobility, stretching, recovery, range, and movement quality are the heart of El^sticity. Personal training is available, but it supports the mobility-first approach rather than replacing it.'],
  ['Can you work with me after physical therapy?', 'Yes, once you have completed rehabilitation and are cleared to return to exercise. Post-rehab mobility work is not medical treatment and does not replace a physician or physical therapist.'],
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
      <HeroSection />

      <ScriptureSection />

      <section className="services-section svc-section section-narrow" id="services">
        <div className="svc-head">
          <p className="svc-eyebrow">What Abrielle offers</p>
          <h2>Mobility is the center.<br />Everything else <em>supports</em> it.</h2>
          <p className="svc-lede">Each service starts with your real body, real schedule, and real goals — not a generic template.</p>
        </div>

        <div className="svc-grid">
          {services.map(({ art, index, title, copy, href, cta }) => (
            <article className={`svc-card svc-card--${art}`} key={title}>
              <ServiceArt name={art} />
              <div className="svc-body">
                <span className="svc-index">{index}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Link href={href} className="svc-link">{cta} <span aria-hidden="true">&rarr;</span></Link>
              </div>
            </article>
          ))}
        </div>

        <div className="svc-note">
          <span className="svc-note-label"><MapPin size={15} /> In person. By arrangement.</span>
          <p>Sessions are available in person. No gym membership? By arrangement, Abrielle may bring you in as her guest or train you at home in a special case.</p>
        </div>
      </section>

      <PlanExcerpt />

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
          <div><h3>This may fit you if:</h3><ul><li><span>^</span>You want more mobility, flexibility, or confidence in how you move</li><li><span>^</span>You want support after finishing rehab and receiving clearance to exercise</li><li><span>^</span>You want personalized training without an all-or-nothing mindset</li></ul></div>
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
          <h2>I&apos;m Abrielle.</h2>
          <p className="about-signature">Release. Restore. Rebuild.</p>
          <p>Mobility and stretching are the heart of how I coach. I want people to feel more capable in their bodies, create space where things feel restricted, and build strength from a better foundation.</p>
          <p>I also offer personal training and select in-person sessions. If you are coming out of rehabilitation, I work after medical or PT clearance — not in place of it.</p>
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
