'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FEED_REGISTRY } from '@/feed/feed.constants';
import { fetchFeedAll } from '@/feed/feed.api';
import { sortByNewest } from '@/feed/feed.utils';
import { timeAgo } from '@/feed/feed.utils';
import { cn } from '@/application/lib/utils';
import { Icon } from '@/presentation/__components';
import type { Article } from '@/feed/feed.types';

// ─── Featured sources shown on the homepage ──────────────────────────

const HOME_FEATURED_SOURCES = [
  'netflix-tech-blog',
  'cloudflare-blog',
  'aws-architecture',
  'spotify-engineering',
  'stripe-engineering',
  'discord-engineering',
];

const ARTICLES_PER_SOURCE = 3;

// ─── Component ───────────────────────────────────────────────────────

export function HomeFeed() {
  const [articlesBySource, setArticlesBySource] = useState<Record<string, Article[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch feed for all featured sources
        const response = await fetchFeedAll(HOME_FEATURED_SOURCES);
        if (!mounted) return;

        // Group articles by feedId and sort each group
        const grouped: Record<string, Article[]> = {};
        for (const article of response.articles) {
          if (!grouped[article.feedId]) grouped[article.feedId] = [];
          grouped[article.feedId].push(article);
        }

        // Sort each group by newest first, limit to ARTICLES_PER_SOURCE
        for (const feedId of Object.keys(grouped)) {
          grouped[feedId] = sortByNewest(grouped[feedId]).slice(0, ARTICLES_PER_SOURCE);
        }

        setArticlesBySource(grouped);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load');
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  // Filter to only sources that have articles
  const availableSources = HOME_FEATURED_SOURCES.filter(
    (id) => (articlesBySource[id]?.length ?? 0) > 0
  );

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-white border-t-2 border-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section label */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-black text-[10px] font-bold uppercase tracking-widest bg-accent-yellow text-black mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
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

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-2 border-black p-5">
                <div className="h-4 w-2/3 bg-surface-secondary animate-pulse mb-4" />
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-3 w-full bg-surface-secondary animate-pulse mb-2" />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="border-2 border-black p-6 text-center">
            <p className="text-sm text-fg-secondary mb-3">Unable to load latest articles right now.</p>
            <p className="text-xs text-fg-muted/60">{error}</p>
          </div>
        )}

        {/* Grid of sources */}
        {!isLoading && !error && availableSources.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableSources.map((feedId) => {
              const source = FEED_REGISTRY.find((f) => f.id === feedId);
              const articles = articlesBySource[feedId] ?? [];

              return (
                <div key={feedId} className="border-2 border-black bg-white flex flex-col">
                  {/* Source header */}
                  <div className="px-5 py-4 bg-surface-secondary border-b-2 border-black">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-fg">
                        {source?.name ?? feedId}
                      </h3>
                      <a
                        href={source?.siteUrl ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg-muted hover:text-accent transition-colors"
                      >
                        <Icon name="external-link" size={14} />
                      </a>
                    </div>
                    {source?.tags && source.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {source.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider bg-surface-muted text-fg-muted"
                          >
                            {tag.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Articles */}
                  <div className="flex-1 px-5 py-4 space-y-3">
                    {articles.map((article) => (
                      <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <p className="text-xs font-medium text-fg leading-snug group-hover:text-accent transition-colors duration-150 line-clamp-2">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-[9px] text-fg-muted/60">
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

        {/* Empty state */}
        {!isLoading && !error && availableSources.length === 0 && (
          <div className="border-2 border-black p-10 text-center">
            <p className="text-sm text-fg-secondary">No articles available right now.</p>
            <p className="text-xs text-fg-muted/60 mt-1">Check back later or visit the full feed.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/feed"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider border-2 border-black text-fg hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
          >
            View All Feeds
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
