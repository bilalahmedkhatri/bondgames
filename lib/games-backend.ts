import "server-only";

const baseUrl = process.env.BONDSGAME_GATEWAY_API_URL?.replace(/\/$/, "");
const apiKey = process.env.BONDSGAME_GATEWAY_API_KEY;

export function gamesBackendConfigured() { return Boolean(baseUrl && apiKey); }

export async function gamesBackend<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!baseUrl || !apiKey) throw new Error("BondsGame backend API is not configured.");
  const response = await fetch(`${baseUrl}/api/v1/games${path}`, {
    ...init, cache: "no-store",
    headers: { "X-API-Key": apiKey, ...(init.body ? { "Content-Type": "application/json" } : {}), ...init.headers },
  });
  if (!response.ok) throw new Error(`BondsGame backend request failed (${response.status}).`);
  return response.json() as Promise<T>;
}
