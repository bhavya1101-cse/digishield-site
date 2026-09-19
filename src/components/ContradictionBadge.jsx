export default function ContradictionBadge({ contradiction }) {
  return (
    <div className="rounded-xl border border-severity-high/30 bg-severity-high/5 p-4 text-sm">
      <div className="font-medium text-severity-high">Conflicting evidence</div>
      <p className="mt-1 text-muted">{contradiction.description}</p>
      <ul className="mt-2 space-y-1 text-xs text-muted">
        {contradiction.source_urls.map((url) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noreferrer" className="underline">{url}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}