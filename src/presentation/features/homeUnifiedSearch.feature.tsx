'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Fuse from 'fuse.js';
import { cn } from '@/application/lib/utils';
import { Icon, IconAnimatedGridPattern } from '@/presentation/__components';
import { timeAgo } from '@/feed/feed.utils';
import type { FeedCache, RegistryFeedData } from '@/feed/feed.types';

// ══════════════════════════════════════════════════════════════════════
// BRAND SVG COMPONENTS
// ══════════════════════════════════════════════════════════════════════

function BrandSvgHN({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M0 0h24v24H0V0zm4.8 4.8l5.2 10.4v4h3.6v-4l5.2-10.4h-3.6l-3.4 7.8-3.4-7.8H4.8z" />
    </svg>
  );
}

function BrandSvgReddit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="7.5" cy="11" r="1.5" fill="white" />
      <circle cx="16.5" cy="11" r="1.5" fill="white" />
      <path d="M12 15c-2 0-3.5.5-3.5.5s.5 2 3.5 2 3.5-2 3.5-2-1.5-.5-3.5-.5z" fill="white" />
      <ellipse cx="12" cy="15.5" rx="1.5" ry="0.5" />
    </svg>
  );
}

function BrandSvgGitHub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function BrandSvgSO({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M18.99 21.39V14.7h2.4v8.7H0v-8.7h2.4v6.69h16.59zM15.6 2.4L5.49 12.84l1.68 1.71L17.31 4.11 15.6 2.4zM19.8 8.1l-7.8 8.12-1.65-1.68 7.8-8.12 1.65 1.68zM6.6 13.07L3.84 9.87l1.68-1.71 2.76 3.2-1.68 1.71z" />
    </svg>
  );
}

function BrandSvgNpm({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <rect x="10" y="6" width="8" height="12" fill="white" />
      <rect x="12" y="8" width="4" height="8" fill="currentColor" />
    </svg>
  );
}

function BrandSvgDevTo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .69-.1.88-.28.24-.23.36-.63.36-1.22 0-.63-.13-1.07-.36-1.28l-.08-.06zM0 0v24h24V0H0zm14.38 14.34c-.44.35-1.07.53-1.88.53-.24.01-.52 0-.83-.01l-.09-1.17-.08-1.16.1-.06c.27-.06.57-.09.91-.09.5 0 .88.11 1.13.33.3.26.46.66.46 1.19 0 .58-.19.97-.53 1.23l-.19.14zm4.18-5.02c-.33-.12-.77-.18-1.3-.18-.22 0-.45.01-.69.02l.06.47.05.47-.08.04c-.12-.2-.28-.36-.5-.48-.28-.16-.63-.24-1.04-.24-.69 0-1.26.25-1.72.74-.46.5-.7 1.16-.7 2 0 .78.22 1.4.66 1.88.44.47 1.02.7 1.73.7.51 0 .9-.12 1.18-.35.27-.23.46-.52.57-.86l.07.02.07.05.08.73.06.67h2.02l.02-3.64c.01-1.61-.19-2.06-.93-2.42l-.13-.06z" />
    </svg>
  );
}

function BrandSvgMedium({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M0 0h24v24H0V0zm2.4 4.8h1.68l7.92 10.68V4.8h1.68L22 4.8v14.4h-1.68v-5.28L13.68 4.8v14.4H9.6V8.88L3.12 19.2H0V4.8h2.4z" />
    </svg>
  );
}

function BrandSvgDDG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="11" r="1.5" fill="white" />
      <circle cx="15" cy="11" r="1.5" fill="white" />
      <path d="M12 14c-2 0-3 1-3 1s1 1.5 3 1.5 3-1.5 3-1.5-1-1-3-1z" fill="white" />
    </svg>
  );
}

