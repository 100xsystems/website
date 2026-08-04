'use client';

import React from 'react';
import { FEED_REGISTRY } from './feed.constants';
import type { FeedSource } from './feed.types';
import { cn } from '@/application/lib/utils';
import { FeedFavicon } from './FeedFavicon';

interface FeedSourceSelectorProps {
  selectedFeeds: string[];
  onSelectionChange: (feedIds: string[]) => void;
}

export function FeedSourceSelector({ selectedFeeds, onSelectionChange }: FeedSourceSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredFeeds = searchQuery.trim()
    ? FEED_REGISTRY.filter(
        (f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.tags.some((t) => t.includes(searchQuery.toLowerCase()))
      )
    : FEED_REGISTRY;

  const toggleFeed = (feedId: string) => {
    if (selectedFeeds.includes(feedId)) {
      onSelectionChange(selectedFeeds.filter((id) => id !== feedId));
    } else {
      onSelectionChange([...selectedFeeds, feedId]);
    }
  };

  const selectAll = () => onSelectionChange(FEED_REGISTRY.map((f) => f.id));
  const clearAll = () => onSelectionChange([]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white transition-colors duration-200"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        Sources
        {selectedFeeds.length > 0 && selectedFeeds.length < FEED_REGISTRY.length && (
          <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-accent-yellow text-black font-bold">{selectedFeeds.length}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 w-[380px] max-h-[500px] bg-white overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <svg className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sources..."
                  className="w-full bg-surface-secondary text-sm py-2.5 pl-10 pr-3 border-0 border-b border-transparent focus:border-accent focus:outline-none focus:ring-0 placeholder:text-fg-muted/60 text-fg transition-all duration-150"
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 flex items-center pr-3 text-fg-muted hover:text-fg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                )}
              </div>
            </div>

            {/* Actions bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-surface-secondary">
              <button onClick={selectAll} className="text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors">Select All</button>
              <button onClick={clearAll} className="text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors">Clear All</button>
              <span className="text-[10px] text-fg-muted/60">{selectedFeeds.length} / {FEED_REGISTRY.length}</span>
            </div>

            {/* Feed list */}
            <div className="flex-1 overflow-y-auto">
              {filteredFeeds.length === 0 ? (
                <div className="p-6 text-center text-xs text-fg-muted/60">No sources match &ldquo;{searchQuery}&rdquo;</div>
              ) : (
                filteredFeeds.map((feed) => (
                  <FeedRow key={feed.id} feed={feed} isSelected={selectedFeeds.includes(feed.id)} onToggle={() => toggleFeed(feed.id)} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FeedRow({ feed, isSelected, onToggle }: { feed: FeedSource; isSelected: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={cn('w-full text-left px-4 py-3 flex items-start gap-3 transition-all duration-150 border-0 border-b border-border last:border-0', isSelected ? 'bg-accent text-white' : 'bg-white hover:bg-accent hover:text-white')}>
      <div className="mt-0.5 shrink-0">
        <FeedFavicon url={feed.siteUrl} name={feed.name} size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className={cn('text-xs font-bold truncate', isSelected ? 'text-white' : 'text-fg')}>{feed.name}</div>
        <div className="text-[10px] text-fg-muted/70 truncate mt-0.5 group-hover:text-white/70">{feed.description}</div>
        <div className="flex items-center gap-1 mt-1.5">
          {feed.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider bg-surface-muted text-fg-muted">{tag}</span>
          ))}
        </div>
      </div>
      {isSelected && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-white">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
}