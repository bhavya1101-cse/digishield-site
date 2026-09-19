import ConfidenceMeter from "./ConfidenceMeter.jsx";

const STATUS_LABEL = {
  confirmed: "Confirmed",
  likely: "Likely",
  uncertain: "Uncertain",
  conflicting: "Conflicting",
  insufficient: "Insufficient evidence",
};

export default function EvidencePanel({ claims = [] }) {
  if (claims.length === 0) {
    return <p className="text-sm text-muted">No structured claims yet.</p>;
  }

  return (
    <div className="space-y-3">
      {claims.map((claim) => (
        <div key={claim.id} className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted">{claim.type}</span>
            <span className="text-xs font-medium text-muted">{STATUS_LABEL[claim.status]}</span>
          </div>
          <p className="mt-1 text-sm text-white">{claim.value}</p>
          <a href={claim.source_url} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-muted underline">
            {claim.source_url}
          </a>
          <div className="mt-3">
            <ConfidenceMeter confidence={claim.confidence} />
          </div>
        </div>
      ))}
    </div>
  );
}