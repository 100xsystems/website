'use client';

import React from 'react';
import Link from 'next/link';

// ── Type Definitions ────────────────────────────────────────────────

interface DiscoverType {
  slug: string;
  label: string;
  description: string;
  type: 'local' | 'live';
  bgColor: string;
  hoverBg: string;
  icon: React.ReactNode;
  count: string;
}

const TYPES: DiscoverType[] = [
  {
    slug: 'knowledge',
    label: 'Knowledge Curriculum',
    description: '162 curated software engineering concepts across principles, languages, tools, and patterns.',
    type: 'local',
    bgColor: 'bg-blue-600',
    hoverBg: 'hover:bg-blue-600',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    count: '162 concepts',
  },
  {
    slug: 'feed',
    label: 'Engineering Blogs',
    description: 'Latest articles from 300+ top engineering blogs across the industry.',
    type: 'local',
    bgColor: 'bg-accent',
    hoverBg: 'hover:bg-accent',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2z" />
      </svg>
    ),
    count: '300+ feeds',
  },
  {
    slug: 'yc',
    label: 'YC Companies',
    description: '6,000+ Y Combinator startups with full catalog and daily changes.',
    type: 'local',
    bgColor: 'bg-orange-500',
    hoverBg: 'hover:bg-orange-500',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M7 7l3.5 7.5V17h2.5v-2.5L16.5 7h-2.5L12 11.5 9.5 7H7z" fill="white" />
      </svg>
    ),
    count: '6,000+ companies',
  },
  {
    slug: 'ph',
    label: 'Product Hunt',
    description: '900+ products and trending launches ranked by upvotes.',
    type: 'local',
    bgColor: 'bg-red-500',
    hoverBg: 'hover:bg-red-500',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.55 7.6c-.68 1.87-2.48 3.03-4.55 3.03H8.53l-1.05 5.27H4.92L7.5 6.9h4.52c2.8 0 4.98 1.68 4.53 4.7z" />
      </svg>
    ),
    count: '900+ products',
  },
  {
    slug: 'hn',
    label: 'Hacker News',
    description: 'Top stories and discussions from the Y Combinator community.',
    type: 'live',
    bgColor: 'bg-orange-600',
    hoverBg: 'hover:bg-orange-600',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm4.8 4.8l5.2 10.4v4h3.6v-4l5.2-10.4h-3.6l-3.4 7.8-3.4-7.8H4.8z" />
      </svg>
    ),
    count: 'Live search',
  },
  {
    slug: 'github',
    label: 'GitHub Repos',
    description: 'Search public repositories by stars, language, and topics.',
    type: 'live',
    bgColor: 'bg-gray-800',
    hoverBg: 'hover:bg-gray-800',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    count: 'Live search',
  },
  {
    slug: 'stackoverflow',
    label: 'Stack Overflow',
    description: 'Q&A for programming topics, sorted by votes and relevance.',
    type: 'live',
    bgColor: 'bg-orange-500',
    hoverBg: 'hover:bg-orange-500',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M18.99 21.39V14.7h2.4v8.7H0v-8.7h2.4v6.69h16.59zM15.6 2.4L5.49 12.84l1.68 1.71L17.31 4.11 15.6 2.4zM19.8 8.1l-7.8 8.12-1.65-1.68 7.8-8.12 1.65 1.68zM6.6 13.07L3.84 9.87l1.68-1.71 2.76 3.2-1.68 1.71z" />
      </svg>
    ),
    count: 'Live search',
  },
  {
    slug: 'npm',
    label: 'NPM Packages',
    description: 'Search the npm registry for packages by score, quality, and maintenance.',
    type: 'live',
    bgColor: 'bg-red-600',
    hoverBg: 'hover:bg-red-600',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <rect x="10" y="6" width="8" height="12" fill="white" />
        <rect x="12" y="8" width="4" height="8" fill="currentColor" />
      </svg>
    ),
    count: 'Live search',
  },
  {
    slug: 'devto',
    label: 'Dev.to',
    description: 'Developer articles and discussions from the DEV community.',
    type: 'live',
    bgColor: 'bg-gray-800',
    hoverBg: 'hover:bg-gray-800',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .69-.1.88-.28.24-.23.36-.63.36-1.22 0-.63-.13-1.07-.36-1.28l-.08-.06zM0 0v24h24V0H0zm14.38 14.34c-.44.35-1.07.53-1.88.53-.24.01-.52 0-.83-.01l-.09-1.17-.08-1.16.1-.06c.27-.06.57-.09.91-.09.5 0 .88.11 1.13.33.3.26.46.66.46 1.19 0 .58-.19.97-.53 1.23l-.19.14zm4.18-5.02c-.33-.12-.77-.18-1.3-.18-.22 0-.45.01-.69.02l.06.47.05.47-.08.04c-.12-.2-.28-.36-.5-.48-.28-.16-.63-.24-1.04-.24-.69 0-1.26.25-1.72.74-.46.5-.7 1.16-.7 2 0 .78.22 1.4.66 1.88.44.47 1.02.7 1.73.7.51 0 .9-.12 1.18-.35.27-.23.46-.52.57-.86l.07.02.07.05.08.73.06.67h2.02l.02-3.64c.01-1.61-.19-2.06-.93-2.42l-.13-.06z" />
      </svg>
    ),
    count: 'Live search',
  },
  {
    slug: 'medium',
    label: 'Medium',
    description: 'Articles and stories from Medium publications by tag.',
    type: 'live',
    bgColor: 'bg-black',
    hoverBg: 'hover:bg-black',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm2.4 4.8h1.68l7.92 10.68V4.8h1.68L22 4.8v14.4h-1.68v-5.28L13.68 4.8v14.4H9.6V8.88L3.12 19.2H0V4.8h2.4z" />
      </svg>
    ),
    count: 'Live search',
  },
  {
    slug: 'ddg',
    label: 'DuckDuckGo',
    description: 'Instant answers and related topics from DuckDuckGo.',
    type: 'live',
    bgColor: 'bg-orange-600',
    hoverBg: 'hover:bg-orange-600',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="11" r="1.5" fill="white" />
        <circle cx="15" cy="11" r="1.5" fill="white" />
        <path d="M12 14c-2 0-3 1-3 1s1 1.5 3 1.5 3-1.5 3-1.5-1-1-3-1z" fill="white" />
      </svg>
    ),
    count: 'Live search',
  },
  {
    slug: 'reddit',
    label: 'Reddit',
    description: 'Discussions and posts from subreddits across programming topics.',
    type: 'live',
    bgColor: 'bg-orange-500',
    hoverBg: 'hover:bg-orange-500',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle cx="7.5" cy="11" r="1.5" fill="white" />
        <circle cx="16.5" cy="11" r="1.5" fill="white" />
        <path d="M12 15c-2 0-3.5.5-3.5.5s.5 2 3.5 2 3.5-2 3.5-2-1.5-.5-3.5-.5z" fill="white" />
        <ellipse cx="12" cy="15.5" rx="1.5" ry="0.5" />
      </svg>
    ),
    count: 'Live search',
  },
  {
    slug: 'wikipedia',
    label: 'Wikipedia',
    description: 'Search Wikipedia articles and reference pages.',
    type: 'live',
    bgColor: 'bg-gray-700',
    hoverBg: 'hover:bg-gray-700',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5c-.26 0-.52-.13-.67-.38l-2.5-4.33-2.5 4.33c-.15.25-.41.38-.67.38-.58 0-.96-.62-.67-1.12l3-5.2-3-5.2c-.29-.5.09-1.12.67-1.12.26 0 .52.13.67.38l2.5 4.33 2.5-4.33c.15-.25.41-.38.67-.38.58 0 .96.62.67 1.12L8.5 13l3 5.2c.29.5-.09 1.12-.67 1.12zM18 13h-2.5v4.5c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5V13H11c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h3.5V6.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5V11H18c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5z" />
      </svg>
    ),
    count: 'Live search',
  },
];

