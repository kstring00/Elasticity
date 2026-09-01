// The verse the brand is named for. Ornament is inline SVG so it scales,
// takes the palette tokens, and costs no extra requests.

const pillars = [
  {
    key: 'room',
    label: 'Make room',
    copy: 'Release what limits you.',
    icon: (
      <>
        <path d="M8 27V14a8 8 0 0 1 16 0v13" />
        <path d="M4 27h24" />
        <path d="M13 27v-8a3 3 0 0 1 6 0v8" />
      </>
    ),
  },
  {
    key: 'stretch',
    label: 'Stretch wider',
    copy: 'Step into what God has prepared for you.',
    icon: (
      <>
        <path d="M4 16h24" />
        <path d="M10 10l-6 6 6 6" />
        <path d="M22 10l6 6-6 6" />
      </>
    ),
  },
  {
    key: 'build',
    label: 'Build from Him',
    copy: 'Rooted in truth. Built to last.',
    icon: (
      <>
        <path d="M6 24l-2-13 7 5 5-8 5 8 7-5-2 13z" />
        <path d="M6 27h20" />
      </>
    ),
  },
]

export default function ScriptureSection() {
  return (
    <section className="scripture" aria-label="Isaiah 54:2">
      {/* light through an opening, drapery, and a botanical hairline */}
      <div className="scripture-arch" aria-hidden="true" />
      <div className="scripture-drape" aria-hidden="true" />
      <svg className="scripture-botanical" viewBox="0 0 220 300" fill="none" aria-hidden="true">
        <path d="M20 296C36 226 58 170 104 128c22-20 48-34 76-42" />
        <g className="leaf">
          <path d="M52 232c14-6 26-2 32 8-12 6-25 3-32-8z" />
          <path d="M70 196c15-4 26 2 30 12-13 4-25 0-30-12z" />
          <path d="M92 162c15-2 25 5 28 16-13 2-24-4-28-16z" />
          <path d="M118 134c14 1 23 10 24 21-13 0-22-8-24-21z" />
          <path d="M62 214c-13-8-16-20-12-31 11 7 15 19 12 31z" />
          <path d="M84 178c-12-9-14-21-9-31 10 8 13 20 9 31z" />
          <path d="M110 148c-11-10-11-22-5-31 9 9 10 21 5 31z" />
        </g>
      </svg>

      <div className="scripture-inner">
        <div className="scripture-caret" aria-hidden="true">^</div>
        <p className="scripture-ref">Isaiah 54:2 · ESV</p>

        <div className="scripture-rule" aria-hidden="true">
          <i /><span>&#10022;</span><i />
        </div>

        <blockquote>
          Enlarge the place of your tent and let the{' '}
          <em>curtains of your habitations be stretched out.</em>
        </blockquote>

        <p className="scripture-pull">Do not hold back.</p>

        <div className="scripture-rule" aria-hidden="true">
          <i /><span>&#10022;</span><i />
        </div>

        <p className="scripture-note">
          This is the heart of El^sticity: make room, stretch wider, strengthen what
          supports you, and build from the One who never fails.
        </p>

        <p className="scripture-kicker">Faith is the foundation of El<span>^</span>sticity</p>

      </div>

      <div className="scripture-pillars glass glass--panel">
        {pillars.map(({ key, label, copy, icon }) => (
          <div className="pillar" key={key}>
            <span className="pillar-badge" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">{icon}</svg>
            </span>
            <div>
              <p className="pillar-label">{label}</p>
              <p className="pillar-copy">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
