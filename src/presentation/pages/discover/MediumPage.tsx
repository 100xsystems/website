'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, Favicon, DiscoverPageShell } from './discover.utils';

const MEDIUM_TAGS = [
  { id: 'technology', label: 'Technology' },
  { id: 'programming', label: 'Programming' },
  { id: 'artificial-intelligence', label: 'AI' },
  { id: 'software-development', label: 'Software Dev' },
  { id: 'data-science', label: 'Data Science' },
  { id: 'machine-learning', label: 'ML' },
  { id: 'web-development', label: 'Web Dev' },
  { id: 'startup', label: 'Startup' },
  { id: 'design', label: 'Design' },
  { id: 'devops', label: 'DevOps' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'cybersecurity', label: 'Security' },
];

export function MediumPage() {
  const {
    query, setQuery, items, initialLoading, searchLoading, loadingMore,
    error, selectedCategory, setSelectedCategory, sentinelRef, hasMore,
  } = useLiveSearch('medium', 'technology', { categories: MEDIUM_TAGS, limit: 50 });
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell title="Medium" subtitle="Stories" brandColor="bg-black" brandLabel="MEDIUM" textColor="text-black" description="Articles and stories from Medium publications. Filter by topic.">
      {/* Tag filter tabs */}
      <section className="py-6 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {MEDIUM_TAGS.map((tag) => (
              <button key={tag.id} onClick={() => setSelectedCategory(selectedCategory === tag.id ? null : tag.id)}
                className={cn('px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200',
                  selectedCategory === tag.id ? 'bg-black text-white shadow-lg' : 'bg-white text-fg-muted border border-gray-200 hover:bg-gray-100 hover:text-black'
                )}>
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Medium articles..." className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-black focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg" autoComplete="off" spellCheck={false} />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-black transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-xs text-fg-muted/60 mb-6 uppercase tracking-wider">{items.length} article{items.length !== 1 ? 's' : ''}</p>
          {isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{Array.from({ length: 9 }).map((_, i) => <div key={i} className="animate-pulse"><div className="h-5 w-20 bg-surface-secondary mb-4" /><div className="h-7 w-full bg-surface-secondary mb-3" /><div className="h-4 w-full bg-surface-secondary mb-2" /><div className="h-4 w-1/2 bg-surface-secondary" /></div>)}</div>}
          {error && !isLoading && <div className="text-center py-16"><p className="text-lg text-fg-secondary">{error}</p></div>}
          {!isLoading && !error && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, i) => {
                const m = item.metadata;
                return (
                  <a key={`${item.url}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="flex items-center gap-2 mb-3"><Favicon url={item.url} className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted group-hover:text-black transition-colors">MEDIUM</span></div>
                    <h3 className="text-lg font-bold text-fg group-hover:text-black transition-colors leading-snug line-clamp-3 mb-2">{item.title}</h3>
                    {item.description && <p className="text-sm text-fg-secondary leading-relaxed line-clamp-2 mb-3">{item.description}</p>}
                    <div className="flex items-center gap-2 text-xs text-fg-muted/60">{v(m?.author) && <span className="font-medium">by {v(m?.author)}</span>}{v(m?.publishedAt) && <><span>·</span><span>{new Date(v(m?.publishedAt)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></>}</div>
                  </a>
                );
              })}
            </div>
          )}
          {!isLoading && !error && items.length === 0 && <div className="text-center py-16"><p className="text-base text-fg-secondary">No articles found.</p></div>}
          {hasMore && !isLoading && items.length > 0 && (
            <div ref={sentinelRef} className="h-20 flex items-center justify-center">
              {loadingMore ? <span className="inline-block w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <span className="text-xs text-fg-muted/40">Scroll for more</span>}
            </div>
          )}
          {searchLoading && <div className="text-center py-4"><span className="inline-block w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /></div>}
        </div>
      </section>
    </DiscoverPageShell>
  );
}
