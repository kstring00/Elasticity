// Release / Restore / Rebuild. Figures are inline SVG line art so they take the
// palette and stay crisp at any size.

type Phase = {
  number: string
  title: string
  copy: string
  art: React.ReactNode
}

const phases: Phase[] = [
  {
    number: '01',
    title: 'Release',
    copy: 'Create space through mobility and stretching. Start with how your body moves today, not where you think it should be.',
    // standing side bend: one arm sweeping overhead, back leg extended
    art: (
      <>
        <circle cx="44" cy="19" r="7" />
        <path d="M44 26c3 9 2 19-3 27" />
        <path d="M47 30c7-3 13-8 17-15" />
        <path d="M43 33c-6 5-9 11-9 18" />
        <path d="M41 53c-2 11-4 20-5 29" />
        <path d="M41 53c9 6 19 11 30 13" />
      </>
    ),
  },
  {
    number: '02',
    title: 'Restore',
    copy: 'Build range, control, confidence, and recovery habits that make movement feel more available.',
    // seated and settled, with a sprig resting alongside
    art: (
      <>
        <circle cx="46" cy="21" r="7.5" />
        <path d="M46 30c-9 4-15 13-17 25" />
        <path d="M46 30c9 4 15 13 17 25" />
        <path d="M22 62c8 8 40 8 48 0" />
        <path d="M22 62c6-5 42-5 48 0" />
        <path d="M31 40c-6 6-9 13-9 20" />
        <path d="M61 40c6 6 9 13 9 20" />
        <path d="M84 34c4 8 4 17-1 25" />
        <path d="M84 44c4-1 7-4 8-8M83 54c4 0 8-2 10-6" />
      </>
    ),
  },
  {
    number: '03',
    title: 'Rebuild',
    copy: 'Layer strength and personalized training onto a body that is moving with more intention.',
    // a dumbbell, lifted
    art: (
      <>
        <path d="M36 50h28" />
        <rect x="24" y="36" width="12" height="28" rx="5" />
        <rect x="64" y="36" width="12" height="28" rx="5" />
        <rect x="14" y="42" width="8" height="16" rx="3.5" />
        <rect x="78" y="42" width="8" height="16" rx="3.5" />
        <path d="M74 16l2 5.2 5.2 2-5.2 2L74 30l-2-4.8-5.2-2 5.2-2z" />
        <path d="M88 30l1.2 3.2 3.2 1.2-3.2 1.2L88 39l-1.2-3.4-3.2-1.2 3.2-1.2z" />
      </>
    ),
  },
]

export default function MethodSection() {
  return (
    <section className="method" id="method">
      <div className="method-veil" aria-hidden="true" />
      <svg className="method-botanical" viewBox="0 0 200 320" fill="none" aria-hidden="true">
        <path d="M14 314C26 240 46 182 92 138c20-19 44-32 70-40" />
        <g className="leaf">
          <path d="M44 246c13-6 25-2 31 8-12 6-24 3-31-8z" />
          <path d="M62 210c14-4 25 2 29 12-13 4-24 0-29-12z" />
          <path d="M84 176c14-2 24 5 27 16-13 2-23-4-27-16z" />
          <path d="M54 228c-12-8-15-20-11-31 10 8 14 19 11 31z" />
          <path d="M76 192c-12-9-13-21-8-31 9 8 12 20 8 31z" />
        </g>
      </svg>

      <div className="method-inner">
        <p className="method-eyebrow">The El<span>^</span>sticity method</p>

        <div className="ornament-rule" aria-hidden="true">
          <i /><span>&#10022;</span><i />
        </div>

        <h2>Release. Restore. Rebuild.</h2>
        <p className="method-lede">A simple rhythm with enough room to adapt to you.</p>

        <ol className="method-steps">
          {phases.map(({ number, title, copy, art }, i) => (
            <li className="method-step" key={title}>
              <article className="method-card">
                <div className="method-card-top">
                  <div>
                    <span className="method-number">{number}</span>
                    <h3>{title}</h3>
                    <span className="method-underline" aria-hidden="true" />
                  </div>
                  <span className="method-art" aria-hidden="true">
                    <svg viewBox="0 0 100 100" fill="none">{art}</svg>
                  </span>
                </div>
                <p>{copy}</p>
              </article>
              {i < phases.length - 1 && (
                <span className="method-link" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="method-closing">
          <span className="method-closing-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3l1.9 5.4L19 10.3l-5.1 1.9L12 17.6l-1.9-5.4L5 10.3l5.1-1.9z" />
            </svg>
          </span>
          <p>
            Progress can look like more range, less restriction, better control, stronger
            movement, or simply feeling like <em>yourself</em> again.
          </p>
        </div>
      </div>
    </section>
  )
}
