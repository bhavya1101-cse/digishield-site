"""
GitHub collector — uses GitHub's public REST search API.

Works unauthenticated at a low rate limit; set GITHUB_TOKEN in .env to raise it.
"""
from __future__ import annotations
import requests
from app.config import settings
from app.models.schemas import Candidate, ProfileCandidate
from app.pipeline.collectors.base_collector import BaseCollector

GITHUB_SEARCH_URL = "https://api.github.com/search/users"


class GithubCollector(BaseCollector):
    platform = "github"

    def collect(self, candidate: Candidate) -> list[ProfileCandidate]:
        if not candidate.name_hint:
            return []

        headers = {"Accept": "application/vnd.github+json"}
        if settings.GITHUB_TOKEN:
            headers["Authorization"] = f"Bearer {settings.GITHUB_TOKEN}"

        try:
            resp = requests.get(
                GITHUB_SEARCH_URL,
                params={"q": candidate.name_hint, "per_page": 5},
                headers=headers,
                timeout=10,
            )
            resp.raise_for_status()
        except requests.RequestException:
            return []

        results = []
        for item in resp.json().get("items", []):
            results.append(
                ProfileCandidate(
                    platform=self.platform,
                    url=item.get("html_url", ""),
                    display_name=item.get("login"),
                    bio=None,
                    raw_signals={"score": item.get("score", 0)},
                )
            )
        return results