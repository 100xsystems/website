'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Fuse from 'fuse.js';
import { cn } from '@/application/lib/utils';
import type { FeedCache, RegistryFeedData, Article } from '@/feed/feed.types';

// ══════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════

interface YcCompany {
  id: number;
  name: string;
  slug: string;
  website: string;
  one_liner: string;
  batch: string;
  tags: string[];
  top_company: boolean;
  isHiring: boolean;
  team_size: number;
  stage: string;
}

interface PhProduct {
  id: string;
  name: string;
  tagline: string;
  url: string;
  slug: string;
  votesCount: number;
  commentsCount: number;
}

interface LiveSearchResult {
  source: string;
  title: string;
  url: string;
  description: string | null;
  metadata: Record<string, unknown>;
}

interface LiveSearchResponse {
  query: string;
  results: LiveSearchResult[];
  errors: Array<{ source: string; error: string }>;
}

// ══════════════════════════════════════════════════════════════════════
// SEARCHABLE LOCAL DATA TYPES
// ══════════════════════════════════════════════════════════════════════

interface LocalSearchItem {
  type: 'feed' | 'yc' | 'ph';
  title: string;
  url: string;
  description: string | null;
  metadata: Record<string, unknown>;
}

// ══════════════════════════════════════════════════════════════════════
// LOCAL SEARCH SETUP (Fuse.js)
// ══════════════════════════════════════════════════════════════════════

function createFuseIndex(items: LocalSearchItem[]): Fuse<LocalSearchItem> {
  return new Fuse(items, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1 },
      { name: 'metadata.tags', weight: 1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  });
}

// ══════════════════════════════════════════════════════════════════════
// SOURCE DEFINITIONS
// ══════════════════════════════════════════════════════════════════════

interface SourceSection {
  id: string;
  label: string;
  type: 'local' | 'live';
  icon: string;
}

const LOCAL_SECTIONS: SourceSection[] = [
  { id: 'feed', label: 'Engineering Blogs', type: 'local', icon: '📡' },
  { id: 'yc', label: 'YC Companies', type: 'local', icon: '🟠' },
  { id: 'ph', label: 'Product Hunt', type: 'local', icon: '🔺' },
];

const LIVE_SECTIONS: SourceSection[] = [
  { id: 'hn', label: 'Hacker News', type: 'live', icon: 'Y' },
  { id: 'reddit', label: 'Reddit', type: 'live', icon: 'R' },
  { id: 'github', label: 'GitHub', type: 'live', icon: 'GH' },
  { id: 'stackoverflow', label: 'Stack Overflow', type: 'live', icon: 'SO' },
  { id: 'npm', label: 'NPM', type: 'live', icon: 'npm' },
  { id: 'devto', label: 'Dev.to', type: 'live', icon: 'DEV' },
  { id: 'medium', label: 'Medium', type: 'live', icon: 'Md' },
  { id: 'ddg', label: 'DuckDuckGo', type: 'live', icon: 'DDG' },
];

const ALL_SECTIONS = [...LOCAL_SECTIONS, ...LIVE_SECTIONS];
const SECTION_MAP = new Map(ALL_SECTIONS.map((s) => [s.id, s]));

// ══════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════

