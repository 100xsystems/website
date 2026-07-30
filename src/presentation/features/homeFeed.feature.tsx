'use client';

import React from 'react';
import { timeAgo } from '@/feed/feed.utils';
import { Icon, Button } from '@/presentation/__components';

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

function FeedLogo({ feedSiteUrl, feedName, size = 28 }: { feedSiteUrl: string; feedName: string; size?: number }) {
  const domain = getDomain(feedSiteUrl);
  if (!domain) return null;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={feedName}
      width={size}
      height={size}
      className="shrink-0 rounded-md bg-white/10"
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
  const hasError = initialArticles === null;
  const allArticles = initialArticles ?? [];
  const articles = allArticles.slice(0, 24); // Just the latest 24

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Section label */}
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

        {/* Error state */}
        {hasError && (
          <div className="p-12 text-center bg-surface-secondary">
            <p className="text-xl text-fg-secondary mb-3">Feed data being fetched...</p>
            <p className="text-base text-fg-muted/60">Run the daily registry workflow or wait for next build.</p>
          </div>
        )}

        {/* Latest articles — clean chronological list */}
        {!hasError && articles.length > 0 && (
          <div className="space-y-1">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-5 px-5 py-5 transition-all duration-200 hover:bg-surface-secondary rounded-xl"
              >
                {/* Logo */}
                <div className="shrink-0 mt-0.5">
                  <FeedLogo feedSiteUrl={article.feedSiteUrl} feedName={article.feedName} size={36} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-bold uppercase tracking-wide text-fg-muted/80">
                      {article.feedName}
                    </span>
                    {article.publishedAt && (
                      <span className="text-sm text-fg-muted/50">
                        {timeAgo(article.publishedAt)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold leading-snug text-fg group-hover:text-accent transition-colors duration-200">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="mt-2 text-base text-fg-secondary leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  )}
                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted group-hover:bg-surface-muted transition-colors duration-200"
                        >
                          {tag.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="shrink-0 mt-1 text-fg-muted/30 group-hover:text-accent transition-colors duration-200">
                  <Icon name="external-link" size={16} />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!hasError && articles.length === 0 && (
          <div className="bg-surface-secondary p-12 text-center">
            <p className="text-lg text-fg-secondary">No articles available right now.</p>
            <p className="text-base text-fg-muted/60 mt-2">Check back later or visit the full feed.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="purpleGhost"
            size="lg"
            icon={<Icon name="arrow-right" size={18} />}
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
