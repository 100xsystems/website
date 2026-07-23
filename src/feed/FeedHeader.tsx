'use client';

import React from 'react';
import { ALL_TAGS, FEED_REGISTRY } from './feed.constants';
import { FeelingLucky } from './FeelingLucky';
import { FeedSourceSelector } from './FeedSourceSelector';
import type { Article } from './feed.types';
import { cn } from '@/application/lib/utils';
import { Heading, Text, Tag } from '@/presentation/__components';

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

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagSelectionChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagSelectionChange([...selectedTags, tag]);
    }
  };

  return (
    <header className="mb-10">
      {/* Title section */}
      <div className="mb-6">
        <Heading variant="h1">Engineering Discovery</Heading>
        <Text variant="body" className="mt-1.5 text-fg-secondary">
          Curated from {activeFeedCount} engineering blogs
        </Text>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <FeedSourceSelector selectedFeeds={selectedFeeds} onSelectionChange={onFeedSelectionChange} />
        <FeelingLucky articles={articles} />

        {/* Sort toggle */}
        <div className="flex border-2 border-black">
          <button onClick={() => onSortChange('newest')} className={cn('px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-150', sortBy === 'newest' ? 'bg-accent text-white' : 'text-fg hover:bg-surface-secondary')}>
            Newest
          </button>
          <button onClick={() => onSortChange('hn-rank')} className={cn('px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-150', sortBy === 'hn-rank' ? 'bg-accent text-white' : 'text-fg hover:bg-surface-secondary')}>
            Top
          </button>
        </div>        {/* Refresh button */}
          <button onClick={onRefresh} disabled={isLoading} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-fg transition-colors border-2 border-black disabled:opacity-30" title="Refresh feed">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('shrink-0', isLoading && 'animate-spin')}>
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>
      </div>

      {/* Tag filter chips — using design-system Tag */}
      <div className="flex flex-wrap items-center gap-1.5">
        {ALL_TAGS.map((tag) => {
          const isActive = selectedTags.includes(tag);
          return (
            <Tag
              key={tag}
              variant={isActive ? 'brand' : 'outline'}
              size="sm"
              onClick={() => toggleTag(tag)}
              selected={isActive}
            >
              {tag.replace(/-/g, ' ')}
            </Tag>
          );
        })}
      </div>
    </header>
  );
}
