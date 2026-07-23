import type { Metadata } from 'next';
import Link from 'next/link';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { KnowledgeManifest } from '@/knowledge/knowledge.types';
import { KnowledgeGraphClient } from './KnowledgeGraphClient';

export const metadata: Metadata = {
  title: 'Knowledge Graph — 100xSystems',
  description:
    'Browse software engineering concepts across principles, languages, tools, and patterns. A curated knowledge graph bootstrapped from Wikipedia and Wikidata.',
  openGraph: {
    title: 'Knowledge Graph — 100xSystems',
    description: 'Browse interconnected engineering concepts across 4 categories.',
  },
};

export const revalidate = 86400; // ISR: 24 hours

interface Props {
  searchParams: Promise<{ category?: string }>;
}

const CACHE_DIR = path.join(process.cwd(), 'public', 'knowledge-cache');

function readManifest(): KnowledgeManifest | null {
  try {
    const filePath = path.join(CACHE_DIR, 'manifest.json');
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  principles: 'Principles',
  languages: 'Languages',
  tools: 'Tools & Technologies',
  patterns: 'Patterns',
};

const CATEGORY_COLORS: Record<string, string> = {
  principles: 'bg-amber-50 text-amber-700',
  languages: 'bg-green-50 text-green-700',
  tools: 'bg-blue-50 text-blue-700',
  patterns: 'bg-purple-50 text-purple-700',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  principles: 'Foundational engineering principles, heuristics, and design philosophies',
  languages: 'Programming languages and their paradigms',
  tools: 'Databases, frameworks, platforms, and infrastructure technologies',
  patterns: 'Design patterns, architectural patterns, algorithms, and data structures',
};

export default async function KnowledgePage({ searchParams }: Props) {
  const { category } = await searchParams;
  const manifest = readManifest();

  if (!manifest || manifest.totalEntities === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Knowledge Graph</h1>
        <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
          <p className="text-neutral-500 text-sm">
            Knowledge graph data hasn't been cached yet.
          </p>
          <p className="text-neutral-400 text-xs mt-2">
            Run the knowledge crawler in the registry first, then build the website.
          </p>
        </div>
      </main>
    );
  }

  const sortedCategories = Object.entries(manifest.categories).sort((a, b) => b[1] - a[1]);

  // Build the concepts array for the client component
  const allConcepts = Object.keys(manifest.labelMap).map((slug) => ({
    slug,
    label: manifest.labelMap[slug] || slug,
    category: manifest.categoryMap[slug] || 'unknown',
  }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Knowledge Graph</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {manifest.totalEntities} software engineering concepts, curated from Wikipedia
            </p>
          </div>
          {category && (
            <Link href="/knowledge" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              &larr; Clear filter
            </Link>
          )}
        </div>
      </div>

      {/* Category cards */}
      <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sortedCategories.map(([cat, count]) => (
          <Link
            key={cat}
            href={`/knowledge?category=${cat}`}
            className={`rounded-lg border p-4 transition-all hover:shadow-sm ${
              category === cat ? 'border-neutral-400 ring-1 ring-neutral-300' : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium mb-2 ${CATEGORY_COLORS[cat] || 'bg-neutral-100 text-neutral-700'}`}>
              {CATEGORY_LABELS[cat] || cat}
            </div>
            <p className="text-lg font-semibold text-neutral-900">{count}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{CATEGORY_DESCRIPTIONS[cat] || ''}</p>
          </Link>
        ))}
      </section>

      {/* Search + listing (client component for interactivity) */}
      <section>
        <KnowledgeGraphClient
          concepts={allConcepts}
          selectedCategory={category || null}
          categoryLabels={CATEGORY_LABELS}
          categoryColors={CATEGORY_COLORS}
        />
      </section>
    </main>
  );
}
