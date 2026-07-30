'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, Favicon, DiscoverPageShell } from './discover.utils';

export function WikipediaPage() {
  const { query, setQuery, items, initialLoading, searchLoading, error } = useLiveSearch('wikipedia', 'software engineering');
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell
      title="Wiki"
      subtitle="pedia"
      brandColor="bg-gray-700"
      brandLabel="WIKIPEDIA"
      sourceId="wikipedia"
      defaultQuery="software engineering"
      description="Search Wikipedia articles and reference pages."
    >
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Wikipedia articles..."
              className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-gray-700 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg"
              autoComplete="off" spellCheck={false} />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-gray-700 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {isLoading && (
            <div className="space-y-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse border-b border-border pb-6">
                  <div className="h-7 w-3/4 bg-surface-secondary mb-3" />
                  <div className="h-4 w-full bg-surface-secondary mb-2" />
                  <div className="h-4 w-2/3 bg-surface-secondary" />
                </div>
              ))}
            </div>
          )}

          {error && !isLoading && <div className="text-center py-16"><p className="text-lg text-fg-secondary">{error}</p></div>}

          {!isLoading && !error && items.length > 0 && (
            <div className="divide-y divide-border">
              {items.map((item, i) => {
                const m = item.metadata;
                return (
                  <a key={`${item.url}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="block py-6 px-4 transition-colors hover:bg-blue-50 group">
                    <div className="flex items-center gap-2 mb-1">
                      <Favicon url={item.url} className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted group-hover:text-blue-700 transition-colors">WIKIPEDIA</span>
                    </div>
                    <h3 className="text-lg font-bold text-fg group-hover:text-blue-800 transition-colors leading-snug mb-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-fg-secondary leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {v(m?.pageId) && (
                      <p className="mt-1 text-xs text-fg-muted/40">Page ID: {v(m?.pageId)}</p>
                    )}
                  </a>
                );
              })}
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-base text-fg-secondary">No articles found for &ldquo;{query}&rdquo;</p>
            </div>
          )}

          {searchLoading && items.length > 0 && (
            <div className="text-center py-4">
              <span className="inline-block w-5 h-5 border-2 border-gray-700/30 border-t-gray-700 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </section>
    </DiscoverPageShell>
  );
}