function BrandSvgWikipedia({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5c-.26 0-.52-.13-.67-.38l-2.5-4.33-2.5 4.33c-.15.25-.41.38-.67.38-.58 0-.96-.62-.67-1.12l3-5.2-3-5.2c-.29-.5.09-1.12.67-1.12.26 0 .52.13.67.38l2.5 4.33 2.5-4.33c.15-.25.41-.38.67-.38.58 0 .96.62.67 1.12L8.5 13l3 5.2c.29.5-.09 1.12-.67 1.12zM18 13h-2.5v4.5c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5V13H11c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h3.5V6.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5V11H18c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5z" />
    </svg>
  );
}

function BrandSvgYC({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M7 7l3.5 7.5V17h2.5v-2.5L16.5 7h-2.5L12 11.5 9.5 7H7z" fill="white" />
    </svg>
  );
}

function BrandSvgPH({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.55 7.6c-.68 1.87-2.48 3.03-4.55 3.03H8.53l-1.05 5.27H4.92L7.5 6.9h4.52c2.8 0 4.98 1.68 4.53 4.7z" />
    </svg>
  );
}

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

interface LocalSearchItem {
  type: 'knowledge' | 'feed' | 'yc' | 'ph';
  title: string;
  url: string;
  description: string | null;
  metadata: Record<string, unknown>;
}

// ══════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════

/** Convert unknown metadata value to string for display */
function v(val: unknown, fallback = ''): string {
  if (val == null) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return String(val);
  return String(val);
}

/** Convert unknown number to number */
function n(val: unknown, fallback = 0): number {
  if (typeof val === 'number') return val;
  return fallback;
}

/** Extract domain from a URL for favicon lookup */
function getDomain(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/** Website favicon fetched via Google's favicon service */
function Favicon({ url, className = 'w-5 h-5' }: { url: string; className?: string }) {
  const domain = getDomain(url);
  if (!domain) return null;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
      alt=""
      className={`${className} shrink-0 rounded-sm`}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      loading="lazy"
    />
  );
}

// ══════════════════════════════════════════════════════════════════════
// SOURCE CONFIG
// ══════════════════════════════════════════════════════════════════════

interface SourceConfig {
  id: string;
  label: string;
  type: 'local' | 'live';
  color: string;
  bgColor: string;
  hoverBg: string;
  brandEl: React.ReactNode;
}

