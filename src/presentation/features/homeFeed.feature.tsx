'use client';

import React, { useState, useMemo } from 'react';
import { FEED_REGISTRY } from '@/feed/feed.constants';
import { timeAgo } from '@/feed/feed.utils';
import { Icon, Button } from '@/presentation/__components';
import { cn } from '@/application/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────

interface EnrichedArticle {
  id: string;
  feedId: string;
  feedName: string;
  feedSiteUrl: string;
  feedRssUrl: string;
  tags: string[];
  title: string;
  url: string;
  author: string | null;
  summary: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

function getDomain(url: string): string | null {
  try { return new URL(url).hostname; } catch { return null; }
}

function FeedLogo({ feedSiteUrl, feedName, size = 32 }: { feedSiteUrl: string; feedName: string; size?: number }) {
  const domain = getDomain(feedSiteUrl);
  if (!domain) return null;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={feedName}
      width={size}
      height={size}
      className="shrink-0 rounded-lg bg-white/10"
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      loading="lazy"
    />
  );
}

// ─── Component ─────────────────────────────────────────────────────

interface HomeFeedProps {
  initialArticles: EnrichedArticle[] | null;
}

export function HomeFeed({ initialArticles }: HomeFeedProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const hasError = initialArticles === null;
  const allArticles = initialArticles ?? [];

  // Extract all unique tags from articles (that have tags)
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const article of allArticles) {
      for (const tag of article.tags) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet).sort();
  }, [allArticles]);

  // Filter articles by selected tag
  const articles = useMemo(() => {
    if (!selectedTag) return allArticles;
    return allArticles.filter((a) => a.tags.includes(selectedTag));
  }, [allArticles, selectedTag]);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section label — 2x bigger */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Latest from Engineering Blogs
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Recent&nbsp;
            <span className="text-accent">Updates</span>
          </h2>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            The freshest articles from across the engineering blogosphere. Updated every 6 hours.
          </p>
        </div>

        {/* Tag filter cards — single-select, above the grid */}
        {!hasError && allTags.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={cn(
                'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200',
                !selectedTag
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-surface-secondary text-fg-muted hover:bg-accent/10 hover:text-fg'
              )}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200',
                  selectedTag === tag
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-surface-secondary text-fg-muted hover:bg-accent/10 hover:text-fg'
                )}
              >
                {tag.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="p-8 text-center bg-surface-secondary">
            <p className="text-lg text-fg-secondary mb-3">Feed data being fetched...</p>
            <p className="text-base text-fg-muted/60">Run the daily registry workflow or wait for next build.</p>
          </div>
        )}

        {/* Latest articles grid */}
        {!hasError && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {articles.map((article) => {
              const source = FEED_REGISTRY.find((f) => f.id === article.feedId);
              return (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-surface-secondary transition-all duration-300 hover:bg-accent hover:scale-[1.02] hover:shadow-xl"
                >
                  {/* Card header with logo */}
                  <div className="px-6 py-5 flex items-center gap-4">
                    <FeedLogo feedSiteUrl={article.feedSiteUrl} feedName={article.feedName} size={36} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold uppercase tracking-wide text-fg truncate transition-colors duration-300 group-hover:text-white">
                        {article.feedName}
                      </h3>
                      {article.publishedAt && (
                        <p className="text-sm text-fg-muted/70 mt-1 transition-colors duration-300 group-hover:text-white/60">
                          {timeAgo(article.publishedAt)}
                        </p>
                      )}
                    </div>
                    {source?.siteUrl && (
                      <span className="text-fg-muted transition-colors duration-300 group-hover:text-white/70 shrink-0">
                        <Icon name="external-link" size={16} />
                      </span>
                    )}
                  </div>

                  {/* Article content */}
                  <div className="flex-1 px-6 pb-6">
                    <h4 className="text-xl font-bold leading-snug text-fg transition-colors duration-300 group-hover:text-white line-clamp-3">
                      {article.title}
                    </h4>
                    {article.summary && (
                      <p className="mt-3 text-base text-fg-secondary leading-relaxed transition-colors duration-300 group-hover:text-white/80 line-clamp-2">
                        {article.summary}
                      </p>
                    )}
                  </div>

                  {/* Footer with tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="px-6 pb-5 flex items-center gap-2 flex-wrap">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-300',
                            selectedTag === tag
                              ? 'bg-accent text-white'
                              : 'bg-white text-fg-muted group-hover:bg-white/20 group-hover:text-white/80'
                          )}
                        >
                          {tag.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        )}

        {/* Empty / no matches */}
        {!hasError && articles.length === 0 && (
          <div className="bg-surface-secondary p-12 text-center">
            <p className="text-lg text-fg-secondary">
              {selectedTag ? `No articles found for "${selectedTag.replace(/-/g, ' ')}"` : 'No articles available right now.'}
            </p>
            <p className="text-base text-fg-muted/60 mt-2">
              {selectedTag ? 'Try selecting a different tag or view all articles.' : 'Check back later or visit the full feed.'}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="purpleGhost"
            size="lg"
            icon={<Icon name="arrow-right" size={18} />}
            iconPosition="right"
            onClick={() => { window.location.href = '/discover/feed'; }}
          >
            View All Feeds
          </Button>
        </div>
      </div>
    </section>
  );
}
