"""
Iris / synthetic-face heuristic check.

IMPORTANT — read this before demoing it: this is a heuristic PROTOTYPE signal,
not a forensic-grade deepfake detector. It looks for two things real photos
usually have and many AI-generated faces get physically inconsistent:

1. Roughly symmetric iris sizes between the two eyes.
2. A specular highlight (catchlight) in each iris that sits at a CONSISTENT
   position relative to the iris center — because in a real photo, both eyes
   are lit by the same light source(s).

This never returns a hard "AI-generated" / "real" verdict — only a confidence
score and a status. When eyes can't be reliably detected (occlusion, extreme
angle, low resolution), it returns "insufficient_data" rather than guessing,
matching the same uncertainty-first pattern as the rest of the pipeline. It
uses OpenCV's bundled Haar cascades only — no model downloads, so it works
fully offline.
"""
from __future__ import annotations
import cv2
import numpy as np
from dataclasses import dataclass, field

_FACE_CASCADE = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)
_EYE_CASCADE = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_eye.xml"
)


@dataclass
class IrisCheckResult:
    status: str  # "likely_authentic" | "review_recommended" | "insufficient_data"
    confidence: float  # confidence the input is an authentic photo, 0-1
    reason: str
    signals: dict = field(default_factory=dict)


def _find_iris_and_highlight(eye_gray: np.ndarray) -> tuple[float, tuple[float, float]] | None:
    """Within a cropped eye region, find the iris radius and the position of
    its brightest point (the catchlight), normalized to iris-relative coords.
    Returns None if no plausible iris is found."""
    h, w = eye_gray.shape
    if h < 10 or w < 10:
        return None

    blurred = cv2.GaussianBlur(eye_gray, (5, 5), 0)
    circles = cv2.HoughCircles(
        blurred, cv2.HOUGH_GRADIENT, dp=1, minDist=w,
        param1=50, param2=15, minRadius=int(w * 0.15), maxRadius=int(w * 0.45),
    )
    if circles is None:
        return None

    cx, cy, r = circles[0][0]
    r = float(r)
    x0, y0 = int(max(cx - r, 0)), int(max(cy - r, 0))
    x1, y1 = int(min(cx + r, w)), int(min(cy + r, h))
    iris_crop = blurred[y0:y1, x0:x1]
    if iris_crop.size == 0:
        return None

    _, _, _, max_loc = cv2.minMaxLoc(iris_crop)
    highlight_x = (max_loc[0] - iris_crop.shape[1] / 2) / max(r, 1)
    highlight_y = (max_loc[1] - iris_crop.shape[0] / 2) / max(r, 1)
    return r, (highlight_x, highlight_y)


def check_iris_authenticity(image_bytes: bytes) -> IrisCheckResult:
    arr = np.frombuffer(image_bytes, dtype=np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        return IrisCheckResult("insufficient_data", 0.0, "Could not decode image.")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = _FACE_CASCADE.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(80, 80))
    if len(faces) == 0:
        return IrisCheckResult("insufficient_data", 0.0, "No face detected — cannot run iris check.")

    fx, fy, fw, fh = max(faces, key=lambda f: f[2] * f[3])
    face_gray = gray[fy:fy + fh, fx:fx + fw]

    eyes = _EYE_CASCADE.detectMultiScale(face_gray, scaleFactor=1.1, minNeighbors=8, minSize=(20, 20))
    if len(eyes) < 2:
        return IrisCheckResult(
            "insufficient_data", 0.0,
            f"Only {len(eyes)} eye(s) detected — need both for a symmetry check.",
        )

    # take the two largest eye detections, left-to-right
    eyes = sorted(eyes, key=lambda e: e[2] * e[3], reverse=True)[:2]
    eyes = sorted(eyes, key=lambda e: e[0])

    results = []
    for (ex, ey, ew, eh) in eyes:
        eye_crop = face_gray[ey:ey + eh, ex:ex + ew]
        found = _find_iris_and_highlight(eye_crop)
        results.append(found)

    if any(r is None for r in results):
        return IrisCheckResult(
            "insufficient_data", 0.0,
            "Could not isolate iris/highlight in one or both eyes.",
        )

    (r_left, hl_left), (r_right, hl_right) = results

    # signal 1: iris size symmetry (real eyes are close in size)
    size_ratio = min(r_left, r_right) / max(r_left, r_right)

    # signal 2: catchlight position consistency (same light source -> similar
    # relative position in both eyes)
    hl_distance = float(np.hypot(hl_left[0] - hl_right[0], hl_left[1] - hl_right[1]))
    highlight_consistency = max(0.0, 1.0 - hl_distance)

    confidence = round(0.4 * size_ratio + 0.6 * highlight_consistency, 3)
    status = "likely_authentic" if confidence >= 0.6 else "review_recommended"
    reason = (
        "Iris size and catchlight position are consistent between both eyes."
        if status == "likely_authentic"
        else "Iris size or catchlight position is inconsistent between eyes — "
             "possible synthetic image. Recommend human review before proceeding."
    )

    return IrisCheckResult(
        status=status,
        confidence=confidence,
        reason=reason,
        signals={
            "iris_size_ratio": round(size_ratio, 3),
            "highlight_consistency": round(highlight_consistency, 3),
        },
    )