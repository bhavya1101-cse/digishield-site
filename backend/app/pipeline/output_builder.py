"""
Output builder — assembles the final structured result: a timeline of
claims and a simple relationship graph (person -> org/event/project nodes).
"""
from __future__ import annotations
from app.models.schemas import Investigation


def build_timeline(investigation: Investigation) -> list[dict]:
    dated = [c for c in investigation.claims if c.date]
    undated = [c for c in investigation.claims if not c.date]
    dated.sort(key=lambda c: c.date)
    return [
        {
            "date": c.date,
            "type": c.type,
            "value": c.value,
            "confidence": c.confidence,
            "status": c.status,
            "source_url": c.source_url,
        }
        for c in (dated + undated)
    ]


def build_graph(investigation: Investigation) -> dict:
    person_node = {
        "id": investigation.candidate.id,
        "label": investigation.candidate.name_hint or "Unresolved identity",
        "kind": "person",
    }
    nodes = [person_node]
    edges = []
    for claim in investigation.claims:
        node_id = f"{claim.type}:{claim.value}"
        nodes.append({"id": node_id, "label": claim.value, "kind": claim.type})
        edges.append(
            {
                "source": person_node["id"],
                "target": node_id,
                "confidence": claim.confidence,
                "status": claim.status,
            }
        )
    return {"nodes": nodes, "edges": edges}