"""GET /timeline/{id} and /graph/{id} — the two output views."""
from __future__ import annotations
from fastapi import APIRouter, HTTPException
from app.pipeline.evidence_store import load
from app.pipeline.output_builder import build_timeline, build_graph

router = APIRouter()


@router.get("/timeline/{investigation_id}")
def get_timeline(investigation_id: str):
    investigation = load(investigation_id)
    if investigation is None:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return build_timeline(investigation)


@router.get("/graph/{investigation_id}")
def get_graph(investigation_id: str):
    investigation = load(investigation_id)
    if investigation is None:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return build_graph(investigation)