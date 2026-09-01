import Link from 'next/link'

type Tier = {
  name: string
  price: string
  summary: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
}

// PRICING — NOT CONFIRMED BY THE COACH. Every displayed price is a placeholder.
//
// TIER-3 MATH CONSTRAINT (do not reintroduce the bug that was here):
// tier 3 is three consecutive four-week builds with weekly check-ins, i.e. three
// of tier 2. Whatever numbers land here, tier 3 must be PRICED BELOW 3 x tier 2,
// or the longer commitment costs more than buying the same thing month by month.
// The previous numbers ($149 x 3 = $447 vs. a $549 twelve-week package) broke this.
//
// The "was" strikethrough prices, the "Save $X" badges, and the "Founding client" /
// "Most support per week" eyebrows were removed: none of them were confirmed, and a
// struck-through price is a claim about a prior price that has to be true.
// Reintroduce a "was" price only when a real prior price actually existed.
//
// Stripe charges real amounts from app/api/checkout/route.ts. Resolve the placeholders
// and those amounts together — do not ship a placeholder price next to a live charge.
const tiers: Tier[] = [
  {
    name: 'The Build',
    price: '[[TODO_PRICE_TIER_1]]',
    summary: 'A custom four-week plan built around your goals, mobility needs, schedule, and equipment.',
    features: [
      'Mobility and stretching built around you',
      'Personalized training when it belongs in the plan',
      'Progress tracking and clear instructions',
      '[[TODO_REVISION_POLICY]]',
    ],
    cta: 'See if this fits you',
    href: '/fit?src=pricing-build',
  },
  {
    name: 'The Build + Check-Ins',
    price: '[[TODO_PRICE_TIER_2]]',
    summary: 'The same custom build, plus a weekly feedback loop with me.',
    features: [
      'Everything in The Build',
      'Four structured weekly check-ins',
      'Written coach response after each check-in',
      'Adjustments when your body or schedule needs them',
    ],
    cta: 'Choose guided support',
    href: '/fit?src=pricing-guided',
    featured: true,
  },
  {
    name: '12-Week Progression',
    price: '[[TODO_PRICE_TIER_3]]',
    summary: 'Three consecutive builds shaped by what you learn in the block before it.',
    features: [
      'Three four-week programs',
      'Weekly check-ins throughout',
      'Month 2 and 3 built from real feedback',
      'Progress tracked across all twelve weeks',
    ],
    cta: 'Explore the 12-week option',
    href: '/fit?src=pricing-progression',
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
              <h3>{t.name}</h3>

              <p className="tier-price">
                <strong>{t.price}</strong>
              </p>

              <p className="tier-summary">{t.summary}</p>

              <ul className="tier-features">
                {t.features.map((f) => (
                  <li key={f}><Check />{f}</li>
                ))}
              </ul>

              <Link href={t.href} className="tier-cta">
                {t.cta} <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>

        <p className="pricing-note">
          Every plan starts with the fit check &mdash; about 90 seconds, no card required.
          [[TODO_REVISION_POLICY]]
        </p>
      </div>
    </section>
  )
}
