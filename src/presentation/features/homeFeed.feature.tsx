'use client';

import React from 'react';
import { FEED_REGISTRY } from '@/feed/feed.constants';
import { timeAgo } from '@/feed/feed.utils';
import { Icon, Button } from '@/presentation/__components';
import type { Article } from '@/feed/feed.types';

// ─── Source-specific SVG Icons with brand colors ─────────────────────

interface BrandIcon { svg: React.ReactNode; color: string; }

const brandIcons: Record<string, BrandIcon> = {
  'netflix-tech-blog': {
    color: '#E50914',
    svg: (
      <path d="M7.5 2H4.5L4.5 22H9L9 10.5L13 22H17L17 2H13L13 12.5L7.5 2Z" />
    ),
  },
  'cloudflare-blog': {
    color: '#F38020',
    svg: (
      <>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M7 14C7 14 8.5 12 12 12C15.5 12 17 14 17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M9 16C9 16 10 14.5 12 14.5C14 14.5 15 16 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M6 11C6 11 8 8.5 12 8.5C16 8.5 18 11 18 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  'aws-architecture': {
    color: '#FF9900',
    svg: (
      <>
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </>
    ),
  },
  'spotify-engineering': {
    color: '#1DB954',
    svg: (
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.585 14.473a.623.623 0 01-.857.206c-2.348-1.434-5.304-1.758-8.785-.963a.624.624 0 01-.273-1.218c3.809-.856 7.076-.493 9.709 1.118a.624.624 0 01.206.857zm1.237-2.74a.78.78 0 01-1.073.256c-2.687-1.652-6.785-2.13-9.965-1.165a.78.78 0 01-.454-1.49c3.587-1.093 8.096-.562 11.236 1.326a.78.78 0 01.256 1.073zm.106-2.855c-3.222-1.914-8.538-2.09-11.618-1.156a.935.935 0 11-.543-1.79c3.472-1.054 9.274-.852 12.88 1.31a.935.935 0 11-.96 1.604z" />
    ),
  },
  'stripe-engineering': {
    color: '#635BFF',
    svg: (
      <path d="M13.3 9.6c0-.8-.5-1.1-1.3-1.1H9.6v2.9h2.4c.8 0 1.3-.3 1.3-1.1v-.7zm-3.7 5.8h2.8l2.3-3.1-2.3-3.1h-2.8l2.3 3.1-2.3 3.1zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.5 9.6c0 2.3-1.9 3.5-4 3.5H8v-7h3.5c2.1 0 4 1.2 4 3.5v.8l-2.5-.4v-.4c0-.7-.5-1.1-1.2-1.1H10v2.6h1.8c.7 0 1.2-.4 1.2-1.1v-.4l2.5-.4v.4z" />
    ),
  },
  'discord-engineering': {
    color: '#5865F2',
    svg: (
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    ),
  },
};

function BrandSvg({ feedId, size = 28, className = '' }: { feedId: string; size?: number; className?: string }) {
  const brand = brandIcons[feedId];
  if (!brand) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      style={{ color: brand.color }}
    >
      {brand.svg}
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────

interface HomeFeedProps {
  /** Articles pre-loaded at SSG build time, keyed by feed ID */
  initialArticles: Record<string, Article[]> | null;
}

export function HomeFeed({ initialArticles }: HomeFeedProps) {
  const articlesBySource = initialArticles ?? {};
  // Featured sources that have articles
  const availableSources = Object.keys(articlesBySource).filter(
    (id) => (articlesBySource[id]?.length ?? 0) > 0
  );
  const hasError = initialArticles === null;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section label */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Latest from Engineering Blogs
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Engineering&nbsp;
            <span className="text-accent">Discovery</span>
          </h2>
          <p className="mt-3 text-sm text-fg-secondary max-w-xl">
            Curated articles from the best engineering blogs across the industry.
            Updated every 24 hours.
          </p>
        </div>

        {/* Error state — cache not found at build time */}
        {hasError && (
          <div className="p-6 text-center bg-surface-secondary">
            <p className="text-sm text-fg-secondary mb-3">Feed data being fetched...</p>
            <p className="text-xs text-fg-muted/60">Run the daily registry workflow or wait for next build.</p>
          </div>
        )}

        {/* Grid of sources — SSG data loaded at build time */}
        {!hasError && availableSources.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableSources.map((feedId) => {
              const source = FEED_REGISTRY.find((f) => f.id === feedId);
              const articles = articlesBySource[feedId] ?? [];
              const brand = brandIcons[feedId];

              return (
                <div
                  key={feedId}
                  className="group/card bg-surface-secondary flex flex-col transition-all duration-300 hover:bg-accent"
                >
                  {/* Source header */}
                  <div className="px-5 py-4 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Brand icon — original color by default, white on card hover */}
                        {brand ? (
                          <BrandSvg feedId={feedId} size={28} className="transition-colors duration-300 group-hover/card:text-white" />
                        ) : (
                          <span className="flex items-center justify-center w-7 h-7 text-xs font-bold uppercase text-fg-muted bg-white">
                            {(source?.name ?? feedId)[0]}
                          </span>
                        )}
                        <h3 className="text-sm font-bold uppercase tracking-wider text-fg transition-colors duration-300 group-hover/card:text-white">
                          {source?.name ?? feedId}
                        </h3>
                      </div>
                      <a
                        href={source?.siteUrl ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg-muted transition-colors duration-300 group-hover/card:text-white/70 hover:!text-white"
                      >
                        <Icon name="external-link" size={14} />
                      </a>
                    </div>
                    {source?.tags && source.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {source.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider bg-white text-fg-muted transition-colors duration-300 group-hover/card:bg-white/20 group-hover/card:text-white/80"
                          >
                            {tag.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Articles — text starts at full opacity, links are at 50%, go to 100% on hover */}
                  <div className="flex-1 px-5 py-4 space-y-3 bg-white transition-colors duration-300 group-hover/card:bg-accent">
                    {articles.map((article) => (
                      <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link block"
                      >                        <p className="text-xs font-medium leading-snug line-clamp-2 transition-all duration-300 text-fg opacity-100 group-hover/card:opacity-50 group-hover/link:!opacity-100 group-hover/card:text-white">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-[9px] transition-all duration-300 text-fg-muted/60 group-hover/card:text-white/60 opacity-50 group-hover/card:opacity-50 group-hover/link:!opacity-100">
                          {article.publishedAt && (
                            <span>{timeAgo(article.publishedAt)}</span>
                          )}
                          {article.author && (
                            <>
                              <span>·</span>
                              <span className="truncate max-w-[120px]">{article.author}</span>
                            </>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state — cache exists but no articles for featured sources */}
        {!hasError && availableSources.length === 0 && (
          <div className="bg-surface-secondary p-10 text-center">
            <p className="text-sm text-fg-secondary">No articles available right now.</p>
            <p className="text-xs text-fg-muted/60 mt-1">Check back later or visit the full feed.</p>
          </div>
        )}

        {/* CTA — using Button component with purpleGhost variant */}
        <div className="mt-10 text-center">
          <Button
            variant="purpleGhost"
            size="default"
            icon={<Icon name="arrow-right" size={14} />}
            iconPosition="right"
            onClick={() => { window.location.href = '/feed'; }}
          >
            View All Feeds
          </Button>
        </div>
      </div>
    </section>
  );
}
