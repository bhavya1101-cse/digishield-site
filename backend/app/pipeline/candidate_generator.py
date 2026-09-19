"""
Turns the embedding + free-text context into an initial Candidate.

Deliberately simple: this is not the interesting part of the system (the
entity resolver is). It does light, deterministic parsing of the supplied
context string so there's something to seed the collectors with.
"""
from __future__ import annotations
from app.models.schemas import Candidate


def generate_candidate(embedding_id: str, name_hint: str | None, context: str | None) -> Candidate:
    org_hint = None
    city_hint = None

    if context:
        # naive heuristic: look for "at <org>" / "in <city>" patterns
        lower = context.lower()
        if " at " in lower:
            org_hint = context.split(" at ", 1)[1].split(",")[0].strip()
        if " in " in lower:
            city_hint = context.split(" in ", 1)[1].split(",")[0].strip()

    return Candidate(
        name_hint=name_hint,
        org_hint=org_hint,
        city_hint=city_hint,
        context=context,
        embedding_id=embedding_id,
    )