'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/application/lib/utils';
import { Icon } from '@/presentation/__components';

// ─── Types ──────────────────────────────────────────────────────────

interface SearchResult {
  source: string;
  title: string;
  url: string;
  description: string | null;
  metadata: Record<string, unknown>;
}

interface SearchResponse {
  query: string;
  sources: string[];
  results: SearchResult[];
  errors: Array<{ source: string; error: string }>;
}

// ─── Source Config ──────────────────────────────────────────────────

interface SourceDef {
  id: string;
  label: string;
  shortLabel: string;
  color: string;
  iconEl: React.ReactNode;
}

const SOURCE_DEFS: SourceDef[] = [
  { id: 'hn', label: 'Hacker News', shortLabel: 'HN', color: 'text-orange-600', iconEl: <span className="font-bold text-xs">HN</span> },
  { id: 'reddit', label: 'Reddit', shortLabel: 'Reddit', color: 'text-orange-500', iconEl: <span className="font-bold text-xs">RD</span> },
  { id: 'github', label: 'GitHub', shortLabel: 'GitHub', color: 'text-gray-700', iconEl: <span className="font-bold text-xs">GH</span> },
  { id: 'stackoverflow', label: 'Stack Overflow', shortLabel: 'SO', color: 'text-orange-500', iconEl: <span className="font-bold text-xs">SO</span> },
  { id: 'npm', label: 'NPM', shortLabel: 'NPM', color: 'text-red-600', iconEl: <span className="font-bold text-xs">npm</span> },
  { id: 'devto', label: 'Dev.to', shortLabel: 'Dev.to', color: 'text-gray-800', iconEl: <span className="font-bold text-xs">DEV</span> },
  { id: 'medium', label: 'Medium', shortLabel: 'Medium', color: 'text-gray-600', iconEl: <span className="font-bold text-xs">Md</span> },
  { id: 'ddg', label: 'DuckDuckGo', shortLabel: 'DDG', color: 'text-orange-600', iconEl: <span className="font-bold text-xs">DDG</span> },
];

const SOURCE_MAP = new Map(SOURCE_DEFS.map((s) => [s.id, s]));

// ─── Helpers ────────────────────────────────────────────────────────

function formatMeta(result: SearchResult): string {
  const m = result.metadata;
  switch (result.source) {
    case 'hn':
      return [
        m.points ? `${m.points} points` : null,
        m.author ? `by ${m.author}` : null,
        m.comments ? `${m.comments} comments` : null,
      ].filter(Boolean).join(' · ');
    case 'github':
      return [
        m.stars ? `${m.stars} ★` : null,
        m.language ? m.language as string : null,
        m.topics && Array.isArray(m.topics) && m.topics.length > 0
          ? `topics: ${(m.topics as string[]).slice(0, 3).join(', ')}`
          : null,
      ].filter(Boolean).join(' · ');
    case 'stackoverflow':
      return [
        m.score ? `${m.score} votes` : null,
        m.answerCount ? `${m.answerCount} answers` : null,
        m.isAnswered ? '✓ answered' : null,
      ].filter(Boolean).join(' · ');
    case 'npm':
      return [
        m.version ? `v${m.version}` : null,
        m.score ? `score: ${(m.score as number).toFixed(2)}` : null,
      ].filter(Boolean).join(' · ');
    case 'devto':
      return [
        m.publishedAt ? new Date(m.publishedAt as string).toLocaleDateString() : null,
        m.positiveReactions ? `${m.positiveReactions} ❤` : null,
        m.readingTime ? `${m.readingTime} min read` : null,
        m.comments ? `${m.comments} comments` : null,
      ].filter(Boolean).join(' · ');
    case 'reddit':
      return [
        m.subreddit ? `r/${m.subreddit}` : null,
        m.points ? `${m.points} points` : null,
        m.author ? `by ${m.author}` : null,
        m.comments ? `${m.comments} comments` : null,
      ].filter(Boolean).join(' · ');
    case 'medium':
      return [
        m.author ? `by ${m.author}` : null,
        m.publishedAt ? new Date(m.publishedAt as string).toLocaleDateString() : null,
        m.tags && Array.isArray(m.tags) && m.tags.length > 0
          ? `tags: ${(m.tags as string[]).slice(0, 3).join(', ')}`
          : null,
      ].filter(Boolean).join(' · ');
    case 'ddg':
      return [
        m.source ? `via ${m.source}` : null,
      ].filter(Boolean).join(' · ');
    default:
      return '';
  }
}

