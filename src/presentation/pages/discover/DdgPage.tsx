'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, DiscoverPageShell } from './discover.utils';

const DDG_TOPICS = [
  { id: 'programming', label: 'Programming' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'react', label: 'React' },
  { id: 'ai', label: 'AI' },
  { id: 'database', label: 'Database' },
  { id: 'security', label: 'Security' },
  { id: 'css', label: 'CSS' },
  { id: 'api', label: 'API' },
];

export function DdgPage() {
  const { query, setQuery, items, initialLoading, searchLoading, loadingMore, error, selectedCategory, setSelectedCategory, sentinelRef, hasMore } = useLiveSearch('ddg', 'programming', { categories: DDG_TOPICS, limit: 50 });
  const isLoading = initialLoading && items.length === 0;

  return (
    <DiscoverPageShell title="Duck" subtitle="DuckGo" brandColor="bg-orange-600" brandLabel="DUCKDUCKGO" textColor="text-orange-600" description="Instant answers, definitions, and topics from DuckDuckGo.">
      {/* Topic filter tabs */}
      <section className="py-6 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {DDG_TOPICS.map((topic) => (
              <button key={topic.id} onClick={() => setSelectedCategory(selectedCategory === topic.id ? null : topic.id)}
                className={cn('px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200',
                  selectedCategory === topic.id ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-fg-muted border border-orange-200 hover:bg-orange-50 hover:text-orange-700'
                )}>
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the web via DuckDuckGo..." className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-orange-600 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg" autoComplete="off" spellCheck={false} />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-orange-600 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-xs text-fg-muted/60 mb-6 uppercase tracking-wider">{items.length} result{items.length !== 1 ? 's' : ''}</p>
          {isLoading && <div className="space-y-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="animate-pulse p-5 border-b border-border"><div className="h-6 w-2/3 bg-surface-secondary mb-3" /><div className="h-4 w-full bg-surface-secondary mb-2" /><div className="h-4 w-1/2 bg-surface-secondary" /></div>)}</div>}
          {error && !isLoading && <div className="text-center py-16"><p className="text-lg text-fg-secondary">{error}</p></div>}
          {!isLoading && !error && items.length > 0 && (
            <div className="divide-y divide-border">
              {items.map((item, i) => {
                const m = item.metadata;
                return (
                  <a key={`${item.url}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer" className="block py-5 px-4 transition-colors hover:bg-orange-50 group">
                    <h3 className="text-base font-semibold text-fg group-hover:text-orange-700 transition-colors leading-snug mb-1">{item.title}</h3>
                    {item.description && <p className="text-sm text-fg-secondary leading-relaxed line-clamp-2 mb-1">{item.description}</p>}
                    {v(m?.source) && <p className="text-xs text-fg-muted/50 group-hover:text-orange-600/50 transition-colors">via {v(m?.source)}</p>}
                  </a>
                );
              })}
            </div>
          )}
          {!isLoading && !error && items.length === 0 && <div className="text-center py-16"><p className="text-base text-fg-secondary">No results found.</p></div>}
          {hasMore && !isLoading && items.length > 0 && (
            <div ref={sentinelRef} className="h-20 flex items-center justify-center">
              {loadingMore ? <span className="inline-block w-6 h-6 border-2 border-orange-600/30 border-t-orange-600 rounded-full animate-spin" /> : <span className="text-xs text-fg-muted/40">Scroll for more</span>}
            </div>
          )}
          {searchLoading && <div className="text-center py-4"><span className="inline-block w-5 h-5 border-2 border-orange-600/30 border-t-orange-600 rounded-full animate-spin" /></div>}
        </div>
      </section>
    </DiscoverPageShell>
  );
}
