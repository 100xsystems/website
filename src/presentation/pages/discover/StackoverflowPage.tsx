'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, Favicon, DiscoverPageShell } from './discover.utils';

export function StackoverflowPage() {
  const { query, setQuery, items, initialLoading, searchLoading, error } = useLiveSearch('stackoverflow', 'javascript');
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell
      title="Stack"
      subtitle="Overflow"
      brandColor="bg-orange-500"
      brandLabel="STACK OVERFLOW"
      sourceId="stackoverflow"
      defaultQuery="javascript"
      description="Programming Q&A. Default shows popular JavaScript questions."
    >
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Stack Overflow questions..."
              className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-orange-500 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg"
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

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {isLoading && (
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-6 p-5 animate-pulse border border-border">
                  <div className="w-16 space-y-2 shrink-0">
                    <div className="h-8 w-full bg-surface-secondary" />
                    <div className="h-4 w-full bg-surface-secondary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 w-3/4 bg-surface-secondary" />
                    <div className="h-4 w-1/2 bg-surface-secondary" />
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
            <div className="divide-y divide-border">
              {items.map((item, i) => {
                const m = item.metadata;
                const isAnswered = m?.isAnswered === true;
                return (
                  <a
                    key={`${item.url}-${i}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-6 px-5 py-5 transition-colors hover:bg-orange-50 group"
                  >
                    {/* Vote count + answer badge */}
                    <div className="w-16 shrink-0 text-center">
                      <div className="text-lg font-bold text-fg-muted group-hover:text-orange-600 transition-colors">
                        {n(m?.score)}
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted/60">votes</div>
                      {n(m?.answerCount) > 0 && (
                        <div className={cn('mt-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider',
                          isAnswered ? 'bg-green-100 text-green-700' : 'bg-surface-secondary text-fg-muted'
                        )}>
                          {n(m?.answerCount)} {isAnswered ? '✓' : ''}
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-fg group-hover:text-orange-700 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {Array.isArray(m?.tags) && (m.tags as string[]).slice(0, 4).map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-semibold uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-base text-fg-secondary">No questions found for &ldquo;{query}&rdquo;</p>
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
