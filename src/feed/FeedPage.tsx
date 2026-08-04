'use client';

import React from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { FeedHeader } from './FeedHeader';
import { fetchFeedAll } from './feed.api';
import { sortByNewest, sortByHnScore, filterByTags } from './feed.utils';
import { useBookmarks } from './useBookmarks';
import { useFeedPreferences } from './useFeedPreferences';
import type { Article } from './feed.types';
import { FeedFlatView } from './FeedFlatView';
import { FeedGridView } from './FeedGridView';

const HISTORY_KEY = '100xfeed-history';
const VIEW_KEY = '100xfeed-view';

type FeedViewMode = 'flat' | 'grid';

function loadFeedView(): FeedViewMode {
  if (typeof window === 'undefined') return 'flat';
  try {
    const raw = localStorage.getItem(VIEW_KEY);
    if (raw === 'grid' || raw === 'flat') return raw;
    return 'flat';
  } catch { return 'flat'; }
}

function saveFeedView(mode: FeedViewMode): void {
  try { localStorage.setItem(VIEW_KEY, mode); } catch { /* unavailable */ }
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
}

function saveToStorage<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* unavailable */ }
}

function loadReadingHistory(): string[] { return loadFromStorage<string[]>(HISTORY_KEY, []); }
function saveReadingHistory(history: string[]): void { saveToStorage(HISTORY_KEY, history); }
function addToReadingHistory(url: string): string[] {
  const history = loadReadingHistory();
  const updated = [url, ...history.filter((u) => u !== url)].slice(0, 500);
  saveReadingHistory(updated);
  return updated;
}

// Fuse.js search setup
let fuseInstance: Fuse<Article> | null = null;

function getFuse(articles: Article[]): Fuse<Article> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(articles, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'summary', weight: 1.5 },
        { name: 'author', weight: 1 },
        { name: 'feedName', weight: 1 },
        { name: 'tags', weight: 2 },
      ],
      threshold: 0.4,
      distance: 100,
      minMatchCharLength: 2,
    });
  } else {
    // Update the collection if it changed
    fuseInstance.setCollection(articles);
  }
  return fuseInstance;
}

