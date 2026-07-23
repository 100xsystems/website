/**
 * GET /api/feed
 *
 * Reads article metadata from the pre-built registry cache and returns
 * filtered, sorted, paginated results.
 *
 * The cache is generated at build time by `scripts/fetch-feed-cache.mjs`,
 * which fetches all JSON files from the 100xsystems/registry repository.
 * For ISR revalidation (after 24h), the cache is re-fetched from GitHub raw
 * automatically.
 *
 * Query parameters:
 *   - feeds: comma-separated feed IDs (e.g., "netflix-tech-blog,stripe-engineering")
 *            Empty = all feeds
 *   - limit: max articles to return (default 50, max 200)
 *   - cursor: pagination cursor (ISO date string) — returns articles older than
 *             this date
 *
 * Response: FeedApiResponse
 *
 * ETHICAL NOTE:
 *   We index only article metadata — title, URL, summary, author, publication date.
 *   We NEVER store article body content. Users click through to the original source.
 *   The cache is sourced from the registry repo (100xsystems/registry), which follows
 *   the same ethical constraint.
 */
import { NextRequest, NextResponse } from 'next/server';
import { FEED_REGISTRY, getFeedById } from '@/feed/feed.constants';
import { loadFeedCache, getFeedDataFromCache } from '@/feed/feed.cache';
import type { Article, FeedApiResponse, FeedCache, RegistryFeedData } from '@/feed/feed.types';
import { makeArticleId, truncate } from '@/feed/feed.utils';

/**
 * Enrich a registry item with feed metadata (tags, feed name, etc.).
 */
function toArticle(item: RegistryFeedData['items'][0], feedData: RegistryFeedData, feedTags: string[]): Article {
  return {
    id: makeArticleId(feedData.feedId, item.link),
    feedId: feedData.feedId,
    feedName: feedData.feedName,
    feedSiteUrl: feedData.feedSiteUrl,
    title: item.title,
    url: item.link,
    author: item.author,
    summary: item.summary,
    contentSnippet: truncate(item.summary, 300),
    publishedAt: item.publishedAt,
    tags: feedTags,
    upvotes: 0,
  };
}

/**
 * Convert a feed data object to a FlatArticle for flat array processing.
 */
function flattenFeed(feedId: string, feedData: RegistryFeedData, feedTags: string[]): Article[] {
  return feedData.items.map((item) => toArticle(item, feedData, feedTags));
}

// ── Route Handler ─────────────────────────────────────────────────────

export async function GET(request: NextRequest): Promise<NextResponse<FeedApiResponse>> {
  const { searchParams } = new URL(request.url);
  const feedIdsParam = searchParams.get('feeds') || '';
  const limitParam = parseInt(searchParams.get('limit') || '50', 10);
  const cursorParam = searchParams.get('cursor') || '';
  const limit = Math.min(Math.max(1, limitParam), 200);

  // Determine which feeds to return
  let feedsToFetch = FEED_REGISTRY;
  if (feedIdsParam.trim()) {
    const requestedIds = feedIdsParam.split(',').map((id) => id.trim()).filter(Boolean);
    feedsToFetch = requestedIds.map((id) => getFeedById(id)).filter(Boolean) as typeof FEED_REGISTRY;
  }

  if (feedsToFetch.length === 0) {
    return NextResponse.json({
      articles: [],
      feeds: [],
      total: 0,
      cursor: null,
      errors: [],
    } satisfies FeedApiResponse);
  }

  // Load the cache (from disk or GitHub raw fallback)
  const cache = await loadFeedCache();

  if (!cache) {
    return NextResponse.json({
      articles: [],
      feeds: [],
      total: 0,
      cursor: null,
      errors: [{ feedId: 'cache', error: 'Feed cache unavailable. The registry may not have been fetched yet.' }],
    } satisfies FeedApiResponse);
  }

  // Build articles from cache
  const articles: Article[] = [];
  const errors: Array<{ feedId: string; error: string }> = [];
  const seenUrls = new Set<string>();

  for (const feed of feedsToFetch) {
    const feedData = getFeedDataFromCache(cache, feed.id);

    if (!feedData || !feedData.items || feedData.items.length === 0) {
      // Not in cache yet — not an error, just no data
      continue;
    }

    const flatArticles = flattenFeed(feed.id, feedData, feed.tags);

    for (const article of flatArticles) {
      if (!article.url || !article.title) continue;
      if (seenUrls.has(article.url)) continue;
      seenUrls.add(article.url);
      articles.push(article);
    }
  }

  // Sort by date (newest first)
  articles.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  // Apply cursor pagination
  let pagedArticles = articles;
  if (cursorParam) {
    const cursorDate = new Date(cursorParam).getTime();
    if (!isNaN(cursorDate)) {
      pagedArticles = articles.filter((a) => {
        const pubDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        return pubDate < cursorDate;
      });
    }
  }

  // Limit + determine next cursor
  const limited = pagedArticles.slice(0, limit);
  const nextCursor = limited.length === limit && pagedArticles.length > limit
    ? (limited[limited.length - 1].publishedAt ?? null)
    : null;

  const response = NextResponse.json({
    articles: limited,
    feeds: feedsToFetch.map((f) => f.id),
    total: limited.length,
    cursor: nextCursor,
    errors,
  } satisfies FeedApiResponse);

  // ── Edge Cache Strategy ──────────────────────────────────────────────
  //
  // The registry cache is updated daily by a GitHub Action, so the feed
  // data changes at most once every 24h. We aggressively cache at the edge:
  //
  //   s-maxage=86400          — Cache for 24h at Vercel's edge (CDN)
  //   stale-while-revalidate  — Serve stale immediately, revalidate in background:
  //                              * 30 days for popular "all feeds" requests
  //                              * Still updates in background when a user hits it
  //   stale-if-error          — If origin errors, serve stale for up to 30 days
  //   Vary: Accept-Encoding   — Ensures CDN caches properly with compression
  //
  // This means:
  //   - Users almost never hit the serverless function
  //   - The edge serves cached JSON in ~5-10ms
  //   - Background revalidation ensures data is never more than 24h stale
  //   - Even if the registry or GitHub is down, users get 30 days of stale data

  // Longer stale-while-revalidate for "all feeds" (no specific feeds param)
  const isAllFeeds = !feedIdsParam.trim();
  const stalePeriod = isAllFeeds ? '2592000' : '604800'; // 30 days vs 7 days

  response.headers.set(
    'Cache-Control',
    `public, s-maxage=86400, stale-while-revalidate=${stalePeriod}, stale-if-error=2592000`
  );
  response.headers.set('Vary', 'Accept-Encoding');

  return response;
}
