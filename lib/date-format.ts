/**
 * Utility functions for formatting dates and times across the site.
 * Using UTC timeZone ensures deterministic output across SSR and client hydration.
 */

export function formatArticleDate(
  dateStr: string | null | undefined,
  includeTime = true
): string {
  if (!dateStr) return '';

  // If already in short month format like "Oct 22, 2026" without time
  if (/^[A-Za-z]{3}\s+\d{1,2},\s+\d{4}$/.test(dateStr.trim())) {
    return dateStr.trim();
  }

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return dateStr;
  }

  const hasTime = dateStr.includes('T') || (dateStr.includes(':') && !dateStr.includes('T00:00:00'));

  if (hasTime && includeTime) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'UTC',
    }).format(date);
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

