'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// ══════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════

interface SearchResult {
  source: string;
  title: string;
  url: string;
  description: string | null;
  metadata: Record<string, unknown>;
}

interface YcCompany {
  id: number; name: string; slug: string; website: string; one_liner: string;
  batch: string; tags: string[]; top_company: boolean; isHiring: boolean;
  team_size: number; stage: string;
}

interface PhProduct {
  id: string; name: string; tagline: string; url: string; slug: string;
  votesCount: number; commentsCount: number;
}

interface PhCache { fetchedAt: string; count: number; products: PhProduct[]; }

interface FeedCache { feeds: Record<string, { feedName: string; feedSiteUrl: string; items: Array<{ title: string; link: string; summary: string; author: string; publishedAt: string; guid: string }> }>; }

// ══════════════════════════════════════════════════════════════════════
// SOURCE CONFIG
// ══════════════════════════════════════════════════════════════════════

interface TypeConfig {
  id: string;
  label: string;
  type: 'local' | 'live';
  bgColor: string;
  hoverBg: string;
  textColor: string;
  description: string;
  itemCount: string;
  filters: FilterDef[];
}

interface FilterDef {
  id: string;
  label: string;
  type: 'select' | 'toggle' | 'sort';
  options?: { value: string; label: string }[];
}

const TYPE_CONFIGS: Record<string, TypeConfig> = {
  'knowledge': {
    id: 'knowledge', label: 'Knowledge Curriculum', type: 'local', bgColor: 'bg-blue-600', hoverBg: 'hover:bg-blue-600', textColor: 'text-blue-600', description: '162 curated software engineering concepts across principles, languages, tools, and patterns.',
    itemCount: '162 concepts',
    filters: [
      { id: 'category', label: 'Category', type: 'select', options: [
        { value: 'all', label: 'All Categories' },
        { value: 'principles', label: 'Principles' },
        { value: 'languages', label: 'Languages' },
        { value: 'tools', label: 'Tools & Technologies' },
        { value: 'patterns', label: 'Patterns' },
      ]},
    ],
  },
  'engineering-blogs': {
    id: 'feed', label: 'Engineering Blogs', type: 'local', bgColor: 'bg-accent', hoverBg: 'hover:bg-accent', textColor: 'text-accent', description: 'Latest articles from 300+ top engineering blogs across the industry.',
    itemCount: '300+ feeds',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [
        { value: 'date', label: 'Most Recent' },
        { value: 'source', label: 'By Source' },
      ]},
    ],
  },
  'yc-companies': {
    id: 'yc', label: 'YC Companies', type: 'local', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500', textColor: 'text-orange-500', description: '6,000+ Y Combinator startups with full catalog.',
    itemCount: '6,000+ companies',
    filters: [
      { id: 'batch', label: 'Batch', type: 'select', options: [{ value: 'all', label: 'All Batches' }, { value: 'W25', label: 'W25' }, { value: 'S25', label: 'S25' }, { value: 'W24', label: 'W24' }, { value: 'S24', label: 'S24' }] },
      { id: 'hiring', label: 'Hiring', type: 'toggle' },
      { id: 'top', label: 'Top Companies', type: 'toggle' },
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'name', label: 'By Name' }, { value: 'batch', label: 'By Batch' }] },
    ],
  },
  'product-hunt': {
    id: 'ph', label: 'Product Hunt', type: 'local', bgColor: 'bg-red-500', hoverBg: 'hover:bg-red-500', textColor: 'text-red-500', description: '900+ products and trending launches ranked by upvotes.',
    itemCount: '900+ products',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'votes', label: 'By Votes' }, { value: 'name', label: 'By Name' }] },
    ],
  },
  'hacker-news': {
    id: 'hn', label: 'Hacker News', type: 'live', bgColor: 'bg-orange-600', hoverBg: 'hover:bg-orange-600', textColor: 'text-orange-600', description: 'Top stories and discussions from the Y Combinator community.',
    itemCount: 'Live search',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'points', label: 'By Points' }, { value: 'date', label: 'By Date' }] },
    ],
  },
  'github': {
    id: 'github', label: 'GitHub Repos', type: 'live', bgColor: 'bg-gray-800', hoverBg: 'hover:bg-gray-800', textColor: 'text-gray-800', description: 'Search public repositories by stars, language, and topics.',
    itemCount: 'Live search',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'stars', label: 'By Stars' }, { value: 'forks', label: 'By Forks' }, { value: 'updated', label: 'Recently Updated' }] },
    ],
  },
  'stack-overflow': {
    id: 'stackoverflow', label: 'Stack Overflow', type: 'live', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500', textColor: 'text-orange-500', description: 'Q&A for programming topics, sorted by votes and relevance.',
    itemCount: 'Live search',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'votes', label: 'By Votes' }, { value: 'answers', label: 'By Answers' }] },
      { id: 'answered', label: 'Only Answered', type: 'toggle' },
    ],
  },
  'npm': {
    id: 'npm', label: 'NPM Packages', type: 'live', bgColor: 'bg-red-600', hoverBg: 'hover:bg-red-600', textColor: 'text-red-600', description: 'Search the npm registry for packages by score, quality, and maintenance.',
    itemCount: 'Live search',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'score', label: 'By Score' }, { value: 'popularity', label: 'By Popularity' }] },
    ],
  },
  'dev-to': {
    id: 'devto', label: 'Dev.to', type: 'live', bgColor: 'bg-gray-800', hoverBg: 'hover:bg-gray-800', textColor: 'text-gray-800', description: 'Developer articles and discussions from the DEV community.',
    itemCount: 'Live search',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'reactions', label: 'By Reactions' }, { value: 'date', label: 'Most Recent' }] },
    ],
  },
  'medium': {
    id: 'medium', label: 'Medium', type: 'live', bgColor: 'bg-black', hoverBg: 'hover:bg-black', textColor: 'text-black', description: 'Articles and stories from Medium publications by tag.',
    itemCount: 'Live search',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'date', label: 'Most Recent' }] },
    ],
  },
  'duckduckgo': {
    id: 'ddg', label: 'DuckDuckGo', type: 'live', bgColor: 'bg-orange-600', hoverBg: 'hover:bg-orange-600', textColor: 'text-orange-600', description: 'Instant answers and related topics from DuckDuckGo.',
    itemCount: 'Live search',
    filters: [],
  },
  'reddit': {
    id: 'reddit', label: 'Reddit', type: 'live', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500', textColor: 'text-orange-500', description: 'Discussions and posts from subreddits across programming topics.',
    itemCount: 'Live search',
    filters: [
      { id: 'sort', label: 'Sort', type: 'sort', options: [{ value: 'points', label: 'By Points' }, { value: 'comments', label: 'By Comments' }] },
    ],
  },
  'wikipedia': {
    id: 'wikipedia', label: 'Wikipedia', type: 'live', bgColor: 'bg-gray-700', hoverBg: 'hover:bg-gray-700', textColor: 'text-gray-700', description: 'Search Wikipedia articles and reference pages.',
    itemCount: 'Live search',
    filters: [],
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

function KnowledgeCard({ title, desc, meta }: { title: string; desc: string | null; meta: Record<string, unknown> }) {
  return (
    <a href={`/knowledge/${v(meta?.slug)}`} className="block bg-white p-6 sm:p-8 transition-all duration-300 hover:bg-blue-600 group border border-border hover:border-blue-600">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-4 h-4 flex items-center justify-center shrink-0 rounded-sm bg-blue-100 text-blue-700 text-[8px] font-bold uppercase">{v(meta?.category)?.slice(0, 3)}</span>
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">{v(meta?.category)}</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors">{title}</h3>
      {desc && <p className="mt-2 text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">{desc}</p>}
    </a>
  );
}

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

function PhCard({ title, url, desc, meta }: { title: string; url: string; desc: string | null; meta: Record<string, unknown> }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block bg-white p-6 sm:p-8 transition-all duration-300 hover:bg-red-500 group border border-border hover:border-red-500">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Favicon url={url} />
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors truncate">{title}</h3>
        </div>
        {n(meta?.votesCount) > 0 && <span className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-fg-muted group-hover:text-white/70 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15" /></svg>{n(meta?.votesCount)}</span>}
      </div>
      {desc && <p className="mt-2 text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">{desc}</p>}
    </a>
  );
}

function LiveCard({ title, url, desc, meta, label, hoverBg }: { title: string; url: string; desc: string | null; meta: Record<string, unknown>; label: string; hoverBg: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cn('block bg-white p-6 sm:p-8 transition-all duration-300 group border border-border hover:border-transparent', hoverBg)}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">{label}</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3">{title}</h3>
      {desc && <p className="mt-2 text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">{desc}</p>}
    </a>
  );
}

