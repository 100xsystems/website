'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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

// ─── Custom Hook for Live Search with Infinite Scroll ───────────────

export function useLiveSearch(sourceId: string, defaultQuery: string, options?: {
  limit?: number;
  categories?: { id: string; label: string }[];
}) {
  const { limit = 50, categories } = options || {};
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<LiveSearchResult[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Determine effective search query based on category
  const effectiveSearchQuery = selectedCategory
    ? `${defaultQuery} ${selectedCategory}`
    : query || defaultQuery;

  const fetchItems = useCallback(async (searchQ: string, page: number, append: boolean) => {
    const url = `/api/search?q=${encodeURIComponent(searchQ)}&limit=${limit}&page=${page}&sources=${sourceId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API: ${res.status}`);
    const data = await res.json() as { results: LiveSearchResult[] };
    const newItems = data.results || [];
    if (newItems.length < limit) hasMoreRef.current = false;
    else hasMoreRef.current = true;
    return newItems;
  }, [sourceId, limit]);

  // Auto-load on mount
  useEffect(() => {
    let mounted = true;
    setInitialLoading(true);
    setError(null);
    pageRef.current = 1;
    hasMoreRef.current = true;
    fetchItems(effectiveSearchQuery, 1, false)
      .then((newItems) => { if (mounted) setItems(newItems); })
      .catch((err) => { if (mounted) setError(err instanceof Error ? err.message : String(err)); })
      .finally(() => { if (mounted) setInitialLoading(false); });
    return () => { mounted = false; };
  }, [sourceId, defaultQuery, selectedCategory]);

  // User search with debounce
  useEffect(() => {
    if (query.trim().length < 2) return;
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      setError(null);
      pageRef.current = 1;
      hasMoreRef.current = true;
      try {
        const newItems = await fetchItems(query.trim(), 1, false);
        setItems(newItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setSearchLoading(false);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [query, sourceId]);

  // Load more (pagination)
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMoreRef.current) return;
    setLoadingMore(true);
    const nextPage = pageRef.current + 1;
    try {
      const searchQ = query.trim() || defaultQuery;
      const newItems = await fetchItems(searchQ, nextPage, true);
      setItems((prev) => [...prev, ...newItems]);
      pageRef.current = nextPage;
    } catch (err) {
      // Silently fail for load more
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, query, defaultQuery, fetchItems]);

  // Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreRef.current && !loadingMore && !searchLoading) {
          loadMore();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore, loadingMore, searchLoading, items.length]);

  return {
    query, setQuery, items, initialLoading, searchLoading, loadingMore,
    error, isLoading: initialLoading || searchLoading,
    selectedCategory, setSelectedCategory, categories,
    sentinelRef, hasMore: hasMoreRef.current, loadMore,
  };
}

// ─── Shared page shell ─────────────────────────────────────────────

export interface PageShellProps {
  title: string;
  subtitle: string;
  brandColor: string;
  brandLabel: string;
  description: string;
  textColor?: string;
  children: React.ReactNode;
}

export function DiscoverPageShell({
  title, subtitle, brandColor, brandLabel, description, textColor, children,
}: PageShellProps) {
  const subtitleColor = textColor || `text-orange-600`;
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-widest text-white ${brandColor}`}>
              {brandLabel}
            </span>
            <span className="text-xs text-fg-muted/60 font-mono">Live API</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            {title}{' '}
            <span className={subtitleColor}>{subtitle}</span>
          </h1>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">{description}</p>
        </div>
      </section>
      {children}
    </main>
  );
}
