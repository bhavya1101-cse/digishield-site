"""
Consent gate — the single authorization checkpoint for the whole pipeline.

Nothing downstream runs unless the caller explicitly asserts that the photo
is organizer-provided and consented for this demonstration. Every check is
appended to an in-memory audit log (swap for real persistent storage before
any non-demo use).
"""
from __future__ import annotations
from datetime import datetime, timezone

_AUDIT_LOG: list[dict] = []


class ConsentError(Exception):
    pass


def check_consent(consented: bool, source_note: str = "") -> None:
    """Raise ConsentError unless the caller explicitly asserts consent."""
    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "consented": consented,
        "source_note": source_note,
    }
    _AUDIT_LOG.append(entry)
    if not consented:
        raise ConsentError(
            "No consent asserted for this image. DigiShield only processes "
            "organizer-provided, consented photos — refusing to proceed."
        )


def get_audit_log() -> list[dict]:
    return list(_AUDIT_LOG)