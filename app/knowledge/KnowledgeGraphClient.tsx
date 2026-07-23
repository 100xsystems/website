'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { highlightMatches } from '@/feed/feed.utils';
import { Search, X } from 'lucide-react';

interface ConceptEntry {
  slug: string;
  label: string;
  category: string;
}

interface KnowledgeGraphClientProps {
  concepts: ConceptEntry[];
  initialCategory: string | null;
  categoryCounts: Record<string, number>;
  categoryLabels: Record<string, string>;
}

const CATEGORY_ORDER = ['principles', 'languages', 'tools', 'patterns'];

export function KnowledgeGraphClient({
  concepts,
  initialCategory,
  categoryCounts,
  categoryLabels,
}: KnowledgeGraphClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

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
      {/* Category tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-150 border ${
            !selectedCategory
              ? 'bg-accent text-white border-accent'
              : 'bg-white text-fg-muted border-black/30 hover:text-fg hover:border-fg'
          }`}
        >
          All
          <span className="ml-1.5 text-xs opacity-60">({concepts.length})</span>
        </button>
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-150 border ${
              selectedCategory === cat
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-fg-muted border-black/30 hover:text-fg hover:border-fg'
            }`}
          >
            {categoryLabels[cat] || cat}
            <span className="ml-1.5 text-xs opacity-60">({categoryCounts[cat] || 0})</span>
          </button>
        ))}
      </div>

      {/* Search bar — bigger */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-fg-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search concepts by name..."
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

      {/* Results count */}
      <p className="text-sm text-fg-muted mb-5">
        {searchQuery
          ? `Found ${filtered.length} concept${filtered.length !== 1 ? 's' : ''} for "${searchQuery}"`
          : `${filtered.length} concept${filtered.length !== 1 ? 's' : ''}`}
        {selectedCategory && ` in ${categoryLabels[selectedCategory] || selectedCategory}`}
      </p>

      {/* Concept list */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-black/20 p-16 text-center">
          <p className="text-fg-muted text-base">No concepts match your search.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => {
            const hasQuery = searchQuery.trim().length >= 2;
            return (
              <Link
                key={entry.slug}
                href={`/knowledge/${entry.slug}`}
                className="group flex items-center gap-3 border bg-white px-4 py-3.5 text-[15px] text-fg transition-all duration-150 hover:bg-accent hover:text-white border-black/20 hover:border-accent"
              >
                <span className="truncate font-medium">
                  {hasQuery ? highlightMatches(entry.label, searchQuery) : entry.label}
                </span>
                <span className="ml-auto text-xs text-fg-muted uppercase shrink-0 group-hover:text-white/70 transition-colors">
                  {entry.category?.slice(0, 3)}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
