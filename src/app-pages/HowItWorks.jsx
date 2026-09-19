const STAGES = [
  ["Consent gate", "Only an organizer-provided, consented photo proceeds. Every run is audit-logged."],
  ["Iris / synthetic-face check", "A heuristic pass flags likely AI-generated input before anything else runs."],
  ["Face embedding", "Produces a similarity representation, held in memory only — never persisted."],
  ["Candidate generation", "Combines the embedding with supplied context into an initial candidate identity."],
  ["Collectors", "Query public, non-authenticated sources only — search and public platform APIs."],
  ["Entity resolver", "Scores each profile against the candidate using multiple fused signals, not one opaque number."],
  ["Contradiction detector", "Flags disagreeing claims across sources instead of silently merging them."],
  ["Adversarial verifier", "A second AI pass tries to disprove each proposed match before it's accepted."],
  ["Evidence store", "Every claim is stored with its source and confidence."],
  ["Output builder", "Assembles the timeline, relationship graph, and evidence chain."],
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-white">How DigiShield works</h1>
      <ol className="mt-8 space-y-5">
        {STAGES.map(([title, description], i) => (
          <li key={title} className="flex gap-4">
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-accent/40 bg-surface text-xs font-semibold text-accent">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-white">{title}</p>
              <p className="text-sm text-muted">{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}