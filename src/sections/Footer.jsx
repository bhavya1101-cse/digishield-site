export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-16 sm:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <span className="text-lg font-bold text-white">Digi<span className="text-accent">Shield</span></span>

        <a href="/app" className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-transform hover:scale-105 hover:bg-accent-dim">Run an investigation</a>

        <div className="max-w-md text-xs leading-relaxed text-muted">
          <p>Runs only on organizer-provided, consented input. Public sources only, no private-account access, no leaked data, no credential-based methods.</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted">
          <span>Sources: GitHub Public API, Public web search</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>NeuraX Hackathon 3.0, Team VANAVASAM</span>
        </div>
      </div>
    </footer>
  );
}