// Per-card artwork for the services grid. Inline SVG rather than photography:
// the two service photos that shipped in the repo are corrupt (one decodes to
// solid black), and abstract brand-tinted art scales without new assets.

type Props = { name: 'mobility' | 'recovery' | 'nutrition' | 'training' }

export default function ServiceArt({ name }: Props) {
  return (
    <div className="svc-art" aria-hidden="true">
      <svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice" role="presentation">
        {name === 'mobility' && (
          <>
            {/* range of motion: arcs fanning out from a pivot */}
            <circle cx="196" cy="150" r="128" className="art-fill" />
            <g className="art-line" fill="none">
              <path d="M60 262A200 200 0 0 1 260 62" />
              <path d="M100 262A160 160 0 0 1 260 102" />
              <path d="M140 262A120 120 0 0 1 260 142" />
              <path d="M180 262A80 80 0 0 1 260 182" />
            </g>
            <circle cx="260" cy="262" r="7" className="art-solid" />
          </>
        )}

        {name === 'recovery' && (
          <>
            {/* settling layers: motion coming back to rest */}
            <path className="art-fill" d="M0 92c70-44 126 32 196-6s94-52 124-64v46c-32 12-56 30-126 68s-124-38-194 6z" />
            <path className="art-fill" d="M0 178c70-44 126 32 196-6s94-52 124-64v46c-32 12-56 30-126 68s-124-38-194 6z" />
            <path className="art-fill" d="M0 264c70-44 126 32 196-6s94-52 124-64v46c-32 12-56 30-126 68s-124-38-194 6z" />
            <path className="art-line" fill="none" d="M0 136c70-44 126 32 196-6s94-52 124-64" />
            <path className="art-line" fill="none" d="M0 222c70-44 126 32 196-6s94-52 124-64" />
          </>
        )}

        {name === 'nutrition' && (
          <>
            {/* a bowl seen from above, with portions in it */}
            <circle cx="196" cy="170" r="124" className="art-fill" />
            <circle cx="196" cy="170" r="92" className="art-line" fill="none" />
            <path className="art-solid" d="M104 170a92 92 0 0 0 92 92 92 92 0 0 0 92-92z" />
            <g className="art-line" fill="none">
              <path d="M196 170v92" />
              <path d="M150 258a92 92 0 0 0 0-88" />
              <path d="M242 258a92 92 0 0 1 0-88" />
            </g>
            {/* sprig resting on the rim */}
            <g className="art-line" fill="none">
              <path d="M74 68c40 14 62 42 68 84" />
              <path d="M78 92c22 2 36 14 42 32" />
              <path d="M96 66c16 10 26 24 30 42" />
            </g>
          </>
        )}

        {name === 'training' && (
          <>
            {/* a dumbbell, laid over a soft disc */}
            <circle cx="200" cy="158" r="120" className="art-fill" />
            <g transform="rotate(-32 200 158)">
              <rect x="120" y="150" width="160" height="16" rx="8" className="art-solid" />
              <rect x="96" y="126" width="30" height="64" rx="12" className="art-solid" />
              <rect x="274" y="126" width="30" height="64" rx="12" className="art-solid" />
              <rect x="72" y="140" width="22" height="36" rx="10" className="art-solid" />
              <rect x="306" y="140" width="22" height="36" rx="10" className="art-solid" />
            </g>
          </>
        )}
      </svg>
    </div>
  )
}
