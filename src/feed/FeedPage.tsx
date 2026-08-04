'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Bookmark, Check, Rss } from 'lucide-react';
import { cn } from '@/application/lib/utils';
import { fetchFeedAll } from './feed.api';
import { useBookmarks } from './useBookmarks';
import { ArticleCard } from './ArticleCard';
import { FeedFavicon } from './FeedFavicon';
import { sortByNewest } from './feed.utils';
import type { Article, FeedExplorerFeed } from './feed.types';

const HISTORY_KEY = '100xfeed-history';

function humanizeSlug(slug: string): string {
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function loadReadingHistory(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveReadingHistory(history: string[]): void {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch { /* unavailable */ }
}

function addToReadingHistory(url: string): string[] {
  const history = loadReadingHistory();
  const updated = [url, ...history.filter((u) => u !== url)].slice(0, 500);
  saveReadingHistory(updated);
  return updated;
}

interface FeedPageProps {
  feeds: FeedExplorerFeed[];
  initialFeedId?: string | null;
  initialTag?: string;
}

export function FeedPage({ feeds, initialFeedId, initialTag }: FeedPageProps) {
  const router = useRouter();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [readingHistory, setReadingHistory] = React.useState<string[]>([]);
  const [selectedFeedId, setSelectedFeedId] = React.useState<string | null>(initialFeedId ?? null);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(initialFeedId != null);
  const [error, setError] = React.useState<string | null>(null);
  const [reloadKey, setReloadKey] = React.useState(0);

  // Start expanded when a deep-linked feed is among the older (hidden) sources.
  const [showAll, setShowAll] = React.useState(() =>
    initialFeedId != null ? feeds.some((f) => f.id === initialFeedId && !f.isRecent) : false,
  );

  const selectedFeed = selectedFeedId ? feeds.find((f) => f.id === selectedFeedId) ?? null : null;
  const visibleFeeds = initialTag ? feeds.filter((f) => f.tags.includes(initialTag)) : feeds;
  const recentFeeds = visibleFeeds.filter((f) => f.isRecent);
  const hiddenFeeds = visibleFeeds.filter((f) => !f.isRecent);
  const displayFeeds = showAll ? visibleFeeds : recentFeeds;

  // Restore reading history on mount
  React.useEffect(() => {
    setReadingHistory(loadReadingHistory());
  }, []);

  // Fetch the selected feed's articles (newest first)
  React.useEffect(() => {
    if (!selectedFeedId) {
      setArticles([]);
      setError(null);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    fetchFeedAll([selectedFeedId])
      .then((res) => { if (!cancelled) setArticles(sortByNewest(res.articles)); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load articles'); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [selectedFeedId, reloadKey]);

  const selectFeed = (id: string) => {
    const next = selectedFeedId === id ? null : id;
    setSelectedFeedId(next);
    const p = new URLSearchParams();
    if (next) p.set('feed', next);
    router.replace(`/discover/feed${p.toString() ? `?${p.toString()}` : ''}`, { scroll: false });
  };

  // When a source is selected, scroll the page down to its articles.
  const articlesSectionRef = React.useRef<HTMLDivElement>(null);
  const hasMounted = React.useRef(false);
  React.useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (!selectedFeedId) return;
    articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selectedFeedId]);

  const handleRead = (url: string) => setReadingHistory(addToReadingHistory(url));

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
          <span className="font-bold uppercase tracking-wider text-fg">Engineering Blogs</span>
        </div>

        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 bg-accent px-4 py-2 text-sm font-bold uppercase tracking-widest text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            ENGINEERING BLOGS
          </div>
          <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Pick a source.<br />
            <span className="text-accent">Read the best blogs.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
            {feeds.length} engineering blogs, newest articles first. Select a source
            below and its posts appear in sequence.
          </p>
          <div className="mt-6">
            <Link
              href="/discover/feed/bookmarks"
              className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted transition-colors hover:bg-yellow hover:text-white"
            >
              <Bookmark size={13} />
              Bookmarks{bookmarks.length > 0 ? ` (${bookmarks.length})` : ''}
            </Link>
          </div>
        </div>

        {/* ═══ Section 1 — Source selector (the main event) ═══ */}
        <section>
          <div className="mb-8 flex items-center gap-5">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-accent/10 text-accent">
              <Rss size={24} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                {initialTag
                  ? `${displayFeeds.length} sources tagged “${humanizeSlug(initialTag)}”`
                  : showAll
                    ? `${displayFeeds.length} sources`
                    : `${recentFeeds.length} active sources · ${hiddenFeeds.length} older sources`}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold uppercase tracking-tight text-fg sm:text-3xl">
                {initialTag ? humanizeSlug(initialTag) : 'Pick your source'}
              </h2>
            </div>
            {initialTag && (
              <Link
                href="/discover/feed"
                className="ml-auto px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-fg-muted transition-colors hover:text-accent"
              >
                Show all sources &rarr;
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 gap-1 bg-surface-secondary sm:grid-cols-2 lg:grid-cols-3">
            {displayFeeds.map((feed) => {
              const isActive = selectedFeedId === feed.id;
              return (
                <button
                  key={feed.id}
                  type="button"
                  onClick={() => selectFeed(feed.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'group flex flex-col items-start justify-between gap-8 p-8 text-left transition-all duration-200 sm:p-10',
                    isActive ? 'bg-accent text-white' : 'bg-white hover:bg-accent',
                  )}
                >
                  <div className="flex w-full items-start justify-between gap-4">
                    <span
                      className={cn(
                        'inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 sm:h-20 sm:w-20',
                        isActive ? 'bg-white/20' : 'bg-surface-secondary',
                      )}
                    >
                      <FeedFavicon url={feed.siteUrl} name={feed.name} size={36} />
                    </span>
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-surface-secondary text-accent group-hover:bg-white/20 group-hover:text-white',
                      )}
                    >
                      {isActive ? <Check className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </span>
                  </div>

                  <div className="w-full">
                    <h3
                      className={cn(
                        'text-xl font-extrabold uppercase leading-tight tracking-tight transition-colors duration-200 sm:text-2xl',
                        isActive ? 'text-white' : 'text-fg group-hover:text-white',
                      )}
                    >
                      {feed.name}
                    </h3>
                    <p
                      className={cn(
                        'mt-3 hidden text-sm leading-relaxed transition-colors duration-200 sm:block',
                        isActive ? 'text-white/80' : 'text-fg-secondary group-hover:text-white/80',
                      )}
                    >
                      {feed.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {feed.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200',
                            isActive
                              ? 'bg-white/20 text-white/80'
                              : 'bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80',
                          )}
                        >
                          {tag.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white',
                    )}
                  >
                    {feed.articleCount} articles
                    <span className={cn('transition-transform duration-200', isActive ? 'translate-x-0.5' : 'group-hover:translate-x-0.5')}>
                      &rarr;
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {!showAll && hiddenFeeds.length > 0 && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="group mt-2 flex w-full items-center justify-between gap-4 bg-surface-secondary px-8 py-8 text-left transition-colors duration-200 hover:bg-accent sm:px-10 sm:py-10"
            >
              <span className="text-sm font-extrabold uppercase tracking-widest text-fg transition-colors duration-200 group-hover:text-white sm:text-base">
                Show all {hiddenFeeds.length} sources
              </span>
              <span className="shrink-0 text-2xl font-bold text-accent transition-colors duration-200 group-hover:text-white">
                &darr;
              </span>
            </button>
          )}
        </section>

        {/* ═══ Section 2 — Selected source's articles (hidden until a source is picked) ═══ */}
        {selectedFeed && (
          <section ref={articlesSectionRef} className="mt-20 scroll-mt-16 sm:mt-28">
            <div className="mb-10 border-b-2 border-border pb-8">
              <div className="flex items-center gap-6">
                <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-surface-secondary sm:h-20 sm:w-20">
                  <FeedFavicon url={selectedFeed.siteUrl} name={selectedFeed.name} size={44} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                    {selectedFeed.articleCount} articles · newest first
                  </p>
                  <h2 className="mt-1 text-3xl font-extrabold uppercase tracking-tight text-fg sm:text-4xl">
                    {selectedFeed.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-secondary">
                    {selectedFeed.description}
                  </p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-surface-secondary p-6">
                    <div className="h-4 w-28 bg-surface-muted animate-pulse mb-3" />
                    <div className="h-5 w-3/4 bg-surface-muted animate-pulse mb-2" />
                    <div className="h-4 w-full bg-surface-muted animate-pulse" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-surface-secondary p-4 flex items-center justify-between">
                <span className="text-xs text-fg-muted">{error}</span>
                <button
                  onClick={() => setReloadKey((k) => k + 1)}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent-hover transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20 bg-surface-secondary px-8">
                <p className="text-sm text-fg-secondary mb-2">No articles indexed yet for this source.</p>
                <p className="text-xs text-fg-muted">Check back once the registry has fetched its latest posts.</p>
              </div>
            ) : (
              <div className="space-y-1 bg-surface-secondary">
                {articles.map((a) => (
                  <ArticleCard
                    key={a.id}
                    article={a}
                    isBookmarked={bookmarks.some((b) => b.url === a.url)}
                    isRead={readingHistory.includes(a.url)}
                    isFocused={false}
                    onBookmarkToggle={toggleBookmark}
                    onRead={handleRead}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
