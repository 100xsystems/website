'use client';

/**
 * useFeedPreferences.ts
 *
 * React hook for feed preferences with Turso persistence.
 *
 * DESIGN:
 *   - localStorage-first: preferences load instantly from localStorage
 *   - Turso sync: if signed in, preferences sync to/from Turso in the background
 *   - Signed-out users: localStorage only (existing behavior preserved)
 *   - Signed-in users: localStorage + Turso, both kept in sync
 *
 * SYNC STRATEGY:
 *   On mount (signed-in):
 *     1. Load localStorage immediately (instant render)
 *     2. Fetch preferences from Turso in background
 *     3. Merge: Turso wins (source of truth), update localStorage
 *
 *   On change (signed-in):
 *     1. Update localStorage immediately (instant UI)
 *     2. POST to Turso API in background
 *     3. On error, revert localStorage
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@clerk/nextjs';

const PREFS_KEY = '100xfeed-preferences';

export interface FeedPreferencesData {
  selectedFeeds: string[];
  selectedTags: string[];
  sortBy: 'newest' | 'hn-rank';
}

const DEFAULT_PREFS: FeedPreferencesData = {
  selectedFeeds: [],
  selectedTags: [],
  sortBy: 'newest',
};

// ── localStorage helpers ──────────────────────────────────────────────

function loadLocal(): FeedPreferencesData {
  if (typeof window === 'undefined') return { ...DEFAULT_PREFS };
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return { ...DEFAULT_PREFS };
    const parsed = JSON.parse(raw) as Partial<FeedPreferencesData>;
    return {
      selectedFeeds: Array.isArray(parsed.selectedFeeds) ? parsed.selectedFeeds : [],
      selectedTags: Array.isArray(parsed.selectedTags) ? parsed.selectedTags : [],
      sortBy: parsed.sortBy === 'hn-rank' ? 'hn-rank' : 'newest',
    };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

function saveLocal(prefs: FeedPreferencesData): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch { /* quota exceeded — silently fail */ }
}

// ── API helpers ───────────────────────────────────────────────────────

async function fetchPreferencesFromServer(): Promise<FeedPreferencesData | null> {
  const res = await fetch('/api/feed/preferences');
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const data = await res.json();
  if (!data.preferences) return null;
  return {
    selectedFeeds: Array.isArray(data.preferences.selectedFeeds)
      ? data.preferences.selectedFeeds
      : [],
    selectedTags: Array.isArray(data.preferences.selectedTags)
      ? data.preferences.selectedTags
      : [],
    sortBy: data.preferences.sortBy === 'hn-rank' ? 'hn-rank' : 'newest',
  };
}

async function syncPreferencesToServer(prefs: FeedPreferencesData): Promise<void> {
  const res = await fetch('/api/feed/preferences', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prefs),
  });
  if (!res.ok) throw new Error(`Sync failed: ${res.status}`);
}

// ── Hook ──────────────────────────────────────────────────────────────

export interface UseFeedPreferencesReturn extends FeedPreferencesData {
  setSelectedFeeds: (feeds: string[]) => void;
  setSelectedTags: (tags: string[]) => void;
  setSortBy: (sort: 'newest' | 'hn-rank') => void;
  /** Reset all preferences to defaults */
  resetAll: () => void;
  /** True while initial Turso sync is in progress */
  isSyncing: boolean;
}

export function useFeedPreferences(initialTag?: string): UseFeedPreferencesReturn {
  const { isSignedIn, isLoaded: authLoaded } = useUser();
  const [prefs, setPrefs] = useState<FeedPreferencesData>(() => {
    const local = loadLocal();
    if (initialTag && !local.selectedTags.includes(initialTag)) {
      return { ...local, selectedTags: [initialTag] };
    }
    return local;
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const initialSyncDone = useRef(false);
  const lastSaved = useRef<string>('');

  // Load on mount: localStorage first, then sync from server if signed in
  useEffect(() => {
    if (!authLoaded) return;

    const local = loadLocal();
    // Apply initialTag on top of localStorage
    if (initialTag && !local.selectedTags.includes(initialTag)) {
      const merged = { ...local, selectedTags: [initialTag] };
      setPrefs(merged);
      saveLocal(merged);
    } else {
      setPrefs(local);
    }
    initialSyncDone.current = false;
  }, [authLoaded, initialTag]);

  // Sync from server when signed in (runs once after auth is loaded)
  useEffect(() => {
    if (!authLoaded || initialSyncDone.current) return;

    if (isSignedIn) {
      setIsSyncing(true);
      fetchPreferencesFromServer()
        .then((serverPrefs) => {
          if (!serverPrefs) return; // No preferences on server yet
          const local = loadLocal();
          // Only use server prefs if they have actual content (non-empty)
          // or if local is empty and server has something
          const hasServerFeeds = serverPrefs.selectedFeeds.length > 0;
          const hasServerTags = serverPrefs.selectedTags.length > 0;
          if (hasServerFeeds || hasServerTags) {
            // Merge: server wins for feeds/tags, but local keeps sortBy if set
            const merged: FeedPreferencesData = {
              selectedFeeds: serverPrefs.selectedFeeds,
              selectedTags: serverPrefs.selectedTags,
              sortBy: local.sortBy !== 'newest' ? local.sortBy : serverPrefs.sortBy,
            };
            setPrefs(merged);
            saveLocal(merged);
          } else {
            // Server has empty prefs — push local to server
            syncPreferencesToServer(local).catch(() => {});
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

  // Debounced sync to server (only when signed in)
  const syncToServer = useCallback((newPrefs: FeedPreferencesData) => {
    if (!isSignedIn) return;
    const serialized = JSON.stringify(newPrefs);
    if (serialized === lastSaved.current) return; // Skip if unchanged
    lastSaved.current = serialized;

    syncPreferencesToServer(newPrefs).catch(() => {
      // Revert on error
      const reverted = loadLocal();
      setPrefs(reverted);
      saveLocal(reverted);
    });
  }, [isSignedIn]);

  const setSelectedFeeds = useCallback((feeds: string[]) => {
    setPrefs((prev) => {
      const next = { ...prev, selectedFeeds: feeds };
      saveLocal(next);
      syncToServer(next);
      return next;
    });
  }, [syncToServer]);

  const setSelectedTags = useCallback((tags: string[]) => {
    setPrefs((prev) => {
      const next = { ...prev, selectedTags: tags };
      saveLocal(next);
      syncToServer(next);
      return next;
    });
  }, [syncToServer]);

  const setSortBy = useCallback((sort: 'newest' | 'hn-rank') => {
    setPrefs((prev) => {
      const next = { ...prev, sortBy: sort };
      saveLocal(next);
      syncToServer(next);
      return next;
    });
  }, [syncToServer]);

  const resetAll = useCallback(() => {
    const defaults = { ...DEFAULT_PREFS };
    setPrefs(defaults);
    saveLocal(defaults);
    if (isSignedIn) {
      syncPreferencesToServer(defaults).catch(() => {});
    }
  }, [isSignedIn]);

  return {
    selectedFeeds: prefs.selectedFeeds,
    selectedTags: prefs.selectedTags,
    sortBy: prefs.sortBy,
    setSelectedFeeds,
    setSelectedTags,
    setSortBy,
    resetAll,
    isSyncing,
  };
}
