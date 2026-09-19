export default function DisambiguationPrompt({ candidates = [], onSelect }) {
  if (candidates.length < 2) return null;

  return (
    <div className="rounded-xl border border-severity-medium/40 bg-severity-medium/5 p-5">
      <p className="text-sm font-medium text-severity-medium">Multiple plausible matches</p>
      <p className="mt-1 text-sm text-muted">Confidence is too close to call automatically. Which of these is correct?</p>
      <div className="mt-3 space-y-2">
        {candidates.map((c) => (
          <button key={c.profile.id} onClick={() => onSelect?.(c)} className="block w-full rounded-lg border border-border bg-surface p-2.5 text-left text-sm text-white hover:border-accent/40">
            {c.profile.display_name || c.profile.url} — {Math.round(c.confidence * 100)}% confidence
          </button>
        ))}
      </div>
    </div>
  );
}