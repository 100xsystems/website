'use client';

import { useState, useMemo, useRef } from 'react';
import Fuse from 'fuse.js';
import { Search, X, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { highlightMatches } from '@/feed/feed.utils';
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
}

const ITEMS_PER_PAGE = 100;

export function AwesomeFeed({ links, sourceLabels, sourceStars }: AwesomeFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // All available source IDs, sorted by star count (most popular first)
  const allSources = useMemo(() => {
    const seen = new Set<string>();
    const sources: string[] = [];
    for (const l of links) {
      if (!seen.has(l.source)) {
        seen.add(l.source);
        sources.push(l.source);
      }
    }
    sources.sort((a, b) => (sourceStars[b] || 0) - (sourceStars[a] || 0));
    return sources;
  }, [links, sourceStars]);

  // Fuse.js instance (lazy initialized)
  const fuseRef = useRef<Fuse<AwesomeEntry> | null>(null);

  function getFuse(): Fuse<AwesomeEntry> {
    if (!fuseRef.current) {
      fuseRef.current = new Fuse(links, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'description', weight: 1.5 },
          { name: 'category', weight: 2 },
          { name: 'source', weight: 1.5 },
        ],
        threshold: 0.35,
        distance: 120,
        minMatchCharLength: 2,
      });
    } else {
      fuseRef.current.setCollection(links);
    }
    return fuseRef.current;
  }

  // Filter + Search
  const filtered = useMemo(() => {
    let result = links;

    if (selectedSources.length > 0) {
      result = result.filter((l) => selectedSources.includes(l.source));
    }

    if (searchQuery.trim().length >= 2) {
      const fuse = getFuse();
      fuse.setCollection(result);
      return fuse.search(searchQuery.trim()).map((r) => r.item);
    }

    if (selectedSources.length > 1) {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [links, searchQuery, selectedSources]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const hasPrev = safePage > 1;
  const hasNext = safePage < totalPages;

  const toggleSource = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source],
    );
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSources([]);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Source list tabs — wrapped multi-row, fully visible */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {allSources.map((source) => {
          const active = selectedSources.includes(source);
          const label = sourceLabels[source]?.split(' - ')[0] || source.split('/')[1] || source;
          return (
            <button
              key={source}
              type="button"
              onClick={() => toggleSource(source)}
              className={cn(
                'px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all duration-150',
                active
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-fg-muted border-black/30 hover:text-fg hover:border-fg',
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Search bar — bigger */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-fg-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          placeholder="Search awesome resources..."
          className="w-full border bg-white pl-12 pr-12 py-3.5 text-base text-fg placeholder:text-fg-muted outline-none transition-all duration-150 focus:border-accent border-black/30 focus:bg-accent/[0.02]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-fg-muted">
          {filtered.length === 0
            ? 'No resources'
            : selectedSources.length > 1
              ? `${filtered.length.toLocaleString()} resources from ${selectedSources.length} lists`
              : selectedSources.length === 1
                ? `${filtered.length.toLocaleString()} resources`
                : `${filtered.length.toLocaleString()} resources across ${allSources.length} lists`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        {(selectedSources.length > 0 || searchQuery) && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Resource list */}
      {visible.length === 0 ? (
        <div className="border border-dashed border-black/20 p-16 text-center">
          <Bookmark className="mx-auto h-8 w-8 text-fg-muted/30 mb-4" />
          <p className="text-fg-muted text-base">No resources match your filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map((entry, i) => {
            const hasQuery = searchQuery.trim().length >= 2;
            return (
              <a
                key={`${entry.url}-${startIndex + i}`}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 border bg-white px-5 py-4 transition-all duration-150 hover:bg-accent hover:text-white border-black/20 hover:border-accent"
              >
                {/* Source badge */}
                <span className="shrink-0 mt-0.5 inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-black text-white group-hover:bg-white group-hover:text-accent transition-colors duration-150">
                  {entry.source.split('/')[1] || entry.source}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[15px] font-semibold text-fg group-hover:text-white transition-colors duration-150 leading-snug">
                      {hasQuery ? highlightMatches(entry.title, searchQuery) : entry.title}
                    </span>
                  </div>
                  {entry.description && (
                    <p className="text-sm text-fg-muted/80 mt-1 line-clamp-2 group-hover:text-white/80 transition-colors duration-150">
                      {hasQuery ? highlightMatches(entry.description, searchQuery) : entry.description}
                    </p>
                  )}
                  <p className="text-xs text-fg-muted/50 mt-1.5 group-hover:text-white/60 transition-colors duration-150">
                    {entry.category}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Pagination — Previous / Next */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            type="button"
            disabled={!hasPrev}
            onClick={() => goToPage(safePage - 1)}
            className={cn(
              'inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all duration-150',
              hasPrev
                ? 'border-black/30 bg-white text-fg hover:bg-accent hover:text-white hover:border-accent'
                : 'border-black/10 text-fg-muted/30 cursor-not-allowed',
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <span className="text-sm text-fg-muted tabular-nums">
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={!hasNext}
            onClick={() => goToPage(safePage + 1)}
            className={cn(
              'inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all duration-150',
              hasNext
                ? 'border-black/30 bg-white text-fg hover:bg-accent hover:text-white hover:border-accent'
                : 'border-black/10 text-fg-muted/30 cursor-not-allowed',
            )}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