export function FeedPage({ initialTag }: { initialTag?: string }) {
  const [allArticles, setAllArticles] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { bookmarks, toggleBookmark, isSyncing: bmSyncing } = useBookmarks();
  const {
    selectedFeeds,
    selectedTags,
    sortBy,
    setSelectedFeeds,
    setSelectedTags,
    setSortBy,
    isSyncing: prefsSyncing,
  } = useFeedPreferences(initialTag);
  const [readingHistory, setReadingHistory] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState<FeedViewMode>('flat');

  // Restore view mode from localStorage on mount
  React.useEffect(() => {
    setViewMode(loadFeedView());
  }, []);

  const articleRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const sortedArticlesRef = React.useRef<Article[]>([]);

  // Restore reading history on mount
  React.useEffect(() => {
    setReadingHistory(loadReadingHistory());
  }, []);

  // Load feed — reads from registry cache via API (fast, no timeout risk)
  const loadFeed = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    fuseInstance = null; // Reset fuse on new load

    try {
      const response = await fetchFeedAll(selectedFeeds);
      setAllArticles(response.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load feed');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFeeds]);

  // Load on mount and when feeds change
  React.useEffect(() => { loadFeed(); }, [loadFeed]);

  // Handlers — use the hook's setter functions which save to localStorage + Turso
  const handleFeedSelectionChange = (feeds: string[]) => { setSelectedFeeds(feeds); };
  const handleTagSelectionChange = (tags: string[]) => { setSelectedTags(tags); };
  const handleSortChange = (sort: 'newest' | 'hn-rank') => { setSortBy(sort); };

  const handleReadArticle = (url: string) => { const updated = addToReadingHistory(url); setReadingHistory(updated); };

  const toggleViewMode = () => {
    setViewMode((prev) => {
      const next = prev === 'flat' ? 'grid' : 'flat';
      saveFeedView(next);
      return next;
    });
  };

  // ── Filtering, searching, sorting ──
  // First: filter by tags
  const tagFiltered = filterByTags(allArticles, selectedTags);

  // Second: search via Fuse.js
  const searchedArticles = React.useMemo(() => {
    if (!searchQuery.trim()) return tagFiltered;
    const fuse = getFuse(tagFiltered);
    return fuse.search(searchQuery).map((r) => r.item);
  }, [tagFiltered, searchQuery]);

  // Third: sort
  const sortedArticles = sortBy === 'hn-rank' ? sortByHnScore(searchedArticles) : sortByNewest(searchedArticles);
  sortedArticlesRef.current = sortedArticles;

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
      const current = sortedArticlesRef.current;
      if (e.key === 'j' || e.key === 'J') { e.preventDefault(); setFocusedIndex((prev) => (prev < current.length - 1 ? prev + 1 : prev)); }
      else if (e.key === 'k' || e.key === 'K') { e.preventDefault(); setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0)); }
      else if (e.key === 'Enter' && focusedIndex >= 0) { e.preventDefault(); const a = current[focusedIndex]; if (a) { window.open(a.url, '_blank'); handleReadArticle(a.url); } }
      else      if (e.key === 'b' && focusedIndex >= 0) { e.preventDefault(); const a = current[focusedIndex]; if (a) toggleBookmark(a); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex]);

  React.useEffect(() => {
    if (focusedIndex < 0) return;
    const article = sortedArticles[focusedIndex];
    if (!article) return;
    const el = articleRefs.current.get(article.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [focusedIndex, sortedArticles]);

  React.useEffect(() => { setFocusedIndex(-1); }, [sortedArticles.length]);

  // Loading state
  if (isLoading && allArticles.length === 0) {
    return (
      <div className="min-h-screen py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <FeedHeader selectedFeeds={selectedFeeds} onFeedSelectionChange={handleFeedSelectionChange} selectedTags={selectedTags} onTagSelectionChange={handleTagSelectionChange} sortBy={sortBy} onSortChange={handleSortChange} articles={allArticles} isLoading={isLoading} onRefresh={loadFeed} />
        <div className="mt-8 space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface-secondary p-6">
              <div className="h-4 w-24 bg-surface-muted animate-pulse mb-3" />
              <div className="h-5 w-3/4 bg-surface-muted animate-pulse mb-2" />
              <div className="h-4 w-full bg-surface-muted animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Grid mode: pageless, edge-to-edge ──
  if (viewMode === 'grid') {
    return (
      <div className="min-h-screen">
        <div className="px-6 lg:px-12 max-w-[1400px] mx-auto py-16">
          <FeedHeader selectedFeeds={selectedFeeds} onFeedSelectionChange={handleFeedSelectionChange} selectedTags={selectedTags} onTagSelectionChange={handleTagSelectionChange} sortBy={sortBy} onSortChange={handleSortChange} articles={allArticles} isLoading={isLoading} onRefresh={loadFeed} />

          {/* Error state */}
          {error && (
            <div className="mb-6 bg-surface-secondary p-4 flex items-center justify-between">
              <span className="text-xs text-fg-muted">{error}</span>
              <button onClick={loadFeed} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent-hover transition-colors">Try again</button>
            </div>
          )}

          {/* Search bar — borderless */}
          <div className="relative mb-5">
            <svg className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, author, or topic..."
              className="w-full bg-surface-secondary text-sm py-3 pl-10 pr-10 text-fg placeholder:text-fg-muted/60 outline-none transition-colors duration-200 focus:bg-accent focus:text-white focus:placeholder:text-white/60"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 flex items-center pr-3 text-fg-muted hover:text-fg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
          </div>

          {/* Bottom bar */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-fg-muted/50" />
            <div className="flex items-center gap-3">
              <button
                onClick={toggleViewMode}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white transition-colors duration-200"
                title="Switch to Flat view"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                List
              </button>
              <Link href="/discover/feed/bookmarks" className="text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-200">
                Bookmarks{bookmarks.length > 0 ? ` (${bookmarks.length})` : ''}
              </Link>
            </div>
          </div>
        </div>

        <FeedGridView
          articles={sortedArticles}
          isLoading={isLoading}
          searchQuery={searchQuery}
          bookmarks={bookmarks}
          readingHistory={readingHistory}
          onBookmarkToggle={toggleBookmark}
          onRead={handleReadArticle}
          onClearFilters={() => { setSearchQuery(''); setSelectedFeeds([]); setSelectedTags([]); }}
        />

        {isLoading && allArticles.length > 0 && (
          <div className="text-center py-6">
            <div className="inline-block w-5 h-5 border-2 border-fg-muted/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // ── Flat mode: centered, max-w-[860px] → widened to 1400px ──
  return (
    <div className="min-h-screen py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <FeedHeader selectedFeeds={selectedFeeds} onFeedSelectionChange={handleFeedSelectionChange} selectedTags={selectedTags} onTagSelectionChange={handleTagSelectionChange} sortBy={sortBy} onSortChange={handleSortChange} articles={allArticles} isLoading={isLoading} onRefresh={loadFeed} />

      {/* Error state */}
      {error && (
        <div className="mb-6 bg-surface-secondary p-4 flex items-center justify-between">
          <span className="text-xs text-fg-muted">{error}</span>
          <button onClick={loadFeed} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent-hover transition-colors">Try again</button>
        </div>
      )}

      {/* Search bar — borderless */}
      <div className="relative mb-5">
        <svg className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles by title, author, or topic..."
          className="w-full bg-surface-secondary text-sm py-3 pl-10 pr-10 text-fg placeholder:text-fg-muted/60 outline-none transition-colors duration-200 focus:bg-accent focus:text-white focus:placeholder:text-white/60"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 flex items-center pr-3 text-fg-muted hover:text-fg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        )}
      </div>

      {/* Bottom bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[10px] text-fg-muted/50">
          <span className="text-fg-muted">j/k &mdash; navigate</span>
          <span className="text-fg-muted">enter &mdash; open</span>
          <span className="text-fg-muted">b &mdash; bookmark</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleViewMode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white transition-colors duration-200"
            title="Switch to Grid view"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            Grid
          </button>
          <Link href="/discover/feed/bookmarks" className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white transition-colors duration-200">
            Bookmarks{bookmarks.length > 0 ? ` (${bookmarks.length})` : ''}
          </Link>
        </div>
      </div>

      <FeedFlatView
        articles={sortedArticles}
        isLoading={isLoading}
        bookmarks={bookmarks}
        readingHistory={readingHistory}
        focusedIndex={focusedIndex}
        searchQuery={searchQuery}
        articleRefs={articleRefs}
        onBookmarkToggle={toggleBookmark}
        onRead={handleReadArticle}
        onClearFilters={() => { setSearchQuery(''); setSelectedFeeds([]); setSelectedTags([]); }}
      />

      {isLoading && allArticles.length > 0 && (
        <div className="text-center py-6">
          <div className="inline-block w-5 h-5 border-2 border-fg-muted/30 border-t-accent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}