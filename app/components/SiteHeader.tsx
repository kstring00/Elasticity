import Link from 'next/link'

const links = [
  ['/#services', 'Services'],
  ['/#testimonials', 'Testimonials'],
  ['/#pricing', 'Pricing'],
  ['/#about', 'About'],
]

export default function SiteHeader() {
  return (
    <header className="site-header launch-header">
      <Link href="/" className="wordmark" aria-label="El^sticity home">
        <span className="caret" aria-hidden="true">^</span>
        <span>Elasticity</span>
      </Link>
      <nav className="main-nav launch-nav" aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
        <Link href="/fit" className="nav-cta">Take the fit check</Link>
      </nav>
    </header>
  )
}
