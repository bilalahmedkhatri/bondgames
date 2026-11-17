export function formatGameReleaseDate(date: string | null | undefined, window?: string | null): string {
  if (date) {
    const parsed = new Date(`${date}T00:00:00Z`);
    if (!Number.isNaN(parsed.valueOf())) return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(parsed);
  }
  return window || "Release date TBA";
}

export function formatGameStatus(status: string): string {
  return status === "early_access" ? "Early Access" : status.charAt(0).toUpperCase() + status.slice(1);
}
