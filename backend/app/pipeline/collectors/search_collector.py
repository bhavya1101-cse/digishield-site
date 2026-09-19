"""
Generic web-search collector for platforms without a friendly public API.

TODO (team): wire in a real search API and set SEARCH_API_KEY in .env. Until
then returns an empty list rather than fabricating results.
"""
from __future__ import annotations
from app.config import settings
from app.models.schemas import Candidate, ProfileCandidate
from app.pipeline.collectors.base_collector import BaseCollector


class SearchCollector(BaseCollector):
    platform = "web_search"

    def collect(self, candidate: Candidate) -> list[ProfileCandidate]:
        if not settings.SEARCH_API_KEY:
            return []
        return []