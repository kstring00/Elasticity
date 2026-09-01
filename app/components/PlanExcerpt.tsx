// What a build actually contains is the reasoning, not the exercise list. Each
// row pairs something the client said at intake with the choice it produced.

type Decision = {
  step: string
  signal: string
  choice: string
  dose?: string
  why: string
}

// TODO: Abrielle to replace with a real anonymized case before launch.
const decisions: Decision[] = [
  {
    step: '01',
    signal: 'My hips feel locked by the end of a work day.',
    choice: '90/90 hip switch',
    dose: '3 × 6 per side, slow',
    why: 'Before anything gets loaded, the hip has to rotate. This teaches the range and shows us what is actually available today, which is where the rest of the week gets set.',
  },
  {
    step: '02',
    signal: 'Squats pinch at the bottom.',
    choice: 'Heel-elevated goblet squat',
    dose: '3 × 8–10 · 90 sec',
    why: 'The ankle is the limiter here, not the knee. Elevating the heel borrows range you do not have yet, so depth stays trainable while the ankle catches up.',
  },
  {
    step: '03',
    signal: 'I have 40 minutes, three days a week.',
    choice: 'Two supersets and one finisher',
    why: 'The session is built for the time that actually exists. A plan that needs 75 minutes is the plan you abandon in week three.',
  },
  {
    step: '04',
    signal: 'I want to feel stronger overhead.',
    choice: 'Half-kneeling landmine press',
    dose: '3 × 8',
    why: 'Pressing straight overhead is earned, not assumed. This loads a position your shoulder can own right now, and we revisit the overhead question at the re-test.',
  },
]

const rules = [
  ['Progression', 'Reps before load. When the top of the range feels easy two sessions running, the load moves.'],
  ['Re-test', 'Week four repeats week one, so the change is measured instead of guessed.'],
  ['Revision', 'If the build misses what you submitted, one revision inside seven days.'],
]

export default function PlanExcerpt() {
  return (
    <section className="excerpt-section section-narrow" id="inside-a-build">
      <div className="excerpt-head">
        <p className="excerpt-eyebrow">Inside a build</p>
        <h2>Every line has a <em>reason</em>.</h2>
        <p className="excerpt-lede">
          The exercises are the easy part. What you are paying for is the thinking that put
          them there — and it starts from what you tell Abrielle at intake.
        </p>
      </div>

      <ol className="excerpt-rows">
        {decisions.map(({ step, signal, choice, dose, why }) => (
          <li className="excerpt-row" key={step}>
            <span className="excerpt-step" aria-hidden="true">{step}</span>

            <div className="excerpt-signal">
              <span className="excerpt-label">You said</span>
              <p>&ldquo;{signal}&rdquo;</p>
            </div>

            <div className="excerpt-choice">
              <span className="excerpt-label">So the plan says</span>
              <p className="excerpt-move">{choice}</p>
              {dose && <p className="excerpt-dose">{dose}</p>}
            </div>

            <div className="excerpt-why">
              <span className="excerpt-label">Because</span>
              <p>{why}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="excerpt-rules glass glass--panel">
        {rules.map(([label, copy]) => (
          <div className="excerpt-rule" key={label}>
            <p className="excerpt-rule-label">{label}</p>
            <p className="excerpt-rule-copy">{copy}</p>
          </div>
        ))}
      </div>

      <p className="excerpt-disclosure">
        An example excerpt, not a real client. Your build starts from your own intake.
      </p>

      <div className="excerpt-note">
        <span aria-hidden="true">^</span>
        <p>Mobility and stretching can be the whole focus of your plan. Training is not automatically the headline.</p>
      </div>
    </section>
  )
}
