"""GET /profile/{investigation_id} — fetch a previously run investigation."""
from __future__ import annotations
from fastapi import APIRouter, HTTPException
from app.models.schemas import Investigation
from app.pipeline.evidence_store import load

router = APIRouter()


@router.get("/profile/{investigation_id}", response_model=Investigation)
def get_profile(investigation_id: str) -> Investigation:
    investigation = load(investigation_id)
    if investigation is None:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return investigation