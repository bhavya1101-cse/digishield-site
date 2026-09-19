"""POST /identify — the entry point: photo + context in, a running
investigation out. Runs the full pipeline synchronously (fine for a demo;
swap for a background task if it ever needs to handle real load)."""
from __future__ import annotations
import base64
from fastapi import APIRouter, HTTPException
#from app.pipeline.iris_liveness_check import check_iris_authenticity
from app.models.schemas import Investigation, Claim, IrisCheckResult
from app.pipeline.consent_gate import check_consent, ConsentError
from app.pipeline.face_embedding import embed_face
from app.pipeline.candidate_generator import generate_candidate
from app.pipeline.collectors.github_collector import GithubCollector
from app.pipeline.collectors.search_collector import SearchCollector
from app.pipeline.entity_resolver import resolve
from app.pipeline.contradiction_detector import detect
from app.pipeline.adversarial_verifier import verify
from app.pipeline.evidence_store import save
from pydantic import BaseModel

router = APIRouter()

_COLLECTORS = [GithubCollector(), SearchCollector()]


class IdentifyRequest(BaseModel):
    image_base64: str
    context: str | None = None
    name_hint: str | None = None
    consented: bool = False
    source_note: str = ""


@router.post("/identify", response_model=Investigation)
def identify(payload: IdentifyRequest) -> Investigation:
    try:
        check_consent(payload.consented, payload.source_note)
    except ConsentError as exc:
        raise HTTPException(status_code=403, detail=str(exc)) from exc

    try:
        image_bytes = base64.b64decode(payload.image_base64)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail="image_base64 is not valid base64") from exc

    iris_check = IrisCheckResult(
        status="insufficient_data",
        confidence=0.0,
        reason="Iris check temporarily disabled.",
    )

    embedding_id = embed_face(image_bytes)
    candidate = generate_candidate(embedding_id, payload.name_hint, payload.context)

    discovered = []
    for collector in _COLLECTORS:
        discovered.extend(collector.collect(candidate))

    matches = resolve(candidate, discovered)
    matches = [verify(candidate, m) for m in matches]

    # Claims are a TODO for the AI-extraction lead: turn each confident
    # match's bio/profile text into structured Claim objects here. Left
    # empty rather than fabricated until that extraction step is wired in.
    claims: list[Claim] = []
    contradictions = detect(claims)

    investigation = Investigation(
        candidate=candidate,
        iris_check=iris_check,
        matches=matches,
        claims=claims,
        contradictions=contradictions,
    )
    save(investigation)
    return investigation