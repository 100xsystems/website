import { promises as fs } from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { BookOpen, Star, Rss } from 'lucide-react';
import { cn } from '@/application/lib/utils';
import {
  SiYcombinator, SiProducthunt, SiGithub, SiStackoverflow, SiNpm,
  SiDevdotto, SiMedium, SiReddit, SiDuckduckgo, SiWikipedia,
} from 'react-icons/si';
import type { ReactNode } from 'react';

// ── Real statistics, computed from the static caches at build time ──

interface DiscoverStats {
  knowledgeConcepts: number;
  knowledgeLessons: number;
  awesomeLists: number;
  awesomeLinks: number;
  feedCount: number;
  feedArticles: number;
  ycCompanies: number;
  phProducts: number;
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function loadStats(): Promise<DiscoverStats> {
  const base = path.join(process.cwd(), 'public');
  const stats: DiscoverStats = {
    knowledgeConcepts: 0,
    knowledgeLessons: 0,
    awesomeLists: 0,
    awesomeLinks: 0,
    feedCount: 0,
    feedArticles: 0,
    ycCompanies: 0,
    phProducts: 0,
  };

  // Knowledge
  const manifest = await readJson<{ totalEntities?: number }>(path.join(base, 'knowledge-cache', 'manifest.json'));
  stats.knowledgeConcepts = manifest?.totalEntities ?? 0;
  const lessonIndex = await readJson<{ totalLessons?: number }>(path.join(base, 'lesson-index.json'));
  stats.knowledgeLessons = lessonIndex?.totalLessons ?? 0;

  // Awesome
  const awesome = await readJson<{ lists?: Array<{ linkCount?: number }> }>(path.join(base, 'awesome-cache', 'index.json'));
  stats.awesomeLists = awesome?.lists?.length ?? 0;
  stats.awesomeLinks = awesome?.lists?.reduce((s, l) => s + (l.linkCount ?? 0), 0) ?? 0;

  // Feed
  const feed = await readJson<{ feeds?: Record<string, { items?: unknown[] }> }>(path.join(base, 'feed-cache.json'));
  stats.feedCount = Object.keys(feed?.feeds ?? {}).length;
  stats.feedArticles = Object.values(feed?.feeds ?? {}).reduce((s, f) => s + (f.items?.length ?? 0), 0);

  // YC — read only the lightweight catalog envelope
  const yc = await readJson<{ count?: number }>(path.join(base, 'yc-cache', 'companies.json'));
  stats.ycCompanies = yc?.count ?? 0;

  // Product Hunt
  const ph = await readJson<{ count?: number }>(path.join(base, 'ph-cache', 'products.json'));
  stats.phProducts = ph?.count ?? 0;

  return stats;
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

// ── Source definitions ──────────────────────────────────────────────

interface SourceDef {
  slug: string;
  href: string;
  label: string;
  description: string;
  type: 'local' | 'live';
  color: string; // brand hex
  hoverBg: string; // literal Tailwind class for inverted hover
  icon: ReactNode;
  stat: string;
}

function HackerNewsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
      <path d="M0 0h24v24H0V0zm4.8 4.8l5.2 10.4v4h3.6v-4l5.2-10.4h-3.6l-3.4 7.8-3.4-7.8H4.8z" />
    </svg>
  );
}

