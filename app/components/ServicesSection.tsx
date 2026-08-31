import Link from 'next/link'

type ServiceCard = {
  number: string
  heading: string
  body: string
  linkText: string
  linkHref: string
  tint: 'blush' | 'sand' | 'rose'
  artType: 'flow' | 'contour' | 'orbit'
}

const services: ServiceCard[] = [
  {
    number: '01',
    heading: 'Mobility and stretching',
    body: 'Personalized sessions for range, stiffness, control, and movement quality so your body feels more available day to day.',
    linkText: 'Book a mobility session',
    linkHref: '/fit',
    tint: 'blush',
    artType: 'flow',
  },
  {
    number: '02',
    heading: 'Recovery and post-rehab mobility',
    body: 'For clients who have completed rehabilitation and are cleared to return to exercise, with mobility support that respects that transition.',
    linkText: 'Explore recovery support',
    linkHref: '/fit',
    tint: 'sand',
    artType: 'contour',
  },
  {
    number: '03',
    heading: 'Personal training',
    body: 'Strength and conditioning that stays personalized, mobility-aware, and grounded in the way you actually move.',
    linkText: 'Book personal training',
    linkHref: '/fit',
    tint: 'rose',
    artType: 'orbit',
  },
]

function CardArt({ type }: { type: ServiceCard['artType'] }) {
  if (type === 'flow') {
    return (
      <svg viewBox="0 0 360 280" aria-hidden="true" focusable="false">
        <path className="blob blob-a" d="M135 315C81 267 56 191 88 133c31-58 117-99 178-66 61 34 95 140 54 204-41 63-131 92-185 44Z" />
        {[0,1,2,3,4,5].map((i) => <path key={i} className="contour" d={`M40 ${210-i*17} C120 ${105-i*4}, 185 ${250-i*9}, 340 ${80+i*12}`} />)}
      </svg>
    )
  }

  if (type === 'contour') {
    return (
      <svg viewBox="0 0 360 280" aria-hidden="true" focusable="false">
        <path className="blob blob-b" d="M96 23c72-42 177-1 211 70 34 72-3 174-79 206-77 32-184-6-210-84C-8 137 24 65 96 23Z" />
        {[0,1,2,3,4].map((i) => <path key={i} className="contour" d={`M72 ${42+i*27} C132 ${88+i*3}, 188 ${23+i*31}, 334 ${118+i*17}`} />)}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 360 280" aria-hidden="true" focusable="false">
      <circle className="orbit orbit-a" cx="244" cy="143" r="102" />
      <circle className="orbit orbit-b" cx="244" cy="143" r="71" />
      <path className="blob blob-c" d="M206 46c59-18 133 19 143 83 10 64-46 134-110 137-65 4-126-58-117-121 9-62 25-81 84-99Z" />
      <path className="contour" d="M110 226 C171 165, 203 116, 334 63" />
      <path className="contour" d="M88 247 C162 185, 223 165, 344 100" />
    </svg>
  )
}

export default function ServicesSection() {
  return (
    <section className="services-showcase" id="services">
      <div className="services-showcase-inner">
        <header className="services-showcase-head">
          <div className="services-eyebrow">What Abrielle offers</div>
          <h2>Mobility is the center.<br />Everything else <em>supports</em> it.</h2>
          <p>Each service starts with your real body, real schedule, and real goals — not a generic template.</p>
        </header>

        <div className="services-showcase-grid">
          {services.map((service) => (
            <article className={`service-showcase-card tint-${service.tint}`} key={service.number}>
              <div className="service-showcase-content">
                <span className="service-showcase-number">{service.number}</span>
                <h3>{service.heading}</h3>
                <p>{service.body}</p>
                <Link href={service.linkHref} className="service-showcase-link">
                  {service.linkText} <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className={`service-showcase-art art-${service.artType}`}>
                <CardArt type={service.artType} />
              </div>
            </article>
          ))}
        </div>

        <div className="services-access-strip">
          <span className="services-pin" aria-hidden="true">⌖</span>
          <strong>In person. By arrangement.</strong>
          <i aria-hidden="true" />
          <p>Sessions are available in person. Without a gym membership, Abrielle may be able to bring you in as her guest or arrange an at-home session in a special case.</p>
        </div>
      </div>
    </section>
  )
}
