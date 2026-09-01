import Link from 'next/link'
import { ArrowRight, Instagram, MapPin, Play } from 'lucide-react'
import CoachPortrait from './components/CoachPortrait'
import HeroSection from './components/HeroSection'
import MethodSection from './components/MethodSection'
import PlanExcerpt from './components/PlanExcerpt'
import PricingSection from './components/PricingSection'
import ScriptureSection from './components/ScriptureSection'
import ServiceArt from './components/ServiceArt'
import { INSTAGRAM_URL, hasInstagram } from '../lib/site'



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

      <MethodSection />

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

      <PricingSection />

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
