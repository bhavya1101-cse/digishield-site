import FeatureCard from "../components/FeatureCard.jsx";

const FEATURES = [
  {
    number: "01",
    title: "Identity Match",
    description:
      "Scores candidate profiles against the consented photo using multiple fused signals, not a single black-box number.",
  },
  {
    number: "02",
    title: "Profile Discovery",
    description:
      "Finds public accounts across platforms via search and public APIs — no login-walled scraping.",
  },
  {
    number: "03",
    title: "Cross-Source Correlation",
    description:
      "Links matched profiles together using real cross-references, not just name proximity.",
  },
  {
    number: "04",
    title: "Evidence Timeline & Graph",
    description:
      "Every finding shown chronologically and relationally, each traceable back to its source.",
  },
  {
    number: "05",
    title: "Contradiction Flags",
    description:
      "Disagreeing sources are surfaced explicitly — never silently merged or dropped.",
  },
  {
    number: "06",
    title: "Adversarial Verification",
    description:
      "A second AI pass challenges every match before it's accepted, so 'uncertain' is a real answer.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-background px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          What it actually does
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.number} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}