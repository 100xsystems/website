import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubs, refreshKnowledgeCacheIfStale, type ResourceHub } from '@/lib/knowledge-resources';
import { KnowledgeHub, type KnowledgeCategory } from './KnowledgeHub';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Knowledge — 100xSystems',
  description:
    'Every course and curated resource hub in one place — languages, principles, patterns, tools, AI, and more. Pick a category or see everything.',
  openGraph: {
    title: 'Knowledge — 100xSystems',
    description: 'Every course and curated resource hub in one place.',
  },
};

interface Props {
  searchParams: Promise<{ category?: string }>;
}

// Curated order: the core engineering categories first, then the rest of the knowledge base.
const CATEGORY_ORDER: Array<{ key: string; label: string }> = [
  { key: 'languages', label: 'Languages' },
  { key: 'principles', label: 'Principles' },
  { key: 'patterns', label: 'Patterns' },
  { key: 'tools', label: 'Tools' },
  { key: 'technologies', label: 'Technologies' },
  { key: 'ai', label: 'AI' },
  { key: 'case-studies', label: 'Case Studies' },
];

function countResources(hub: ResourceHub): number {
  return hub.categories?.reduce((sum, cat) => sum + (cat.items?.length ?? 0), 0) ?? 0;
}

export default async function KnowledgePage({ searchParams }: Props) {
  // ISR: re-clone the registry knowledge tree if stale so revalidation serves fresh hubs.
  refreshKnowledgeCacheIfStale();

  const { category } = await searchParams;

  // Load every category that has real data — empty categories are skipped automatically.
  const categories: KnowledgeCategory[] = CATEGORY_ORDER.map(({ key, label }) => ({
    key,
    label,
    hubs: getHubs(key)
      .map((h) => ({
        slug: h.slug,
        name: h.name,
        description: h.description ?? '',
        lessons: h.lessons ?? [],
        resourceCount: countResources(h),
      }))
      // Complete courses (with lessons) first, then curated resource hubs.
      .sort((a, b) => b.lessons.length - a.lessons.length),
  })).filter((c) => c.hubs.length > 0);

  const totalCourses = categories.reduce((s, c) => s + c.hubs.length, 0);
  const totalResources = categories.reduce((s, c) => s + c.hubs.reduce((x, h) => x + h.resourceCount, 0), 0);

  const initialCategory =
    typeof category === 'string' && categories.some((c) => c.key === category) ? category : 'all';

  return (
    <main className="mx-auto bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-fg-muted">
          <Link href="/" className="font-bold uppercase tracking-wider transition-colors hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span className="font-bold uppercase tracking-wider text-fg">Knowledge</span>
        </div>

        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 bg-accent px-4 py-2 text-sm font-bold uppercase tracking-widest text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            KNOWLEDGE BASE
          </div>
          <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Every course.<br />
            <span className="text-accent">One place.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
            {totalCourses} courses · {totalResources.toLocaleString()} curated resources across languages,
            principles, patterns, tools, AI, and more. Pick a category — or just see everything.
          </p>
        </div>

        <KnowledgeHub categories={categories} initialCategory={initialCategory} />
      </div>
    </main>
  );
}
