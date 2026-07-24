'use client';

import React, { useState, useMemo } from 'react';
import { FEED_REGISTRY } from './feed.constants';
import { timeAgo, truncate, highlightMatches } from './feed.utils';
import { cn } from '@/application/lib/utils';
import { Icon } from '@/presentation/__components';
import type { Article } from './feed.types';

// ─── Predefined featured sources for the grid view ──────────────────

const GRID_FEATURED_SOURCES = [
  'netflix-tech-blog',
  'cloudflare-blog',
  'aws-architecture',
  'stripe-engineering',
  'discord-engineering',
  'meta-engineering',
  'spotify-engineering',
  'github-engineering',
];

const ARTICLES_PER_SOURCE = 5;

// ─── Props ────────────────────────────────────────────────────────────

interface FeedGridViewProps {
  articles: Article[];
  isLoading: boolean;
  searchQuery: string;
  bookmarks: Array<{ url: string }>;
  readingHistory: string[];
  onBookmarkToggle: (article: { url: string; title: string; feedName: string; feedId: string }) => void;
  onRead: (url: string) => void;
  onClearFilters: () => void;
}

// ─── Grid View — Grouped by Source ───────────────────────────────────────
// Multi-column grid where each source is a header card with its articles listed.
// First row shows the featured sources (Netflix, Cloudflare, AWS, Stripe, etc.)
// in a dense grid. Each column = one source.
//
// On desktop: 4 columns in the first row, 4 columns in the second row.
// On tablet: 2 columns.
// On mobile: 1 column (full width).

