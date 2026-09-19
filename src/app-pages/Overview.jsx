import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { identify } from "../lib/api.js";

export default function Overview() {
  const [imageBase64, setImageBase64] = useState("");
  const [context, setContext] = useState("");
  const [nameHint, setNameHint] = useState("");
  const [consented, setConsented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageBase64(String(reader.result).split(",")[1] || "");
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const investigation = await identify({
        image_base64: imageBase64,
        context,
        name_hint: nameHint,
        consented,
        source_note: "submitted via Overview page",
      });
      navigate(`/investigation/${investigation.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-white">Run an investigation</h1>
      <p className="mt-1 text-sm text-muted">Organizer-consented photo only. No private-account access, no leaked data.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-white">Consented photo</label>
          <input type="file" accept="image/*" onChange={handleFile} className="mt-2 block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-background" />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Name hint (optional)</label>
          <input value={nameHint} onChange={(e) => setNameHint(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-surface p-2.5 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none" placeholder="e.g. Jane Doe" />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Context (optional)</label>
          <textarea value={context} onChange={(e) => setContext(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-surface p-2.5 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none" placeholder="e.g. Speaker at a regional tech conference" />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" checked={consented} onChange={(e) => setConsented(e.target.checked)} />
          This is an organizer-provided, consented photo.
        </label>

        {error && <p className="text-sm text-severity-high">{error}</p>}

        <button type="submit" disabled={loading || !imageBase64 || !consented} className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02] hover:bg-accent-dim disabled:opacity-30 disabled:hover:scale-100">
          {loading ? "Running pipeline..." : "Run investigation"}
        </button>
      </form>
    </div>
  );
}