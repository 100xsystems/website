import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { HomeFeed } from '@/presentation/features/homeFeed.feature';
import { HomeSearch } from '@/presentation/features/homeSearch.feature';
import { HomeYC } from '@/presentation/features/homeYC.feature';
import { HomeProductHunt } from '@/presentation/features/homeProductHunt.feature';
import { HomeUnifiedSearch } from '@/presentation/features/homeUnifiedSearch.feature';
import type { FeedCache, Article, RegistryFeedData } from '@/feed/feed.types';

// ── Featured sources shown on the homepage ─────────────────────────

const HOME_FEATURED_SOURCES = [
  'netflix-tech-blog',
  'cloudflare-blog',
  'aws-architecture',
  'spotify-engineering',
  'stripe-engineering',
  'discord-engineering',
];

const ARTICLES_PER_SOURCE = 3;

// ── Server-side data loading (SSG) ─────────────────────────────────

function loadFeedArticles(): Record<string, Article[]> | null {
  try {
    const cachePath = join(process.cwd(), 'public', 'feed-cache.json');
    const raw = readFileSync(cachePath, 'utf-8');
    const cache: FeedCache = JSON.parse(raw);

    const grouped: Record<string, Article[]> = {};

    for (const feedId of HOME_FEATURED_SOURCES) {
      const feedData = cache.feeds[feedId];
      if (!feedData?.items?.length) continue;

      const articles: Article[] = feedData.items.slice(0, ARTICLES_PER_SOURCE).map((item) => ({
        id: `${feedId}-${item.guid}`,
        feedId,
        feedName: feedData.feedName,
        feedSiteUrl: feedData.feedSiteUrl,
        title: item.title,
        url: item.link,
        author: item.author,
        summary: item.summary,
        contentSnippet: item.summary?.slice(0, 300) ?? null,
        publishedAt: item.publishedAt,
        tags: feedData.tags ?? [],
        upvotes: 0,
      }));

      grouped[feedId] = articles;
    }

    return Object.keys(grouped).length > 0 ? grouped : null;
  } catch {
    return null;
  }
}

// ── Page ────────────────────────────────────────────────────────────

export default function HomePage() {
  const feedArticles = loadFeedArticles();

  return (
    <>
      {/* Unified Search — at the very top, first section */}
      <HomeUnifiedSearch />

      {/* Feed — data loaded at SSG build time, no client-side API call */}
      <HomeFeed initialArticles={feedArticles} />

      <HomeYC />
      <HomeProductHunt />
      <HomeSearch />
    </>
  );
}
