import type { Metadata } from 'next';
import { ALL_TAGS, FEED_REGISTRY } from '@/feed/feed.constants';
import { loadFeedCache, buildFeedExplorerFeeds } from '@/feed/feed.cache';
import { FeedPage } from '@/feed/FeedPage';

export const revalidate = 86400;

export function generateStaticParams() {
  return ALL_TAGS.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const tagLabel = tag.replace(/-/g, ' ');
  const feedCount = FEED_REGISTRY.filter((f) => f.tags.includes(tag)).length;

  return {
    title: `${tagLabel} Engineering Articles — 100xSystems`,
    description: `Discover the best ${tagLabel} engineering articles curated from ${feedCount} top engineering blogs. Stay updated with the latest in ${tagLabel}.`,
    openGraph: {
      title: `${tagLabel} Engineering Articles — 100xSystems`,
      description: `Curated ${tagLabel} articles from ${feedCount} engineering blogs.`,
    },
  };
}

export default async function DiscoverFeedTagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const cache = await loadFeedCache();
  const feeds = buildFeedExplorerFeeds(cache).filter((f) => f.tags.includes(tag));

  return <FeedPage feeds={feeds} initialTag={tag} />;
}
