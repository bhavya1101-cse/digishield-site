"""
Confidence fusion — combines several independent weak signals into one
explainable confidence score, instead of a single opaque number.
"""
from __future__ import annotations

WEIGHTS = {
    "name_similarity": 0.35,
    "org_overlap": 0.25,
    "city_overlap": 0.15,
    "bio_link_overlap": 0.25,
}


def fuse(signals: dict[str, float]) -> float:
    """signals: e.g. {"name_similarity": 0.9, "org_overlap": 1.0, ...}.
    Each value should already be normalized to [0, 1]. Missing keys count as 0."""
    score = sum(WEIGHTS[k] * signals.get(k, 0.0) for k in WEIGHTS)
    return round(min(max(score, 0.0), 1.0), 3)


def status_for_confidence(confidence: float) -> str:
    """Initial status from confidence alone — entity_resolver may still hold
    ambiguous cases open rather than force one of these."""
    if confidence >= 0.80:
        return "likely"
    if confidence >= 0.45:
        return "uncertain"
    return "insufficient"