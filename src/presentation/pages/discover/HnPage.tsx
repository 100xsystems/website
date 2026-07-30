'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, Favicon, timeAgo, DiscoverPageShell } from './discover.utils';

export function HnPage() {
  const { query, setQuery, items, initialLoading, searchLoading, error } = useLiveSearch('hn', 'show');
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell
      title="Hacker"
      subtitle="News"
      brandColor="bg-orange-600"
      brandLabel="HACKER NEWS"
      sourceId="hn"
      defaultQuery="show"
      description="Top stories and discussions from the Y Combinator community. Default shows trending posts."
    >
      {/* Search bar */}
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Hacker News stories..."
              className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-orange-500 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg transition-all duration-150"
              autoComplete="off" spellCheck={false}
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-orange-500 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Loading state */}
          {isLoading && (
            <div className="space-y-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex gap-4 p-4 animate-pulse">
                  <div className="w-10 h-10 bg-surface-secondary shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-3/4 bg-surface-secondary" />
                    <div className="h-4 w-1/2 bg-surface-secondary" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="text-center py-16">
              <p className="text-lg text-fg-secondary mb-2">{error}</p>
            </div>
          )}

          {/* HN-style compact list */}
          {!isLoading && !error && items.length > 0 && (
            <div className="divide-y divide-border">
              {items.map((item, i) => {
                const m = item.metadata;
                return (
                  <a
                    key={`${item.url}-${i}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-5 px-4 py-5 transition-colors hover:bg-orange-50 group"
                  >
                    {/* Rank number */}
                    <span className="text-sm font-mono text-fg-muted/40 w-6 shrink-0 text-right group-hover:text-orange-500 transition-colors">
                      {i + 1}.
                    </span>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-fg group-hover:text-orange-700 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-xs text-fg-muted/60 group-hover:text-fg-muted/80 transition-colors">
                        {n(m?.points) > 0 && <span className="font-semibold text-orange-600">{n(m?.points)} points</span>}
                        {v(m?.author) && <span>by {v(m?.author)}</span>}
                        {n(m?.comments) > 0 && <span>{n(m?.comments)} comments</span>}
                        <span className="text-fg-muted/40">·</span>
                        <Favicon url={item.url} className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Empty/initial state */}
          {!isLoading && !error && items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-base text-fg-secondary">No stories found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-fg-muted/60 mt-2">Try a different search term.</p>
            </div>
          )}

          {searchLoading && items.length > 0 && (
            <div className="text-center py-4">
              <span className="inline-block w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </section>
    </DiscoverPageShell>
  );
}
