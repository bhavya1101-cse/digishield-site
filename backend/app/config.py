"""
Central config, loaded from environment variables.
Copy .env.example to .env and fill in real values before running.
"""
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    ANTHROPIC_API_KEY: str | None = os.getenv("ANTHROPIC_API_KEY")
    SEARCH_API_KEY: str | None = os.getenv("SEARCH_API_KEY")
    GITHUB_TOKEN: str | None = os.getenv("GITHUB_TOKEN")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./digishield.db")

    USE_PLACEHOLDER_FACE_EMBEDDING: bool = os.getenv(
        "USE_PLACEHOLDER_FACE_EMBEDDING", "true"
    ).lower() == "true"


settings = Settings()