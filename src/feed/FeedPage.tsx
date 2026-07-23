'use client';

import React from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { FeedHeader } from './FeedHeader';
import { ArticleCard } from './ArticleCard';
import { fetchFeedAll } from './feed.api';
import { sortByNewest, sortByHnScore, filterByTags } from './feed.utils';
import { useBookmarks } from './useBookmarks';
import { useFeedPreferences } from './useFeedPreferences';
import type { Article } from './feed.types';
import { Heading, Text, SkeletonBlock, Alert, Icon } from '@/presentation/__components';

const HISTORY_KEY = '100xfeed-history';

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
  const { bookmarks, isBookmarked, toggleBookmark, isSyncing: bmSyncing } = useBookmarks();
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
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-[860px] mx-auto">
          <FeedHeader selectedFeeds={selectedFeeds} onFeedSelectionChange={handleFeedSelectionChange} selectedTags={selectedTags} onTagSelectionChange={handleTagSelectionChange} sortBy={sortBy} onSortChange={handleSortChange} articles={allArticles} isLoading={isLoading} onRefresh={loadFeed} />
          <div className="space-y-3 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-2 border-black px-6 py-5"><SkeletonBlock lines={3} avatar={false} /></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[860px] mx-auto">
        <FeedHeader selectedFeeds={selectedFeeds} onFeedSelectionChange={handleFeedSelectionChange} selectedTags={selectedTags} onTagSelectionChange={handleTagSelectionChange} sortBy={sortBy} onSortChange={handleSortChange} articles={allArticles} isLoading={isLoading} onRefresh={loadFeed} />

        {/* Error state */}
        {error && (
          <div className="mb-6">
            <Alert variant="error" title="Failed to load feed" dismissible>
              <span className="text-sm">{error}</span>
              <button onClick={loadFeed} className="ml-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent-hover transition-colors">Try again</button>
            </Alert>
          </div>
        )}

        {/* Search bar */}
        <div className="relative mb-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-muted">
            <Icon name="search" size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, author, or topic..."
            className="w-full bg-surface-secondary border-2 border-black py-3 pl-10 pr-10 text-sm text-fg placeholder:text-fg-muted outline-none focus:border-accent transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 flex items-center pr-3 text-fg-muted hover:text-fg">
              <Icon name="x" size={14} />
            </button>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-fg-muted/50">
            <span>j/k &mdash; navigate</span>
            <span>enter &mdash; open</span>
            <span>b &mdash; bookmark</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/feed/bookmarks" className="text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors">
              Bookmarks{bookmarks.length > 0 ? ` (${bookmarks.length})` : ''}
            </Link>
          </div>
        </div>

        {/* Article count */}
        <Text variant="caption" className="mb-4 text-fg-muted/60">
          {searchQuery && `Found ${sortedArticles.length} article${sortedArticles.length !== 1 ? 's' : ''} for "${searchQuery}"`}
          {!searchQuery && (sortedArticles.length === 0 ? 'No articles found' : `${sortedArticles.length} article${sortedArticles.length !== 1 ? 's' : ''}`)}
          {!searchQuery && selectedFeeds.length > 0 && ` from ${selectedFeeds.length} source${selectedFeeds.length !== 1 ? 's' : ''}`}
        </Text>

        {/* Article list */}
        {sortedArticles.length === 0 && !isLoading ? (
          <div className="text-center py-20 border-2 border-black px-8">
            <Heading variant="h2" className="mb-2">✦</Heading>
            <Text variant="body" className="mb-1">No articles{searchQuery ? ` match "${searchQuery}"` : ' match your current filters'}.</Text>
            <Text variant="muted" className="mb-6">Try adjusting your search or filters.</Text>
            <button onClick={() => { setSearchQuery(''); setSelectedFeeds([]); setSelectedTags([]); }} className="px-5 py-2 text-[10px] font-bold uppercase tracking-wider bg-accent-yellow text-black hover:bg-yellow-400 transition-colors">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedArticles.map((article, index) => (
              <div key={article.id} ref={(el) => { if (el) articleRefs.current.set(article.id, el); else articleRefs.current.delete(article.id); }}>
                <ArticleCard article={article} isBookmarked={bookmarks.some((b) => b.url === article.url)} isRead={readingHistory.includes(article.url)} isFocused={index === focusedIndex} onBookmarkToggle={toggleBookmark} onRead={handleReadArticle} searchQuery={searchQuery} />
              </div>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && allArticles.length > 0 && (
          <div className="text-center py-6">
            <div className="inline-block w-5 h-5 border-2 border-fg-muted/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
