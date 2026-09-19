import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile, getTimeline, getGraph } from "../lib/api.js";
import ProfileCard from "../components/ProfileCard.jsx";
import EvidencePanel from "../components/EvidencePanel.jsx";
import ContradictionBadge from "../components/ContradictionBadge.jsx";
import Timeline from "../components/Timeline.jsx";
import RelationshipGraph from "../components/RelationshipGraph.jsx";
import DisambiguationPrompt from "../components/DisambiguationPrompt.jsx";

export default function InvestigationDetail() {
  const { id } = useParams();
  const [investigation, setInvestigation] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [graph, setGraph] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getProfile(id), getTimeline(id), getGraph(id)])
      .then(([inv, tl, g]) => {
        setInvestigation(inv);
        setTimeline(tl);
        setGraph(g);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="p-6 text-sm text-severity-high">{error}</p>;
  if (!investigation) return <p className="p-6 text-sm text-muted">Loading...</p>;

  const closeCalls = investigation.matches.filter((m) => m.status === "likely" || m.status === "uncertain");

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
      <h1 className="text-xl font-semibold text-white">
        Investigation {investigation.candidate.name_hint || investigation.id}
      </h1>

      {closeCalls.length > 1 && <DisambiguationPrompt candidates={closeCalls} />}

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">Discovered profiles</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {investigation.matches.map((m) => (
            <ProfileCard key={m.profile.id} match={m} />
          ))}
          {investigation.matches.length === 0 && (
            <p className="text-sm text-muted">No public profiles discovered yet.</p>
          )}
        </div>
      </section>

      {investigation.contradictions.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">Contradictions</h2>
          <div className="space-y-3">
            {investigation.contradictions.map((c, i) => (
              <ContradictionBadge key={i} contradiction={c} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">Evidence</h2>
        <EvidencePanel claims={investigation.claims} />
      </section>

      <section className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">Timeline</h2>
          <Timeline entries={timeline} />
        </div>
        <div>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">Relationship graph</h2>
          <RelationshipGraph graph={graph} />
        </div>
      </section>
    </div>
  );
}