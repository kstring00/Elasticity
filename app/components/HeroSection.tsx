import type { CSSProperties } from 'react'
import { ArrowRight, Dumbbell, HeartPulse, Sparkles, Waves } from 'lucide-react'

// Drop a transparent cut-out at public/hero-subject.png to fill this slot.
// scripts/make-hero-cutout.py generates it from the source photograph.
const SUBJECT_SRC = 'url(/hero-subject.png)'

const callouts = [
  {
    key: 'hand',
    className: 'hero-callout hero-callout--hand',
    lines: ['Shoulder stability', 'through the whole reach'],
  },
  {
    key: 'back',
    className: 'hero-callout hero-callout--back hero-callout--down',
    lines: ['Spinal control before', 'anything gets loaded'],
  },
  {
    key: 'leg',
    className: 'hero-callout hero-callout--leg hero-callout--flip hero-callout--dark',
    lines: ['Hip range you can', 'actually use'],
  },
]

export default function HeroSection() {
  return (
    <section className="hero-v2" aria-labelledby="hero-heading">
      <div
        className="hero-subject"
        style={{ '--hero-subject-src': SUBJECT_SRC } as CSSProperties}
        aria-hidden="true"
      />

      <div className="hero-callouts" aria-hidden="true">
        {callouts.map((c) => (
          <div className={c.className} key={c.key}>
            <span className="dot" />
            <span className="leader" />
            <span className="label">
              {c.lines[0]}
              <br />
              {c.lines[1]}
            </span>
          </div>
        ))}
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <h1 id="hero-heading">
            <span>Release.</span>
            <span>Restore.</span>
            <span className="hero-line-last">
              Rebuild.
              <span className="hero-icon-cluster" aria-hidden="true">
                <span className="glass glass--circle"><Waves strokeWidth={1.5} /></span>
                <span className="glass glass--circle"><Sparkles strokeWidth={1.5} /></span>
                <span className="glass glass--circle"><HeartPulse strokeWidth={1.5} /></span>
                <span className="glass glass--circle"><Dumbbell strokeWidth={1.5} /></span>
              </span>
            </span>
          </h1>

          <p className="hero-sub">
            Mobility and stretching come first. Strength, recovery, and personal training
            get added when they support how your body actually moves.
          </p>

          <form className="hero-capture glass glass--pill" action="/fit" method="get">
            <label className="sr-only" htmlFor="hero-email">Email address</label>
            <input
              id="hero-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
            />
            <button type="submit">
              Start the fit check <ArrowRight size={16} />
            </button>
          </form>

          <div className="hero-trust">
            <span className="hero-avatars" aria-hidden="true">
              <span>A</span>
              <span>M</span>
              <span>J</span>
              <span>K</span>
            </span>
            <p>
              Now booking the first <strong>25</strong> founding clients
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
