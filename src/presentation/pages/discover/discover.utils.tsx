'use client';

import { useState, useEffect } from 'react';

// ─── Types ──────────────────────────────────────────────────────────

export interface LiveSearchResult {
  source: string;
  title: string;
  url: string;
  description: string | null;
  metadata: Record<string, unknown>;
}

// ─── Helpers ────────────────────────────────────────────────────────

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function v(val: unknown, fallback = ''): string {
  if (val == null) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return String(val);
  return String(val);
}

export function n(val: unknown, fallback = 0): number {
  if (typeof val === 'number') return val;
  return fallback;
}

export function getDomain(url: string): string | null {
  try { return new URL(url).hostname; } catch { return null; }
}

export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const d = new Date(dateStr).getTime();
  const diff = now - d;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export function Favicon({ url, className = 'w-5 h-5' }: { url: string; className?: string }) {
  const domain = getDomain(url);
  if (!domain) return null;
  return (
    <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} alt=""
      className={`${className} shrink-0 rounded-sm`}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      loading="lazy" />
  );
}

// ─── Custom Hook for Live Search ───────────────────────────────────

export function useLiveSearch(sourceId: string, defaultQuery: string) {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<LiveSearchResult[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-load default query on mount
  useEffect(() => {
    let mounted = true;
    setInitialLoading(true);
    setError(null);

    fetch(`/api/search?q=${encodeURIComponent(defaultQuery)}&limit=25&sources=${sourceId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API: ${res.status}`);
        return res.json() as Promise<{ results: LiveSearchResult[] }>;
      })
      .then((data) => {
        if (mounted) setItems(data.results || []);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (mounted) setInitialLoading(false);
      });

    return () => { mounted = false; };
  }, [sourceId, defaultQuery]);

  // User search with debounce
  useEffect(() => {
    if (query.trim().length < 2) return;
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}&limit=25&sources=${sourceId}`);
        if (!res.ok) throw new Error(`API: ${res.status}`);
        const data = await res.json() as { results: LiveSearchResult[] };
        setItems(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setSearchLoading(false);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [query, sourceId]);

  return { query, setQuery, items, initialLoading, searchLoading, error, isLoading: initialLoading || searchLoading };
}

// ─── Shared page shell ─────────────────────────────────────────────

interface PageShellProps {
  title: string;
  subtitle: string;
  brandColor: string;
  brandLabel: string;
  defaultQuery: string;
  description: string;
  sourceId: string;
  totalCount?: string;
  children: React.ReactNode;
}

export function DiscoverPageShell({
  title,
  subtitle,
  brandColor,
  brandLabel,
  description,
  sourceId,
  totalCount,
  children,
}: PageShellProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className={`py-16 sm:py-20 bg-white border-b border-border`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-widest text-white ${brandColor}`}>
              {brandLabel}
            </span>
            <span className="text-xs text-fg-muted/60 font-mono">Live API</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            {title}{' '}
            <span className={brandColor.replace('bg-', 'text-')}>{subtitle}</span>
          </h1>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            {description}
          </p>
          {totalCount && (
            <p className="mt-2 text-base text-fg-muted/60">{totalCount}</p>
          )}
        </div>
      </section>

      {children}
    </main>
  );
}
