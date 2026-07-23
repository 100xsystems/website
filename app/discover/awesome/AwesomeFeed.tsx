'use client';

import { useState, useMemo, useRef } from 'react';
import Fuse from 'fuse.js';
import { ExternalLink, Search, Hash, FolderOpen } from 'lucide-react';
import { highlightMatches } from '@/feed/feed.utils';

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
}

const LIST_COLORS = [
  'bg-violet-100 text-violet-700',
  'bg-purple-100 text-purple-700',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-indigo-100 text-indigo-700',
  'bg-pink-100 text-pink-700',
];

function getListColor(repoId: string, allSources: string[]): string {
  const idx = allSources.indexOf(repoId);
  return LIST_COLORS[idx % LIST_COLORS.length];
}

export function AwesomeFeed({ links, sourceLabels }: AwesomeFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(100);

  // Derive available sources and categories
  const allSources = useMemo(() => {
    const seen = new Set<string>();
    const sources: string[] = [];
    for (const l of links) {
      if (!seen.has(l.source)) {
        seen.add(l.source);
        sources.push(l.source);
      }
    }
    return sources;
  }, [links]);

  const allCategories = useMemo(() => {
    const cats = new Set(links.map((l) => l.category));
    return [...cats].sort();
  }, [links]);

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

  // Filter + Search (source/category filters applied first, then Fuse.js fuzzy search)
  const filtered = useMemo(() => {
    let result = links;

    // Source filter
    if (selectedSources.length > 0) {
      result = result.filter((l) => selectedSources.includes(l.source));
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((l) => l.category === selectedCategory);
    }

    // Fuse.js fuzzy search
    if (searchQuery.trim().length >= 2) {
      const fuse = getFuse();
      return fuse.search(searchQuery.trim()).map((r) => r.item);
    }

    return result;
  }, [links, searchQuery, selectedSources, selectedCategory]);

  const visible = filtered.slice(0, showCount);
  const hasMore = filtered.length > showCount;

  const toggleSource = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source],
    );
    setShowCount(100);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSources([]);
    setSelectedCategory(null);
    setShowCount(100);
  };

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setShowCount(100); }}
          placeholder="Search awesome resources..."
          className="w-full rounded-lg border border-violet-200 bg-white pl-10 pr-4 py-2.5 text-sm text-violet-900 placeholder:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-violet-400 hover:text-violet-600 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Source filter chips */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 text-xs text-violet-500 mb-2">
          <FolderOpen className="h-3 w-3" />
          <span className="font-medium uppercase tracking-wider">Sources</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allSources.map((source) => {
            const active = selectedSources.includes(source);
            const colorClass = getListColor(source, allSources);
            return (
              <button
                key={source}
                type="button"
                onClick={() => toggleSource(source)}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                  active
                    ? `${colorClass} ring-2 ring-violet-300`
                    : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
                }`}
              >
                {sourceLabels[source] || source}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 text-xs text-violet-500 mb-2">
          <Hash className="h-3 w-3" />
          <span className="font-medium uppercase tracking-wider">Categories</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
              !selectedCategory
                ? 'bg-violet-200 text-violet-800 ring-1 ring-violet-400'
                : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
            }`}
          >
            All
          </button>
          {allCategories.slice(0, 30).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { setSelectedCategory(cat === selectedCategory ? null : cat); setShowCount(100); }}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-200 text-violet-800 ring-1 ring-violet-400'
                  : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Count + clear */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-violet-400">
          {filtered.length === links.length
            ? `${filtered.length.toLocaleString()} resources`
            : `${filtered.length.toLocaleString()} of ${links.length.toLocaleString()} resources`}
          {selectedSources.length > 0 && ` \u00b7 ${selectedSources.length} sources`}
          {selectedCategory && ` \u00b7 ${selectedCategory}`}
        </p>
        {(selectedSources.length > 0 || selectedCategory || searchQuery) && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-violet-500 hover:text-violet-700 underline underline-offset-2 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Resource list */}
      {visible.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-violet-200 p-12 text-center">
          <p className="text-violet-500 text-sm">No resources match your filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 text-xs text-violet-600 hover:text-violet-800 underline underline-offset-2 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {visible.map((entry, i) => {
              const sourceColor = getListColor(entry.source, allSources);
              const hasQuery = searchQuery.trim().length >= 2;
              return (
                <a
                  key={`${entry.url}-${i}`}
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-violet-100 bg-white px-4 py-3 transition-all hover:border-violet-200 hover:bg-violet-50/30 hover:shadow-sm"
                >
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300 group-hover:text-violet-500 transition-colors" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium text-violet-900 group-hover:text-violet-700 transition-colors">
                        {hasQuery ? highlightMatches(entry.title, searchQuery) : entry.title}
                      </span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${sourceColor}`}>
                        {entry.source.split('/')[1] || entry.source}
                      </span>
                    </div>
                    {entry.description && (
                      <p className="text-xs text-violet-600/60 mt-0.5 line-clamp-2">
                        {hasQuery ? highlightMatches(entry.description, searchQuery) : entry.description}
                      </p>
                    )}
                    <p className="text-[10px] text-violet-400 mt-1">
                      {entry.category}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Show more */}
          {hasMore && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowCount((prev) => prev + 100)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-5 py-2 text-xs font-medium text-violet-600 hover:bg-violet-50 hover:border-violet-300 transition-all"
              >
                Show more ({filtered.length - showCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
