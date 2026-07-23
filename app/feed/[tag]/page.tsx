import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_TAGS, FEED_REGISTRY } from '@/feed/feed.constants';
import { FeedPage } from '@/feed/FeedPage';

/**
 * Dedicated tag pages at /feed/[tag].
 *
 * Each page is statically pre-rendered at build time with proper SEO metadata
 * (title, description, OpenGraph) describing the specific engineering topic.
 * The page pre-filters articles by the tag and shows related tags for navigation.
 *
 * SEO: These pages are indexable by search engines and link to each other
 * via the related-tags nav, creating a crawlable topic graph.
 */

// ── ISR: Revalidate every 24h (matches the feed cache update cycle) ──

export const revalidate = 86400;

// ── Static Params ────────────────────────────────────────────────────

export function generateStaticParams() {
  return ALL_TAGS.map((tag) => ({ tag }));
}

// ── Dynamic Metadata ──────────────────────────────────────────────────

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

// ── Related Tags ──────────────────────────────────────────────────────

function RelatedTags({ currentTag }: { currentTag: string }) {
  // Collect tags that co-occur with the current tag across all feeds
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
              href={`/feed/${tag}`}
              className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-secondary hover:bg-accent hover:text-white transition-colors border-2 border-black"
            >
              {tag.replace(/-/g, ' ')}
            </Link>
          ))}
          <Link
            href="/feed"
            className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors ml-auto"
          >
            All topics →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return (
    <>
      <div className="max-w-[860px] mx-auto px-4 pt-6 pb-0">
        <Link
          href="/feed"
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
