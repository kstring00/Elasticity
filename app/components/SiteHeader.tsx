import Link from 'next/link'

// The Testimonials link is removed on purpose: the section is switched off in
// app/components/Testimonials.tsx until real approved reviews exist. Restore
// ['/#testimonials', 'Testimonials'] here when it is turned back on.
const links = [
  ['/#services', 'Services'],
  ['/#pricing', 'Pricing'],
  ['/#about', 'About'],
]

export default function SiteHeader() {
  return (
    <header className="site-header launch-header">
      <Link href="/" className="wordmark" aria-label="Elasticity home">
        <span>El<span className="caret" aria-hidden="true">^</span>sticity</span>
      </Link>
      <nav className="main-nav launch-nav" aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
        <Link href="/fit?src=nav" className="nav-cta">Take the fit check</Link>
      </nav>
    </header>
  )
}
