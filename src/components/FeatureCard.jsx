export default function FeatureCard({ number, title, description }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
      <span className="text-sm font-mono text-accent">{number}</span>
      <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}