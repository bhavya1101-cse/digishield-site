"""
Face embedding stage.

TODO (team): wire in a real face-embedding library (e.g. `face_recognition`
or `insightface`) here. Both need extra system dependencies (dlib / onnxruntime)
that are deliberately NOT pinned in requirements.txt yet, so the rest of the
pipeline stays runnable without them during early development.

Until that's decided, this module returns a deterministic placeholder
"embedding" (just a hash of the image bytes) so candidate_generator and
everything downstream has something to work with. This placeholder carries
NO real similarity information — replace before relying on match quality.
"""
from __future__ import annotations
import hashlib
from app.config import settings


def embed_face(image_bytes: bytes) -> str:
    """Return an opaque embedding id. Never persist the raw embedding."""
    if settings.USE_PLACEHOLDER_FACE_EMBEDDING:
        return hashlib.sha256(image_bytes).hexdigest()[:16]

    raise NotImplementedError(
        "USE_PLACEHOLDER_FACE_EMBEDDING is False but no real embedding "
        "backend has been wired in yet. Implement one here."
    )