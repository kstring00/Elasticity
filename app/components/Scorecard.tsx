// TODO: replace with Abrielle's real numbers before launch
export const SCORECARD_ROWS: ReadonlyArray<readonly [string, string, string]> = [
  ['Bench press', '135', '155'],
  ['Leg press', '270', '320'],
  ['Lat pulldown', '100', '120'],
  ['T-bar row', '70', '90'],
  ['Romanian deadlift', '135', '165'],
  ['DB shoulder press', '25', '35'],
  ['Energy level', '5', '8'],
]

export default function Scorecard() {
  return (
    <div className="scorecard">
      <p className="scorecard-title">Progress scorecard</p>
      <table>
        <caption className="sr-only">Week 1 to week 4 progress scorecard preview</caption>
        <thead>
          <tr>
            <th scope="col">Movement</th>
            <th scope="col">Week 1</th>
            <th scope="col">Week 4</th>
          </tr>
        </thead>
        <tbody>
          {SCORECARD_ROWS.map(([movement, week1, week4]) => (
            <tr key={movement}>
              <td>{movement}</td>
              <td className="week1">{week1}</td>
              <td className="week4">
                {week4}
                <span className="rise" aria-hidden="true">↑</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="scorecard-foot">Track the starting point. Revisit it. See what changed.</p>
    </div>
  )
}
