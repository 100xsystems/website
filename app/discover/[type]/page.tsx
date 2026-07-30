'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// ══════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════

interface YcCompany {
  id: number; name: string; slug: string; website: string; one_liner: string;
  batch: string; tags: string[]; top_company: boolean; isHiring: boolean;
  team_size: number; stage: string;
}

interface FeedCache { feeds: Record<string, { feedName: string; feedSiteUrl: string; items: Array<{ title: string; link: string; summary: string; author: string; publishedAt: string; guid: string }> }>; }

// ══════════════════════════════════════════════════════════════════════
// SOURCE CONFIG — only feed & yc remain; all others have dedicated pages
// ══════════════════════════════════════════════════════════════════════

interface TypeConfig {
  id: string;
  label: string;
  bgColor: string;
  hoverBg: string;
  description: string;
  filters: FilterDef[];
}

interface FilterDef {
  id: string;
  label: string;
  type: 'select' | 'toggle' | 'sort';
  options?: { value: string; label: string }[];
}

const TYPE_CONFIGS: Record<string, TypeConfig> = {
  'feed': {
    id: 'feed', label: 'Engineering Blogs', bgColor: 'bg-accent', hoverBg: 'hover:bg-accent', description: 'Latest articles from 300+ top engineering blogs across the industry.',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [
        { value: 'date', label: 'Most Recent' },
        { value: 'source', label: 'By Source' },
      ]},
    ],
  },
  'yc': {
    id: 'yc', label: 'YC Companies', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500', description: '6,000+ Y Combinator startups with full catalog.',
    filters: [
      { id: 'batch', label: 'Batch', type: 'select', options: [{ value: 'all', label: 'All Batches' }, { value: 'W25', label: 'W25' }, { value: 'S25', label: 'S25' }, { value: 'W24', label: 'W24' }, { value: 'S24', label: 'S24' }] },
      { id: 'hiring', label: 'Hiring', type: 'toggle' },
      { id: 'top', label: 'Top Companies', type: 'toggle' },
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'name', label: 'By Name' }, { value: 'batch', label: 'By Batch' }] },
    ],
  },
};

// ══════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

function v(val: unknown, fallback = ''): string {
  if (val == null) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return String(val);
  return String(val);
}

function n(val: unknown, fallback = 0): number {
  if (typeof val === 'number') return val;
  return fallback;
}

function getDomain(url: string): string | null {
  try { return new URL(url).hostname; } catch { return null; }
}

function Favicon({ url, className = 'w-5 h-5' }: { url: string; className?: string }) {
  const domain = getDomain(url);
  if (!domain) return null;
  return (
    <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} alt=""
      className={`${className} shrink-0 rounded-sm`}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      loading="lazy" />
  );
}

function timeAgo(dateStr: string): string {
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

// ══════════════════════════════════════════════════════════════════════
// CARD COMPONENTS
// ══════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════
// CARD COMPONENTS
// ══════════════════════════════════════════════════════════════════════

function FeedCard({ title, url, desc, meta }: { title: string; url: string; desc: string | null; meta: Record<string, unknown> }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block bg-white p-6 sm:p-8 transition-all duration-300 hover:bg-accent group border border-border hover:border-accent">
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">{v(meta?.feedName)}</span>
        {v(meta?.publishedAt) && <span className="text-xs text-fg-muted/50 group-hover:text-white/40 transition-colors">· {timeAgo(v(meta?.publishedAt))}</span>}
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3">{title}</h3>
      {v(meta?.author) && <p className="mt-2 text-xs text-fg-muted/60 group-hover:text-white/50 transition-colors">by {v(meta?.author)}</p>}
    </a>
  );
}

