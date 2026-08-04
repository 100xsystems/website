'use client';

import React from 'react';
import type { Article } from './feed.types';
import { timeAgo, truncate, highlightMatches } from './feed.utils';
import { cn } from '@/application/lib/utils';
import { FeedFavicon } from './FeedFavicon';

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  isRead: boolean;
  isFocused: boolean;
  onBookmarkToggle: (article: Article) => void;
  onRead?: (url: string) => void;
  /** If provided, matched terms in title & summary get highlighted */
  searchQuery?: string;
}

export function ArticleCard({ article, isBookmarked, isRead, isFocused, onBookmarkToggle, onRead, searchQuery }: ArticleCardProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, url: article.url });
    } else {
      await navigator.clipboard.writeText(article.url);
    }
  };

  return (
    <article
      className={cn(
        'group relative px-6 py-6 sm:px-8 sm:py-7 transition-colors duration-200',
        isFocused ? 'bg-accent' : 'bg-white hover:bg-accent',
        isRead && !isFocused && 'opacity-50 hover:opacity-100',
      )}
    >
      {/* Feed source header — favicon + name + date */}
      <div className="flex items-center gap-3 mb-3">
        <FeedFavicon url={article.feedSiteUrl} name={article.feedName} size={28} />
        <span className="text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors duration-200 group-hover:text-white/70">
          {article.feedName}
        </span>
        {article.publishedAt && (
          <span className="text-xs text-fg-muted/50 transition-colors duration-200 group-hover:text-white/50">
            · {timeAgo(article.publishedAt)}
          </span>
        )}
      </div>

      {/* Article title */}
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block" onClick={() => onRead?.(article.url)}>
        <h3 className={cn(
          'text-lg sm:text-xl font-bold leading-snug mb-2 transition-colors duration-200',
          isFocused ? 'text-white' : 'text-fg group-hover:text-white',
        )}>
          {searchQuery ? highlightMatches(article.title, searchQuery) : article.title}
        </h3>
      </a>

      {/* Summary */}
      {article.summary && (
        <p className={cn(
          'text-sm text-fg-secondary leading-relaxed mb-4 line-clamp-2 transition-colors duration-200',
          isFocused ? 'text-white/80' : 'group-hover:text-white/80',
        )}>
          {searchQuery
            ? highlightMatches(truncate(article.summary, 200), searchQuery)
            : truncate(article.summary, 200)}
        </p>
      )}

      {/* Bottom row: author + tags + actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {article.author && (
            <span className={cn(
              'text-xs text-fg-muted/70 truncate max-w-[180px] transition-colors duration-200',
              isFocused ? 'text-white/60' : 'group-hover:text-white/60',
            )}>
              {article.author}
            </span>
          )}
          {article.tags.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5">
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted transition-colors duration-200',
                    isFocused ? 'bg-white/20 text-white/80' : 'group-hover:bg-white/20 group-hover:text-white/80',
                  )}
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onBookmarkToggle(article)}
            className={cn('p-2 transition-colors duration-200', isFocused ? 'text-white/70 hover:text-white' : 'text-fg-muted/60 hover:text-fg group-hover:text-white/70 group-hover:hover:text-white')}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button
            onClick={handleShare}
            className={cn('p-2 transition-colors duration-200', isFocused ? 'text-white/70 hover:text-white' : 'text-fg-muted/60 hover:text-fg group-hover:text-white/70 group-hover:hover:text-white')}
            title="Share"
            aria-label="Share article"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('p-2 transition-colors duration-200', isFocused ? 'text-white/70 hover:text-white' : 'text-fg-muted/60 hover:text-fg group-hover:text-white/70 group-hover:hover:text-white')}
            title="Open article"
            aria-label="Open article"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile-only extra tags */}
      {article.tags.length > 2 && (
        <div className="flex sm:hidden items-center gap-1.5 mt-3">
          {article.tags.slice(2, 4).map((tag) => (
            <span
              key={tag}
              className={cn(
                'px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted transition-colors duration-200',
                isFocused ? 'bg-white/20 text-white/80' : 'group-hover:bg-white/20 group-hover:text-white/80',
              )}
            >
              {tag.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
