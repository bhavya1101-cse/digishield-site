const ROWS = [
  ["Finds public profiles", "Yes", "Yes"],
  ["Combines multiple identity signals", "Varies", "Always — name, org, context fused into one confidence score"],
  ["Explains why a match was made", "Rarely", "Every finding ships a visible reason, not just a score"],
  ["Detects conflicting information", "Rarely", "Explicit — flagged, not silently merged"],
  ["Distinguishes real conflict from career progression", "No", "Checks claim dates before flagging a contradiction"],
  ["Challenges its own matches before accepting them", "No", "A second AI pass tries to disprove every match"],
  ["Reports 'uncertain' instead of guessing", "Rarely", "A first-class outcome, not a failure state"],
];

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface text-left text-muted">
            <th className="px-5 py-4 font-medium">Capability</th>
            <th className="px-5 py-4 font-medium">Traditional OSINT tools<br /><span className="text-xs text-muted/70">(Maltego, SpiderFoot, Sherlock)</span></th>
            <th className="px-5 py-4 font-medium text-accent">DigiShield</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([capability, them, us], i) => (
            <tr key={i} className="border-b border-border last:border-0">
              <td className="px-5 py-4 text-white">{capability}</td>
              <td className="px-5 py-4 text-muted">{them}</td>
              <td className="px-5 py-4 text-white">{us}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}