function HoverMeta({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 mt-3 text-sm text-fg-muted/60 group-hover:text-white/50 transition-colors flex-wrap">{children}</div>;
}

function TagBadge({ tag }: { tag: string }) {
  return <span className="px-2 py-1 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/70 text-[10px] font-semibold uppercase tracking-wider">{tag}</span>;
}

// ══════════════════════════════════════════════════════════════════════
// CARD RENDERER
// ══════════════════════════════════════════════════════════════════════

function renderCard(item: { title: string; url: string; description: string | null; metadata: Record<string, unknown> }, type: string, hoverBg: string) {
  const m = item.metadata;
  switch (type) {
    case 'knowledge': return <KnowledgeCard title={item.title} desc={item.description} meta={m} />;
    case 'feed': return <FeedCard title={item.title} url={item.url} desc={item.description} meta={m} />;
    case 'yc': return <YcCard title={item.title} url={item.url} desc={item.description} meta={m} />;
    case 'ph': return <PhCard title={item.title} url={item.url} desc={item.description} meta={m} />;
    case 'hn': return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label="Hacker News" hoverBg={hoverBg} />;
    case 'github': return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label="GitHub" hoverBg={hoverBg} />;
    case 'stackoverflow': return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label="Stack Overflow" hoverBg={hoverBg} />;
    case 'npm': return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label="npm" hoverBg={hoverBg} />;
    case 'devto': return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label="Dev.to" hoverBg={hoverBg} />;
    case 'medium': return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label="Medium" hoverBg={hoverBg} />;
    case 'ddg': return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label="DuckDuckGo" hoverBg={hoverBg} />;
    case 'reddit': return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label="Reddit" hoverBg={hoverBg} />;
    case 'wikipedia': return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label="Wikipedia" hoverBg={hoverBg} />;
    default: return <LiveCard title={item.title} url={item.url} desc={item.description} meta={m} label={type} hoverBg={hoverBg} />;
  }
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

  // ── Debounce query for live sources ───────────────────────────────
  const debouncedQuery = useDebounce(query, 600);

  // ── Load local cache data once on mount ─────────────────────────
  useEffect(() => {
    if (!config || config.type !== 'local') return;
    let mounted = true;
    setLoading(true); setError(null);
    loadLocal(config.id)
      .then((data) => { if (mounted) setItems(data); })
      .catch((err) => { if (mounted) setError(err instanceof Error ? err.message : String(err)); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [config?.id]);

  // ── Live search — debounced API calls ─────────────────────────────
  useEffect(() => {
    if (!config || config.type !== 'live') return;
    let mounted = true;
    setLoading(true); setError(null);

    if (debouncedQuery.trim().length < 2) {
      if (mounted) { setItems([]); setLoading(false); }
      return;
    }

    loadLive(config.id, debouncedQuery)
      .then((data) => { if (mounted) setItems(data); })
      .catch((err) => { if (mounted) setError(err instanceof Error ? err.message : String(err)); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [config?.id, debouncedQuery]);

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
            <span className="text-[10px] text-fg-muted/60 font-mono">{config.type === 'local' ? 'Local cache' : 'Live API'}</span>
          </div>
          <p className="text-sm text-fg-secondary max-w-2xl">{config.description}</p>
        </div>
      </section>

      {/* Search + Filters */}
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
              {config.type === 'live' && <p className="text-xs text-fg-muted/60">Try a different search term.</p>}
            </div>
          )}

          {/* Items grid */}
          {!loading && !error && (
            <>
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, i) => (
                    <div key={`${item.url}-${i}`}>
                      {renderCard(item, config.id, config.hoverBg)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <svg className="mx-auto mb-4 text-fg-muted/40" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  <p className="text-sm font-semibold text-fg mb-1">
                    {config.type === 'live' && query.trim().length < 2 ? 'Enter a search term' : 'No results found'}
                  </p>
                  <p className="text-xs text-fg-muted">
                    {config.type === 'live' && query.trim().length < 2
                      ? 'Type at least 2 characters to search.'
                      : 'Try adjusting your filters or search term.'}
                  </p>
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
// CUSTOM HOOK
// ══════════════════════════════════════════════════════════════════════

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ══════════════════════════════════════════════════════════════════════
// DATA LOADERS
// ══════════════════════════════════════════════════════════════════════

async function loadLocal(type: string): Promise<Array<{ title: string; url: string; description: string | null; metadata: Record<string, unknown> }>> {
  const items: Array<{ title: string; url: string; description: string | null; metadata: Record<string, unknown> }> = [];

  switch (type) {
    case 'knowledge': {
      // Load from manifest + seeds
      let descriptions: Record<string, string> = {};
      try {
        const seedsRes = await fetch('/knowledge-cache/seeds.json');
        if (seedsRes.ok) {
          const seeds = await seedsRes.json() as Array<{ id: string; description: string }>;
          for (const s of seeds) descriptions[s.id] = s.description;
        }
      } catch {}
      try {
        const manifestRes = await fetch('/knowledge-cache/manifest.json');
        if (manifestRes.ok) {
          const manifest = await manifestRes.json() as { labelMap: Record<string, string>; categoryMap: Record<string, string> };
          for (const [slug, label] of Object.entries(manifest.labelMap)) {
            items.push({ title: label, url: `/knowledge/${slug}`, description: descriptions[slug] || null, metadata: { category: manifest.categoryMap[slug] || 'other', slug } });
          }
        }
      } catch {}
      break;
    }

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

    case 'ph': {
      try {
        const phRes = await fetch('/ph-cache/products.json');
        if (phRes.ok) {
          const data: PhCache = await phRes.json();
          for (const p of data.products) {
            items.push({ title: p.name, url: p.url, description: p.tagline, metadata: { votesCount: p.votesCount, commentsCount: p.commentsCount } });
          }
        }
      } catch {}
      break;
    }
  }

  return items;
}

async function loadLive(type: string, query: string): Promise<Array<{ title: string; url: string; description: string | null; metadata: Record<string, unknown> }>> {
  if (query.trim().length < 2) return [];

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=25&sources=${type}`);
    if (!res.ok) throw new Error(`API: ${res.status}`);
    const data = await res.json() as { results: SearchResult[] };
    return (data.results || []).map((r) => ({
      title: r.title,
      url: r.url,
      description: r.description,
      metadata: r.metadata,
    }));
  } catch (err) {
    throw new Error(`Failed to search: ${err instanceof Error ? err.message : String(err)}`);
  }
}
