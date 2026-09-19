from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import routes_identity, routes_profile, routes_output

app = FastAPI(
    title="DigiShield API",
    description="Digital identity resolution & evidence engine — NeuraX 3.0",
    version="0.1.0",
)

# Wide open for local hackathon development. Tighten before any real deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_identity.router, tags=["identify"])
app.include_router(routes_profile.router, tags=["profile"])
app.include_router(routes_output.router, tags=["output"])


@app.get("/health")
def health():
    return {"status": "ok"}