function YcCard({ title, url, desc, meta }: { title: string; url: string; desc: string | null; meta: Record<string, unknown> }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block bg-white p-6 sm:p-8 transition-all duration-300 hover:bg-orange-500 group border border-border hover:border-orange-500">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Favicon url={url} />
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors truncate">{title}</h3>
        </div>
        {meta?.hiring === true && <span className="shrink-0 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 group-hover:text-white/80"><span className="w-2 h-2 rounded-full bg-green-600 group-hover:bg-white" />Hiring</span>}
      </div>
      {desc && <p className="text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">{desc}</p>}
      <div className="mt-4 flex items-center gap-3 flex-wrap">
        {v(meta?.batch) && <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80 transition-colors">{v(meta?.batch)}</span>}
        {v(meta?.stage) && <span className="text-[10px] text-fg-muted/60 group-hover:text-white/50 transition-colors uppercase tracking-wider">{v(meta?.stage)}</span>}
        {meta?.top_company === true && <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 group-hover:text-white/90 transition-colors">Top</span>}
      </div>
    </a>
  );
}

// ══════════════════════════════════════════════════════════════════════
// DISCOVER TYPE PAGE CLIENT
// ══════════════════════════════════════════════════════════════════════

export default function DiscoverTypePage() {
  const params = useParams();
  const rawType = Array.isArray(params.type) ? params.type[0] : params.type;
  const config = TYPE_CONFIGS[rawType || ''] || null;

  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Array<{ title: string; url: string; description: string | null; metadata: Record<string, unknown> }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({ category: 'all', batch: 'all', sort: 'name' });
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  // ── Load local cache data once on mount ─────────────────────────
  useEffect(() => {
    if (!config) return;
    let mounted = true;
    setLoading(true); setError(null);
    loadLocal(config.id)
      .then((data) => { if (mounted) setItems(data); })
      .catch((err) => { if (mounted) setError(err instanceof Error ? err.message : String(err)); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [config?.id]);

  // ── Filter and sort items ──────────────────────────────────────
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      result = result.filter((item) => v(item.metadata?.category) === filters.category);
    }

    // Apply batch filter
    if (filters.batch && filters.batch !== 'all') {
      result = result.filter((item) => v(item.metadata?.batch) === filters.batch);
    }

    // Apply toggles
    if (toggles['hiring']) result = result.filter((item) => item.metadata?.hiring === true);
    if (toggles['top']) result = result.filter((item) => item.metadata?.top_company === true);
    if (toggles['answered']) result = result.filter((item) => item.metadata?.isAnswered === true);

    // Apply text search
    if (query.trim().length >= 2) {
      const q = query.toLowerCase();
      result = result.filter((item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
      );
    }

    // Apply sort
    switch (filters.sort) {
      case 'name': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'batch': result.sort((a, b) => v(b.metadata?.batch).localeCompare(v(a.metadata?.batch))); break;
      case 'votes': result.sort((a, b) => n(b.metadata?.votesCount) - n(a.metadata?.votesCount)); break;
      case 'stars': result.sort((a, b) => n(b.metadata?.stars) - n(a.metadata?.stars)); break;
      case 'forks': result.sort((a, b) => n(b.metadata?.forks) - n(a.metadata?.forks)); break;
      case 'points': result.sort((a, b) => n(b.metadata?.points) - n(a.metadata?.points)); break;
      case 'comments': result.sort((a, b) => n(b.metadata?.comments) - n(a.metadata?.comments)); break;
      case 'score': result.sort((a, b) => n(b.metadata?.score) - n(a.metadata?.score)); break;
      case 'popularity': result.sort((a, b) => n(b.metadata?.popularity) - n(a.metadata?.popularity)); break;
      case 'reactions': result.sort((a, b) => n(b.metadata?.positiveReactions) - n(a.metadata?.positiveReactions)); break;
      case 'answers': result.sort((a, b) => n(b.metadata?.answerCount) - n(a.metadata?.answerCount)); break;
      case 'updated': result.sort((a, b) => v(b.metadata?.updatedAt).localeCompare(v(a.metadata?.updatedAt))); break;
      case 'date': result.sort((a, b) => new Date(v(b.metadata?.publishedAt || b.metadata?.createdAt)).getTime() - new Date(v(a.metadata?.publishedAt || a.metadata?.createdAt)).getTime()); break;
      case 'source': result.sort((a, b) => v(a.metadata?.feedName).localeCompare(v(b.metadata?.feedName))); break;
    }

    return result;
  }, [items, filters, toggles, query]);

  // ── 404 if invalid type ──
  if (!config) {
    return (
      <main className="min-h-screen bg-white py-28">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-fg mb-4 uppercase tracking-wider">Source not found</h1>
          <p className="text-sm text-fg-secondary mb-8">The discover source &quot;{rawType}&quot; doesn&apos;t exist.</p>
          <Link href="/discover" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-accent text-white hover:bg-accent/90 transition-colors">
            &larr; Back to discover
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-6">
            <Link href="/discover" className="text-[10px] font-bold uppercase tracking-widest text-fg-muted hover:text-fg transition-colors">
              &larr; All sources
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className={cn('inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white', config.bgColor)}>
              {config.label}
            </span>
            <span className="text-[10px] text-fg-muted/60 font-mono">Local cache</span>
          </div>
          <p className="text-sm text-fg-secondary max-w-2xl">{config.description}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search bar */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${config.label.toLowerCase()}...`}
                className="w-full bg-surface-secondary text-sm py-2.5 pl-10 pr-3 border-0 border-b-2 border-transparent focus:border-accent focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg transition-all duration-150"
                autoComplete="off" spellCheck={false} />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {config.filters.map((f) => {
                if (f.type === 'select') {
                  return (
                    <select key={f.id} value={filters[f.id] || 'all'} onChange={(e) => setFilters((p) => ({ ...p, [f.id]: e.target.value }))}
                      className="bg-surface-secondary text-[10px] font-semibold uppercase tracking-wider text-fg px-3 py-2 border-0 focus:outline-none focus:ring-0 cursor-pointer">
                      {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  );
                }
                if (f.type === 'sort') {
                  return (
                    <select key={f.id} value={filters.sort || 'name'} onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value }))}
                      className="bg-surface-secondary text-[10px] font-semibold uppercase tracking-wider text-fg px-3 py-2 border-0 focus:outline-none focus:ring-0 cursor-pointer">
                      {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  );
                }
                if (f.type === 'toggle') {
                  return (
                    <button key={f.id} onClick={() => setToggles((p) => ({ ...p, [f.id]: !p[f.id] }))}
                      className={cn('px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all duration-150 border',
                        toggles[f.id] ? 'bg-accent text-white border-accent' : 'bg-white text-fg-muted border-border hover:border-fg/30')}>
                      {f.label}
                    </button>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs text-fg-muted">
              {loading ? 'Loading...' : `${filteredItems.length} result${filteredItems.length !== 1 ? 's' : ''}`}
              {query.trim().length >= 2 && <span> for &quot;{query}&quot;</span>}
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border border-border p-6">
                  <div className="h-4 w-24 bg-surface-secondary animate-pulse mb-3" />
                  <div className="h-6 w-3/4 bg-surface-secondary animate-pulse mb-2" />
                  <div className="h-4 w-full bg-surface-secondary animate-pulse mb-2" />
                  <div className="h-4 w-2/3 bg-surface-secondary animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-12 border border-dashed border-border">
              <p className="text-sm text-fg-secondary mb-2">{error}</p>
              <p className="text-xs text-fg-muted/60">Try a different search term.</p>
            </div>
          )}

          {/* Items grid */}
          {!loading && !error && (
            <>
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, i) => (
                    <div key={`${item.url}-${i}`}>
                      {config.id === 'yc' ? (
                        <YcCard title={item.title} url={item.url} desc={item.description} meta={item.metadata} />
                      ) : (
                        <FeedCard title={item.title} url={item.url} desc={item.description} meta={item.metadata} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <svg className="mx-auto mb-4 text-fg-muted/40" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  <p className="text-sm font-semibold text-fg mb-1">No results found</p>
                  <p className="text-xs text-fg-muted">Try adjusting your filters or search term.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

// ══════════════════════════════════════════════════════════════════════
// DATA LOADERS — only feed & yc local cache
// ══════════════════════════════════════════════════════════════════════

async function loadLocal(type: string): Promise<Array<{ title: string; url: string; description: string | null; metadata: Record<string, unknown> }>> {
  const items: Array<{ title: string; url: string; description: string | null; metadata: Record<string, unknown> }> = [];

  switch (type) {
    case 'feed': {
      try {
        const feedRes = await fetch('/feed-cache.json');
        if (feedRes.ok) {
          const cache: FeedCache = await feedRes.json();
          for (const [feedId, feedData] of Object.entries(cache.feeds)) {
            for (const item of feedData.items.slice(0, 20)) {
              items.push({ title: item.title, url: item.link, description: item.summary, metadata: { feedId, feedName: feedData.feedName, author: item.author, publishedAt: item.publishedAt } });
            }
          }
        }
      } catch {}
      break;
    }

    case 'yc': {
      try {
        const ycRes = await fetch('/yc-cache/companies.json');
        if (ycRes.ok) {
          const companies: YcCompany[] = await ycRes.json();
          for (const c of companies) {
            items.push({ title: c.name, url: c.website || `https://www.ycombinator.com/companies/${c.slug}`, description: c.one_liner, metadata: { batch: c.batch, stage: c.stage, team_size: c.team_size, top_company: c.top_company, hiring: c.isHiring } });
          }
        }
      } catch {}
      break;
    }
  }

  return items;
}