function formatMeta(item: { type?: string; metadata?: Record<string, unknown>; source?: string }): string {
  const m = item.metadata ?? {};
  switch (item.type || item.source) {
    case 'yc':
      return [m.batch, m.stage, m.team_size ? `${m.team_size} people` : null].filter(Boolean).join(' · ');
    case 'ph':
      return [m.votesCount ? `${m.votesCount} votes` : null, m.commentsCount ? `${m.commentsCount} comments` : null].filter(Boolean).join(' · ');
    case 'feed':
      return [m.feedName, m.publishedAt ? new Date(m.publishedAt as string).toLocaleDateString() : null, m.author ? `by ${m.author}` : null].filter(Boolean).join(' · ');
    case 'hn':
      return [m.points ? `${m.points} pts` : null, m.author ? `by ${m.author}` : null, m.comments ? `${m.comments} comments` : null].filter(Boolean).join(' · ');
    case 'github':
      return [m.stars ? `${m.stars} ★` : null, m.language as string, m.forks ? `${m.forks} forks` : null].filter(Boolean).join(' · ');
    case 'stackoverflow':
      return [m.score ? `${m.score} votes` : null, m.answerCount ? `${m.answerCount} answers` : null].filter(Boolean).join(' · ');
    case 'npm':
      return [m.version ? `v${m.version}` : null].filter(Boolean).join(' · ');
    case 'devto':
      return [m.positiveReactions ? `${m.positiveReactions} ❤` : null, m.readingTime ? `${m.readingTime} min read` : null].filter(Boolean).join(' · ');
    case 'reddit':
      return [m.subreddit ? `r/${m.subreddit}` : null, m.points ? `${m.points} pts` : null].filter(Boolean).join(' · ');
    case 'medium':
      return [m.author ? `by ${m.author}` : null].filter(Boolean).join(' · ');
    case 'ddg':
      return [m.source ? `via ${m.source}` : null].filter(Boolean).join(' · ');
    default:
      return '';
  }
}

// ══════════════════════════════════════════════════════════════════════
// RESULT CARD
// ══════════════════════════════════════════════════════════════════════

function ResultCard({ item, sectionId, type }: {
  item: { title: string; url: string; description?: string | null; metadata?: Record<string, unknown> };
  sectionId: string;
  type: string;
}) {
  const def = SECTION_MAP.get(sectionId);
  const meta = formatMeta({ type, metadata: item.metadata });

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex flex-col gap-1.5 border-2 px-4 py-3 bg-white',
        'transition-all duration-150',
        'border-black/20 hover:bg-accent hover:text-white hover:border-accent',
        'group cursor-pointer',
      )}
    >
      {/* Top row: source badge + metadata */}
      {meta && (
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
          <span className={cn(
            'inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5',
            'bg-black text-white group-hover:bg-white group-hover:text-accent',
            'transition-colors duration-150 text-[9px]',
          )}>
            {def?.icon}
          </span>
          <span className="text-fg-muted group-hover:text-white/60 transition-colors">
            {meta}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xs font-bold leading-snug line-clamp-2">{item.title}</h3>

      {/* Description */}
      {item.description && (
        <p className="text-[11px] leading-relaxed text-fg-secondary group-hover:text-white/80 transition-colors line-clamp-2">
          {item.description}
        </p>
      )}
    </a>
  );
}

// ══════════════════════════════════════════════════════════════════════
// SECTION RENDERER
// ══════════════════════════════════════════════════════════════════════

