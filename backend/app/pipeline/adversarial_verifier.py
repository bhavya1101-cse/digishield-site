"""
Adversarial verifier — a second AI pass whose only job is to try to DISPROVE
a proposed match before it's accepted. A match's confidence only survives
(or upgrades to "confirmed") if it holds up against this challenge.

Requires ANTHROPIC_API_KEY. If it's not set, this degrades gracefully:
matches are returned unverified with a clear note, rather than silently
pretending verification happened.
"""
from __future__ import annotations
from app.config import settings
from app.models.schemas import Candidate, Match

_SYSTEM_PROMPT = """You are an adversarial fact-checker. You are given a \
candidate person and a proposed matching public profile with its supporting \
signals. Your ONLY job is to look for reasons this match might be WRONG \
(e.g. common name, thin evidence, plausible different person). Respond with \
strict JSON: {"holds_up": true|false, "reason": "<one sentence>"}."""


def verify(candidate: Candidate, match: Match) -> Match:
    if not settings.ANTHROPIC_API_KEY:
        match.verified = False
        match.verifier_note = "Not verified — ANTHROPIC_API_KEY not set."
        return match

    try:
        import anthropic  # imported lazily so the app runs without the SDK installed

        client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        user_content = (
            f"Candidate: name_hint={candidate.name_hint!r}, "
            f"org_hint={candidate.org_hint!r}, city_hint={candidate.city_hint!r}\n"
            f"Proposed match: platform={match.profile.platform}, "
            f"display_name={match.profile.display_name!r}, "
            f"signals={match.signals}, confidence={match.confidence}"
        )
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=200,
            system=_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_content}],
        )
        text = "".join(
            block.text for block in response.content if getattr(block, "type", "") == "text"
        )

        import json

        result = json.loads(text)
        holds_up = bool(result.get("holds_up"))
        reason = str(result.get("reason", ""))

        match.verified = True
        match.verifier_note = reason
        if holds_up and match.status == "likely":
            match.status = "confirmed"
        elif not holds_up:
            match.status = "uncertain"
            match.confidence = round(match.confidence * 0.5, 3)

    except Exception as exc:  # noqa: BLE001 — deliberately broad: never break the pipeline
        match.verified = False
        match.verifier_note = f"Verification call failed, treating as unverified: {exc}"

    return match