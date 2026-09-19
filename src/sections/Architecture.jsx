import FlowStep from "../components/FlowStep.jsx";

const STAGES = [
  "Consent gate",
  "Face embedding",
  "Candidates",
  "Collectors",
  "Entity resolver",
  "Verify & flag",
  "Evidence + output",
];

export default function Architecture() {
  return (
    <section className="bg-background px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          One photo in. A verified footprint out.
        </h2>

        <div className="mt-16 flex flex-wrap items-start justify-center gap-y-8 rounded-2xl border border-border bg-surface p-8 sm:flex-nowrap sm:overflow-x-auto">
          {STAGES.map((label, i) => (
            <FlowStep
              key={label}
              index={i + 1}
              label={label}
              isLast={i === STAGES.length - 1}
            />
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-sm text-muted">
          "Verify &amp; flag" covers both the contradiction detector and the
          adversarial verifier — every match is challenged before it's accepted.
        </p>
      </div>
    </section>
  );
}