function ResultSection({ section, items, empty }: {
  section: SourceSection;
  items: Array<{ title: string; url: string; description?: string | null; metadata?: Record<string, unknown> }>;
  empty?: boolean;
}) {
  if (empty || items.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
          {section.icon} {section.label}
        </h3>
        <span className="text-[9px] text-fg-muted/50 font-mono">{items.length}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.slice(0, 9).map((item, i) => (
          <ResultCard
            key={`${section.id}-${i}`}
            item={item}
            sectionId={section.id}
            type={section.type}
          />
        ))}
      </div>
      {items.length > 9 && (
        <p className="text-[9px] text-fg-muted/50 text-center">
          +{items.length - 9} more results
        </p>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// SKELETON
// ══════════════════════════════════════════════════════════════════════

function SearchSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((n) => (
        <div key={n} className="space-y-3">
          <div className="h-3 w-32 bg-black/10 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3].map((m) => (
              <div key={m} className="border-2 px-4 py-3 border-black/10 animate-pulse space-y-2">
                <div className="h-3 w-16 bg-black/10" />
                <div className="h-3 w-full bg-black/10" />
                <div className="h-3 w-2/3 bg-black/10" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════

export function HomeUnifiedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Record<string, LocalSearchItem[]>>({});
  const [liveResults, setLiveResults] = useState<Record<string, LiveSearchResult[]>>({});
  const [liveErrors, setLiveErrors] = useState<Array<{ source: string; error: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const fuseRef = useRef<Fuse<LocalSearchItem> | null>(null);

  // ── Load local data on mount ──────────────────────────────────────

  useEffect(() => {
    let mounted = true;

    async function loadLocalData() {
      const feedItems: LocalSearchItem[] = [];
      const ycItems: LocalSearchItem[] = [];
      const phItems: LocalSearchItem[] = [];

      try {
        // Load feed cache
        const feedRes = await fetch('/feed-cache.json');
        if (feedRes.ok) {
          const cache: FeedCache = await feedRes.json();
          for (const [feedId, feedData] of Object.entries(cache.feeds)) {
            for (const item of (feedData as RegistryFeedData).items.slice(0, 50)) {
              feedItems.push({
                type: 'feed',
                title: item.title,
                url: item.link,
                description: item.summary,
                metadata: {
                  feedId,
                  feedName: (feedData as RegistryFeedData).feedName,
                  author: item.author,
                  publishedAt: item.publishedAt,
                },
              });
            }
          }
        }
      } catch {}

      try {
        // Load YC companies
        const ycRes = await fetch('/yc-cache/companies.json');
        if (ycRes.ok) {
          const companies: YcCompany[] = await ycRes.json();
          for (const company of companies.slice(0, 1000)) {
            ycItems.push({
              type: 'yc',
              title: company.name,
              url: company.website || `https://www.ycombinator.com/companies/${company.slug}`,
              description: company.one_liner || null,
              metadata: {
                batch: company.batch,
                stage: company.stage,
                team_size: company.team_size,
                tags: company.tags,
                top_company: company.top_company,
                hiring: company.isHiring,
              },
            });
          }
        }
      } catch {}

      try {
        // Load PH products
        const phRes = await fetch('/ph-cache/products.json');
        if (phRes.ok) {
          const data = await phRes.json() as { products: PhProduct[] };
          for (const product of (data.products || []).slice(0, 500)) {
            phItems.push({
              type: 'ph',
              title: product.name,
              url: product.url,
              description: product.tagline || null,
              metadata: {
                votesCount: product.votesCount,
                commentsCount: product.commentsCount,
              },
            });
          }
        }
      } catch {}

      if (!mounted) return;

      setLocalLoading(false);

      // Build Fuse index
      const allItems = [...feedItems, ...ycItems, ...phItems];
      fuseRef.current = createFuseIndex(allItems);
    }

    loadLocalData();
    return () => { mounted = false; };
  }, []);

  // ── Search handler ────────────────────────────────────────────────

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults({});
      setLiveResults({});
      setLiveErrors([]);
      setHasSearched(false);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setHasSearched(true);
    setLiveErrors([]);

    // 1. Local search via Fuse.js
    const localQuery = q.toLowerCase();
    const localHits: Record<string, LocalSearchItem[]> = { feed: [], yc: [], ph: [] };

    if (fuseRef.current) {
      const fuseResults = fuseRef.current.search(localQuery);
      for (const { item } of fuseResults) {
        localHits[item.type].push(item);
      }
    }

    setResults(localHits);

    // 2. Live API search (HN, GitHub, SO, etc.)
    try {
      const liveSources = LIVE_SECTIONS.map((s) => s.id).join(',');
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=6&sources=${liveSources}`, {
        signal: controller.signal,
      });

      if (res.ok) {
        const data: LiveSearchResponse = await res.json();
        const grouped: Record<string, LiveSearchResult[]> = {};
        for (const r of (data.results || [])) {
          if (!grouped[r.source]) grouped[r.source] = [];
          grouped[r.source].push(r);
        }
        setLiveResults(grouped);
        setLiveErrors(data.errors || []);
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setLiveErrors([{ source: 'Network', error: 'Failed to connect.' }]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  // Cleanup
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const showResults = hasSearched || loading;

  // ── Render ────────────────────────────────────────────────────────

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-white overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-28">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            100X DISCOVERY
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
            Search across&nbsp;
            <span className="text-accent">everything</span>
          </h1>
          <p className="text-sm text-fg-secondary max-w-xl mx-auto">
            Engineering blogs, YC companies, Product Hunt products, Hacker News, GitHub, Stack Overflow, and more.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search engineering blogs, YC companies, GitHub repos, packages, and more..."
              className={cn(
                'w-full bg-surface-secondary text-base py-4 pl-12 pr-12',
                'border-2 border-transparent focus:border-accent',
                'focus:outline-none focus:ring-0',
                'placeholder:text-fg-muted/60 text-fg',
                'transition-all duration-150',
              )}
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors"
                aria-label="Clear search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
          {/* Source hints */}
          {!hasSearched && !query && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
              {ALL_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setQuery(s.label.split(' ')[0].toLowerCase());
                    inputRef.current?.focus();
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white transition-all duration-150"
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Results Area ── */}
        {showResults && (
          <div className="border-2 border-black/10 bg-white p-6 sm:p-8 max-h-[65vh] overflow-y-auto shadow-lg">
            {loading && localLoading && <SearchSkeleton />}

            {!loading && (
              <div className="space-y-8">
                {/* LOCAL SECTIONS */}
                {LOCAL_SECTIONS.map((section) => {
                  const items = results[section.id] ?? [];
                  const isEmpty = items.length === 0;
                  return (
                    <ResultSection
                      key={section.id}
                      section={section}
                      items={items}
                      empty={liveResults && Object.keys(liveResults).length > 0 ? isEmpty : undefined}
                    />
                  );
                })}

                {/* Divider between local and live */}
                {Object.keys(results).some((k) => (results[k]?.length ?? 0) > 0) &&
                 Object.keys(liveResults).some((k) => (liveResults[k]?.length ?? 0) > 0) && (
                  <div className="border-t border-border pt-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-[9px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Live from the web
                    </div>
                  </div>
                )}

                {/* LIVE SECTIONS */}
                {LIVE_SECTIONS.map((section) => {
                  const items = liveResults[section.id] ?? [];
                  if (items.length === 0) return null;
                  return (
                    <ResultSection
                      key={section.id}
                      section={section}
                      items={items}
                    />
                  );
                })}

                {/* Errors from live sources */}
                {liveErrors.length > 0 && (
                  <div className="text-center">
                    <p className="text-[9px] text-fg-muted/50">
                      {liveErrors.map((e) => `${e.source}: ${e.error}`).join(' · ')}
                    </p>
                  </div>
                )}

                {/* Empty state */}
                {Object.values(results).every((arr) => arr.length === 0) &&
                 Object.values(liveResults).every((arr) => arr.length === 0) &&
                 liveErrors.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm font-semibold text-fg mb-1">No results found</p>
                    <p className="text-xs text-fg-muted">Try a different search term or broaden your query.</p>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            {Object.values(results).some((arr) => arr.length > 0) ||
             Object.values(liveResults).some((arr) => arr.length > 0) ? (
              <p className="text-center text-[9px] text-fg-muted/50 pt-6 border-t border-border mt-6">
                Click any result to open in a new tab. Data from local cache and live APIs.
              </p>
            ) : null}
          </div>
        )}

        {/* Initial state — before search */}
        {!hasSearched && !query && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-6">
            <div className="text-center p-4 border-2 border-black/10 bg-surface-secondary/50">
              <p className="text-[20px] mb-1">📡</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-fg-muted">
                Engineering Blogs
              </p>
              <p className="text-[8px] text-fg-muted/60">Latest articles</p>
            </div>
            <div className="text-center p-4 border-2 border-black/10 bg-surface-secondary/50">
              <p className="text-[20px] mb-1">🟠</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-fg-muted">
                YC Companies
              </p>
              <p className="text-[8px] text-fg-muted/60">6,089 companies</p>
            </div>
            <div className="text-center p-4 border-2 border-black/10 bg-surface-secondary/50">
              <p className="text-[20px] mb-1">🔺</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-fg-muted">
                Product Hunt
              </p>
              <p className="text-[8px] text-fg-muted/60">924 products</p>
            </div>
            <div className="text-center p-4 border-2 border-black/10 bg-surface-secondary/50">
              <p className="text-[20px] mb-1">🌐</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-fg-muted">
                Live APIs
              </p>
              <p className="text-[8px] text-fg-muted/60">8 web sources</p>
            </div>
          </div>
        )}

        {/* Loading local data indicator */}
        {localLoading && !hasSearched && (
          <p className="text-center text-[9px] text-fg-muted/40 mt-4 animate-pulse">
            Loading local data index...
          </p>
        )}
      </div>
    </section>
  );
}
