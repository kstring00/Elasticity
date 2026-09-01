import Link from 'next/link'
import { ArrowRight, Instagram, MapPin } from 'lucide-react'
import CoachPortrait from './components/CoachPortrait'
import HeroSection from './components/HeroSection'
import MethodSection from './components/MethodSection'
import PlanExcerpt from './components/PlanExcerpt'
import PricingSection from './components/PricingSection'
import ScriptureSection from './components/ScriptureSection'
import ServiceArt from './components/ServiceArt'
import Testimonials from './components/Testimonials'
import { INSTAGRAM_URL, hasInstagram } from '../lib/site'



const services = [
  {
    art: 'mobility' as const,
    index: '01',
    title: 'Mobility and stretching',
    copy: 'Personalized sessions and programming for range, stiffness, control, movement quality, and helping your body feel more available day to day.',
    href: '/fit?src=service-mobility',
    cta: 'Book a mobility session',
  },
  {
    art: 'training' as const,
    index: '02',
    title: 'Personal training',
    copy: 'Strength and conditioning are available too — because sometimes moving better makes you want to do more. Training stays personalized and mobility-aware.',
    href: '/fit?src=service-training',
    cta: 'Book a training session',
  },
]

const faq = [
  ['Is mobility the main focus?', 'Yes. Mobility, stretching, recovery, range, and movement quality are the heart of El^sticity. Personal training is available, but it supports the mobility-first approach rather than replacing it.'],
  ['Do you train in person?', 'Yes. In-person training is available. If you do not have a gym membership, I may be able to bring you in as a guest or arrange an at-home session in a special case.'],
  ['Do I need a gym?', 'No. Your plan can be built around the equipment and environment you actually have access to.'],
  ['Do I have to send progress photos?', 'No. Progress photos are optional. Progress can also be measured through range of motion, consistency, strength, energy, control, and how movement feels.'],
  ['How fast do I get my program?', 'Your program is delivered within [[TODO_DELIVERY_WINDOW]] of your completed intake.'],
  ['What happens after four weeks?', 'Your first four weeks create a baseline. What you learn from that block can shape the next one instead of starting over from guesses.'],
]


export default function Home() {
  return (
    <main className="launch-home">
      <HeroSection />

      <ScriptureSection />

      <section className="services-section svc-section section-narrow" id="services">
        <div className="svc-head">
          <p className="svc-eyebrow">What I offer</p>
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
          <span className="svc-note-label"><MapPin size={15} /> In person. By arrangement. [[TODO_SERVICE_AREA]]</span>
          <p>Sessions are available in person. No gym membership? By arrangement, I may bring you in as my guest or train you at home in a special case.</p>
        </div>
      </section>

      <PlanExcerpt />

      <MethodSection />

      {/* Testimonials are switched OFF behind SHOW_TESTIMONIALS in
          app/components/Testimonials.tsx — the section still holds empty review slots.
          The component renders nothing until real approved reviews exist. */}
      <Testimonials />

      <PricingSection />

      <section className="about-section section-narrow" id="about">
        <CoachPortrait />
        <div>
          <div className="section-label">About the coach</div>
          <h2>I&apos;m Abrielle.</h2>
          <p className="about-signature">Release. Restore. Rebuild.</p>
          <p>[[TODO_CREDENTIALS]]</p>
          <p>Mobility and stretching are the heart of how I coach. I want people to feel more capable in their bodies, create space where things feel restricted, and build strength from a better foundation.</p>
          <p>I also offer personal training and select in-person sessions. [[TODO_SERVICE_AREA]]</p>
          {hasInstagram && <a className="about-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer noopener"><Instagram size={16}/> Follow me on Instagram</a>}
        </div>
      </section>

      <section className="faq-section section-narrow" id="faq">
        <div className="launch-section-head"><div className="section-label">Questions before you book</div><h2>Know what happens next.</h2></div>
        <div className="faq-list">{faq.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <div className="mobile-fit-cta"><Link href="/fit?src=mobile-sticky">Book a mobility fit check <ArrowRight size={14}/></Link></div>
    </main>
  )
}
