'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
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

// ─── Source Defs with Icons ─────────────────────────────────────────

interface SourceDef {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

const SOURCE_DEFS: SourceDef[] = [
  { id: 'hn', label: 'Hacker News', shortLabel: 'HN', icon: <span className="font-black text-[11px]">Y</span> },
  { id: 'reddit', label: 'Reddit', shortLabel: 'Reddit', icon: <span className="font-bold text-xs">R</span> },
  { id: 'github', label: 'GitHub', shortLabel: 'GitHub', icon: <span className="font-bold text-xs">GH</span> },
  { id: 'stackoverflow', label: 'Stack Overflow', shortLabel: 'SO', icon: <span className="font-bold text-xs">S</span> },
  { id: 'npm', label: 'NPM', shortLabel: 'NPM', icon: <span className="font-bold text-xs">npm</span> },
  { id: 'devto', label: 'Dev.to', shortLabel: 'Dev.to', icon: <span className="font-bold text-xs">DEV</span> },
  { id: 'medium', label: 'Medium', shortLabel: 'Medium', icon: <span className="font-bold text-xs">M</span> },
  { id: 'ddg', label: 'DuckDuckGo', shortLabel: 'DDG', icon: <span className="font-bold text-xs">G</span> },
];

const ALL_SOURCE_IDS = SOURCE_DEFS.map((s) => s.id);
const SOURCE_MAP = new Map(SOURCE_DEFS.map((s) => [s.id, s]));

// ─── Helpers ────────────────────────────────────────────────────────

function formatMeta(result: SearchResult): string {
  const m = result.metadata;
  switch (result.source) {
    case 'hn':
      return [m.points ? `${m.points} pts` : null, m.author ? `by ${m.author}` : null].filter(Boolean).join(' · ');
    case 'github':
      return [m.stars ? `${m.stars} ★` : null, m.language ? m.language as string : null].filter(Boolean).join(' · ');
    case 'stackoverflow':
      return [m.score ? `${m.score} votes` : null, m.isAnswered ? '✓' : null].filter(Boolean).join(' · ');
    case 'npm':
      return m.version ? `v${m.version}` : '';
    case 'devto':
      return [m.positiveReactions ? `${m.positiveReactions} ❤` : null, m.readingTime ? `${m.readingTime} min` : null].filter(Boolean).join(' · ');
    case 'reddit':
      return [m.subreddit ? `r/${m.subreddit}` : null, m.points ? `${m.points} pts` : null].filter(Boolean).join(' · ');
    case 'medium':
      return m.author ? `by ${m.author}` : '';
    case 'ddg':
      return m.source ? `via ${m.source}` : '';
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
      className="flex flex-col gap-1 px-0 py-3 border-b border-border last:border-b-0 group cursor-pointer"
    >
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-secondary text-fg-muted group-hover:bg-accent group-hover:text-white transition-colors duration-150">
          {def?.icon}
          <span>{def?.shortLabel ?? result.source}</span>
        </span>
        {metadata && (
          <span className="text-fg-muted/60 group-hover:text-fg-secondary transition-colors">
            {metadata}
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium leading-snug text-fg group-hover:text-accent transition-colors duration-150">
        {result.title}
      </h3>
      {result.description && (
        <p className="text-xs leading-relaxed text-fg-tertiary line-clamp-1">
          {result.description}
        </p>
      )}
    </a>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────────

function SearchSkeleton() {
  return (
    <div className="space-y-1 animate-pulse">
      {[1, 2, 3].map((n) => (
        <div key={n} className="py-3 border-b border-border">
          <div className="h-3 w-16 bg-surface-secondary mb-2" />
          <div className="h-4 w-3/4 bg-surface-secondary mb-1" />
          <div className="h-3 w-1/2 bg-surface-secondary" />
        </div>
      ))}
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────

export function HomeSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [errors, setErrors] = useState<Array<{ source: string; error: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set(ALL_SOURCE_IDS));
  const [showSourcePicker, setShowSourcePicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setErrors([]);
      setHasSearched(false);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setHasSearched(true);
    setErrors([]);

    try {
      const sources = Array.from(selectedSources).join(',');
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=6&sources=${sources}`, {
        signal: controller.signal,
      });
      if (!res.ok) {
        setErrors([{ source: 'API', error: `${res.status}` }]);
        setResults([]);
        return;
      }
      const data: SearchResponse = await res.json();
      setResults(data.results || []);
      setErrors(data.errors || []);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setErrors([{ source: 'Network', error: 'Failed to connect.' }]);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSources]);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  // Cleanup
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Click outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setShowSourcePicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleSource = (id: string) => {
    setSelectedSources((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showResults = (hasSearched || loading) && isFocused;

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-border">
      <div className="max-w-[700px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
            <Icon name="search" size={12} />
            Discover Across the Web
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Search engineering&nbsp;
            <span className="text-accent">knowledge</span>
          </h2>
          <p className="mt-2 text-sm text-fg-secondary">
            One search across Hacker News, GitHub, Stack Overflow, and more.
          </p>
        </div>

        {/* Search bar */}          <div ref={wrapperRef} className="relative">
          <div className={cn(
            'relative flex items-center border-b-2 transition-colors duration-150',
            isFocused ? 'border-accent' : 'border-border',
          )}>
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none">
                <Icon name="search" size={20} />
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="Search across Hacker News, GitHub, Stack Overflow, NPM, Dev.to..."
                className={cn(
                  'w-full bg-surface-secondary text-base py-4 pl-12 pr-4',
                  'border-0',
                  'focus:outline-none focus:ring-0',
                  'placeholder:text-fg-muted/60 text-fg',
                )}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {/* Plus icon — opens source picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSourcePicker(!showSourcePicker)}
                className={cn(
                  'flex items-center justify-center px-4 py-4 transition-all duration-150',
                  'text-fg-muted hover:text-accent',
                )}
                aria-label="Select sources"
              >
                <Icon name="plus" size={18} />
              </button>

              {/* Source picker dropdown */}
              {showSourcePicker && (
                <div className="absolute right-0 top-full z-30 mt-2 w-[220px] bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.12)]">
                  <div className="px-4 py-2 border-b border-border">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-fg-muted">Sources</span>
                  </div>
                  <div className="py-1">
                    {SOURCE_DEFS.map((def) => {
                      const isSelected = selectedSources.has(def.id);
                      return (
                        <button
                          key={def.id}
                          type="button"
                          onClick={() => toggleSource(def.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-surface-secondary transition-colors duration-100"
                        >
                          <div className={cn(
                            'w-4 h-4 border-2 flex items-center justify-center shrink-0 transition-all duration-100',
                            isSelected ? 'bg-accent border-accent' : 'border-border',
                          )}>
                            {isSelected && <Icon name="check" size={10} strokeWidth={3} className="text-white" />}
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg">{def.shortLabel}</span>
                          <span className="text-[10px] text-fg-muted ml-auto">{def.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="px-4 py-2 border-t border-border">
                    <span className="text-[9px] text-fg-muted/60">
                      {selectedSources.size}/{ALL_SOURCE_IDS.length} sources selected
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 z-20 mt-2 bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.12)] max-h-[420px] overflow-y-auto">
              {loading && <SearchSkeleton />}

              {!loading && errors.length > 0 && (
                <div className="p-4 text-center">
                  <p className="text-xs text-fg-muted">{errors.map((e) => e.error).join(', ')}</p>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="px-5 py-2">
                  {results.map((r, i) => (
                    <ResultCard key={`${r.source}-${r.url}-${i}`} result={r} />
                  ))}
                </div>
              )}

              {!loading && !errors.length && results.length === 0 && (
                <div className="p-8 text-center">
                  <Icon name="search" size={24} className="mx-auto mb-3 text-fg-muted/50" />
                  <p className="text-sm text-fg-secondary">No results found</p>
                  <p className="text-xs text-fg-muted/60 mt-1">Try a different search term.</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="px-5 py-3 border-t border-border text-center">
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className="text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors"
                    onClick={() => setIsFocused(false)}
                  >
                    View all results →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Source pills — shown when idle */}
          {!isFocused && !query && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              {SOURCE_DEFS.map((def) => (
                <button
                  key={def.id}
                  type="button"
                  onClick={() => {
                    setQuery(def.label.split(' ')[0].toLowerCase());
                    inputRef.current?.focus();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white transition-all duration-150"
                >
                  {def.icon}
                  {def.shortLabel}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
