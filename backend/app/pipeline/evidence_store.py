"""
Evidence store — persists claims with their source, and investigations as a
whole. Uses a plain SQLite table via the stdlib sqlite3 module.
"""
from __future__ import annotations
import json
import sqlite3
from pathlib import Path
from app.models.schemas import Investigation

_DB_PATH = Path(__file__).resolve().parents[2] / "digishield.db"


def _connect() -> sqlite3.Connection:
    conn = sqlite3.connect(_DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS investigations (
            id TEXT PRIMARY KEY,
            payload TEXT NOT NULL
        )
        """
    )
    return conn


def save(investigation: Investigation) -> None:
    with _connect() as conn:
        conn.execute(
            "INSERT OR REPLACE INTO investigations (id, payload) VALUES (?, ?)",
            (investigation.id, investigation.model_dump_json()),
        )


def load(investigation_id: str) -> Investigation | None:
    with _connect() as conn:
        row = conn.execute(
            "SELECT payload FROM investigations WHERE id = ?", (investigation_id,)
        ).fetchone()
    if not row:
        return None
    return Investigation.model_validate_json(row[0])