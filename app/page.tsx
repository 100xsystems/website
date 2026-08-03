import { HomeFeed } from '@/presentation/features/homeFeed.feature';
import { HomeYC } from '@/presentation/features/homeYC.feature';
import { HomeProductHunt } from '@/presentation/features/homeProductHunt.feature';
import { HomeDiscover } from '@/presentation/features/homeDiscover.feature';
import { HomeUnifiedSearch } from '@/presentation/features/homeUnifiedSearch.feature';
import { HomeHero } from '@/presentation/features/homeHero.feature';
import { HomeLanguages } from '@/presentation/features/homeLanguages.feature';
import { HomeKnowledgeTopics } from '@/presentation/features/homeKnowledgeTopics.feature';
import { HomeAwesome } from '@/presentation/features/homeAwesome.feature';
import { loadFeedCache } from '@/feed/feed.cache';
import type { FeedCache, RegistryFeedItem, RegistryFeedData } from '@/feed/feed.types';
import { getLanguagesWithResources, getLanguageResources, refreshLanguageResourcesIfStale } from '@/lib/language-resources';
import { getHubs } from '@/lib/knowledge-resources';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export const revalidate = 3600;

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

interface AwesomeIndexEntry {
  repoId: string;
  name: string;
  linkCount: number;
  stars: number;
}

async function loadFeaturedAwesomeLists(): Promise<Array<{ repoId: string; name: string; stars: number; linkCount: number }>> {
  try {
    const indexPath = path.join(process.cwd(), 'public', 'awesome-cache', 'index.json');
    const raw = await fs.readFile(indexPath, 'utf-8');
    const index = JSON.parse(raw) as { lists: AwesomeIndexEntry[] };
    const lists = index.lists || [];

    // Curated feature set: languages + fundamentals, ordered by stars
    const featured = lists
      .filter((l) => FEATURED_AWESOME.has(l.repoId))
      .sort((a, b) => b.stars - a.stars);

    // Fall back to the top 8 star-ranked lists if none of the curated set exists
    const chosen = featured.length >= 8
      ? featured.slice(0, 12)
      : [...featured, ...lists.filter((l) => !FEATURED_AWESOME.has(l.repoId)).sort((a, b) => b.stars - a.stars)].slice(0, 12);

    return chosen.map((l) => ({ repoId: l.repoId, name: l.name, stars: l.stars, linkCount: l.linkCount }));
  } catch {
    return [];
  }
}

const FEATURED_AWESOME = new Set([
  'sindresorhus/awesome',
  'sindresorhus/awesome-nodejs',
  'avelino/awesome-go',
  'rust-unofficial/awesome-rust',
  'vinta/awesome-python',
  'fffaraz/awesome-cpp',
  'akullpp/awesome-java',
  'dzharii/awesome-typescript',
  'enaqx/awesome-react',
  'vuejs/awesome-vue',
  'PatrickJS/awesome-angular',
  'TheComputerM/awesome-svelte',
  'veggiemonk/awesome-docker',
  'ramitsurana/awesome-kubernetes',
  'shuaibiyy/awesome-terraform',
  'matteocrippa/awesome-swift',
  'mcxiaoke/awesome-kotlin',
  'markets/awesome-ruby',
]);

// ── Page ────────────────────────────────────────────────────────────

export default async function HomePage() {
  // ISR: re-clone the registry knowledge tree if stale so revalidation
  // serves fresh lessons/hubs, not just re-rendered stale files.
  refreshLanguageResourcesIfStale();

  const cache = await loadFeedCache();
  const latestArticles = cache ? flattenCache(cache) : null;

  // Languages with courses (complete + in-progress first)
  const languages = getLanguagesWithResources()
    .map((slug) => {
      const res = getLanguageResources(slug);
      if (!res) return null;
      const resourceCount = res.categories?.reduce((s, cat) => s + (cat.items?.length ?? 0), 0) ?? 0;
      return {
        slug,
        name: res.name,
        description: res.description,
        lessons: res.lessons ?? [],
        resourceCount,
      };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null)
    .sort((a, b) => b.lessons.length - a.lessons.length)
    .slice(0, 16);

  // Knowledge topics (principles, patterns, tools, technologies)
  const topics = [
    { key: 'principles', label: 'Principles', description: 'Foundational engineering principles and laws.', icon: 'principles' },
    { key: 'patterns', label: 'Patterns', description: 'Design patterns and architectural blueprints.', icon: 'patterns' },
    { key: 'tools', label: 'Tools', description: 'Essential development tools and infrastructure.', icon: 'tools' },
    { key: 'technologies', label: 'Technologies', description: 'Key technologies and platforms shaping the industry.', icon: 'technologies' },
  ].map((t) => ({
    slug: t.key,
    label: t.label,
    description: t.description,
    count: getHubs(t.key).length,
  }));

  const awesomeLists = await loadFeaturedAwesomeLists();

  return (
    <>
      {/* Unified Search — at the very top */}
      <HomeUnifiedSearch />

      {/* Hero — says clearly what the product is */}
      <HomeHero />

      {/* Language courses with status */}
      {languages.length > 0 && <HomeLanguages languages={languages} />}

      {/* Knowledge topics — principles, patterns, tools, technologies */}
      <HomeKnowledgeTopics topics={topics} />

      {/* Curated awesome lists — click to the filtered list */}
      {awesomeLists.length > 0 && <HomeAwesome lists={awesomeLists} />}

      {/* Feed — latest articles from ALL feeds, sorted by recency */}
      <HomeFeed initialArticles={latestArticles} />

      <HomeDiscover />
      <HomeYC />
      <HomeProductHunt />
    </>
  );
}
