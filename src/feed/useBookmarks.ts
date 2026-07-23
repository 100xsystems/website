'use client';

/**
 * useBookmarks.ts
 *
 * React hook for feed bookmarks with Turso persistence.
 *
 * DESIGN:
 *   - localStorage-first: bookmarks load instantly from localStorage
 *   - Turso sync: if signed in, bookmarks sync to/from Turso in the background
 *   - Signed-out users: localStorage only (existing behavior preserved)
 *   - Signed-in users: localStorage + Turso, both kept in sync
 *
 * SYNC STRATEGY:
 *   On mount (signed-in):
 *     1. Load localStorage immediately (instant render)
 *     2. Fetch bookmarks from Turso in background
 *     3. Merge: Turso wins (source of truth), update localStorage
 *
 *   On add/remove (signed-in):
 *     1. Update localStorage immediately (instant UI)
 *     2. POST/DELETE to Turso API in background
 *     3. On error, revert localStorage
 *
 *   On sign-in:
 *     Upload localStorage bookmarks to Turso via bulk upsert
 *
 * ETHICAL NOTE:
 *   We store only metadata — title, URL, feed name, feed ID. We NEVER store
 *   article body content. Users click through to the original source.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import type { BookmarkEntry } from './feed.types';

const BOOKMARKS_KEY = '100xfeed-bookmarks';

// ── localStorage helpers ──────────────────────────────────────────────

function loadLocal(): BookmarkEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? (JSON.parse(raw) as BookmarkEntry[]) : [];
  } catch {
    return [];
  }
}

function saveLocal(bookmarks: BookmarkEntry[]): void {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch { /* quota exceeded — silently fail */ }
}

function mergeBookmarks(local: BookmarkEntry[], remote: BookmarkEntry[]): BookmarkEntry[] {
  const map = new Map<string, BookmarkEntry>();
  // Add local first (lower priority), then remote (higher priority — overrides)
  for (const bm of local) map.set(bm.url, bm);
  for (const bm of remote) map.set(bm.url, bm);
  return Array.from(map.values()).sort((a, b) =>
    new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
  );
}

// ── API helpers ───────────────────────────────────────────────────────

async function fetchBookmarksFromServer(): Promise<BookmarkEntry[]> {
  const res = await fetch('/api/feed/bookmarks');
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const data = await res.json();
  // Map from DB format to BookmarkEntry format
  return (data.bookmarks as Array<{
    url: string;
    title: string;
    feed_name: string;
    feed_id: string;
    saved_at: string;
  }>).map((b) => ({
    url: b.url,
    title: b.title,
    feedName: b.feed_name,
    feedId: b.feed_id,
    savedAt: b.saved_at,
  }));
}

async function addBookmarkToServer(bookmark: BookmarkEntry): Promise<void> {
  const res = await fetch('/api/feed/bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: bookmark.url,
      title: bookmark.title,
      feed_name: bookmark.feedName,
      feed_id: bookmark.feedId,
    }),
  });
  if (!res.ok) throw new Error(`Add failed: ${res.status}`);
}

async function removeBookmarkFromServer(url: string): Promise<void> {
  const res = await fetch(`/api/feed/bookmarks?url=${encodeURIComponent(url)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Remove failed: ${res.status}`);
}

async function syncAllBookmarksToServer(bookmarks: BookmarkEntry[]): Promise<void> {
  const res = await fetch('/api/feed/bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookmarks.map((b) => ({
      url: b.url,
      title: b.title,
      feed_name: b.feedName,
      feed_id: b.feedId,
      saved_at: b.savedAt,
    }))),
  });
  if (!res.ok) throw new Error(`Batch sync failed: ${res.status}`);
}

// ── Hook ──────────────────────────────────────────────────────────────

