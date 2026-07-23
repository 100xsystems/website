import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Star, ExternalLink, ArrowLeft, Github } from 'lucide-react';
import { CategoryBrowser } from './CategoryBrowser';

export const revalidate = 86400;

interface Props {
  params: Promise<{ repo: string }>;
}

// ── Types ─────────────────────────────────────────────────────────────

interface AwesomeLink {
  url: string;
  title: string;
  description: string | null;
  category: string;
  source: string;
  indexedAt: string;
}

interface AwesomeList {
  repoId: string;
  name: string;
  description: string;
  repoUrl: string;
  stars: number;
  topics: string[];
  links: AwesomeLink[];
  categories: string[];
  crawledAt: string;
}

interface AwesomeIndexEntry {
  repoId: string;
  name: string;
  linkCount: number;
  stars: number;
}

interface AwesomeIndex {
  listCount: number;
  totalLinks: number;
  generatedAt: string;
  topicSummary: Record<string, number>;
  lists: AwesomeIndexEntry[];
}

// ── Filesystem Helpers ────────────────────────────────────────────────

const CACHE_DIR = path.join(process.cwd(), 'public', 'awesome-cache');

async function readAwesomeList(repoId: string): Promise<AwesomeList | null> {
  try {
    const filePath = path.join(CACHE_DIR, `${repoId}.json`);
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as AwesomeList;
  } catch {
    return null;
  }
}

async function readAwesomeIndex(): Promise<AwesomeIndex | null> {
  try {
    const filePath = path.join(CACHE_DIR, 'index.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as AwesomeIndex;
  } catch {
    return null;
  }
}

// ── Static Generation ─────────────────────────────────────────────────

export async function generateStaticParams(): Promise<{ repo: string }[]> {
  const index = await readAwesomeIndex();
  if (!index) return [];
  return index.lists.map((l) => ({ repo: l.repoId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { repo } = await params;
  const list = await readAwesomeList(repo);
  if (!list) return { title: 'Not Found — 100xSystems' };

  return {
    title: `${list.name} — Awesome Lists — 100xSystems`,
    description: `${list.links.length} curated resources across ${list.categories.length} categories. ${list.description?.slice(0, 200)}`,
    openGraph: {
      title: `${list.name} — Awesome Lists`,
      description: `${list.links.length} curated engineering resources.`,
    },
  };
}

function formatStars(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

// ── Server Component ──────────────────────────────────────────────────

export default async function AwesomeListPage({ params }: Props) {
  const { repo } = await params;
  const list = await readAwesomeList(repo);

  if (!list) notFound();

  const totalLinks = list.links.length;
  const displayName = list.name || repo.replace('-', '/');
  const grouped: Record<string, AwesomeLink[]> = {};
  for (const link of list.links) {
    const cat = link.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(link);
  }
  const categoryEntries = Object.entries(grouped);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/discover/awesome"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all awesome lists
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              {displayName}
            </h1>
            {list.description && (
              <p className="text-neutral-600 text-sm max-w-2xl">
                {list.description.split('\n')[0]}
              </p>
            )}
          </div>
          <a
            href={list.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            View on GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <ExternalLink className="h-3.5 w-3.5" />
            {totalLinks} resources
          </span>
          <span className="inline-flex items-center gap-1">
            {categoryEntries.length} categories
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            {formatStars(list.stars)} stars
          </span>
          {list.topics.length > 0 && (
            <span className="text-neutral-400">
              Topics: {list.topics.slice(0, 5).join(', ')}
              {list.topics.length > 5 && ` +${list.topics.length - 5} more`}
            </span>
          )}
        </div>
      </div>

      {/* Client-side search + categorized links with collapse */}
      <CategoryBrowser links={list.links} categories={list.categories} />

      {/* Footer */}
      <div className="mt-12 border-t border-neutral-100 pt-6 text-center">
        <p className="text-xs text-neutral-400">
          Crawled from{' '}
          <a href={list.repoUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-600">
            {list.repoUrl}
          </a>{' '}
          · {new Date(list.crawledAt).toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}
