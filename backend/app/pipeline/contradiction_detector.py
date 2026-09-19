"""
Contradiction detector — flags disagreeing claims instead of silently
merging or dropping one side.
"""
from __future__ import annotations
from app.models.schemas import Claim, Contradiction
from app.utils.text_similarity import ratio


def detect(claims: list[Claim]) -> list[Contradiction]:
    contradictions: list[Contradiction] = []
    by_type: dict[str, list[Claim]] = {}
    for c in claims:
        by_type.setdefault(c.type, []).append(c)

    for claim_type, group in by_type.items():
        for i in range(len(group)):
            for j in range(i + 1, len(group)):
                a, b = group[i], group[j]
                if ratio(a.value, b.value) < 0.5:  # materially different values
                    contradictions.append(
                        Contradiction(
                            claim_type=claim_type,
                            description=(
                                f'Conflicting "{claim_type}" claims: '
                                f'"{a.value}" vs "{b.value}"'
                            ),
                            conflicting_values=[a.value, b.value],
                            source_urls=[a.source_url, b.source_url],
                        )
                    )
                    a.status = "conflicting"
                    b.status = "conflicting"
    return contradictions