export interface UseBookmarksReturn {
  bookmarks: BookmarkEntry[];
  isBookmarked: (url: string) => boolean;
  toggleBookmark: (article: {
    url: string;
    title: string;
    feedName: string;
    feedId: string;
  }) => void;
  removeBookmark: (url: string) => void;
  clearAll: () => void;
  isSyncing: boolean;
}

export function useBookmarks(): UseBookmarksReturn {
  const { isSignedIn, isLoaded: authLoaded } = useUser();
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const initialSyncDone = useRef(false);

  // Load on mount: localStorage first, then sync from server if signed in
  useEffect(() => {
    if (!authLoaded) return;

    const local = loadLocal();
    setBookmarks(local);
    initialSyncDone.current = false;
  }, [authLoaded]);

  // Sync from server when signed in (runs once after auth is loaded)
  useEffect(() => {
    if (!authLoaded || initialSyncDone.current) return;

    if (isSignedIn) {
      setIsSyncing(true);
      fetchBookmarksFromServer()
        .then((serverBookmarks) => {
          const local = loadLocal();
          const merged = mergeBookmarks(local, serverBookmarks);
          setBookmarks(merged);
          saveLocal(merged);

          // If server has fewer bookmarks than local, upload local ones
          if (local.length > serverBookmarks.length) {
            syncAllBookmarksToServer(merged).catch(() => {});
          }
        })
        .catch(() => {
          // Server sync failed — keep using localStorage data
        })
        .finally(() => {
          setIsSyncing(false);
          initialSyncDone.current = true;
        });
    } else {
      initialSyncDone.current = true;
    }
  }, [isSignedIn, authLoaded]);

  // Toggle bookmark
  const toggleBookmark = useCallback((article: {
    url: string;
    title: string;
    feedName: string;
    feedId: string;
  }) => {
    const existing = bookmarks.find((b) => b.url === article.url);
    let newBookmarks: BookmarkEntry[];

    if (existing) {
      // Remove
      newBookmarks = bookmarks.filter((b) => b.url !== article.url);
      setBookmarks(newBookmarks);
      saveLocal(newBookmarks);
      if (isSignedIn) {
        removeBookmarkFromServer(article.url).catch(() => {
          // Revert on error
          const reverted = loadLocal();
          setBookmarks(reverted);
          saveLocal(reverted);
        });
      }
    } else {
      // Add
      const newEntry: BookmarkEntry = {
        url: article.url,
        title: article.title,
        feedName: article.feedName,
        feedId: article.feedId,
        savedAt: new Date().toISOString(),
      };
      newBookmarks = [newEntry, ...bookmarks];
      setBookmarks(newBookmarks);
      saveLocal(newBookmarks);
      if (isSignedIn) {
        addBookmarkToServer(newEntry).catch(() => {
          const reverted = loadLocal();
          setBookmarks(reverted);
          saveLocal(reverted);
        });
      }
    }
  }, [bookmarks, isSignedIn]);

  // Remove single bookmark
  const removeBookmarkFn = useCallback((url: string) => {
    const newBookmarks = bookmarks.filter((b) => b.url !== url);
    setBookmarks(newBookmarks);
    saveLocal(newBookmarks);
    if (isSignedIn) {
      removeBookmarkFromServer(url).catch(() => {
        const reverted = loadLocal();
        setBookmarks(reverted);
        saveLocal(reverted);
      });
    }
  }, [bookmarks, isSignedIn]);

  // Clear all
  const clearAll = useCallback(() => {
    setBookmarks([]);
    saveLocal([]);
    if (isSignedIn) {
      fetch('/api/feed/bookmarks', { method: 'DELETE' }).catch(() => {
        const reverted = loadLocal();
        setBookmarks(reverted);
        saveLocal(reverted);
      });
    }
  }, [isSignedIn]);

  const isBookmarked = useCallback((url: string) => {
    return bookmarks.some((b) => b.url === url);
  }, [bookmarks]);

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark: removeBookmarkFn,
    clearAll,
    isSyncing,
  };
}
