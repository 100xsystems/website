'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, Favicon, timeAgo, DiscoverPageShell } from './discover.utils';

const HN_CATEGORIES = [
  { id: 'show', label: 'Show HN' },
  { id: 'ask', label: 'Ask HN' },
  { id: 'job', label: 'Jobs' },
  { id: 'new', label: 'New' },
  { id: 'top', label: 'Top' },
  { id: 'best', label: 'Best' },
];

export function HnPage() {
  const {
    query, setQuery, items, initialLoading, searchLoading, loadingMore,
    error, selectedCategory, setSelectedCategory, sentinelRef, hasMore,
  } = useLiveSearch('hn', 'show', { categories: HN_CATEGORIES, limit: 50 });
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell
      title="Hacker"
      subtitle="News"
      brandColor="bg-orange-600"
      brandLabel="HACKER NEWS"
      textColor="text-orange-600"
      description="Top stories and discussions from the Y Combinator community. Browse by category or search."
    >
      {/* Category tabs */}
      <section className="py-6 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {HN_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={cn(
                  'px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200',
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-white text-fg-muted border border-orange-200 hover:bg-orange-50 hover:text-orange-700'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="py-6 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Hacker News stories..."
              className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-orange-500 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg"
              autoComplete="off" spellCheck={false} />
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
          <p className="text-xs text-fg-muted/60 mb-6 uppercase tracking-wider">
            {items.length} result{items.length !== 1 ? 's' : ''}
            {query && <> for &ldquo;{query}&rdquo;</>}
            {selectedCategory && <> in {HN_CATEGORIES.find(c => c.id === selectedCategory)?.label}</>}
          </p>

          {isLoading && (
            <div className="space-y-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex gap-4 p-4 animate-pulse">
                  <div className="w-10 h-10 bg-surface-secondary shrink-0" />
                  <div className="flex-1 space-y-2"><div className="h-5 w-3/4 bg-surface-secondary" /><div className="h-4 w-1/2 bg-surface-secondary" /></div>
                </div>
              ))}
            </div>
          )}

          {error && !isLoading && (
            <div className="text-center py-16"><p className="text-lg text-fg-secondary">{error}</p></div>
          )}

          {!isLoading && !error && items.length > 0 && (
            <div className="divide-y divide-border">
              {items.map((item, i) => {
                const m = item.metadata;
                return (
                  <a key={`${item.url}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="flex gap-5 px-4 py-5 transition-colors hover:bg-orange-50 group">
                    <span className="text-sm font-mono text-fg-muted/40 w-6 shrink-0 text-right group-hover:text-orange-500 transition-colors">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-fg group-hover:text-orange-700 transition-colors leading-snug">{item.title}</h3>
                      <div className="flex items-center gap-3 mt-2 text-xs text-fg-muted/60 flex-wrap">
                        {n(m?.points) > 0 && <span className="font-semibold text-orange-600">{n(m?.points)} points</span>}
                        {v(m?.author) && <span>by {v(m?.author)}</span>}
                        {n(m?.comments) > 0 && <span>{n(m?.comments)} comments</span>}
                        {v(m?.type) && <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[9px] font-bold uppercase tracking-wider">{v(m?.type)}</span>}
                        <span className="text-fg-muted/40">·</span>
                        <Favicon url={item.url} className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-base text-fg-secondary">No stories found.</p>
              <p className="text-sm text-fg-muted/60 mt-2">Try a different search term or category.</p>
            </div>
          )}

          {/* Infinite scroll sentinel */}
          {hasMore && !isLoading && items.length > 0 && (
            <div ref={sentinelRef} className="h-20 flex items-center justify-center">
              {loadingMore ? (
                <span className="inline-block w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
              ) : (
                <span className="text-xs text-fg-muted/40">Scroll for more</span>
              )}
            </div>
          )}

          {searchLoading && <div className="text-center py-4"><span className="inline-block w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" /></div>}
        </div>
      </section>
    </DiscoverPageShell>
  );
}
