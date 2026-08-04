'use client';

import React from 'react';
import { ALL_TAGS, FEED_REGISTRY } from './feed.constants';
import { FeelingLucky } from './FeelingLucky';
import { FeedSourceSelector } from './FeedSourceSelector';
import type { Article } from './feed.types';
import { cn } from '@/application/lib/utils';
import { FeedFavicon } from './FeedFavicon';

interface FeedHeaderProps {
  selectedFeeds: string[];
  onFeedSelectionChange: (feedIds: string[]) => void;
  selectedTags: string[];
  onTagSelectionChange: (tags: string[]) => void;
  sortBy: 'newest' | 'hn-rank';
  onSortChange: (sort: 'newest' | 'hn-rank') => void;
  articles: Article[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function FeedHeader({
  selectedFeeds,
  onFeedSelectionChange,
  selectedTags,
  onTagSelectionChange,
  sortBy,
  onSortChange,
  articles,
  isLoading,
  onRefresh,
}: FeedHeaderProps) {
  const activeFeedCount = selectedFeeds.length > 0 ? selectedFeeds.length : FEED_REGISTRY.length;

  // Featured sources (first 8 by recency) for inline favicon chips
  const featuredFeeds = React.useMemo(() => {
    const feedArticleCounts = new Map<string, number>();
    for (const a of articles) {
      feedArticleCounts.set(a.feedId, (feedArticleCounts.get(a.feedId) ?? 0) + 1);
    }
    return [...feedArticleCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([id]) => FEED_REGISTRY.find((f) => f.id === id))
      .filter(Boolean);
  }, [articles]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagSelectionChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagSelectionChange([...selectedTags, tag]);
    }
  };

  return (
    <header className="mb-8 sm:mb-12">
      {/* Hero section */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {activeFeedCount} feeds
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-3">
          Engineering&nbsp;<span className="text-accent">Blogs</span>
        </h1>
        <p className="text-base sm:text-lg text-fg-secondary max-w-2xl">
          Fresh articles from {FEED_REGISTRY.length} top engineering blogs — search, filter by source or tag.
        </p>
      </div>

      {/* Featured source chips — favicon inline */}
      {featuredFeeds.length > 0 && (
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {featuredFeeds.map((feed) => (
            <button
              key={feed!.id}
              onClick={() => {
                const isActive = selectedFeeds.includes(feed!.id);
                onFeedSelectionChange(isActive ? [] : [feed!.id]);
              }}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200',
                selectedFeeds.includes(feed!.id)
                  ? 'bg-accent text-white'
                  : 'bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white',
              )}
            >
              <FeedFavicon url={feed!.siteUrl} name={feed!.name} size={16} />
              {feed!.name}
            </button>
          ))}
        </div>
      )}

      {/* Controls row — borderless */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <FeedSourceSelector selectedFeeds={selectedFeeds} onSelectionChange={onFeedSelectionChange} />
        <FeelingLucky articles={articles} />

        {/* Sort toggle */}
        <div className="flex">
          <button
            onClick={() => onSortChange('newest')}
            className={cn('px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200', sortBy === 'newest' ? 'bg-accent text-white' : 'bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white')}
          >
            Newest
          </button>
          <button
            onClick={() => onSortChange('hn-rank')}
            className={cn('px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200', sortBy === 'hn-rank' ? 'bg-accent text-white' : 'bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white')}
          >
            Top
          </button>
        </div>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white transition-colors disabled:opacity-30"
          title="Refresh feed"
          aria-label="Refresh feed"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('shrink-0', isLoading && 'animate-spin')}>
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>

      {/* Tag filter chips — borderless toggle chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {ALL_TAGS.map((tag) => {
          const isActive = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                'px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200',
                isActive ? 'bg-accent text-white' : 'bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white',
              )}
            >
              {tag.replace(/-/g, ' ')}
            </button>
          );
        })}
      </div>
    </header>
  );
}