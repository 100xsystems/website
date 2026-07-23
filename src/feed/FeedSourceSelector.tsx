'use client';

import React from 'react';
import { FEED_REGISTRY } from './feed.constants';
import type { FeedSource } from './feed.types';
import { cn } from '@/application/lib/utils';
import { Icon } from '@/presentation/__components';

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
        className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-fg transition-colors border-2 border-black hover:border-accent"
      >
        <Icon name="menu" size={14} />
        Sources
        {selectedFeeds.length > 0 && selectedFeeds.length < FEED_REGISTRY.length && (
          <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-accent-yellow text-black font-bold">{selectedFeeds.length}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 w-[380px] max-h-[500px] bg-white border-2 border-black shadow-xl overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-3 border-b-2 border-black">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-muted">
                  <Icon name="search" size={16} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sources..."
                  className="w-full bg-surface-secondary border-2 border-black py-2 pl-10 pr-3 text-sm text-fg placeholder:text-fg-muted outline-none focus:border-accent transition-colors"
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 flex items-center pr-3 text-fg-muted hover:text-fg">
                    <Icon name="x" size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Actions bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b-2 border-black bg-surface-light">
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
    <button onClick={onToggle} className={cn('w-full text-left px-4 py-3 flex items-start gap-3 transition-all duration-150', isSelected ? 'bg-accent-bg' : 'hover:bg-surface-secondary')}>
      {/* Custom checkbox */}
      <div className={cn('mt-0.5 w-4 h-4 shrink-0 border-2 flex items-center justify-center transition-all duration-150', isSelected ? 'bg-accent border-accent' : 'border-black')}>
        {isSelected && <Icon name="check" size={10} strokeWidth={3} className="text-white" />}
      </div>

      {/* Feed info */}
      <div className="flex-1 min-w-0">
        <div className={cn('text-xs font-bold truncate', isSelected ? 'text-accent' : 'text-fg')}>{feed.name}</div>
        <div className="text-[10px] text-fg-muted/70 truncate mt-0.5">{feed.description}</div>
        <div className="flex items-center gap-1 mt-1.5">
          {feed.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider bg-surface-muted text-fg-muted">{tag}</span>
          ))}
        </div>
      </div>
    </button>
  );
}
