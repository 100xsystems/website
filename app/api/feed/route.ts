/**
 * GET /api/feed
 *
 * Fetches RSS feeds on-the-fly and returns parsed article metadata.
 * No content is stored — everything is fetched fresh and returned ephemerally.
 *
 * Query parameters:
 *   - feeds: comma-separated feed IDs (e.g., "netflix-tech-blog,stripe-engineering")
 *   - limit: max articles to return (default 50, max 100)
 *   - cursor: pagination cursor (ISO date string) — returns articles older than this date
 *
 * Response: FeedApiResponse
 *
 * ETHICAL NOTE: We fetch RSS XML from the original blogs, extract only metadata
 * (title, URL, author, summary), and return it. We NEVER store,
 * cache, or host the article content. Users click through to the original source.
 */
import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { FEED_REGISTRY, getFeedById } from '@/feed/feed.constants';
import type { Article, FeedApiResponse } from '@/feed/feed.types';
import { makeArticleId, truncate } from '@/feed/feed.utils';

type FeedItem = {
  title?: string;
  link?: string;
  contentSnippet?: string;
  content?: string;
  pubDate?: string;
  isoDate?: string;
  creator?: string;
  author?: string;
  categories?: string[];
};

const parser = new Parser<FeedItem>();

export async function GET(request: NextRequest): Promise<NextResponse<FeedApiResponse>> {
  const { searchParams } = new URL(request.url);
  const feedIdsParam = searchParams.get('feeds') || '';
  const limitParam = parseInt(searchParams.get('limit') || '50', 10);
  const cursorParam = searchParams.get('cursor') || '';
  const limit = Math.min(Math.max(1, limitParam), 100);

  // Determine which feeds to fetch
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
    });
  }

  // Fetch all RSS feeds in parallel
  const results = await Promise.allSettled(
    feedsToFetch.map(async (feed) => {
      const parsed = await parser.parseURL(feed.rssUrl);
      return { feed, parsed } as const;
    })
  );

  const articles: Article[] = [];
  const errors: Array<{ feedId: string; error: string }> = [];
  const seenUrls = new Set<string>();

  // Process results by index to access feed info even on rejection
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const feed = feedsToFetch[i];

    if (result.status === 'rejected') {
      const errMsg = result.reason instanceof Error ? result.reason.message : String(result.reason);
      errors.push({ feedId: feed.id, error: errMsg });
      continue;
    }

    const { parsed } = result.value;

    if (!parsed.items || parsed.items.length === 0) {
      errors.push({ feedId: feed.id, error: 'No items found in feed' });
      continue;
    }

    for (const feedItem of parsed.items.slice(0, limit)) {
      if (!feedItem.link || !feedItem.title) continue;

      // URL-based deduplication
      if (seenUrls.has(feedItem.link)) continue;
      seenUrls.add(feedItem.link);

      articles.push({
        id: makeArticleId(feed.id, feedItem.link),
        feedId: feed.id,
        feedName: feed.name,
        feedSiteUrl: feed.siteUrl,
        title: feedItem.title,
        url: feedItem.link,
        author: feedItem.creator || feedItem.author || null,
        summary: feedItem.contentSnippet || null,
        contentSnippet: truncate(feedItem.contentSnippet || feedItem.content || null, 300),
        publishedAt: feedItem.isoDate || feedItem.pubDate || null,
        tags: feed.tags,
        upvotes: 0,
      });
    }
  }

  // Sort by date (newest first)
  articles.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  // Apply cursor pagination: skip articles older than the cursor date
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
  });

  // Cache for 5 minutes at the edge, serve stale for up to 1 hour
  response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');

  return response;
}
