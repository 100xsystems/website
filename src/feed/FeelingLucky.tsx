'use client';

import React from 'react';
import type { Article } from './feed.types';
import { getRandomArticle } from './feed.utils';
import { Badge, Button, Icon } from '@/presentation/__components';

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
      <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border-2 border-black shadow-2xl p-5 animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={handleDismiss} className="absolute top-3 right-3 text-fg-muted hover:text-fg transition-colors" title="Dismiss">
          <Icon name="x" size={14} />
        </button>

        <Badge variant="yellow" size="sm" className="mb-3">✦ Random Pick</Badge>

        <a href={randomArticle.url} target="_blank" rel="noopener noreferrer" className="block group">
          <h4 className="text-sm font-bold text-fg group-hover:text-accent transition-colors leading-snug mb-1">
            {randomArticle.title}
          </h4>
        </a>

        <div className="text-[10px] text-fg-muted mt-2">
          {randomArticle.feedName}{randomArticle.author && <> · {randomArticle.author}</>}
        </div>

        <a href={randomArticle.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3">
          <Button variant="primary" size="sm">
            Read article <Icon name="arrow-right" size={12} />
          </Button>
        </a>
      </div>
    );
  }

  return (
    <button onClick={handleLucky} className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-fg transition-colors border-2 border-black hover:border-accent" title="Discover a random article">
      <span className="text-sm">✦</span>
      I&rsquo;m Feeling Lucky
    </button>
  );
}
