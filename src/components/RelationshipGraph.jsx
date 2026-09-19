export default function RelationshipGraph({ graph }) {
  if (!graph || graph.nodes.length <= 1) {
    return <p className="text-sm text-muted">Not enough resolved entities for a graph yet.</p>;
  }

  const size = 320;
  const center = size / 2;
  const radius = size / 2 - 40;
  const [person, ...rest] = graph.nodes;

  const positioned = rest.map((node, i) => {
    const angle = (2 * Math.PI * i) / rest.length;
    return { ...node, x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  });

  return (
    <svg width={size} height={size} className="mx-auto">
      {positioned.map((node) => (
        <line key={node.id} x1={center} y1={center} x2={node.x} y2={node.y} stroke="#1c2129" />
      ))}
      <circle cx={center} cy={center} r={22} fill="#38bdf8" />
      <text x={center} y={center + 4} textAnchor="middle" fontSize="10" fill="#05070a">
        {person.label.slice(0, 10)}
      </text>
      {positioned.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r={14} fill="#0d1117" stroke="#38bdf8" strokeWidth="1.5" />
          <text x={node.x} y={node.y + 24} textAnchor="middle" fontSize="9" fill="#8b949e">
            {node.label.slice(0, 12)}
          </text>
        </g>
      ))}
    </svg>
  );
}