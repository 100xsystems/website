'use client';

import React from 'react';
import { ArticleCard } from './ArticleCard';
import { SkeletonBlock, Heading, Text, Icon } from '@/presentation/__components';
import type { Article } from './feed.types';

interface FeedFlatViewProps {
  articles: Article[];
  isLoading: boolean;
  bookmarks: Array<{ url: string }>;
  readingHistory: string[];
  focusedIndex: number;
  searchQuery: string;
  articleRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  onBookmarkToggle: (article: { url: string; title: string; feedName: string; feedId: string }) => void;
  onRead: (url: string) => void;
  onClearFilters: () => void;
}

export function FeedFlatView({
  articles,
  isLoading,
  bookmarks,
  readingHistory,
  focusedIndex,
  searchQuery,
  articleRefs,
  onBookmarkToggle,
  onRead,
  onClearFilters,
}: FeedFlatViewProps) {
  if (isLoading && articles.length === 0) {
    return (
      <div className="space-y-3 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-2 border-black px-6 py-5">
            <SkeletonBlock lines={3} avatar={false} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Article count */}
      <Text variant="caption" className="mb-4 text-fg-muted/60">
        {searchQuery && `Found ${articles.length} article${articles.length !== 1 ? 's' : ''} for "${searchQuery}"`}
        {!searchQuery && (articles.length === 0 ? 'No articles found' : `${articles.length} article${articles.length !== 1 ? 's' : ''}`)}
      </Text>

      {/* Empty state */}
      {articles.length === 0 && !isLoading ? (
        <div className="text-center py-20 border-2 border-black px-8">
          <Heading variant="h2" className="mb-2">✦</Heading>
          <Text variant="body" className="mb-1">
            No articles{searchQuery ? ` match "${searchQuery}"` : ' match your current filters.'}
          </Text>
          <Text variant="muted" className="mb-6">Try adjusting your search or filters.</Text>
          <button onClick={onClearFilters} className="px-5 py-2 text-[10px] font-bold uppercase tracking-wider bg-accent-yellow text-black hover:bg-yellow-400 transition-colors">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article, index) => (
            <div
              key={article.id}
              ref={(el) => {
                if (el) articleRefs.current.set(article.id, el);
                else articleRefs.current.delete(article.id);
              }}
            >
              <ArticleCard
                article={article}
                isBookmarked={bookmarks.some((b) => b.url === article.url)}
                isRead={readingHistory.includes(article.url)}
                isFocused={index === focusedIndex}
                onBookmarkToggle={onBookmarkToggle}
                onRead={onRead}
                searchQuery={searchQuery}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
