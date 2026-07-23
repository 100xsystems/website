'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, Search, ChevronDown } from 'lucide-react';

interface AwesomeLink {
  url: string;
  title: string;
  description: string | null;
  category: string;
}

interface CategoryBrowserProps {
  links: AwesomeLink[];
  categories: string[];
}

export function CategoryBrowser({ links, categories }: CategoryBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    // First 3 categories expanded by default, or all if fewer than 3
    const initial = new Set<string>();
    const seen = new Set<string>();
    for (const link of links) {
      if (!seen.has(link.category)) {
        seen.add(link.category);
        if (initial.size < 3) initial.add(link.category);
      }
    }
    return initial;
  });

  // Group links by category
  const grouped = useMemo(() => {
    const map: Record<string, AwesomeLink[]> = {};
    for (const link of links) {
      if (!map[link.category]) map[link.category] = [];
      map[link.category].push(link);
    }
    return map;
  }, [links]);

  // Filter links by search query
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return { grouped, allEmpty: false };
    const q = searchQuery.toLowerCase().trim();
    const result: Record<string, AwesomeLink[]> = {};
    let anyMatch = false;
    for (const [cat, catLinks] of Object.entries(grouped)) {
      const matching = catLinks.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          (l.description && l.description.toLowerCase().includes(q)) ||
          cat.toLowerCase().includes(q)
      );
      if (matching.length > 0) {
        result[cat] = matching;
        anyMatch = true;
      }
    }
    return { grouped: result, allEmpty: !anyMatch };
  }, [searchQuery, grouped]);

  const categoryEntries = Object.entries(filtered.grouped);
  const totalLinks = links.length;

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          placeholder={`Search ${totalLinks} resources...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400 transition-all"
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

      {/* Category navigation pills */}
      <nav className="mb-8 flex flex-wrap gap-1.5">
        {categoryEntries.map(([category, catLinks]) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              const el = document.getElementById(`cat-${encodeURIComponent(category)}`);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                el.focus({ preventScroll: true });
                // Also expand this category
                setExpandedCategories((prev) => new Set(prev).add(category));
              }
            }}
            className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-200 transition-colors"
          >
            {category}
            <span className="ml-1 text-neutral-400">({catLinks.length})</span>
          </button>
        ))}
      </nav>

      {/* No results state */}
      {filtered.allEmpty && (
        <div className="rounded-lg border-2 border-dashed border-neutral-200 p-8 text-center">
          <p className="text-neutral-500 text-sm">
            No resources match &quot;{searchQuery}&quot;
          </p>
        </div>
      )}

      {/* Categorized links */}
      {!filtered.allEmpty && (
        <div className="space-y-4">
          {categoryEntries.map(([category, catLinks]) => {
            const isExpanded = expandedCategories.has(category);
            return (
              <section
                key={category}
                id={`cat-${encodeURIComponent(category)}`}
                tabIndex={-1}
                className="rounded-lg border border-neutral-100 overflow-hidden"
              >
                {/* Category header (clickable to toggle) */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className="flex w-full items-center justify-between px-4 py-3 bg-white hover:bg-neutral-50 transition-colors text-left"
                >
                  <h2 className="text-sm font-semibold text-neutral-900">
                    {category}
                    <span className="ml-2 font-normal text-neutral-400">
                      ({catLinks.length})
                    </span>
                  </h2>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Links (animated height via overflow + max-height) */}
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    isExpanded ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="border-t border-neutral-100 px-2 py-1">
                    {catLinks.map((link, idx) => (
                      <a
                        key={`${link.url}-${idx}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-neutral-50"
                      >
                        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-300 group-hover:text-blue-500 transition-colors" />
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-neutral-800 group-hover:text-blue-600 transition-colors">
                            {link.title}
                          </span>
                          {link.description && (
                            <span className="ml-1 text-sm text-neutral-500">
                              — {link.description}
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
