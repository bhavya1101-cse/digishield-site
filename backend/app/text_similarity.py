"""Small, dependency-free text-similarity helpers used by confidence fusion."""
from __future__ import annotations
from difflib import SequenceMatcher


def ratio(a: str | None, b: str | None) -> float:
    """Case-insensitive similarity ratio in [0, 1]. Missing values -> 0."""
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, a.strip().lower(), b.strip().lower()).ratio()


def token_overlap(a: str | None, b: str | None) -> float:
    """Jaccard overlap of whitespace-tokenized words in [0, 1]."""
    if not a or not b:
        return 0.0
    ta = set(a.lower().split())
    tb = set(b.lower().split())
    if not ta or not tb:
        return 0.0
    return len(ta & tb) / len(ta | tb)