export function FeedGridView({
  articles,
  isLoading,
  searchQuery,
  bookmarks,
  readingHistory,
  onBookmarkToggle,
  onRead,
  onClearFilters,
}: FeedGridViewProps) {
  const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set());

  // Group articles by feedId
  const articlesBySource = useMemo(() => {
    const grouped: Record<string, Article[]> = {};
    for (const article of articles) {
      if (!grouped[article.feedId]) grouped[article.feedId] = [];
      grouped[article.feedId].push(article);
    }
    // Sort each group by newest first
    for (const feedId of Object.keys(grouped)) {
      grouped[feedId].sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
    }
    return grouped;
  }, [articles]);

  // Get all feed IDs that have articles, prioritized: featured first, then rest
  const sortedFeedIds = useMemo(() => {
    const available = new Set(Object.keys(articlesBySource));
    const featured = GRID_FEATURED_SOURCES.filter((id) => available.has(id));
    const rest = [...available].filter((id) => !GRID_FEATURED_SOURCES.includes(id));
    // Sort rest by article count (descending)
    rest.sort((a, b) => (articlesBySource[b]?.length ?? 0) - (articlesBySource[a]?.length ?? 0));
    return [...featured, ...rest];
  }, [articlesBySource]);

  const toggleExpand = (feedId: string) => {
    setExpandedSources((prev) => {
      const next = new Set(prev);
      if (next.has(feedId)) next.delete(feedId);
      else next.add(feedId);
      return next;
    });
  };

  // Loading skeleton
  if (isLoading && articles.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border border-black p-4">
            <div className="h-5 w-3/4 bg-surface-secondary animate-pulse mb-4" />
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-3 w-full bg-surface-secondary animate-pulse mb-2" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Article count */}
      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto mb-4 text-[10px] text-fg-muted/60 uppercase tracking-wider">
        {searchQuery
          ? `Found ${articles.length} article${articles.length !== 1 ? 's' : ''} for "${searchQuery}"`
          : articles.length === 0
            ? 'No articles found'
            : `${articles.length} articles from ${sortedFeedIds.length} sources`}
      </div>
      {/* Grid — pageless, no gap, borders as separators */}

      {/* Empty state */}
      {sortedFeedIds.length === 0 && !isLoading ? (
        <div className="text-center py-20 border-2 border-black px-8">
          <div className="text-2xl mb-2">✦</div>
          <p className="text-sm text-fg-secondary mb-1">
            No articles{searchQuery ? ` match "${searchQuery}"` : ' match your current filters.'}
          </p>
          <p className="text-xs text-fg-muted mb-6">Try adjusting your search or filters.</p>
          <button onClick={onClearFilters} className="px-5 py-2 text-[10px] font-bold uppercase tracking-wider bg-accent-yellow text-black hover:bg-yellow-400 transition-colors">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {sortedFeedIds.map((feedId) => {
            const sourceArticles = articlesBySource[feedId] ?? [];
            const source = FEED_REGISTRY.find((f) => f.id === feedId);
            const isExpanded = expandedSources.has(feedId);
            const displayArticles = isExpanded ? sourceArticles : sourceArticles.slice(0, ARTICLES_PER_SOURCE);

            return (
              <SourceGridCard
                key={feedId}
                feedId={feedId}
                sourceName={source?.name ?? feedId}
                sourceUrl={source?.siteUrl ?? '#'}
                tags={source?.tags ?? []}
                articles={displayArticles}
                totalArticles={sourceArticles.length}
                isExpanded={isExpanded}
                searchQuery={searchQuery}
                bookmarks={bookmarks}
                readingHistory={readingHistory}
                onBookmarkToggle={onBookmarkToggle}
                onRead={onRead}
                onToggleExpand={() => toggleExpand(feedId)}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

// ─── Source Grid Card ─────────────────────────────────────────────────

interface SourceGridCardProps {
  feedId: string;
  sourceName: string;
  sourceUrl: string;
  tags: string[];
  articles: Article[];
  totalArticles: number;
  isExpanded: boolean;
  searchQuery: string;
  bookmarks: Array<{ url: string }>;
  readingHistory: string[];
  onBookmarkToggle: (article: { url: string; title: string; feedName: string; feedId: string }) => void;
  onRead: (url: string) => void;
  onToggleExpand: () => void;
}

function SourceGridCard({
  feedId,
  sourceName,
  sourceUrl,
  tags,
  articles,
  totalArticles,
  isExpanded,
  searchQuery,
  bookmarks,
  readingHistory,
  onBookmarkToggle,
  onRead,
  onToggleExpand,
}: SourceGridCardProps) {
  return (
    <div className="border-2 border-black bg-white flex flex-col">
      {/* Source header */}
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block px-4 py-3 bg-surface-secondary border-b-2 border-black hover:bg-accent hover:text-white transition-colors duration-200"
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider truncate group-hover:text-white transition-colors">
            {sourceName}
          </h3>
          <Icon name="external-link" size={12} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-fg-muted group-hover:text-white/70" />
        </div>
        {tags.length > 0 && (
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            {tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider bg-surface-muted text-fg-muted">
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>

      {/* Article list */}
      <div className="flex-1 px-4 py-3 space-y-2 min-h-[120px]">
        {articles.length === 0 ? (
          <div className="text-[10px] text-fg-muted/50 italic">No articles</div>
        ) : (
          articles.map((article) => {
            const isRead = readingHistory.includes(article.url);
            return (
              <div key={article.id} className="group/article relative">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'block text-xs leading-snug py-0.5 transition-colors duration-150',
                    isRead
                      ? 'text-fg-muted/50 hover:text-accent'
                      : 'text-fg hover:text-accent',
                  )}
                  onClick={() => onRead(article.url)}
                >
                  {/* Published date dot + title */}
                  <span className="flex items-start gap-2">
                    <span className={cn(
                      'mt-[5px] w-1.5 h-1.5 shrink-0 rounded-full',
                      isRead ? 'bg-transparent' : 'bg-accent/30 group-hover/article:bg-accent',
                    )} />
                    <span className="flex-1">
                      {searchQuery ? highlightMatches(article.title, searchQuery) : article.title}
                      <span className="block text-[9px] text-fg-muted/50 mt-0.5">
                        {article.publishedAt ? timeAgo(article.publishedAt) : ''}
                        {article.author ? ` · ${article.author}` : ''}
                      </span>
                    </span>
                  </span>
                </a>

                {/* Actions row (visible on hover) */}
                <div className="absolute top-0 right-0 hidden group-hover/article:flex items-center gap-0.5 bg-white pl-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onBookmarkToggle(article);
                    }}
                    className="p-1 text-fg-muted/50 hover:text-accent transition-colors"
                    title={bookmarks.some((b) => b.url === article.url) ? 'Remove bookmark' : 'Bookmark'}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill={bookmarks.some((b) => b.url === article.url) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More / Less footer */}
      {totalArticles > ARTICLES_PER_SOURCE && (
        <button
          onClick={onToggleExpand}
          className="w-full px-4 py-2 text-[9px] font-bold uppercase tracking-widest border-t-2 border-black text-fg-muted hover:text-accent hover:bg-surface-secondary transition-colors duration-150"
        >
          {isExpanded ? `Show less` : `Show all ${totalArticles} articles`}
        </button>
      )}
    </div>
  );
}
