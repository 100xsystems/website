import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_TAGS, FEED_REGISTRY } from '@/feed/feed.constants';
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

function RelatedTags({ currentTag }: { currentTag: string }) {
  const related = [
    ...new Set(
      FEED_REGISTRY.filter((f) => f.tags.includes(currentTag))
        .flatMap((f) => f.tags)
        .filter((t) => t !== currentTag)
    ),
  ].sort();

  if (related.length === 0) return null;

  return (
    <section className="border-b-2 border-black bg-surface-light">
      <div className="max-w-[860px] mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted shrink-0">
            Related topics:
          </span>
          {related.slice(0, 8).map((tag) => (
            <Link
              key={tag}
              href={`/discover/feed/${tag}`}
              className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-secondary hover:bg-accent hover:text-white transition-colors border-2 border-black"
            >
              {tag.replace(/-/g, ' ')}
            </Link>
          ))}
          <Link
            href="/discover/feed"
            className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors ml-auto"
          >
            All topics →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function DiscoverFeedTagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return (
    <>
      <div className="max-w-[860px] mx-auto px-4 pt-6 pb-0">
        <Link
          href="/discover/feed"
          className="text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors mb-2 inline-block"
        >
          &larr; All topics
        </Link>
      </div>
      <RelatedTags currentTag={tag} />
      <FeedPage initialTag={tag} />
    </>
  );
}
