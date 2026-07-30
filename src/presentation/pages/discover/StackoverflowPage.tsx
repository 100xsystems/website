'use client';

import React from 'react';
import { useLiveSearch, cn, v, n, Favicon, DiscoverPageShell } from './discover.utils';

const SO_TAGS = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'reactjs', label: 'React' },
  { id: 'node.js', label: 'Node.js' },
  { id: 'sql', label: 'SQL' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'docker', label: 'Docker' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'flutter', label: 'Flutter' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'aws', label: 'AWS' },
  { id: 'git', label: 'Git' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'mongodb', label: 'MongoDB' },
  { id: 'linux', label: 'Linux' },
  { id: '.net', label: '.NET' },
  { id: 'c#', label: 'C#' },
  { id: 'c++', label: 'C++' },
  { id: 'php', label: 'PHP' },
  { id: 'ruby-on-rails', label: 'Ruby on Rails' },
  { id: 'swift', label: 'Swift' },
  { id: 'kotlin', label: 'Kotlin' },
  { id: 'django', label: 'Django' },
  { id: 'spring-boot', label: 'Spring Boot' },
  { id: 'tensorflow', label: 'TensorFlow' },
  { id: 'machine-learning', label: 'ML' },
  { id: 'angular', label: 'Angular' },
  { id: 'vue.js', label: 'Vue.js' },
  { id: 'graphql', label: 'GraphQL' },
  { id: 'redis', label: 'Redis' },
  { id: 'amazon-web-services', label: 'AWS' },
  { id: 'firebase', label: 'Firebase' },
  { id: 'next.js', label: 'Next.js' },
  { id: 'tailwind-css', label: 'Tailwind CSS' },
  { id: 'prisma', label: 'Prisma' },
  { id: 'microservices', label: 'Microservices' },
];

const SO_SORTS = [
  { id: 'votes', label: 'Top Voted' },
  { id: 'newest', label: 'Newest' },
  { id: 'active', label: 'Active' },
  { id: 'unanswered', label: 'Unanswered' },
];

export function StackoverflowPage() {
  const {
    query, setQuery, items, initialLoading, searchLoading, loadingMore,
    error, selectedCategory, setSelectedCategory, sentinelRef, hasMore,
  } = useLiveSearch('stackoverflow', 'javascript', { categories: SO_TAGS, limit: 50 });
  const [sortBy, setSortBy] = React.useState('votes');
  const isLoading = initialLoading && items.length === 0;

  // When sort changes, update the query with the sort directive so it actually fires a search
  const handleSortChange = (sortId: string) => {
    setSortBy(sortId);
    const currentCategory = selectedCategory || 'javascript';
    if (sortId === 'votes') {
      // Reset query to just the category tag
      setQuery(currentCategory);
    } else {
      setQuery(`${currentCategory} sort:${sortId}`);
    }
  };



  return (
    <DiscoverPageShell
      title="Stack"
      subtitle="Overflow"
      brandColor="bg-orange-500"
      brandLabel="STACK OVERFLOW"
      textColor="text-orange-500"
      description="Programming Q&A. Filter by tag, sort by votes/newest/active."
    >
      {/* Tag filter tabs */}
      <section className="py-6 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {SO_TAGS.map((tag) => (
              <button key={tag.id} onClick={() => setSelectedCategory(selectedCategory === tag.id ? null : tag.id)}
                className={cn('px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200',
                  selectedCategory === tag.id ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-fg-muted border border-orange-200 hover:bg-orange-50 hover:text-orange-700'
                )}>
                {tag.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">Sort:</span>
            {SO_SORTS.map((s) => (
              <button key={s.id} onClick={() => handleSortChange(s.id)}
                className={cn('px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all',
                  sortBy === s.id ? 'bg-orange-500 text-white' : 'text-fg-muted hover:text-orange-600'
                )}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Stack Overflow questions..."
              className="w-full bg-surface-secondary text-base py-4 pl-12 pr-12 border-0 border-b-2 border-transparent focus:border-orange-500 focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg"
              autoComplete="off" spellCheck={false} />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-orange-500 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-xs text-fg-muted/60 mb-6 uppercase tracking-wider">{items.length} question{items.length !== 1 ? 's' : ''}{sortBy !== 'votes' && <> · sorted by {sortBy}</>}</p>

          {isLoading && (
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-6 p-5 animate-pulse">
                  <div className="w-16 space-y-2 shrink-0"><div className="h-8 w-full bg-surface-secondary" /><div className="h-4 w-full bg-surface-secondary" /></div>
                  <div className="flex-1 space-y-3"><div className="h-6 w-3/4 bg-surface-secondary" /><div className="h-4 w-1/2 bg-surface-secondary" /></div>
                </div>
              ))}
            </div>
          )}

          {error && !isLoading && <div className="text-center py-16"><p className="text-lg text-fg-secondary">{error}</p></div>}

          {!isLoading && !error && items.length > 0 && (
            <div className="divide-y divide-border">
              {items.map((item, i) => {
                const m = item.metadata;
                const isAnswered = m?.isAnswered === true;
                return (
                  <a key={`${item.url}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="flex gap-6 px-5 py-5 transition-colors hover:bg-orange-50 group">
                    <div className="w-16 shrink-0 text-center">
                      <div className="text-lg font-bold text-fg-muted group-hover:text-orange-600 transition-colors">{n(m?.score)}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted/60">votes</div>
                      {n(m?.answerCount) > 0 && (
                        <div className={cn('mt-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider', isAnswered ? 'bg-green-100 text-green-700' : 'bg-surface-secondary text-fg-muted')}>
                          {n(m?.answerCount)} {isAnswered ? '✓' : ''}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-fg group-hover:text-orange-700 transition-colors leading-snug">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {Array.isArray(m?.tags) && (m.tags as string[]).slice(0, 5).map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-semibold uppercase tracking-wider">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="text-center py-16"><p className="text-base text-fg-secondary">No questions found.</p></div>
          )}

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
