'use client';

import React from 'react';
import Link from 'next/link';
import { useBookmarks } from '@/feed/useBookmarks';
import { timeAgo } from '@/feed/feed.utils';
import { Heading, Text, Badge, Icon, Button } from '@/presentation/__components';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearAll, isSyncing } = useBookmarks();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[860px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <Link href="/feed" className="text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors mb-2 inline-block">
              &larr; Back to Feed
            </Link>
            <Heading variant="h1">Bookmarks</Heading>
            <Text variant="body" className="mt-1 text-fg-secondary">
              {bookmarks.length} saved article{bookmarks.length !== 1 ? 's' : ''}
              {isSyncing && <> &middot; syncing...</>}
            </Text>
          </div>
          {bookmarks.length > 0 && (
            <button onClick={clearAll} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-red-600 transition-colors border-2 border-black hover:border-red-400">
              Clear all
            </button>
          )}
        </div>

        {/* Empty state */}
        {bookmarks.length === 0 ? (
          <div className="text-center py-20 border-2 border-black px-8">
            <Heading variant="h2" className="mb-3 text-fg-muted/30">🔖</Heading>
            <Text variant="body" className="mb-1">No bookmarks yet</Text>
            <Text variant="muted" className="mb-6">
              Press <kbd className="px-1.5 py-0.5 bg-surface-secondary border-2 border-black text-[10px] font-mono">b</kbd> on any article or click the bookmark icon to save it here.
            </Text>
            <Link href="/feed">
              <Button variant="ripple" size="sm">Browse feed</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.url} className="group relative px-6 py-5 border-2 border-black hover:border-accent transition-all duration-200">
                {/* Source badge */}
                <div className="flex items-center gap-2 mb-2.5">
                  <Badge variant="purple" size="sm">{bookmark.feedName}</Badge>
                  <span className="text-[10px] text-fg-muted/60">·</span>
                  <div className="flex items-center gap-1 text-fg-muted/60">
                    <Icon name="clock" size={12} />
                    <Text variant="caption">Saved {timeAgo(bookmark.savedAt)}</Text>
                  </div>
                </div>

                {/* Title */}
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors leading-snug mb-1.5">
                    {bookmark.title}
                  </h3>
                </a>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-3">
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="sm">
                      Open <Icon name="arrow-right" size={12} />
                    </Button>
                  </a>
                  <button onClick={() => removeBookmark(bookmark.url)} className="text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-red-500 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