const SOURCES: SourceConfig[] = [
  { id: 'knowledge', label: 'Knowledge Curriculum', type: 'local', color: 'text-blue-600', bgColor: 'bg-blue-600', hoverBg: 'hover:bg-blue-600', brandEl: <BrandSvgKnowledge /> },
  { id: 'feed', label: 'Engineering Blogs', type: 'local', color: 'text-accent', bgColor: 'bg-accent', hoverBg: 'hover:bg-accent', brandEl: null },
  { id: 'yc', label: 'YC Companies', type: 'local', color: 'text-orange-500', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500', brandEl: <BrandSvgYC /> },
  { id: 'ph', label: 'Product Hunt', type: 'local', color: 'text-red-500', bgColor: 'bg-red-500', hoverBg: 'hover:bg-red-500', brandEl: <BrandSvgPH /> },
  { id: 'hn', label: 'Hacker News', type: 'live', color: 'text-orange-600', bgColor: 'bg-orange-600', hoverBg: 'hover:bg-orange-600', brandEl: <BrandSvgHN /> },
  { id: 'github', label: 'GitHub', type: 'live', color: 'text-gray-800', bgColor: 'bg-gray-800', hoverBg: 'hover:bg-gray-800', brandEl: <BrandSvgGitHub /> },
  { id: 'stackoverflow', label: 'Stack Overflow', type: 'live', color: 'text-orange-500', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500', brandEl: <BrandSvgSO /> },
  { id: 'npm', label: 'NPM', type: 'live', color: 'text-red-600', bgColor: 'bg-red-600', hoverBg: 'hover:bg-red-600', brandEl: <BrandSvgNpm /> },
  { id: 'devto', label: 'Dev.to', type: 'live', color: 'text-gray-800', bgColor: 'bg-gray-800', hoverBg: 'hover:bg-gray-800', brandEl: <BrandSvgDevTo /> },
  { id: 'medium', label: 'Medium', type: 'live', color: 'text-black', bgColor: 'bg-black', hoverBg: 'hover:bg-black', brandEl: <BrandSvgMedium /> },
  { id: 'ddg', label: 'DuckDuckGo', type: 'live', color: 'text-orange-600', bgColor: 'bg-orange-600', hoverBg: 'hover:bg-orange-600', brandEl: <BrandSvgDDG /> },
  { id: 'reddit', label: 'Reddit', type: 'live', color: 'text-orange-500', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500', brandEl: <BrandSvgReddit /> },
  { id: 'wikipedia', label: 'Wikipedia', type: 'live', color: 'text-gray-700', bgColor: 'bg-gray-700', hoverBg: 'hover:bg-gray-700', brandEl: <BrandSvgWikipedia /> },
];

const SOURCE_MAP = new Map(SOURCES.map((s) => [s.id, s]));
const LOCAL_SOURCES = SOURCES.filter((s) => s.type === 'local');
const LIVE_SOURCES = SOURCES.filter((s) => s.type === 'live');

// ══════════════════════════════════════════════════════════════════════
// UNIQUE CARD COMPONENTS PER SOURCE
// ══════════════════════════════════════════════════════════════════════

function FeedCard({ item, config }: { item: LocalSearchItem; config: SourceConfig }) {
  const m = item.metadata;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={item.url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">
          {v(m?.feedName)}
        </span>
        {v(m?.publishedAt) && (
          <span className="text-xs text-fg-muted/50 group-hover:text-white/40 transition-colors">· {timeAgo(v(m?.publishedAt))}</span>
        )}
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3">
        {item.title}
      </h3>
      {v(m?.author) && (
        <p className="mt-2 text-xs text-fg-muted/60 group-hover:text-white/50 transition-colors">by {v(m?.author)}</p>
      )}
    </a>
  );
}

function YcCard({ item, config }: { item: LocalSearchItem; config: SourceConfig }) {
  const m = item.metadata;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Favicon url={item.url} />
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors truncate">{item.title}</h3>
        </div>
        {m?.hiring === true && <span className="shrink-0 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 group-hover:text-white/80"><span className="w-2 h-2 rounded-full bg-green-600 group-hover:bg-white" />Hiring</span>}
      </div>
      {item.description && <p className="text-sm sm:text-base text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">{item.description}</p>}
      <div className="mt-4 flex items-center gap-3 flex-wrap">
        {v(m?.batch) && <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80 transition-colors">{v(m?.batch)}</span>}
        {v(m?.stage) && <span className="text-[10px] text-fg-muted/60 group-hover:text-white/50 transition-colors uppercase tracking-wider">{v(m?.stage)}</span>}
        {m?.top_company === true && <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 group-hover:text-white/90 transition-colors">Top</span>}
      </div>
    </a>
  );
}

function PhCard({ item, config }: { item: LocalSearchItem; config: SourceConfig }) {
  const m = item.metadata;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Favicon url={item.url} />
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors truncate">{item.title}</h3>
        </div>
        {n(m?.votesCount) > 0 && <span className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-fg-muted group-hover:text-white/70 transition-colors"><Icon name="arrow-up" size={14} />{n(m?.votesCount)}</span>}
      </div>
      {item.description && <p className="mt-2 text-sm sm:text-base text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">{item.description}</p>}
    </a>
  );
}

function HnCard({ result, config }: { result: LiveSearchResult; config: SourceConfig }) {
  const m = result.metadata;
  return (
    <a href={result.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={result.url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">Hacker News</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3">{result.title}</h3>
      <div className="flex items-center gap-3 mt-3 text-sm text-fg-muted/60 group-hover:text-white/50 transition-colors">
        {n(m?.points) > 0 && <span>{n(m?.points)} points</span>}
        {v(m?.author) && <><span>·</span><span>by {v(m?.author)}</span></>}
        {n(m?.comments) > 0 && <><span>·</span><span>{n(m?.comments)} comments</span></>}
      </div>
    </a>
  );
}

function GitHubCard({ result, config }: { result: LiveSearchResult; config: SourceConfig }) {
  const m = result.metadata;
  return (
    <a href={result.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={result.url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">GitHub</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors mb-2">{result.title}</h3>
      {result.description && <p className="text-sm sm:text-base text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3 mb-3">{result.description}</p>}
      <div className="flex items-center gap-3 text-sm text-fg-muted/60 group-hover:text-white/50 transition-colors flex-wrap">
        {n(m?.stars) > 0 && <span>★ {n(m?.stars)}</span>}
        {v(m?.language) && <span className="px-2 py-1 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/70 text-[10px] font-semibold uppercase tracking-wider">{v(m?.language)}</span>}
        {n(m?.forks) > 0 && <span>{n(m?.forks)} forks</span>}
      </div>
    </a>
  );
}

function SOCard({ result, config }: { result: LiveSearchResult; config: SourceConfig }) {
  const m = result.metadata;
  return (
    <a href={result.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={result.url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">Stack Overflow</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3 mb-2">{result.title}</h3>
      <div className="flex items-center gap-3 text-sm text-fg-muted/60 group-hover:text-white/50 transition-colors flex-wrap">
        {n(m?.score) > 0 && <span>{n(m?.score)} votes</span>}
        {n(m?.answerCount) > 0 && <><span>·</span><span>{n(m?.answerCount)} answers</span></>}
        {m?.isAnswered === true && <span className="text-green-600 group-hover:text-white/80">✓ answered</span>}
        {Array.isArray(m?.tags) && (m.tags as string[]).slice(0, 3).map((t) => (
          <span key={t} className="px-2 py-1 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/70 text-[10px] font-semibold uppercase tracking-wider">{t}</span>
        ))}
      </div>
    </a>
  );
}

function NpmCard({ result, config }: { result: LiveSearchResult; config: SourceConfig }) {
  const m = result.metadata;
  return (
    <a href={result.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={result.url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">npm</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors mb-2 font-mono">{result.title}</h3>
      {result.description && <p className="text-sm sm:text-base text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3 mb-3">{result.description}</p>}
      <div className="flex items-center gap-3 text-sm text-fg-muted/60 group-hover:text-white/50 transition-colors">
        {v(m?.version) && <span className="font-mono">v{v(m?.version)}</span>}
        {n(m?.score) > 0 && <span>score: {n(m?.score).toFixed(2)}</span>}
      </div>
    </a>
  );
}

function DevtoCard({ result, config }: { result: LiveSearchResult; config: SourceConfig }) {
  const m = result.metadata;
  return (
    <a href={result.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={result.url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">Dev.to</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3 mb-2">{result.title}</h3>
      <div className="flex items-center gap-3 text-sm text-fg-muted/60 group-hover:text-white/50 transition-colors flex-wrap">
        {n(m?.positiveReactions) > 0 && <span>{n(m?.positiveReactions)} ❤</span>}
        {n(m?.readingTime) > 0 && <><span>·</span><span>{n(m?.readingTime)} min read</span></>}
        {Array.isArray(m?.tags) && (m.tags as string[]).slice(0, 3).map((t) => (
          <span key={t} className="px-2 py-1 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/70 text-[10px] font-semibold uppercase tracking-wider">{t}</span>
        ))}
      </div>
    </a>
  );
}

function MediumCard({ result, config }: { result: LiveSearchResult; config: SourceConfig }) {
  const m = result.metadata;
  return (
    <a href={result.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={result.url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">Medium</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3 mb-2">{result.title}</h3>
      <div className="flex items-center gap-3 text-sm text-fg-muted/60 group-hover:text-white/50 transition-colors">
        {v(m?.author) && <span>by {v(m?.author)}</span>}
        {v(m?.publishedAt) && <><span>·</span><span>{new Date(v(m?.publishedAt)).toLocaleDateString()}</span></>}
      </div>
    </a>
  );
}

function DdgCard({ result, config }: { result: LiveSearchResult; config: SourceConfig }) {
  const m = result.metadata;
  return (
    <a href={result.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={result.url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">DuckDuckGo</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3 mb-2">{result.title}</h3>
      {result.description && <p className="text-sm sm:text-base text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">{result.description}</p>}
      {v(m?.source) && <p className="mt-2 text-sm text-fg-muted/50 group-hover:text-white/40 transition-colors">via {v(m?.source)}</p>}
    </a>
  );
}

function WikipediaCard({ result, config }: { result: LiveSearchResult; config: SourceConfig }) {
  const m = result.metadata;
  return (
    <a href={result.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <Favicon url={result.url} className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">Wikipedia</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3">{result.title}</h3>
      {result.description && <p className="mt-2 text-sm sm:text-base text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">{result.description}</p>}
      {v(m?.key) && <p className="mt-2 text-[10px] text-fg-muted/40 group-hover:text-white/30 transition-colors">Page ID: {v(m?.pageId)}</p>}
    </a>
  );
}

function RedditCard({ result, config }: { result: LiveSearchResult; config: SourceConfig }) {
  const m = result.metadata;
  return (
    <a href={result.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-2">
        <Favicon url={result.url} className="w-4 h-4" />
        {v(m?.subreddit) && <span className="text-xs font-bold uppercase tracking-wider text-fg-muted group-hover:text-white/70 transition-colors">r/{v(m?.subreddit)}</span>}
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors line-clamp-3">{result.title}</h3>
      <div className="flex items-center gap-3 mt-3 text-sm text-fg-muted/60 group-hover:text-white/50 transition-colors">
        {n(m?.points) > 0 && <span>{n(m?.points)} points</span>}
        {v(m?.author) && <><span>·</span><span>by {v(m?.author)}</span></>}
        {n(m?.comments) > 0 && <><span>·</span><span>{n(m?.comments)} comments</span></>}
      </div>
    </a>
  );
}

// ─── Knowledge Card ─────────────────────────────────────────────────

function KnowledgeCard({ item, config }: { item: LocalSearchItem; config: SourceConfig }) {
  const m = item.metadata;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      className={cn('block bg-white p-6 sm:p-8 transition-all duration-300', config.hoverBg, 'group')}>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-4 h-4 flex items-center justify-center shrink-0 rounded-sm bg-blue-100 text-blue-700 text-[8px] font-bold uppercase">
          {v(m?.category)?.slice(0, 3)}
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">
          {v(m?.category)}
        </span>
        <span className="text-[9px] text-fg-muted/40 group-hover:text-white/30 transition-colors uppercase tracking-wider">
          concept
        </span>
      </div>
      <h3 className="text-base sm:text-lg font-bold leading-snug text-fg group-hover:text-white transition-colors">{item.title}</h3>
      {item.description && (
        <p className="mt-2 text-sm sm:text-base text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">{item.description}</p>
      )}
    </a>
  );
}

// ─── Card Router ────────────────────────────────────────────────────

function SourceCard({ item, config, result }: { item?: LocalSearchItem; config: SourceConfig; result?: LiveSearchResult }) {
  switch (config.id) {
    case 'knowledge': return <KnowledgeCard item={item!} config={config} />;
    case 'feed': return <FeedCard item={item!} config={config} />;
    case 'yc': return <YcCard item={item!} config={config} />;
    case 'ph': return <PhCard item={item!} config={config} />;
    case 'hn': return <HnCard result={result!} config={config} />;
    case 'github': return <GitHubCard result={result!} config={config} />;
    case 'stackoverflow': return <SOCard result={result!} config={config} />;
    case 'npm': return <NpmCard result={result!} config={config} />;
    case 'devto': return <DevtoCard result={result!} config={config} />;
    case 'medium': return <MediumCard result={result!} config={config} />;
    case 'ddg': return <DdgCard result={result!} config={config} />;
    case 'reddit': return <RedditCard result={result!} config={config} />;
    case 'wikipedia': return <WikipediaCard result={result!} config={config} />;
    default: return null;
  }
}

// ══════════════════════════════════════════════════════════════════════
// FUSE SETUP
// ══════════════════════════════════════════════════════════════════════

function createFuseIndex(items: LocalSearchItem[]) {
  return new Fuse(items, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  });
}
function BrandSvgKnowledge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════
// SOURCE SECTION HEADER
// ══════════════════════════════════════════════════════════════════════

function SourceSection({ source, count, children }: { source: SourceConfig; count: number; children: React.ReactNode }) {
  return (
    <section id={`search-${source.id}`} className="mb-16 sm:mb-20">
      <div className="mb-6 sm:mb-8">
        <div className={cn('inline-flex items-center gap-3 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white', source.bgColor)}>
          {source.brandEl && <span className="w-5 h-5 flex items-center justify-center">{source.brandEl}</span>}
          {source.label}
          <span className="text-white/60 font-mono text-[10px]">({count})</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {children}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════

export function HomeUnifiedSearch() {
  const [query, setQuery] = useState('');
  const [localResults, setLocalResults] = useState<Record<string, LocalSearchItem[]>>({});
  const [liveResults, setLiveResults] = useState<Record<string, LiveSearchResult[]>>({});
  const [liveErrors, setLiveErrors] = useState<Array<{ source: string; error: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const fuseRef = useRef<ReturnType<typeof createFuseIndex> | null>(null);
  // Pageless browse: keep all items for empty-query browse mode
  const allLocalRef = useRef<Record<string, LocalSearchItem[]>>({ knowledge: [], feed: [], yc: [], ph: [] });

  // ── Load local data on mount ──────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    async function load() {
      const knowledgeItems: LocalSearchItem[] = [];
      const feedItems: LocalSearchItem[] = [];
      const ycItems: LocalSearchItem[] = [];
      const phItems: LocalSearchItem[] = [];

      // Knowledge graph — FIRST in order
      let knowledgeDescriptions: Record<string, string> = {};
      try {
        const seedsRes = await fetch('/knowledge-cache/seeds.json');
        if (seedsRes.ok) {
          const seeds = await seedsRes.json() as Array<{ id: string; description: string }>;
          for (const s of seeds) {
            knowledgeDescriptions[s.id] = s.description;
          }
        }
      } catch {}

      try {
        const manifestRes = await fetch('/knowledge-cache/manifest.json');
        if (manifestRes.ok) {
          const manifest = await manifestRes.json() as { labelMap: Record<string, string>; categoryMap: Record<string, string> };
          for (const [slug, label] of Object.entries(manifest.labelMap)) {
            const category = manifest.categoryMap[slug] || 'other';
            knowledgeItems.push({
              type: 'knowledge',
              title: label,
              url: `/knowledge/${slug}`,
              description: knowledgeDescriptions[slug] || null,
              metadata: { category, slug },
            });
          }
        }
      } catch {}

      try {
        const feedRes = await fetch('/feed-cache.json');
        if (feedRes.ok) {
          const cache: FeedCache = await feedRes.json();
          for (const [feedId, feedData] of Object.entries(cache.feeds)) {
            for (const item of (feedData as RegistryFeedData).items.slice(0, 30)) {
              feedItems.push({
                type: 'feed', title: item.title, url: item.link, description: item.summary,
                metadata: { feedId, feedName: (feedData as RegistryFeedData).feedName, author: item.author, publishedAt: item.publishedAt },
              });
            }
          }
        }
      } catch {}

      try {
        const ycRes = await fetch('/yc-cache/companies.json');
        if (ycRes.ok) {
          const companies: YcCompany[] = await ycRes.json();
          for (const company of companies.slice(0, 500)) {
            ycItems.push({
              type: 'yc', title: company.name, url: company.website || `https://www.ycombinator.com/companies/${company.slug}`,
              description: company.one_liner, metadata: { batch: company.batch, stage: company.stage, team_size: company.team_size, top_company: company.top_company, hiring: company.isHiring },
            });
          }
        }
      } catch {}

      try {
        const phRes = await fetch('/ph-cache/products.json');
        if (phRes.ok) {
          const data = await phRes.json() as { products: PhProduct[] };
          for (const product of (data.products || []).slice(0, 300)) {
            phItems.push({
              type: 'ph', title: product.name, url: product.url, description: product.tagline,
              metadata: { votesCount: product.votesCount, commentsCount: product.commentsCount },
            });
          }
        }
      } catch {}

      if (!mounted) return;
      const allItems = {
        knowledge: knowledgeItems,
        feed: feedItems,
        yc: ycItems,
        ph: phItems,
      };
      allLocalRef.current = allItems;
      fuseRef.current = createFuseIndex([...knowledgeItems, ...feedItems, ...ycItems, ...phItems]);
    }
    load();
    return () => { mounted = false; };
  }, []);

  // ── Search handler ────────────────────────────────────────────────
  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setLocalResults({}); setLiveResults({}); setLiveErrors([]); setHasSearched(false);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true); setHasSearched(true); setLiveErrors([]);

    // Local Fuse search
    const hits: Record<string, LocalSearchItem[]> = { knowledge: [], feed: [], yc: [], ph: [] };
    if (fuseRef.current) {
      for (const { item } of fuseRef.current.search(q.toLowerCase())) {
        hits[item.type].push(item);
      }
    }
    setLocalResults(hits);

    // Live API search
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=6&sources=${LIVE_SOURCES.map((s) => s.id).join(',')}`, { signal: controller.signal });
      if (res.ok) {
        const data: LiveSearchResponse = await res.json();
        const grouped: Record<string, LiveSearchResult[]> = {};
        for (const r of data.results || []) {
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

  // 1s debounce
  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 1000);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  useEffect(() => () => abortRef.current?.abort(), []);

  // ── Count helpers ─────────────────────────────────────────────────
  const totalLocal = query.trim().length < 2
    // Browse mode: count all items from allLocalRef (filtered by selectedSource if any)
    ? Object.entries(allLocalRef.current)
      .filter(([key]) => !selectedSource || selectedSource === key)
      .reduce((s, [, a]) => s + a.length, 0)
    // Search mode: count Fuse results
    : Object.values(localResults).reduce((s, a) => s + a.length, 0);
  const totalLive = Object.values(liveResults).reduce((s, a) => s + a.length, 0);

  return (
    <>
      {/* ── SEARCH HERO — with dynamic animated background ── */}
      <section className="relative overflow-hidden flex items-center bg-white" style={{ minHeight: 'calc(100vh - 7rem)' }}>
        <div className="absolute inset-0 z-0">
          <IconAnimatedGridPattern />
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-12 py-16 sm:py-20 w-full text-center">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent/80 text-white mb-5">
              100X SEARCH
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight leading-tight mb-3">
              Search everything
            </h1>
            <p className="text-sm sm:text-base text-fg-secondary/70 font-medium tracking-wide leading-relaxed max-w-xl mx-auto">
              <span className="text-accent font-bold">Every system.</span>{' '}
              <span className="text-accent-yellow font-bold">Every stack.</span>{' '}
              <span className="text-fg-muted font-bold">Every pattern.</span>{' '}
              <span className="text-fg">All at once.</span>
            </p>
          </div>

          {/* Hero search bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none">
                <Icon name="search" size={28} />
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search engineering blogs, YC companies, GitHub repos, packages..."
                className="w-full bg-white/90 backdrop-blur-sm text-xl py-5 pl-16 pr-16 border-0 border-b-2 border-transparent focus:border-accent focus:outline-none focus:ring-0 focus:bg-white placeholder:text-fg-muted/50 text-fg shadow-lg shadow-black/5 transition-all duration-150"
                autoComplete="off" spellCheck={false} autoFocus
              />
              {query && (
                <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors" aria-label="Clear">
                  <Icon name="x" size={22} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS — borderless, immersive, pageless ── */}
      {hasSearched && (
        <section className="pb-20 sm:pb-28 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

            {/* Loading state */}
            {loading && (
              <div className="space-y-12 mt-8">
                <div className="space-y-4">
                  <div className="h-6 w-40 bg-surface-secondary animate-pulse" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((n) => <div key={n} className="h-32 bg-surface-secondary animate-pulse" />)}
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {!loading && (
              <>
                {/* ── SOURCE FILTER CARDS — always visible, always big ── */}
                {(totalLocal > 0 || totalLive > 0) && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 mb-10 sm:mb-12">
                    {SOURCES.map((source) => {
                      const isSelected = selectedSource === source.id;
                      return (
                        <button
                          key={source.id}
                          type="button"
                          onClick={() => setSelectedSource((prev) => prev === source.id ? null : source.id)}
                          className={cn(
                            'flex items-center gap-2.5 px-4 py-3 border transition-all duration-200 text-left',
                            isSelected
                              ? cn(source.bgColor, 'text-white border-transparent')
                              : 'bg-white text-fg border-border hover:text-white',
                            !isSelected && source.hoverBg,
                          )}
                        >
                          {source.brandEl && (
                            <span className={cn('w-5 h-5 flex items-center justify-center shrink-0', isSelected ? 'text-white' : 'text-fg-muted')}>
                              {source.brandEl}
                            </span>
                          )}
                          <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">{source.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* LOCAL SECTIONS */}
                {LOCAL_SOURCES.map((source) => {
                  if (selectedSource && selectedSource !== source.id) return null;
                  // If query is empty, show all items from the full cache (browse mode)
                  // Otherwise show Fuse search results
                  const items = (query.trim().length < 2
                    ? (allLocalRef.current[source.id] ?? [])
                    : (localResults[source.id] ?? [])
                  );
                  if (items.length === 0) return null;
                  return (
                    <SourceSection key={source.id} source={source} count={items.length}>
                      {items.slice(0, 9).map((item, i) => (
                        <SourceCard key={`${source.id}-${i}`} item={item} config={source} />
                      ))}
                    </SourceSection>
                  );
                })}

                {/* Live divider */}
                {totalLocal > 0 && totalLive > 0 && (
                  <div className="border-t border-border my-12" />
                )}

                {/* LIVE SECTIONS — only show when searching (need query for live APIs) */}
                {LIVE_SOURCES.map((source) => {
                  if (query.trim().length < 2) return null;
                  if (selectedSource && selectedSource !== source.id) return null;
                  const items = liveResults[source.id] ?? [];
                  if (items.length === 0) return null;
                  return (
                    <SourceSection key={source.id} source={source} count={items.length}>
                      {items.map((item, i) => (
                        <SourceCard key={`${source.id}-${i}`} config={source} result={item} />
                      ))}
                    </SourceSection>
                  );
                })}

                {/* No results */}
                {totalLocal === 0 && totalLive === 0 && liveErrors.length === 0 && (
                  <div className="text-center py-16">
                    <Icon name="search" size={32} className="mx-auto mb-4 text-fg-muted/40" />
                    <p className="text-sm font-semibold text-fg mb-1">No results found</p>
                    <p className="text-xs text-fg-muted">Try a different search term or broaden your query.</p>
                  </div>
                )}

                {/* Errors */}
                {liveErrors.length > 0 && (
                  <div className="mt-8 text-center">
                    <p className="text-[9px] text-fg-muted/50">{liveErrors.map((e) => `${e.source}: ${e.error}`).join(' · ')}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
