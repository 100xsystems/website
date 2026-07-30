import { HomeFeed } from '@/presentation/features/homeFeed.feature';
import { HomeYC } from '@/presentation/features/homeYC.feature';
import { HomeProductHunt } from '@/presentation/features/homeProductHunt.feature';
import { HomeDiscover } from '@/presentation/features/homeDiscover.feature';
import { HomeUnifiedSearch } from '@/presentation/features/homeUnifiedSearch.feature';
import { loadFeedCache } from '@/feed/feed.cache';
import type { FeedCache, RegistryFeedItem, RegistryFeedData } from '@/feed/feed.types';

// ── Server-side data loading ────────────────────────────────────────

interface EnrichedArticle {
  id: string;
  feedId: string;
  feedName: string;
  feedSiteUrl: string;
  feedRssUrl: string;
  tags: string[];
  title: string;
  url: string;
  author: string | null;
  summary: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

function flattenCache(cache: FeedCache): EnrichedArticle[] {
  const articles: EnrichedArticle[] = [];

  for (const [feedId, feedData] of Object.entries(cache.feeds)) {
    const fd = feedData as RegistryFeedData;
    if (!fd?.items?.length) continue;

    for (const item of fd.items) {
      articles.push({
        id: `${feedId}-${item.guid}`,
        feedId,
        feedName: fd.feedName,
        feedSiteUrl: fd.feedSiteUrl,
        feedRssUrl: fd.feedRssUrl,
        tags: fd.tags ?? [],
        title: item.title,
        url: item.link,
        author: item.author,
        summary: item.summary,
        publishedAt: item.publishedAt,
        updatedAt: fd.updatedAt,
      });
    }
  }

  // Sort by publishedAt descending (newest first), push items without dates to end
  articles.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  return articles.slice(0, 48); // Top 48 most recent articles
}

// ── Page ────────────────────────────────────────────────────────────

export default async function HomePage() {
  const cache = await loadFeedCache();
  const latestArticles = cache ? flattenCache(cache) : null;

  return (
    <>
      {/* Unified Search — at the very top */}
      <HomeUnifiedSearch />

      {/* Feed — latest articles from ALL feeds, sorted by recency */}
      <HomeFeed initialArticles={latestArticles} />

      <HomeDiscover />
      <HomeYC />
      <HomeProductHunt />
    </>
  );
}
