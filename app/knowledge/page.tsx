import type { Metadata } from 'next';
import Link from 'next/link';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { KnowledgeManifest } from '@/knowledge/knowledge.types';
import { KnowledgeGraphClient } from './KnowledgeGraphClient';

export const metadata: Metadata = {
  title: 'Knowledge Graph — 100xSystems',
  description:
    'Browse software engineering concepts across principles, languages, tools, and patterns.',
  openGraph: {
    title: 'Knowledge Graph — 100xSystems',
    description: 'Browse interconnected engineering concepts across 4 categories.',
  },
};

export const revalidate = 86400;

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

export default async function KnowledgePage({ searchParams }: Props) {
  const { category } = await searchParams;
  const manifest = readManifest();

  if (!manifest || manifest.totalEntities === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-xl font-bold text-fg mb-4 uppercase tracking-wider">Knowledge Graph</h1>
        <div className="border-2 border-dashed border-black/20 p-12 text-center">
          <p className="text-fg-muted text-sm">Knowledge graph data hasn't been cached yet.</p>
          <p className="text-fg-muted/60 text-xs mt-2">Run the knowledge crawler in the registry first.</p>
        </div>
      </main>
    );
  }

  const sortedCategories = Object.entries(manifest.categories).sort((a, b) => b[1] - a[1]);

  const allConcepts = Object.keys(manifest.labelMap).map((slug) => ({
    slug,
    label: manifest.labelMap[slug] || slug,
    category: manifest.categoryMap[slug] || 'unknown',
  }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-fg uppercase tracking-wider">Knowledge Graph</h1>
          <p className="text-sm text-fg-muted mt-1">
            {manifest.totalEntities} software engineering concepts
          </p>
        </div>
        {category && (
          <Link
            href="/knowledge"
            className="text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors"
          >
            &larr; Clear
          </Link>
        )}
      </div>

      {/* Search + tabs + listing (client component) */}
      <KnowledgeGraphClient
        concepts={allConcepts}
        initialCategory={category || null}
        categoryCounts={Object.fromEntries(sortedCategories)}
        categoryLabels={CATEGORY_LABELS}
      />
    </main>
  );
}
