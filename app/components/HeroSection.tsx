import Link from 'next/link'
import Scorecard from './Scorecard'

// The source photograph is 1000px wide; 1600w is a sharpened upscale so wide
// viewports do not fall back to the browser stretching the 1000w step.
const SIZES = '100vw'
const SRCSET = (ext: string) =>
  `/hero-lakeside-640.${ext} 640w, /hero-lakeside-1000.${ext} 1000w, /hero-lakeside-1600.${ext} 1600w`

export default function HeroSection() {
  return (
    <section className="hero-photo" aria-labelledby="hero-heading">
      {/* Hero is the LCP element. */}
      <link
        rel="preload"
        as="image"
        href="/hero-lakeside-1600.avif"
        type="image/avif"
        imageSrcSet={SRCSET('avif')}
        imageSizes={SIZES}
        fetchPriority="high"
      />

      <picture>
        <source type="image/avif" srcSet={SRCSET('avif')} sizes={SIZES} />
        <source type="image/webp" srcSet={SRCSET('webp')} sizes={SIZES} />
        <img
          className="hero-img"
          src="/hero-lakeside-1600.jpg"
          srcSet={SRCSET('jpg')}
          sizes={SIZES}
          width={1600}
          height={1035}
          fetchPriority="high"
          decoding="async"
          alt="A woman stretching in a seated side bend on the shore of a lake at sunrise."
        />
      </picture>

      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow glass">Custom 4-week training programs</p>
          <h1 id="hero-heading">
            A four-week program
            <br />
            built on your own <em>proof</em>,
            <br />
            not on a template.
          </h1>
          <p className="hero-body">
            Mobility and stretching come first. Strength, recovery, and personal training
            get added when they support how your body actually moves.
          </p>
          <div className="hero-ctas">
            <Link href="/fit" className="hero-cta-primary">
              Book a mobility fit check <span aria-hidden="true">→</span>
            </Link>
            <a href="#services" className="hero-cta-secondary">
              See the services <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero-microcopy">A quick fit check first. No card required.</p>
        </div>

        <div className="hero-card-plate">
          <Scorecard />
        </div>
      </div>
    </section>
  )
}
