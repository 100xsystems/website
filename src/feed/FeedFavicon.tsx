'use client';

import React from 'react';

function getDomain(url: string): string | null {
  try { return new URL(url).hostname; } catch { return null; }
}

/**
 * Feed site favicon via Google's favicon service.
 * Client-safe (hides itself on failure) so it works anywhere in the feed UI.
 */
export function FeedFavicon({ url, name, size = 28 }: { url: string; name: string; size?: number }) {
  const domain = getDomain(url);
  if (!domain) return null;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={name}
      width={size}
      height={size}
      className="shrink-0 rounded-lg bg-white/10"
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      loading="lazy"
    />
  );
}