// ─── Result Card ────────────────────────────────────────────────────

function ResultCard({ result }: { result: SearchResult }) {
  const def = SOURCE_MAP.get(result.source);
  const metadata = formatMeta(result);

  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex flex-col gap-1.5 border-2 px-5 py-4 bg-white',
        'transition-all duration-150',
        'border-black/20 hover:bg-accent hover:text-white hover:border-accent',
        'group cursor-pointer',
      )}
    >
      {/* Top row: source badge + metadata */}
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
        <span className={cn(
          'inline-flex items-center gap-1 rounded-sm px-2 py-0.5',
          'bg-black text-white group-hover:bg-white group-hover:text-accent',
          'transition-colors duration-150',
        )}>
          {def?.iconEl}
          <span>{def?.shortLabel ?? result.source}</span>
        </span>
        {metadata && (
          <span className="text-fg-muted group-hover:text-white/60 transition-colors">
            {metadata}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold leading-snug">{result.title}</h3>

      {/* Description */}
      {result.description && (
        <p className="text-xs leading-relaxed text-fg-secondary group-hover:text-white/80 transition-colors line-clamp-2">
          {result.description}
        </p>
      )}
    </a>
  );
}

// ─── Skeleton Card ──────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 border-2 px-5 py-4 bg-white border-black/10 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-4 w-16 bg-black/10 rounded-sm" />
        <div className="h-4 w-32 bg-black/10 rounded-sm" />
      </div>
      <div className="h-4 w-3/4 bg-black/10 rounded-sm" />
      <div className="h-3 w-full bg-black/10 rounded-sm" />
    </div>
  );
}

// ─── Search Error ───────────────────────────────────────────────────

function SearchError({ source, message }: { source: string; message: string }) {
  return (
    <div className="flex items-center gap-2 border-2 px-5 py-3 border-red-200 bg-red-50 text-red-700 text-xs">
      <Icon name="alert-circle" size={14} className="shrink-0" />
      <span className="font-semibold shrink-0">{source}:</span>
      <span className="text-red-600">{message}</span>
    </div>
  );
}

// ─── Main Client Component ──────────────────────────────────────────

