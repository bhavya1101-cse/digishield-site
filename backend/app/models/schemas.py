"""
Pydantic schemas shared across the pipeline and the API layer.

These are the structured types every stage in app/pipeline/ passes to the
next stage, and what the API routes ultimately return to the frontend.
"""
from __future__ import annotations
from typing import Literal, Optional
from pydantic import BaseModel, Field
import uuid

EvidenceStatus = Literal["confirmed", "likely", "uncertain", "conflicting", "insufficient"]
ClaimType = Literal[
    "affiliation", "role", "event", "project", "publication", "patent", "other"
]


def new_id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:10]}"


class Candidate(BaseModel):
    """Output of consent_gate -> face_embedding -> candidate_generator."""
    id: str = Field(default_factory=lambda: new_id("cand"))
    name_hint: Optional[str] = None
    org_hint: Optional[str] = None
    city_hint: Optional[str] = None
    context: Optional[str] = None
    embedding_id: Optional[str] = None  # opaque reference, embedding itself never persisted


class ProfileCandidate(BaseModel):
    """A single discovered public profile, before it is scored."""
    id: str = Field(default_factory=lambda: new_id("profile"))
    platform: str
    url: str
    display_name: Optional[str] = None
    bio: Optional[str] = None
    raw_signals: dict = Field(default_factory=dict)


class Match(BaseModel):
    """A scored profile candidate — output of the entity resolver."""
    profile: ProfileCandidate
    signals: dict[str, float]
    confidence: float
    status: EvidenceStatus
    verified: bool = False
    verifier_note: Optional[str] = None


class Claim(BaseModel):
    """One structured, evidence-backed fact about the resolved person."""
    id: str = Field(default_factory=lambda: new_id("claim"))
    type: ClaimType
    value: str
    source_url: str
    confidence: float
    status: EvidenceStatus
    date: Optional[str] = None  # ISO date if known, for the timeline


class Contradiction(BaseModel):
    claim_type: ClaimType
    description: str
    conflicting_values: list[str]
    source_urls: list[str]


class IrisCheckResult(BaseModel):
    status: str  # "likely_authentic" | "review_recommended" | "insufficient_data"
    confidence: float
    reason: str


class Investigation(BaseModel):
    """Full result of one identify -> resolve -> verify run."""
    id: str = Field(default_factory=lambda: new_id("inv"))
    candidate: Candidate
    iris_check: Optional[IrisCheckResult] = None
    matches: list[Match] = Field(default_factory=list)
    claims: list[Claim] = Field(default_factory=list)
    contradictions: list[Contradiction] = Field(default_factory=list)