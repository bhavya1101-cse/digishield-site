export default function ConfidenceMeter({ confidence = 0 }) {
  const pct = Math.round(confidence * 100);
  const color = confidence >= 0.8 ? "bg-severity-low" : confidence >= 0.45 ? "bg-severity-medium" : "bg-severity-high";

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted mb-1">
        <span>Confidence</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-border overflow-hidden">
        <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}