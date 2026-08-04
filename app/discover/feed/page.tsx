import type { Metadata } from 'next';
import { loadFeedCache, buildFeedExplorerFeeds } from '@/feed/feed.cache';
import { FeedPage } from '@/feed/FeedPage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Engineering Discovery — 100xSystems',
  description:
    'Curated engineering content from the best blogs across the industry. Discover articles from Netflix, Stripe, Cloudflare, Discord, and more.',
  openGraph: {
    title: 'Engineering Discovery — 100xSystems',
    description:
      'Curated engineering content from the best blogs across the industry.',
  },
};

interface Props {
  searchParams: Promise<{ feed?: string }>;
}

export default async function DiscoverFeedRoute({ searchParams }: Props) {
  const { feed } = await searchParams;
  const cache = await loadFeedCache();
  const feeds = buildFeedExplorerFeeds(cache);

  // No default feed — articles stay hidden until a source is picked.
  const initialFeedId =
    typeof feed === 'string' && feeds.some((f) => f.id === feed) ? feed : null;

  return <FeedPage feeds={feeds} initialFeedId={initialFeedId} />;
}
