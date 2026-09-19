"""Common interface every collector implements."""
from __future__ import annotations
from abc import ABC, abstractmethod
from app.models.schemas import Candidate, ProfileCandidate


class BaseCollector(ABC):
    platform: str = "unknown"

    @abstractmethod
    def collect(self, candidate: Candidate) -> list[ProfileCandidate]:
        """Return candidate public profiles for this platform. Public,
        non-authenticated sources only — no login-walled scraping."""
        raise NotImplementedError