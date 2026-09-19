import ConfidenceMeter from "./ConfidenceMeter.jsx";

export default function ProfileCard({ match }) {
  const { profile, confidence, status, verified, verifier_note } = match;
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">{profile.platform}</p>
          <a href={profile.url} target="_blank" rel="noreferrer" className="font-medium text-white underline decoration-border hover:decoration-accent">
            {profile.display_name || profile.url}
          </a>
        </div>
        <span className="rounded-full border border-border px-2 py-1 text-xs text-muted">{status}</span>
      </div>
      <div className="mt-4">
        <ConfidenceMeter confidence={confidence} />
      </div>
      <p className="mt-3 text-xs text-muted">
        {verified ? "Adversarially verified" : "Not yet verified"}
        {verifier_note ? ` — ${verifier_note}` : ""}
      </p>
    </div>
  );
}