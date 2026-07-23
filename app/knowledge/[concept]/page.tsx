import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ExternalLink, BookOpen } from 'lucide-react';
import type { KnowledgeEntity, KnowledgeManifest } from '@/knowledge/knowledge.types';

interface Props {
  params: Promise<{ concept: string }>;
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

function readEntity(category: string, slug: string): KnowledgeEntity | null {
  try {
    const filePath = path.join(CACHE_DIR, category, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const manifest = readManifest();
  if (!manifest) return [];

  return Object.entries(manifest.categoryMap).map(([slug, category]) => ({
    concept: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { concept } = await params;
  const manifest = readManifest();
  const label = manifest?.labelMap?.[concept] || concept;
  const category = manifest?.categoryMap?.[concept];

  // We don't know which category at this point, try all
  const categories = ['principles', 'languages', 'tools', 'patterns'];
  let entity: KnowledgeEntity | null = null;
  for (const cat of categories) {
    entity = readEntity(cat, concept);
    if (entity) break;
  }

  if (!entity) {
    return { title: 'Concept Not Found — 100xSystems' };
  }

  return {
    title: `${entity.label} — Knowledge Graph — 100xSystems`,
    description: entity.description || `Learn about ${entity.label} and its role in software engineering.`,
    openGraph: {
      title: `${entity.label} — 100xSystems Knowledge Graph`,
      description: entity.description || `Software engineering concept`,
    },
  };
}

export const revalidate = 86400; // ISR: 24 hours

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

export default async function ConceptPage({ params }: Props) {
  const { concept } = await params;
  const manifest = readManifest();

  // Determine category from manifest, or try all directories
  const category = manifest?.categoryMap?.[concept];
  const categoriesToTry = category
    ? [category]
    : ['principles', 'languages', 'tools', 'patterns'];

  let entity: KnowledgeEntity | null = null;
  let foundCategory = '';
  for (const cat of categoriesToTry) {
    entity = readEntity(cat, concept);
    if (entity) {
      foundCategory = cat;
      break;
    }
  }

  if (!entity) {
    notFound();
  }

  const catColor = CATEGORY_COLORS[foundCategory] || 'bg-neutral-100 text-neutral-700';

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-400">
        <Link href="/knowledge" className="hover:text-neutral-600 transition-colors">
          Knowledge Graph
        </Link>
        <span>/</span>
        <span className="text-neutral-700 font-medium">{entity.label}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{entity.label}</h1>
            {entity.description && (
              <p className="text-sm text-neutral-500 mt-1.5">{entity.description}</p>
            )}
          </div>
        </div>

        {/* Category badge */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${catColor}`}>
            {CATEGORY_LABELS[foundCategory] || foundCategory}
          </span>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary from Wikipedia */}
          {entity.summary && (
            <section className="rounded-lg border border-neutral-200 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Overview
              </h2>
              <div className="text-sm text-neutral-700 leading-relaxed">
                {entity.summary}
              </div>
            </section>
          )}

          {/* Relationships section - placeholder for future */}
          {(entity.parents.length > 0 || entity.children.length > 0 || entity.related.length > 0) && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Relationships
              </h2>
              {entity.parents.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-neutral-500 mb-1">Parent Concepts</p>
                  <div className="flex flex-wrap gap-2">
                    {entity.parents.map((p) => (
                      <Link key={p} href={`/knowledge/${p}`}
                        className="rounded-lg bg-neutral-50 px-3 py-1.5 text-sm hover:bg-neutral-100 transition-colors">
                        {manifest?.labelMap?.[p] || p}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {entity.children.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-neutral-500 mb-1">Sub-Concepts</p>
                  <div className="flex flex-wrap gap-2">
                    {entity.children.slice(0, 20).map((c) => (
                      <Link key={c} href={`/knowledge/${c}`}
                        className="rounded-lg bg-neutral-50 px-3 py-1.5 text-sm hover:bg-neutral-100 transition-colors">
                        {manifest?.labelMap?.[c] || c}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Aliases */}
          {entity.aliases.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Also Known As
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {entity.aliases.map((alias) => (
                  <span key={alias} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                    {alias}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* External links */}
          {Object.keys(entity.externalUrls).length > 0 && (
            <div className="rounded-lg border border-neutral-200 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                External Links
              </h2>
              <div className="space-y-2">
                {entity.externalUrls.wikipedia && (
                  <a href={entity.externalUrls.wikipedia} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    <BookOpen className="h-3.5 w-3.5" />
                    Wikipedia
                    <ExternalLink className="h-3 w-3 ml-auto text-neutral-300" />
                  </a>
                )}
                {entity.externalUrls.wikidata && (
                  <a href={entity.externalUrls.wikidata} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Wikidata
                    <ExternalLink className="h-3 w-3 ml-auto text-neutral-300" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="rounded-lg border border-neutral-200 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Metadata
            </h2>
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-neutral-500">Category</dt>
                <dd className="text-neutral-700 font-medium">{CATEGORY_LABELS[foundCategory] || foundCategory}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Slug</dt>
                <dd className="text-neutral-400 text-xs font-mono">{entity.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
