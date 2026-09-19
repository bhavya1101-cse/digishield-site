const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${detail}`);
  }
  return res.json();
}

export function identify(payload) {
  return request("/identify", { method: "POST", body: JSON.stringify(payload) });
}

export function getProfile(investigationId) {
  return request(`/profile/${investigationId}`);
}

export function getTimeline(investigationId) {
  return request(`/timeline/${investigationId}`);
}

export function getGraph(investigationId) {
  return request(`/graph/${investigationId}`);
}