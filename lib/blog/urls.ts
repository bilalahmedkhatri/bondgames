import { mediaOrigins } from './config';

export function safeLink(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length > 2048 || /[\s\u0000-\u001f\u007f\\]/u.test(value)) return;
  if ((value.startsWith('/') && !value.startsWith('//')) || value.startsWith('#')) return value;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password) return url.href;
  } catch { /* Invalid links are omitted. */ }
}

export function mediaUrl(value: unknown): string | undefined {
  const safe = safeLink(value);
  if (!safe?.startsWith('https://')) return;
  return mediaOrigins().includes(new URL(safe).origin) ? safe : undefined;
}

export function youtubeUrl(value: unknown): string | undefined {
  const safe = safeLink(value);
  if (!safe?.startsWith('https://')) return;
  const url = new URL(safe);
  if (url.port && url.port !== '443') return;
  let id = '';
  if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
  if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) {
    if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
    else if (url.pathname.startsWith('/embed/')) id = url.pathname.slice(7);
  }
  if (/^[A-Za-z0-9_-]{11}$/.test(id)) return `https://www.youtube.com/embed/${id}`;
}