export function SearchPageClient() {
  const [query, setQuery] = useState('');
  const [activeSource, setActiveSource] = useState<string | null>(null); // null = All
  const [results, setResults] = useState<SearchResult[]>([]);
  const [errors, setErrors] = useState<Array<{ source: string; error: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setErrors([]);
      setHasSearched(false);
      return;
    }

    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setHasSearched(true);
    setErrors([]);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=10`, {
        signal: controller.signal,
      });
      if (!res.ok) {
        const text = await res.text();
        setErrors([{ source: 'API', error: `${res.status}: ${text}` }]);
        setResults([]);
        return;
      }
      const data: SearchResponse = await res.json();
      setResults(data.results || []);
      setErrors(data.errors || []);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setErrors([{ source: 'Network', error: 'Failed to connect. Check your internet connection.' }]);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce: 300ms after typing stops
  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  // Cleanup abort on unmount
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Filter results by active source
  const filteredResults = activeSource
    ? results.filter((r) => r.source === activeSource)
    : results;

  // Group by source when "All" is selected
  const grouped = new Map<string, SearchResult[]>();
  if (!activeSource) {
    for (const r of filteredResults) {
      const group = grouped.get(r.source) || [];
      group.push(r);
      grouped.set(r.source, group);
    }
  }

  const sourcesInResults = new Set(results.map((r) => r.source));
  const sourceCounts = new Map<string, number>();
  for (const r of results) {
    sourceCounts.set(r.source, (sourceCounts.get(r.source) || 0) + 1);
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none">
            <Icon name="search" size={20} strokeWidth={2} />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search engineering content across Hacker News, GitHub, Stack Overflow, NPM, Dev.to & more..."
            className={cn(
              'w-full bg-white text-[15px] py-3.5 pl-12 pr-12',
              'border-2 border-black/20',
              'focus:outline-none focus:border-accent focus:ring-0',
              'placeholder:text-fg-muted text-fg',
              'transition-colors duration-150',
            )}
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors"
              aria-label="Clear search"
            >
              <Icon name="x" size={18} />
            </button>
          )}
        </div>
        {!hasSearched && !loading && (
          <p className="text-xs text-fg-muted text-center mt-3">
            Search across{' '}
            {SOURCE_DEFS.map((s, i) => (
              <span key={s.id}>
                {i > 0 && i < SOURCE_DEFS.length - 1 ? ', ' : ''}
                {i === SOURCE_DEFS.length - 1 ? ' and ' : ''}
                <span className="font-semibold text-fg-secondary">{s.label}</span>
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Source Tabs — shown when there's a search query or results */}
      {(hasSearched || loading) && (
        <div className="flex flex-wrap gap-1.5 justify-center">
          <button
            type="button"
            onClick={() => setActiveSource(null)}
            className={cn(
              'px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-150',
              activeSource === null
                ? 'bg-accent text-white border-2 border-accent'
                : 'border-2 border-black/20 text-fg-muted hover:border-accent hover:text-accent bg-white',
            )}
          >
            All{sourceCounts.size > 0 ? ` (${results.length})` : ''}
          </button>
          {SOURCE_DEFS.map((def) => (
            <button
              key={def.id}
              type="button"
              onClick={() => setActiveSource(def.id)}
              disabled={!sourceCounts.has(def.id)}
              className={cn(
                'px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-150',
                activeSource === def.id
                  ? 'bg-accent text-white border-2 border-accent'
                  : 'border-2 border-black/20 text-fg-muted hover:border-accent hover:text-accent bg-white',
                !sourceCounts.has(def.id) && 'opacity-30 cursor-not-allowed',
              )}
            >
              {def.shortLabel}{sourceCounts.has(def.id) ? ` (${sourceCounts.get(def.id)})` : ''}
            </button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-4 max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && errors.length > 0 && (
        <div className="space-y-2 max-w-3xl mx-auto">
          {errors.map((err, i) => (
            <SearchError key={i} source={err.source} message={err.error} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && hasSearched && filteredResults.length === 0 && errors.length === 0 && (
        <div className="text-center py-16">
          <Icon name="search" size={32} className="mx-auto mb-4 text-fg-muted" />
          <p className="text-sm font-semibold text-fg mb-1">No results found</p>
          <p className="text-xs text-fg-muted">
            Try a different search term or broaden your query.
          </p>
        </div>
      )}

      {/* Results — Grouped by source when "All" */}
      {!loading && filteredResults.length > 0 && (
        <div className="max-w-3xl mx-auto space-y-8">
          {activeSource ? (
            /* Single source: flat list */
            <div className="space-y-1">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-fg-muted px-1 pb-2">
                {SOURCE_MAP.get(activeSource)?.label ?? activeSource}
              </h3>
              <div className="space-y-1">
                {filteredResults.map((r, i) => (
                  <ResultCard key={`${r.source}-${r.url}-${i}`} result={r} />
                ))}
              </div>
            </div>
          ) : (
            /* All sources: grouped by source */
            Array.from(grouped.entries()).map(([sourceId, items]) => {
              const def = SOURCE_MAP.get(sourceId);
              return (
                <div key={sourceId} className="space-y-1">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-fg-muted px-1 pb-2">
                    {def?.label ?? sourceId}
                  </h3>
                  <div className="space-y-1">
                    {items.map((r, i) => (
                      <ResultCard key={`${r.source}-${r.url}-${i}`} result={r} />
                    ))}
                  </div>
                </div>
              );
            })
          )}

          {/* Footer note */}
          <p className="text-center text-[10px] text-fg-muted pt-4 pb-8">
            Results from{' '}
            {SOURCE_DEFS.map((s, i) => (
              <span key={s.id}>
                {i > 0 && i < SOURCE_DEFS.length - 1 ? ', ' : ''}
                {i === SOURCE_DEFS.length - 1 ? ' and ' : ''}
                <span className="font-medium text-fg-secondary">{s.label}</span>
              </span>
            ))}
            . Click any result to open it in a new tab.
          </p>
        </div>
      )}

      {/* Initial State Hint */}
      {!hasSearched && !loading && (
        <div className="text-center py-12">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-xl mx-auto mb-8">
            {SOURCE_DEFS.map((def) => (
              <div
                key={def.id}
                className="border-2 border-black/20 px-3 py-4 text-center bg-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-150 cursor-pointer"
                onClick={() => {
                  setQuery(def.label.toLowerCase().split(' ')[0]);
                  inputRef.current?.focus();
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest">
                  {def.shortLabel}
                </div>
                <div className="text-[10px] text-fg-muted mt-1">
                  {def.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-fg-muted max-w-md mx-auto leading-relaxed">
            Type a query above to search across multiple engineering sources simultaneously.
            Results are fetched in real-time from each platform's public API.
          </p>
        </div>
      )}
    </div>
  );
}
