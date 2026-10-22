'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareButtons({ title, url, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return 'https://gamergrid.io';
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleTwitterShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(getUrl())}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleRedditShare = () => {
    const shareUrl = `https://www.reddit.com/submit?title=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(getUrl())}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" /> Share:
      </span>
      <button
        onClick={handleCopy}
        aria-label="Copy link to clipboard"
        className="p-1.5 rounded-lg border border-brand-border bg-brand-surface hover:bg-brand-surfaceHover text-brand-muted hover:text-white transition-colors relative group"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
        <span className="sr-only">Copy link</span>
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-emerald-500 text-[10px] text-white font-mono shadow-md animate-fade-in">
            Copied!
          </span>
        )}
      </button>

      <button
        onClick={handleTwitterShare}
        aria-label="Share on X / Twitter"
        className="p-1.5 rounded-lg border border-brand-border bg-brand-surface hover:bg-brand-surfaceHover text-brand-muted hover:text-white transition-colors flex items-center justify-center"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      <button
        onClick={handleRedditShare}
        aria-label="Share on Reddit"
        className="px-2 py-1 rounded-lg border border-brand-border bg-brand-surface hover:bg-brand-surfaceHover text-brand-muted hover:text-orange-400 text-xs font-mono font-bold transition-colors"
      >
        r/
      </button>
    </div>
  );
}