function buildSources(stats: DiscoverStats): SourceDef[] {
  return [
    {
      slug: 'knowledge',
      href: '/knowledge',
      label: 'Knowledge Curriculum',
      description: 'Principles, patterns, languages, tools, and technologies — the full depth-first curriculum.',
      type: 'local',
      color: '#572EFF',
      hoverBg: 'hover:bg-[#572EFF]',
      icon: <BookOpen size={24} />,
      stat: `${stats.knowledgeConcepts} concepts · ${stats.knowledgeLessons.toLocaleString()} lessons`,
    },
    {
      slug: 'awesome',
      href: '/discover/awesome',
      label: 'Awesome Lists',
      description: 'The most-starred GitHub awesome lists — one flat, searchable resource feed.',
      type: 'local',
      color: '#F59E0B',
      hoverBg: 'hover:bg-[#F59E0B]',
      icon: <Star size={24} />,
      stat: `${stats.awesomeLists} lists · ${stats.awesomeLinks.toLocaleString()} links`,
    },
    {
      slug: 'feed',
      href: '/discover/feed',
      label: 'Engineering Blogs',
      description: 'Fresh articles from 300+ top engineering blogs across the industry.',
      type: 'local',
      color: '#0D9488',
      hoverBg: 'hover:bg-[#0D9488]',
      icon: <Rss size={24} />,
      stat: `${stats.feedCount} feeds · ${stats.feedArticles.toLocaleString()} articles`,
    },
    {
      slug: 'yc',
      href: '/discover/yc',
      label: 'YC Companies',
      description: 'The complete Y Combinator catalog with batch, hiring, and growth signals.',
      type: 'local',
      color: '#F97316',
      hoverBg: 'hover:bg-[#F97316]',
      icon: <SiYcombinator size={24} />,
      stat: `${stats.ycCompanies.toLocaleString()} companies`,
    },
    {
      slug: 'product-hunt',
      href: '/discover/product-hunt',
      label: 'Product Hunt',
      description: 'Trending launches and products ranked by upvotes and community buzz.',
      type: 'local',
      color: '#DA552F',
      hoverBg: 'hover:bg-[#DA552F]',
      icon: <SiProducthunt size={24} />,
      stat: `${stats.phProducts.toLocaleString()} products`,
    },
    {
      slug: 'hn',
      href: '/discover/hn',
      label: 'Hacker News',
      description: 'Top stories, Show HN, Ask HN, and Jobs — searched live.',
      type: 'live',
      color: '#FF6600',
      hoverBg: 'hover:bg-[#FF6600]',
      icon: <HackerNewsIcon />,
      stat: 'Live search',
    },
    {
      slug: 'github',
      href: '/discover/github',
      label: 'GitHub Repos',
      description: 'Search public repositories by stars, language, and topics.',
      type: 'live',
      color: '#181717',
      hoverBg: 'hover:bg-[#181717]',
      icon: <SiGithub size={24} />,
      stat: 'Live search',
    },
    {
      slug: 'stackoverflow',
      href: '/discover/stackoverflow',
      label: 'Stack Overflow',
      description: 'Q&A for programming topics, sorted by votes and relevance.',
      type: 'live',
      color: '#F48024',
      hoverBg: 'hover:bg-[#F48024]',
      icon: <SiStackoverflow size={24} />,
      stat: 'Live search',
    },
    {
      slug: 'npm',
      href: '/discover/npm',
      label: 'NPM Packages',
      description: 'Search the npm registry by score, quality, and maintenance.',
      type: 'live',
      color: '#CB3837',
      hoverBg: 'hover:bg-[#CB3837]',
      icon: <SiNpm size={24} />,
      stat: 'Live search',
    },
    {
      slug: 'devto',
      href: '/discover/devto',
      label: 'Dev.to',
      description: 'Developer articles and discussions from the DEV community.',
      type: 'live',
      color: '#0A0A0A',
      hoverBg: 'hover:bg-[#0A0A0A]',
      icon: <SiDevdotto size={24} />,
      stat: 'Live search',
    },
    {
      slug: 'medium',
      href: '/discover/medium',
      label: 'Medium',
      description: 'Stories and articles from Medium publications, filtered by tag.',
      type: 'live',
      color: '#000000',
      hoverBg: 'hover:bg-[#000000]',
      icon: <SiMedium size={24} />,
      stat: 'Live search',
    },
    {
      slug: 'ddg',
      href: '/discover/ddg',
      label: 'DuckDuckGo',
      description: 'Instant answers, definitions, and related topics from DuckDuckGo.',
      type: 'live',
      color: '#DE5833',
      hoverBg: 'hover:bg-[#DE5833]',
      icon: <SiDuckduckgo size={24} />,
      stat: 'Live search',
    },
    {
      slug: 'reddit',
      href: '/discover/reddit',
      label: 'Reddit',
      description: 'Discussions and posts from subreddits across programming topics.',
      type: 'live',
      color: '#FF4500',
      hoverBg: 'hover:bg-[#FF4500]',
      icon: <SiReddit size={24} />,
      stat: 'Live search',
    },
    {
      slug: 'wikipedia',
      href: '/discover/wikipedia',
      label: 'Wikipedia',
      description: 'Reference articles and pages from the world’s free encyclopedia.',
      type: 'live',
      color: '#54595D',
      hoverBg: 'hover:bg-[#54595D]',
      icon: <SiWikipedia size={24} />,
      stat: 'Live search',
    },
  ];
}

