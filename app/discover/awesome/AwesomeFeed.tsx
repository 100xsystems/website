'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpRight, Check, Search, X } from 'lucide-react';
import { cn } from '@/application/lib/utils';
import { getAwesomeBrandColor, getAwesomeIcon } from '@/lib/awesome-icons';

export interface AwesomeLink {
  url: string;
  title: string;
  description: string | null;
  category: string;
  source: string;
}

export interface AwesomeSource {
  repoId: string;
  name: string;
  description: string | null;
  repoUrl: string;
  stars: number;
  topics: string[];
  linkCount: number;
  categories: Array<{ name: string; count: number }>;
  links: AwesomeLink[];
}

interface AwesomeFeedProps {
  sources: AwesomeSource[];
}

function formatStars(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}

/**
 * The Awesome directory: pick a source (list), then a category, and the
 * records are appended below — one level of hierarchy at a time, borderless
 * and roomy, with native brand-colored icons.
 */
export function AwesomeFeed({ sources }: AwesomeFeedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState('');

  // Deep-link support: ?source=owner/repo (from homepage / AI hub cards) and ?category=…
  const sourceParam = searchParams?.get('source');
  const categoryParam = searchParams?.get('category');
  const [selectedSource, setSelectedSource] = useState<string | null>(() =>
    sourceParam && sources.some((s) => s.repoId === sourceParam) ? sourceParam : null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    if (!sourceParam || !categoryParam) return null;
    const src = sources.find((s) => s.repoId === sourceParam);
    return src && src.categories.some((c) => c.name === categoryParam) ? categoryParam : null;
  });

  const categoriesRef = useRef<HTMLDivElement>(null);
  const recordsRef = useRef<HTMLDivElement>(null);

  const activeSource = useMemo(
    () => sources.find((s) => s.repoId === selectedSource) ?? null,
    [sources, selectedSource],
  );

  // Keep the URL shareable as the user drills down (no page reload).
  const syncUrl = (source: string | null, category: string | null) => {
    const params = new URLSearchParams();
    if (source) params.set('source', source);
    if (category) params.set('category', category);
    const qs = params.toString();
    router.replace(qs ? `/discover/awesome?${qs}` : '/discover/awesome', { scroll: false });
  };

  const selectSource = (repoId: string) => {
    const next = selectedSource === repoId ? null : repoId;
    setSelectedSource(next);
    setSelectedCategory(null);
    syncUrl(next, null);
  };

  const selectCategory = (name: string) => {
    const next = selectedCategory === name ? null : name;
    setSelectedCategory(next);
    syncUrl(selectedSource, next);
  };

  // Scroll to the appended section when a new level opens.
  useEffect(() => {
    if (selectedSource && categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedSource]);

  useEffect(() => {
    if (selectedSource && selectedCategory && recordsRef.current) {
      recordsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedSource, selectedCategory]);

  const filteredSources = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sources;
    return sources.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.description ?? '').toLowerCase().includes(q) ||
        s.topics.some((t) => t.toLowerCase().includes(q)),
    );
  }, [sources, query]);

  const records = useMemo(() => {
    if (!activeSource || !selectedCategory) return [];
    const seen = new Set<string>();
    const out: AwesomeLink[] = [];
    for (const link of activeSource.links) {
      if ((link.category || 'Uncategorized') !== selectedCategory) continue;
      const key = link.url.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(link);
    }
    return out;
  }, [activeSource, selectedCategory]);

  return (
    <div>
      {/* ── Level 1 · Sources ─────────────────────────────────────── */}
      <div className="mb-10 max-w-xl">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-fg-muted">
          Choose a list
        </p>
        <div className="relative">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-muted" />
          <input
            type="search"
            aria-label="Filter lists"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter lists by name or topic…"
            className="w-full border border-border bg-white py-4 pl-12 pr-12 text-base text-fg placeholder:text-fg-muted outline-none transition-colors duration-150 focus:border-accent"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted transition-colors hover:text-fg"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filteredSources.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg font-bold text-fg">No lists match “{query}”</p>
          <p className="mt-2 text-sm text-fg-muted">Try a different name or topic.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSources.map((source) => {
            const active = source.repoId === selectedSource;
            const color = getAwesomeBrandColor(source.repoId);
            return (
              <button
                key={source.repoId}
                type="button"
                onClick={() => selectSource(source.repoId)}
                aria-expanded={active}
                className={cn(
                  'group relative flex flex-col items-start gap-6 p-7 text-left transition-all duration-200 sm:p-8',
                  active
                    ? 'bg-accent text-white shadow-2xl'
                    : 'border border-border bg-white hover:-translate-y-1 hover:border-transparent hover:shadow-2xl',
                )}
              >
                <div className="flex w-full items-start justify-between gap-4">
                  <span
                    className="inline-flex h-16 w-16 shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: `${color}1A`, color }}
                  >
                    {getAwesomeIcon(source.repoId, 30)}
                  </span>
                  <span
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center transition-all duration-200',
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-accent-bg text-accent opacity-0 group-hover:opacity-100',
                    )}
                  >
                    {active ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-5 w-5" />}
                  </span>
                </div>

                <div>
                  <h3
                    className={cn(
                      'text-2xl font-extrabold leading-tight tracking-tight',
                      active ? 'text-white' : 'text-fg',
                    )}
                  >
                    {source.name}
                  </h3>
                  {source.description && (
                    <p
                      className={cn(
                        'mt-3 text-sm leading-relaxed line-clamp-3',
                        active ? 'text-white/80' : 'text-fg-secondary',
                      )}
                    >
                      {source.description}
                    </p>
                  )}
                </div>

                <div
                  className={cn(
                    'mt-auto flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-bold uppercase tracking-wider',
                    active ? 'text-white/80' : 'text-fg-muted',
                  )}
                >
                  <span>★ {formatStars(source.stars)}</span>
                  <span>{source.linkCount.toLocaleString()} links</span>
                  <span>{source.categories.length} categories</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Level 2 · Categories (appended below the source) ─────── */}
      {activeSource && (
        <div ref={categoriesRef} className="scroll-mt-24 pt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-5">
              <span
                className="inline-flex h-14 w-14 shrink-0 items-center justify-center"
                style={{ backgroundColor: `${getAwesomeBrandColor(activeSource.repoId)}1A`, color: getAwesomeBrandColor(activeSource.repoId) }}
              >
                {getAwesomeIcon(activeSource.repoId, 24)}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                  Categories · {activeSource.name}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                  {activeSource.categories.length} categories
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-xs font-bold uppercase tracking-wider text-fg-muted tabular-nums">
                {activeSource.linkCount.toLocaleString()} resources
              </span>
              <a
                href={activeSource.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover"
              >
                GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => selectSource(activeSource.repoId)}
                aria-label="Collapse list"
                className="inline-flex h-9 w-9 items-center justify-center bg-surface-light text-fg-muted transition-colors hover:bg-accent hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeSource.categories.map((cat) => {
              const active = cat.name === selectedCategory;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => selectCategory(cat.name)}
                  aria-expanded={active}
                  className={cn(
                    'group flex items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-150',
                    active
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-surface-light hover:bg-accent hover:text-white hover:shadow-lg',
                  )}
                >
                  <span className="text-sm font-bold uppercase leading-snug tracking-wide">
                    {cat.name}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-xs font-bold tabular-nums',
                      active ? 'text-white/70' : 'text-fg-muted group-hover:text-white/70',
                    )}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Level 3 · Records (appended below the category) ──────── */}
      {activeSource && selectedCategory && (
        <div ref={recordsRef} className="scroll-mt-24 pt-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                Resources · {activeSource.name}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                {selectedCategory}
              </h2>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-fg-muted tabular-nums">
              {records.length.toLocaleString()} resource{records.length !== 1 ? 's' : ''}
            </span>
          </div>

          {records.length === 0 ? (
            <p className="mt-10 text-sm text-fg-muted">No resources in this category.</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-1 lg:grid-cols-2 xl:grid-cols-3">
              {records.map((link, i) => (
                <a
                  key={`${link.url}-${i}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 px-5 py-4 transition-colors duration-150 hover:bg-accent hover:text-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-[15px] font-bold leading-snug text-fg line-clamp-2 group-hover:text-white">
                      {link.title}
                    </h4>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  {link.description && (
                    <p className="text-sm leading-relaxed text-fg-secondary line-clamp-2 group-hover:text-white/80">
                      {link.description}
                    </p>
                  )}
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60">
                    {link.category}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
