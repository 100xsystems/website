'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, Favicon, DiscoverPageShell } from './discover.utils';

export function GitHubPage() {
  const { query, setQuery, items, initialLoading, searchLoading, error } = useLiveSearch('github', 'stars:>1000');
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell
      title="GitHub"
      subtitle="Repositories"
      brandColor="bg-gray-800"
      brandLabel="GITHUB"
      sourceId="github"
      defaultQuery="stars:>1000"
      description="Search public open source repositories. Default shows repos with 1000+ stars."
    >
      {/* Search */}
      <section className="py-8 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search GitHub repos by name, description, language..."
              className="w-full bg-white text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-gray-800 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg transition-all duration-150 shadow-sm"
              autoComplete="off" spellCheck={false}
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-gray-800 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-border p-6 animate-pulse">
                  <div className="h-6 w-3/4 bg-surface-secondary mb-4" />
                  <div className="h-4 w-full bg-surface-secondary mb-2" />
                  <div className="h-4 w-2/3 bg-surface-secondary mb-6" />
                  <div className="flex gap-3">
                    <div className="h-6 w-16 bg-surface-secondary" />
                    <div className="h-6 w-20 bg-surface-secondary" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && !isLoading && (
            <div className="text-center py-16">
              <p className="text-lg text-fg-secondary mb-2">{error}</p>
            </div>
          )}

          {!isLoading && !error && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, i) => {
                const m = item.metadata;
                return (
                  <a
                    key={`${item.url}-${i}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white border border-border p-6 transition-all duration-200 hover:border-gray-800 hover:shadow-lg hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-fg group-hover:text-gray-800 transition-colors truncate">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-sm text-fg-secondary leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-fg-muted/70 flex-wrap">
                      {n(m?.stars) > 0 && (
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          {n(m?.stars).toLocaleString()}
                        </span>
                      )}
                      {v(m?.language) && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-secondary text-fg-muted text-[10px] font-semibold uppercase tracking-wider">
                          {v(m?.language)}
                        </span>
                      )}
                      {n(m?.forks) > 0 && <span>{n(m?.forks)} forks</span>}
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-base text-fg-secondary">No repos found for &ldquo;{query}&rdquo;</p>
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
