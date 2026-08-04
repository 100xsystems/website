import { promises as fs } from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight, BookOpen, Database, Rss, Star, Zap } from 'lucide-react';
import { cn } from '@/application/lib/utils';
import {
  SiYcombinator, SiProducthunt, SiGithub, SiStackoverflow, SiNpm,
  SiDevdotto, SiMedium, SiReddit, SiDuckduckgo, SiWikipedia,
} from 'react-icons/si';
import type { ReactNode } from 'react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Discover — 100xSystems',
  description:
    'Every source in one gateway — curated collections (engineering blogs, awesome lists, YC companies) and live search engines (Hacker News, GitHub, Stack Overflow, npm and more). Real numbers, updated from the data.',
  openGraph: {
    title: 'Discover — 100xSystems',
    description: 'Curated collections and live search engines, one gateway.',
  },
};

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
    <a
      href={s.href}
      className={cn(
        'group flex flex-col items-start justify-between gap-8 bg-white p-8 text-left transition-all duration-200 active:translate-y-[1px] sm:p-10',
        s.hoverBg,
      )}
    >
      {/* Brand icon chip */}
      <div className="flex w-full items-start justify-between gap-4">
        <span
          className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)] transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white sm:h-20 sm:w-20"
          style={{ '--brand': s.color } as React.CSSProperties}
        >
          {s.icon}
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-accent transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      <div className="w-full">
        <h3 className="text-xl font-extrabold uppercase leading-tight tracking-tight text-fg transition-colors duration-200 group-hover:text-white sm:text-2xl">
          {s.label}
        </h3>
        <p className="mt-3 hidden text-sm leading-relaxed text-fg-secondary transition-colors duration-200 group-hover:text-white/80 sm:block">
          {s.description}
        </p>
      </div>

      {/* Real stat */}
      <div className="flex w-full flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-fg-muted transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white">
          {s.stat}
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
        </span>
        {s.type === 'live' && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-fg-muted transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:bg-white animate-pulse" />
            Live API
          </span>
        )}
      </div>
    </a>
  );
}

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
    <main className="mx-auto bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-fg-muted">
          <Link href="/" className="font-bold uppercase tracking-wider transition-colors hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span className="font-bold uppercase tracking-wider text-fg">Discover</span>
        </div>

        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 bg-accent px-4 py-2 text-sm font-bold uppercase tracking-widest text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            Discover
          </div>
          <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Every source.<br />
            <span className="text-accent">One gateway.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
            {sources.length} sources across curated collections and live search engines.
            Each has its own interface and its own query engine — the numbers below come
            straight from the data, not marketing copy.
          </p>

          {/* Real-stat strip */}
          <div className="mt-8 grid grid-cols-2 gap-1 bg-surface-secondary sm:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-white p-6 sm:p-7">
                <p className="text-3xl font-extrabold text-fg tabular-nums tracking-tight sm:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-fg-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Section 1 — Curated collections ═══ */}
        <section>
          <div className="mb-8 flex items-center gap-5">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-accent/10 text-accent">
              <Database size={24} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                {local.length} collections · curated from the registry
              </p>
              <h2 className="mt-1 text-2xl font-extrabold uppercase tracking-tight text-fg sm:text-3xl">
                Built-in collections
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 bg-surface-secondary sm:grid-cols-2 lg:grid-cols-3">
            {local.map((s) => (
              <SourceCard key={s.slug} s={s} />
            ))}
          </div>
        </section>

        {/* ═══ Section 2 — Live search engines ═══ */}
        <section className="mt-20 sm:mt-28">
          <div className="mb-8 flex items-center gap-5">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-accent/10 text-accent">
              <Zap size={24} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                {live.length} sources · every query hits the live API
              </p>
              <h2 className="mt-1 text-2xl font-extrabold uppercase tracking-tight text-fg sm:text-3xl">
                Live search engines
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 bg-surface-secondary sm:grid-cols-2 lg:grid-cols-3">
            {live.map((s) => (
              <SourceCard key={s.slug} s={s} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
