// What a build actually contains is the reasoning, not the exercise list. Each
// row pairs something the client said at intake with the choice it produced.

type Decision = {
  step: string
  signal: string
  choice: string
  dose?: string
  why: string
}

// PLACEHOLDERS — the four examples that were here were written by an AI, not by the
// coach, so they were removed. The You said / So the plan says / Because structure is
// kept because it is correct; only the content has to come from the coach.
// Do not fill these in with plausible-sounding programming — they must be her reasoning.
const decisions: Decision[] = [
  {
    step: '01',
    signal: '[[TODO_BUILD_EXAMPLE_1_CLIENT_QUOTE]]',
    choice: '[[TODO_BUILD_EXAMPLE_1_PRESCRIPTION]]',
    why: '[[TODO_BUILD_EXAMPLE_1_REASONING]]',
  },
  {
    step: '02',
    signal: '[[TODO_BUILD_EXAMPLE_2_CLIENT_QUOTE]]',
    choice: '[[TODO_BUILD_EXAMPLE_2_PRESCRIPTION]]',
    why: '[[TODO_BUILD_EXAMPLE_2_REASONING]]',
  },
  {
    step: '03',
    signal: '[[TODO_BUILD_EXAMPLE_3_CLIENT_QUOTE]]',
    choice: '[[TODO_BUILD_EXAMPLE_3_PRESCRIPTION]]',
    why: '[[TODO_BUILD_EXAMPLE_3_REASONING]]',
  },
  {
    step: '04',
    signal: '[[TODO_BUILD_EXAMPLE_4_CLIENT_QUOTE]]',
    choice: '[[TODO_BUILD_EXAMPLE_4_PRESCRIPTION]]',
    why: '[[TODO_BUILD_EXAMPLE_4_REASONING]]',
  },
]

const rules = [
  ['Progression', 'Reps before load. When the top of the range feels easy two sessions running, the load moves.'],
  ['Re-test', 'Week four repeats week one, so the change is measured instead of guessed.'],
  ['Revision', '[[TODO_REVISION_POLICY]]'],
]

export default function PlanExcerpt() {
  return (
    <section className="excerpt-section section-narrow" id="inside-a-build">
      <div className="excerpt-head">
        <p className="excerpt-eyebrow">Inside a build</p>
        <h2>Every line has a <em>reason</em>.</h2>
        <p className="excerpt-lede">
          The exercises are the easy part. What you are paying for is the thinking that put
          them there — and it starts from what you tell me at intake.
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
