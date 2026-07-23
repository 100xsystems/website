'use client';

import React from 'react';
import type { Article } from './feed.types';
import { timeAgo, truncate, highlightMatches } from './feed.utils';
import { cn } from '@/application/lib/utils';
import { Badge, Tag, Text, Icon } from '@/presentation/__components';

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

  const focusClasses = isFocused ? 'bg-accent border-accent' : 'bg-white border-black hover:bg-accent/[0.03] hover:border-accent';

  return (
    <article className={cn('group relative px-6 py-5 border-2 transition-all duration-200', focusClasses, isRead && !isFocused && 'opacity-50 hover:opacity-100')}>
      {/* Read indicator */}
      {isRead && (
        <div className="absolute top-5 left-2 w-1.5 h-1.5 rounded-full bg-fg-muted/40" />
      )}

      {/* Feed source badge + date */}
      <div className="flex items-center gap-2 mb-2.5">
        <Badge variant="purple" size="sm" className={isFocused ? 'bg-white/20 text-white' : ''}>
          {article.feedName}
        </Badge>
        {article.publishedAt && (
          <div className="flex items-center gap-1 text-fg-muted/60">
            <Icon name="clock" size={12} className={isFocused ? 'text-white/50' : ''} />
            <Text variant="caption" className={cn(isFocused ? 'text-white/50' : 'text-fg-muted/60')}>
              {timeAgo(article.publishedAt)}
            </Text>
          </div>
        )}
      </div>

      {/* Article title */}
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block" onClick={() => onRead?.(article.url)}>
        <h3 className={cn('text-base font-bold leading-snug mb-1.5 transition-colors duration-200', isFocused ? 'text-white' : 'text-fg group-hover:text-accent')}>
          {searchQuery ? highlightMatches(article.title, searchQuery) : article.title}
        </h3>
      </a>

      {/* Summary */}
      {article.summary && (
        <Text variant="body" className={cn('mb-3 line-clamp-2 transition-colors duration-200', isFocused ? 'text-white/70' : 'text-fg-tertiary')}>
          {searchQuery
            ? highlightMatches(truncate(article.summary, 200), searchQuery)
            : truncate(article.summary, 200)}
        </Text>
      )}

      {/* Bottom row: author + tags + actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {article.author && (
            <Text variant="caption" className={cn('truncate max-w-[180px]', isFocused ? 'text-white/60' : 'text-fg-muted/70')}>
              {article.author}
            </Text>
          )}
          {article.tags.length > 0 && (
            <div className="hidden sm:flex items-center gap-1">
              {article.tags.slice(0, 2).map((tag) => (
                <Tag key={tag} variant="default" size="sm" className={isFocused ? 'bg-white/15 text-white/70' : ''}>
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button onClick={() => onBookmarkToggle(article)} className={cn('p-1.5 transition-all duration-200 rounded-none', isFocused ? 'text-white/60 hover:text-white' : 'text-fg-muted/50 hover:text-fg')} title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button onClick={handleShare} className={cn('p-1.5 transition-all duration-200 rounded-none', isFocused ? 'text-white/60 hover:text-white' : 'text-fg-muted/50 hover:text-fg')} title="Share">
            <Icon name="share" size={14} />
          </button>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className={cn('p-1.5 transition-all duration-200 rounded-none', isFocused ? 'text-white/60 hover:text-white' : 'text-fg-muted/50 hover:text-fg')} title="Open article">
            <Icon name="external-link" size={14} />
          </a>
        </div>
      </div>

      {/* Mobile-only extra tags */}
      {article.tags.length > 2 && (
        <div className="flex sm:hidden items-center gap-1 mt-2">
          {article.tags.slice(2, 4).map((tag) => (
            <Tag key={tag} variant="default" size="sm" className={isFocused ? 'bg-white/15 text-white/70' : ''}>
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </article>
  );
}
