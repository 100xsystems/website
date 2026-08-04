'use client';

import React from 'react';
import type { Article } from './feed.types';
import { getRandomArticle } from './feed.utils';
import { FeedFavicon } from './FeedFavicon';

interface FeelingLuckyProps {
  articles: Article[];
}

export function FeelingLucky({ articles }: FeelingLuckyProps) {
  const [randomArticle, setRandomArticle] = React.useState<Article | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleLucky = () => {
    const picked = getRandomArticle(articles);
    setRandomArticle(picked);
    setIsVisible(true);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setRandomArticle(null), 200);
  };

  if (isVisible && randomArticle) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-80 bg-white p-6 animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={handleDismiss} className="absolute top-3 right-3 text-fg-muted hover:text-fg transition-colors" title="Dismiss" aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-accent-yellow text-black">
            ✦ Random Pick
          </span>
        </div>

        <a href={randomArticle.url} target="_blank" rel="noopener noreferrer" className="block group">
          <h4 className="text-sm font-bold text-fg group-hover:text-accent transition-colors leading-snug mb-2">
            {randomArticle.title}
          </h4>
        </a>

        <div className="flex items-center gap-2 text-[10px] text-fg-muted">
          <FeedFavicon url={randomArticle.feedSiteUrl} name={randomArticle.feedName} size={16} />
          {randomArticle.feedName}{randomArticle.author && <> · {randomArticle.author}</>}
        </div>

        <a href={randomArticle.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent-hover transition-colors">
          Read article
        </a>
      </div>
    );
  }

  return (
    <button onClick={handleLucky} className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white transition-colors duration-200" title="Discover a random article">
      <span className="text-sm">✦</span>
      I&rsquo;m Feeling Lucky
    </button>
  );
}