// ─── Grouper ─────────────────────────────────────────────────────────

const LOCAL_TYPES = TYPES.filter((t) => t.type === 'local');
const LIVE_TYPES = TYPES.filter((t) => t.type === 'live');

// ─── Card ────────────────────────────────────────────────────────────

function TypeCard({ t }: { t: DiscoverType }) {
  return (
    <Link
      href={`/discover/${t.slug}`}
      className={cn(
        'group block bg-white p-6 sm:p-8 transition-all duration-300 border border-border hover:border-transparent',
        t.hoverBg,
      )}
    >
      {/* Brand icon */}
      <span className={cn(
        'inline-flex items-center justify-center w-10 h-10 text-white mb-4 transition-colors',
        t.bgColor,
      )}>
        {t.icon}
      </span>

      <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors mb-2">
        {t.label}
      </h3>

      <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-2 mb-4">
        {t.description}
      </p>

      <div className="flex items-center justify-between">
        <span className={cn(
          'px-2 py-1 text-[9px] font-semibold uppercase tracking-wider transition-colors',
          t.type === 'local'
            ? 'bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80'
            : 'bg-accent/10 text-accent group-hover:bg-white/20 group-hover:text-white/80',
        )}>
          {t.count}
        </span>
        <span className={cn(
          'text-[9px] font-bold uppercase tracking-wider transition-colors',
          t.type === 'local' ? 'text-accent group-hover:text-white/70' : 'text-fg-muted group-hover:text-white/70',
        )}>
          Browse &rarr;
        </span>
      </div>
    </Link>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ─── Page ────────────────────────────────────────────────────────────

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              DISCOVER
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              Browse knowledge&nbsp;<span className="text-accent">sources</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-xl mx-auto">
              Explore curated software engineering knowledge, products, companies, and live web data — all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Local sources */}
      <section className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Local Cache
            </span>
            <span className="text-[10px] text-fg-muted/60 font-mono">Always available</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCAL_TYPES.map((t) => (
              <TypeCard key={t.slug} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Live sources */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              Live API
            </span>
            <span className="text-[10px] text-fg-muted/60 font-mono">Real-time search</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIVE_TYPES.map((t) => (
              <TypeCard key={t.slug} t={t} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
