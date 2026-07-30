'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, DiscoverPageShell } from './discover.utils';

export function NpmPage() {
  const { query, setQuery, items, initialLoading, searchLoading, loadingMore, error, sentinelRef, hasMore } = useLiveSearch('npm', 'react', { limit: 50 });
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell title="NPM" subtitle="Packages" brandColor="bg-red-600" brandLabel="NPM" textColor="text-red-600" description="Search the npm registry for packages.">
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search npm packages..." className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-red-600 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg font-mono" autoComplete="off" spellCheck={false} />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-red-600 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-xs text-fg-muted/60 mb-6 uppercase tracking-wider">{items.length} result{items.length !== 1 ? 's' : ''}</p>
          {isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 9 }).map((_, i) => <div key={i} className="animate-pulse p-6"><div className="h-6 w-2/3 bg-surface-secondary mb-3 font-mono" /><div className="h-4 w-full bg-surface-secondary mb-2" /><div className="h-4 w-3/4 bg-surface-secondary mb-5" /><div className="flex gap-4"><div className="h-5 w-16 bg-surface-secondary" /><div className="h-5 w-20 bg-surface-secondary" /></div></div>)}</div>}
          {error && !isLoading && <div className="text-center py-16"><p className="text-lg text-fg-secondary">{error}</p></div>}
          {!isLoading && !error && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, i) => {
                const m = item.metadata;
                return (
                  <a key={`${item.url}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="block p-6 transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-lg group">
                    <h3 className="text-lg font-bold text-fg font-mono group-hover:text-white transition-colors truncate mb-2">{item.title}</h3>
                    {item.description && <p className="text-sm text-fg-secondary group-hover:text-white/70 transition-colors leading-relaxed line-clamp-3 mb-4">{item.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-fg-muted/70 group-hover:text-white/60">
                      {v(m?.version) && <span className="font-mono">v{v(m?.version)}</span>}
                      {n(m?.score) > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: n(m?.score) > 0.5 ? '#22c55e' : '#eab308' }} />score: {n(m?.score).toFixed(2)}</span>}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
          {!isLoading && !error && items.length === 0 && <div className="text-center py-16"><p className="text-base text-fg-secondary">No packages found.</p></div>}
          {hasMore && !isLoading && items.length > 0 && (
            <div ref={sentinelRef} className="h-20 flex items-center justify-center">
              {loadingMore ? <span className="inline-block w-6 h-6 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" /> : <span className="text-xs text-fg-muted/40">Scroll for more</span>}
            </div>
          )}
          {searchLoading && <div className="text-center py-4"><span className="inline-block w-5 h-5 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" /></div>}
        </div>
      </section>
    </DiscoverPageShell>
  );
}
