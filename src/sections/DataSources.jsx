const SOURCES = [
  { name: "GitHub Public API", detail: "Public repositories and profile metadata only" },
  { name: "Public web search", detail: "Indexed public pages — no login-walled platforms" },
  { name: "Organizer-consented input", detail: "The only photo this runs on for this demo" },
];

const PRINCIPLES = [
  "No private-account access, ever",
  "No leaked or breached data sources",
  "No credential-based methods or access-control bypass",
  "Low or conflicting confidence is always shown as uncertain, never resolved silently",
  "Every run is audit-logged through the consent gate",
];

export default function DataSources() {
  return (
    <section className="bg-background px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          Built on public data. Bound by consent.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
              Data sources
            </h3>
            <ul className="mt-4 space-y-4">
              {SOURCES.map((s) => (
                <li key={s.name} className="border-l-2 border-accent/30 pl-4">
                  <p className="font-medium text-white">{s.name}</p>
                  <p className="text-sm text-muted">{s.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
              Responsible by design
            </h3>
            <ul className="mt-4 space-y-3">
              {PRINCIPLES.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}