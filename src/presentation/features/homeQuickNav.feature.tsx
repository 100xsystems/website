'use client';

import React from 'react';

const SECTIONS = [
  { id: 'concepts', label: 'Knowledge' },
  { id: 'awesome', label: 'Awesome' },
  { id: 'updates', label: 'Updates' },
  { id: 'discover', label: 'Discover' },
  { id: 'yc', label: 'YC' },
  { id: 'products', label: 'Products' },
] as const;

/**
 * Sticky quick-nav for mobile — jump straight to any homepage section
 * instead of scrolling through all of them. Hidden on desktop (lg+).
 */
export function HomeQuickNav() {
  return (
    <nav
      aria-label="Homepage sections"
      className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm lg:hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-3">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 bg-surface-secondary px-4 py-2 text-xs font-bold uppercase tracking-wider text-fg-secondary transition-colors duration-150 hover:bg-accent hover:text-white"
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
