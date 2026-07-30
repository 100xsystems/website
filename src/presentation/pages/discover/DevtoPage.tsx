'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, Favicon, timeAgo, DiscoverPageShell } from './discover.utils';

export function DevtoPage() {
  const { query, setQuery, items, initialLoading, searchLoading, error } = useLiveSearch('devto', 'programming');
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell
      title="Dev"
      subtitle="Community"
      brandColor="bg-gray-800"
      brandLabel="DEV.TO"
      sourceId="devto"
      defaultQuery="programming"
      description="Developer articles and discussions from the DEV community. Default shows programming content."
    >
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dev.to articles..."
              className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-gray-800 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg"
              autoComplete="off" spellCheck={false} />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-gray-800 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-border p-6 animate-pulse">
                  <div className="h-5 w-24 bg-surface-secondary mb-4" />
                  <div className="h-7 w-full bg-surface-secondary mb-3" />
                  <div className="h-4 w-full bg-surface-secondary mb-2" />
                  <div className="h-4 w-3/4 bg-surface-secondary mb-5" />
                  <div className="h-5 w-20 bg-surface-secondary" />
                </div>
              ))}
            </div>
          )}

          {error && !isLoading && <div className="text-center py-16"><p className="text-lg text-fg-secondary">{error}</p></div>}

          {!isLoading && !error && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, i) => {
                const m = item.metadata;
                return (
                  <a key={`${item.url}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="block bg-white border border-border p-6 transition-all duration-200 hover:bg-gray-800 hover:text-white hover:shadow-lg group">
                    <div className="flex items-center gap-2 mb-3">
                      <Favicon url={item.url} className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/60 transition-colors">DEV.TO</span>
                    </div>
                    <h3 className="text-base font-bold text-fg group-hover:text-white transition-colors leading-snug line-clamp-3 mb-3">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-fg-secondary group-hover:text-white/70 transition-colors leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-fg-muted/60 group-hover:text-white/50 transition-colors flex-wrap">
                      {n(m?.positiveReactions) > 0 && (
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                          {n(m?.positiveReactions)}
                        </span>
                      )}
                      {n(m?.readingTime) > 0 && <span>{n(m?.readingTime)} min read</span>}
                      {Array.isArray(m?.tags) && (m.tags as string[]).slice(0, 2).map((tag: string) => (
                        <span key={tag} className="px-2 py-0.5 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/70 text-[9px] font-semibold uppercase tracking-wider">
                          #{tag}
                        </span>
                      ))}
                    </div>
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
              <span className="inline-block w-5 h-5 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </section>
    </DiscoverPageShell>
  );
}
