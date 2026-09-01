import Link from 'next/link'

type Tier = {
  kicker: string
  name: string
  was?: string
  price: string
  save?: string
  summary: string
  features: string[]
  cta: string
  featured?: boolean
  badge?: string
}

const tiers: Tier[] = [
  {
    kicker: 'Founding client',
    name: 'The Build',
    was: '$149',
    price: '$99',
    save: 'Save $50',
    summary: 'A custom four-week plan built around your goals, mobility needs, schedule, and equipment.',
    features: [
      'Mobility and stretching built around you',
      'Personalized training when it belongs in the plan',
      'Progress tracking and clear instructions',
      'One revision within seven days',
    ],
    cta: 'See if this fits you',
  },
  {
    kicker: 'More support',
    name: 'The Build + Check-Ins',
    was: '$229',
    price: '$149',
    save: 'Save $80',
    summary: 'The same custom build, plus a weekly feedback loop with Abrielle.',
    features: [
      'Everything in The Build',
      'Four structured weekly check-ins',
      'Written coach response after each check-in',
      'Adjustments when your body or schedule needs them',
    ],
    cta: 'Choose guided support',
    featured: true,
    badge: 'Most support per week',
  },
  {
    kicker: 'Longer runway',
    name: '12-Week Progression',
    price: '$549',
    summary: 'Three consecutive builds shaped by what you learn in the block before it.',
    features: [
      'Three four-week programs',
      'Weekly check-ins throughout',
      'Month 2 and 3 built from real feedback',
      'Progress tracked across all twelve weeks',
    ],
    cta: 'Explore the 12-week option',
  },
]

function Check() {
  return (
    <span className="tier-check" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M3.5 8.4l3 3 6-6.8" />
      </svg>
    </span>
  )
}

export default function PricingSection() {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing-glow" aria-hidden="true" />

      <div className="pricing-inner">
        <div className="pricing-head">
          <p className="pricing-eyebrow">Founding-client pricing</p>
          <div className="ornament-rule" aria-hidden="true">
            <i /><span>&#10022;</span><i />
          </div>
          <h2>Choose the amount of <em>support</em> you want.</h2>
          <p className="pricing-lede">
            Start with the fit check so the next step matches what you actually need.
          </p>
        </div>

        <div className="tier-grid">
          {tiers.map((t) => (
            <article className={`tier${t.featured ? ' tier--featured' : ''}`} key={t.name}>
              {t.badge && <span className="tier-badge">{t.badge}</span>}

              <p className="tier-kicker">{t.kicker}</p>
              <h3>{t.name}</h3>

              <p className="tier-price">
                {t.was && <s>{t.was}</s>}
                <strong>{t.price}</strong>
                {t.save && <span className="tier-save">{t.save}</span>}
              </p>

              <p className="tier-summary">{t.summary}</p>

              <ul className="tier-features">
                {t.features.map((f) => (
                  <li key={f}><Check />{f}</li>
                ))}
              </ul>

              <Link href="/fit" className="tier-cta">
                {t.cta} <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>

        <p className="pricing-note">
          Every plan starts with the fit check &mdash; about 90 seconds, no card required.
          One revision is included within seven days of delivery.
        </p>
      </div>
    </section>
  )
}
