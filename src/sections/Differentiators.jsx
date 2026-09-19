import ComparisonTable from "../components/ComparisonTable.jsx";

const HIGHLIGHTS = [
  {
    title: "Temporal-aware reasoning",
    description:
      "Student in 2022, intern in 2023, engineer in 2024 isn't a contradiction — it's a career. DigiShield checks dates before it flags a conflict.",
  },
  {
    title: "Built for the hard cases",
    description:
      "Tested against common-name collisions and username reuse across different people — not just the easy, unambiguous match.",
  },
  {
    title: "Adversarial verification",
    description:
      "Every proposed match is challenged by a second AI pass whose only job is to try to disprove it, before it's ever accepted.",
  },
];

export default function Differentiators() {
  return (
    <section className="bg-background px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          Why not just another search tool
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted">
          Most OSINT tools stop at "search and list." The hard part is knowing
          whether two fragments of evidence describe the same person.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-base font-semibold text-white">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <ComparisonTable />
        </div>
      </div>
    </section>
  );
}