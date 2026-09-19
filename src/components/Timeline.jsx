export default function Timeline({ entries = [] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-muted">No timeline entries yet.</p>;
  }

  return (
    <ol className="relative border-l border-border pl-4">
      {entries.map((entry, i) => (
        <li key={i} className="mb-4">
          <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-accent" />
          <p className="text-xs text-muted">{entry.date || "Undated"}</p>
          <p className="text-sm text-white">
            <span className="font-medium">{entry.type}:</span> {entry.value}
          </p>
        </li>
      ))}
    </ol>
  );
}