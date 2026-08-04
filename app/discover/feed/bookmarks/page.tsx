'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Bookmark, Trash2 } from 'lucide-react';
import { useBookmarks } from '@/feed/useBookmarks';
import { timeAgo } from '@/feed/feed.utils';
import { FeedFavicon } from '@/feed/FeedFavicon';
import { FEED_REGISTRY } from '@/feed/feed.constants';

// Feed id → site URL lookup so bookmarks can show the source favicon.
const FEED_SITE: Record<string, string> = Object.fromEntries(
  FEED_REGISTRY.map((f) => [f.id, f.siteUrl]),
);

export default function DiscoverFeedBookmarksPage() {
  const { bookmarks, removeBookmark, clearAll, isSyncing } = useBookmarks();

  const handleClearAll = () => {
    if (window.confirm(`Remove all ${bookmarks.length} bookmarks?`)) clearAll();
  };

  return (
    <main className="mx-auto bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-fg-muted">
          <Link href="/" className="font-bold uppercase tracking-wider transition-colors hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <Link href="/discover" className="font-bold uppercase tracking-wider transition-colors hover:text-accent">
            Discover
          </Link>
          <span>/</span>
          <Link href="/discover/feed" className="font-bold uppercase tracking-wider transition-colors hover:text-accent">
            Engineering Blogs
          </Link>
          <span>/</span>
          <span className="font-bold uppercase tracking-wider text-fg">Bookmarks</span>
        </div>

        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 bg-accent px-4 py-2 text-sm font-bold uppercase tracking-widest text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            SAVED ARTICLES
          </div>
          <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Bookmarks.<br />
            <span className="text-accent">Your saved reads.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
            {bookmarks.length === 0
              ? 'Press b on any article or click the bookmark icon to save it here.'
              : `${bookmarks.length} saved article${bookmarks.length !== 1 ? 's' : ''}${isSyncing ? ' · syncing…' : ''} — press b or click the bookmark icon on any article to save it here.`}
          </p>

          {bookmarks.length > 0 && (
            <div className="mt-8 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-surface-secondary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                <Bookmark size={13} />
                {bookmarks.length} saved
              </span>
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted transition-colors hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={13} />
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Empty state */}
        {bookmarks.length === 0 ? (
          <div className="bg-surface-secondary px-8 py-24 text-center">
            <p className="mb-3 text-3xl">🔖</p>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-fg sm:text-2xl">
              No bookmarks yet
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
              Press{' '}
              <kbd className="mx-1 bg-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-fg-muted">
                b
              </kbd>{' '}
              on any article or click the bookmark icon to save it here.
            </p>
            <Link
              href="/discover/feed"
              className="mt-8 inline-block px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white transition-colors hover:bg-accent-hover"
            >
              Browse feed &rarr;
            </Link>
          </div>
        ) : (
          <div className="space-y-1 bg-surface-secondary">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.url}
                className="group px-6 py-6 transition-colors duration-200 hover:bg-accent sm:px-8 sm:py-7"
              >
                {/* Source row — favicon + feed name + saved time */}
                <div className="mb-3 flex items-center gap-3">
                  <FeedFavicon url={FEED_SITE[bookmark.feedId] ?? ''} name={bookmark.feedName} size={28} />
                  <span className="text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors duration-200 group-hover:text-white/70">
                    {bookmark.feedName}
                  </span>
                  <span className="text-xs text-fg-muted/50 transition-colors duration-200 group-hover:text-white/50">
                    · Saved {timeAgo(bookmark.savedAt)}
                  </span>
                </div>

                {/* Title */}
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="mb-2 text-lg font-bold leading-snug text-fg transition-colors duration-200 group-hover:text-white sm:text-xl">
                    {bookmark.title}
                  </h3>
                </a>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-surface-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-fg-muted transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white/90">
                    Bookmarked {timeAgo(bookmark.savedAt)}
                  </span>
                  <div className="flex items-center gap-1">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-fg-muted/60 transition-colors duration-200 hover:text-fg group-hover:text-white/70"
                      title="Open article"
                      aria-label="Open article"
                    >
                      <ArrowUpRight size={15} />
                    </a>
                    <button
                      onClick={() => removeBookmark(bookmark.url)}
                      className="flex items-center gap-1.5 p-2 text-[10px] font-bold uppercase tracking-wider text-fg-muted/70 transition-colors duration-200 hover:text-red-500 group-hover:text-white/70 group-hover:hover:text-red-300"
                      title="Remove bookmark"
                      aria-label="Remove bookmark"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
