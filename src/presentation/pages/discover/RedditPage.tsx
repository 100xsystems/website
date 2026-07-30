'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, Favicon, DiscoverPageShell } from './discover.utils';

export function RedditPage() {
  const { query, setQuery, items, initialLoading, searchLoading, loadingMore, error, sentinelRef, hasMore } = useLiveSearch('reddit', 'programming', { limit: 50 });
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell title="Reddit" subtitle="Discussions" brandColor="bg-orange-500" brandLabel="REDDIT" textColor="text-orange-500" description="Discussions and posts from subreddits across programming topics.">
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Reddit discussions..." className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-orange-500 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg" autoComplete="off" spellCheck={false} />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-orange-500 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-xs text-fg-muted/60 mb-6 uppercase tracking-wider">{items.length} post{items.length !== 1 ? 's' : ''}</p>
          {isLoading && <div className="space-y-2">{Array.from({ length: 10 }).map((_, i) => <div key={i} className="flex gap-4 p-4 animate-pulse"><div className="w-14 h-14 bg-surface-secondary shrink-0 rounded-full" /><div className="flex-1 space-y-2"><div className="h-5 w-3/4 bg-surface-secondary" /><div className="h-4 w-1/3 bg-surface-secondary" /><div className="h-4 w-1/2 bg-surface-secondary" /></div></div>)}</div>}
          {error && !isLoading && <div className="text-center py-16"><p className="text-lg text-fg-secondary">{error}</p></div>}
          {!isLoading && !error && items.length > 0 && (
            <div className="divide-y divide-border">
              {items.map((item, i) => {
                const m = item.metadata;
                return (
                  <a key={`${item.url}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="flex gap-5 px-4 py-5 transition-colors hover:bg-orange-50 group">
                    <div className="w-14 h-14 shrink-0 flex flex-col items-center justify-center bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500"><path d="M12 4l-8 8h16z"/><path d="M12 20l8-8H4z"/></svg>
                      <span className="text-sm font-bold text-orange-600">{n(m?.points) || 0}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-fg group-hover:text-orange-700 transition-colors leading-snug mb-1">{item.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-fg-muted/60 flex-wrap">
                        {v(m?.subreddit) && <span className="font-bold">r/{v(m?.subreddit)}</span>}
                        {v(m?.author) && <span>by {v(m?.author)}</span>}
                        {n(m?.comments) > 0 && <span>{n(m?.comments)} comments</span>}
                      </div>
                      {item.description && <p className="text-sm text-fg-secondary mt-2 line-clamp-2 leading-relaxed">{item.description}</p>}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
          {!isLoading && !error && items.length === 0 && <div className="text-center py-16"><p className="text-base text-fg-secondary">No posts found.</p></div>}
          {hasMore && !isLoading && items.length > 0 && (
            <div ref={sentinelRef} className="h-20 flex items-center justify-center">
              {loadingMore ? <span className="inline-block w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" /> : <span className="text-xs text-fg-muted/40">Scroll for more</span>}
            </div>
          )}
          {searchLoading && <div className="text-center py-4"><span className="inline-block w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" /></div>}
        </div>
      </section>
    </DiscoverPageShell>
  );
}
