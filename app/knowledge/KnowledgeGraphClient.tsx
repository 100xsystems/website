'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { highlightMatches } from '@/feed/feed.utils';
import { Search } from 'lucide-react';

interface ConceptEntry {
  slug: string;
  label: string;
  category: string;
}

interface KnowledgeGraphClientProps {
  concepts: ConceptEntry[];
  selectedCategory: string | null;
  categoryLabels: Record<string, string>;
  categoryColors: Record<string, string>;
}

export function KnowledgeGraphClient({
  concepts,
  selectedCategory,
  categoryLabels,
  categoryColors,
}: KnowledgeGraphClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter by category first
  const categoryFiltered = useMemo(() => {
    if (!selectedCategory) return concepts;
    return concepts.filter((c) => c.category === selectedCategory);
  }, [concepts, selectedCategory]);

  // Fuse.js instance (lazy initialized)
  const fuseRef = useRef<Fuse<ConceptEntry> | null>(null);

  function getFuse(): Fuse<ConceptEntry> {
    if (!fuseRef.current) {
      fuseRef.current = new Fuse(categoryFiltered, {
        keys: [
          { name: 'label', weight: 3 },
          { name: 'slug', weight: 2 },
          { name: 'category', weight: 1 },
        ],
        threshold: 0.35,
        distance: 100,
        minMatchCharLength: 2,
      });
    } else {
      fuseRef.current.setCollection(categoryFiltered);
    }
    return fuseRef.current;
  }

  // Search via Fuse.js
  const filtered = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      return categoryFiltered;
    }
    const fuse = getFuse();
    return fuse.search(searchQuery.trim()).map((r) => r.item);
  }, [categoryFiltered, searchQuery]);

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search concepts by name..."
          className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-neutral-400 mb-3">
        {searchQuery
          ? `Found ${filtered.length} concept${filtered.length !== 1 ? 's' : ''} for &ldquo;${searchQuery}&rdquo;`
          : `${filtered.length} concept${filtered.length !== 1 ? 's' : ''}`}
        {selectedCategory && ` in ${categoryLabels[selectedCategory] || selectedCategory}`}
      </p>

      {/* Concept list */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
          <p className="text-neutral-500 text-sm">No concepts match your search.</p>
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => {
            const catColor = categoryColors[entry.category] || 'bg-neutral-100 text-neutral-700';
            const hasQuery = searchQuery.trim().length >= 2;
            return (
              <Link
                key={entry.slug}
                href={`/knowledge/${entry.slug}`}
                className="flex items-center gap-2 rounded-lg border border-neutral-100 px-3 py-2.5 text-sm text-neutral-600 hover:border-neutral-200 hover:text-blue-600 transition-all"
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${catColor.split(' ')[0]}`} />
                <span className="truncate">
                  {hasQuery ? highlightMatches(entry.label, searchQuery) : entry.label}
                </span>
                <span className="ml-auto text-[10px] text-neutral-300 uppercase">{entry.category?.slice(0, 3)}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