// ── Card — borderless, inverted brand-color hover ──────────────────

function SourceCard({ s }: { s: SourceDef }) {
  return (
    <Link
      href={s.href}
      className={cn(
        'group flex w-[82vw] shrink-0 snap-start flex-col items-start gap-6 bg-white p-7 transition-colors duration-200 sm:w-auto sm:p-8',
        s.hoverBg,
      )}
    >
      {/* Brand icon chip */}
      <span
        className="inline-flex h-14 w-14 shrink-0 items-center justify-center transition-colors duration-200"
        style={{ backgroundColor: `${s.color}1A`, color: s.color }}
      >
        {s.icon}
      </span>

      <div>
        <h3 className="text-xl font-extrabold uppercase tracking-wide text-fg leading-tight transition-colors duration-200 group-hover:text-white">
          {s.label}
        </h3>
        <p className="mt-2 text-sm text-fg-secondary leading-relaxed transition-colors duration-200 group-hover:text-white/80 line-clamp-2">
          {s.description}
        </p>
      </div>

      {/* Real stat */}
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <span className="bg-surface-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-fg-muted transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white/90">
          {s.stat}
        </span>
        {s.type === 'live' && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-fg-muted transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-white animate-pulse" />
            Live API
          </span>
        )}
      </div>
    </Link>
  );
}

// Recompute the real statistics whenever ISR revalidates.
export const revalidate = 3600;

// ── Page ────────────────────────────────────────────────────────────

export default async function DiscoverPage() {
  const stats = await loadStats();
  const sources = buildSources(stats);
  const local = sources.filter((s) => s.type === 'local');
  const live = sources.filter((s) => s.type === 'live');

  const heroStats = [
    { value: formatNum(stats.feedArticles), label: 'articles indexed' },
    { value: stats.ycCompanies.toLocaleString(), label: 'YC companies' },
    { value: formatNum(stats.awesomeLinks), label: 'curated links' },
    { value: stats.knowledgeLessons.toLocaleString(), label: 'lessons' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero — real numbers up front */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Discover
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-5">
              Every source,&nbsp;<span className="text-accent">one gateway</span>
            </h1>
            <p className="text-lg text-fg-secondary max-w-2xl">
              Curated knowledge and live web data — each source with its own search, its own interface,
              and real numbers that update with the data.
            </p>
          </div>

          {/* Real-stat strip */}
          <div className="flex gap-2 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:gap-1 bg-surface-secondary">
            {heroStats.map((s) => (
              <div key={s.label} className="shrink-0 w-[70vw] snap-start bg-white p-6 sm:p-7 sm:w-auto">
                <p className="text-3xl sm:text-4xl font-extrabold text-fg tabular-nums tracking-tight">{s.value}</p>
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-fg-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local cache sources */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-8 sm:mb-12 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Built-in data
            </span>
            <span className="text-[10px] text-fg-muted/60 font-mono">Refreshes automatically from the registry</span>
          </div>

          <div className="flex gap-2 overflow-x-auto -mx-6 px-6 pb-2 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:gap-1 sm:overflow-visible sm:snap-none lg:grid-cols-3">
            {local.map((s) => (
              <SourceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Live API sources */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-8 sm:mb-12 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              Live APIs
            </span>
            <span className="text-[10px] text-fg-muted/60 font-mono">Real-time search — every source has its own query engine</span>
          </div>

          <div className="flex gap-2 overflow-x-auto -mx-6 px-6 pb-2 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:gap-1 sm:overflow-visible sm:snap-none lg:grid-cols-3">
            {live.map((s) => (
              <SourceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
