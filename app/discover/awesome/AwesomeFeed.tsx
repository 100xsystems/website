'use client';

import { useState, useMemo, useRef } from 'react';
import Fuse from 'fuse.js';
import { Search, X } from 'lucide-react';
import { cn } from '@/application/lib/utils';

interface AwesomeEntry {
  url: string;
  title: string;
  description: string | null;
  category: string;
  source: string;
}

interface AwesomeFeedProps {
  links: AwesomeEntry[];
  sourceLabels: Record<string, string>;
  sourceStars: Record<string, number>;
  categories: string[];
  categoryCounts: Record<string, number>;
}

const ITEMS_PER_PAGE = 48;

export function AwesomeFeed({ links, sourceLabels, sourceStars, categories, categoryCounts }: AwesomeFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // All available source IDs, sorted by star count
  const allSources = useMemo(() => {
    const seen = new Set<string>();
    const sources: string[] = [];
    for (const l of links) {
      if (!seen.has(l.source)) { seen.add(l.source); sources.push(l.source); }
    }
    sources.sort((a, b) => (sourceStars[b] || 0) - (sourceStars[a] || 0));
    return sources;
  }, [links, sourceStars]);

  // Fuse.js for searching
  const fuseRef = useRef<Fuse<AwesomeEntry> | null>(null);
  function getFuse(): Fuse<AwesomeEntry> {
    if (!fuseRef.current) {
      fuseRef.current = new Fuse(links, {
        keys: [{ name: 'title', weight: 3 }, { name: 'description', weight: 1.5 }, { name: 'category', weight: 2 }, { name: 'source', weight: 1.5 }],
        threshold: 0.35, distance: 120, minMatchCharLength: 2,
      });
    } else { fuseRef.current.setCollection(links); }
    return fuseRef.current;
  }

  // Filter + Search
  const filtered = useMemo(() => {
    let result = links;
    if (selectedCategory) result = result.filter((l) => l.category === selectedCategory);
    if (selectedSources.length > 0) result = result.filter((l) => selectedSources.includes(l.source));
    if (searchQuery.trim().length >= 2) {
      const fuse = getFuse();
      fuse.setCollection(result);
      return fuse.search(searchQuery.trim()).map((r) => r.item);
    }
    return result;
  }, [links, searchQuery, selectedCategory, selectedSources]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleSource = (source: string) => {
    setSelectedSources((prev) => prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery(''); setSelectedCategory(null); setSelectedSources([]); setCurrentPage(1);
  };

  return (
    <div>
      {/* Category tags — wrapped row */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-3">CATEGORIES</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setSelectedCategory(null); setCurrentPage(1); }}
            className={cn('px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200',
              !selectedCategory ? 'bg-accent text-white shadow-lg' : 'bg-white text-fg-muted border border-border hover:text-fg hover:border-accent'
            )}>
            All ({links.length})
          </button>
          {categories.slice(0, 30).map((cat) => (
            <button key={cat} onClick={() => { setSelectedCategory(selectedCategory === cat ? null : cat); setCurrentPage(1); }}
              className={cn('px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200',
                selectedCategory === cat ? 'bg-accent text-white shadow-lg' : 'bg-white text-fg-muted border border-border hover:text-fg hover:border-accent'
              )}>
              {cat.replace(/-/g, ' ')} ({categoryCounts[cat]})
            </button>
          ))}
        </div>
      </div>

      {/* Source tabs */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-3">SOURCES</p>
        <div className="flex flex-wrap gap-1.5">
          {allSources.map((source) => {
            const active = selectedSources.includes(source);
            return (
              <button key={source} type="button" onClick={() => toggleSource(source)}
                className={cn('px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-all duration-150',
                  active ? 'bg-accent text-white border-accent' : 'bg-white text-fg-muted border-border hover:text-fg hover:border-fg/50'
                )}>
                {sourceLabels[source]?.split(' - ')[0] || source.split('/')[1] || source}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-fg-muted" />
        <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          placeholder="Search awesome resources..." className="w-full border border-border bg-white pl-12 pr-12 py-3.5 text-base text-fg placeholder:text-fg-muted outline-none transition-all duration-150 focus:border-accent"
          autoComplete="off" />
        {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors"><X className="h-4 w-4" /></button>}
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-fg-muted">
          {filtered.length === 0 ? 'No resources' : `${filtered.length.toLocaleString()} resource${filtered.length !== 1 ? 's' : ''}`}
          {searchQuery && <> matching &ldquo;{searchQuery}&rdquo;</>}
        </p>
        {(selectedCategory || selectedSources.length > 0 || searchQuery) && (
          <button onClick={clearFilters} className="text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors">Clear all</button>
        )}
      </div>

      {/* Resource grid — 3-4 columns */}
      {visible.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-fg-muted text-base">No resources match your filters.</p>
          <button onClick={clearFilters} className="mt-5 text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors">Clear all filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map((entry, i) => (
            <a key={`${entry.url}-${startIndex + i}`} href={entry.url} target="_blank" rel="noopener noreferrer"
              className="group block bg-white border border-border p-5 transition-all duration-200 hover:bg-accent hover:text-white hover:border-accent hover:shadow-lg">
              <h3 className="text-sm font-bold text-fg group-hover:text-white transition-colors leading-snug line-clamp-2 mb-2">
                {entry.title}
              </h3>
              {entry.description && (
                <p className="text-xs text-fg-secondary group-hover:text-white/80 transition-colors leading-relaxed line-clamp-2 mb-3">
                  {entry.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-[10px]">
                {entry.category && (
                  <span className="px-2 py-1 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80 font-semibold uppercase tracking-wider transition-colors">
                    {entry.category}
                  </span>
                )}
                <span className="text-fg-muted/50 group-hover:text-white/50 ml-auto transition-colors">
                  {entry.source.split('/')[1] || entry.source}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-5 mt-10">
          <button disabled={safePage <= 1} onClick={() => setCurrentPage(safePage - 1)}
            className={cn('inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all duration-200',
              safePage > 1 ? 'border-border bg-white text-fg hover:bg-accent hover:text-white hover:border-accent' : 'border-border/30 text-fg-muted/30 cursor-not-allowed'
            )}>
            Previous
          </button>
          <span className="text-sm text-fg-muted tabular-nums">Page {safePage} of {totalPages}</span>
          <button disabled={safePage >= totalPages} onClick={() => setCurrentPage(safePage + 1)}
            className={cn('inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all duration-200',
              safePage < totalPages ? 'border-border bg-white text-fg hover:bg-accent hover:text-white hover:border-accent' : 'border-border/30 text-fg-muted/30 cursor-not-allowed'
            )}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
