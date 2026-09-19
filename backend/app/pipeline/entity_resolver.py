"""
Entity resolver — the core reasoning component.

Scores every discovered ProfileCandidate against the seed Candidate using
several independent signals, fuses them via confidence_fusion, and decides
whether it plausibly belongs to the same person. Ambiguous cases (multiple
candidates with similar scores) are deliberately kept open rather than
force-resolved — see resolve() below.
"""
from __future__ import annotations
from app.models.schemas import Candidate, ProfileCandidate, Match
from app.pipeline.confidence_fusion import fuse, status_for_confidence
from app.utils.text_similarity import ratio, token_overlap


def score_profile(candidate: Candidate, profile: ProfileCandidate) -> Match:
    signals = {
        "name_similarity": ratio(candidate.name_hint, profile.display_name),
        "org_overlap": token_overlap(candidate.org_hint, profile.bio),
        "city_overlap": token_overlap(candidate.city_hint, profile.bio),
        "bio_link_overlap": 0.0,  # populated once cross-referencing is implemented
    }
    confidence = fuse(signals)
    status = status_for_confidence(confidence)
    return Match(profile=profile, signals=signals, confidence=confidence, status=status)


def resolve(candidate: Candidate, discovered: list[ProfileCandidate]) -> list[Match]:
    """Score every discovered profile. Does NOT pick a single winner — an
    ambiguous case (e.g. a common name) should surface as several open
    candidates, not one silently-chosen match. Downstream (contradiction
    detector, adversarial verifier) further refines these."""
    matches = [score_profile(candidate, p) for p in discovered]
    matches.sort(key=lambda m: m.confidence, reverse=True)
    return matches