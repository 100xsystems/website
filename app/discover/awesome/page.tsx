import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { humanizeListName } from '@/lib/awesome-icons';
import { AwesomeFeed, type AwesomeLink, type AwesomeSource } from './AwesomeFeed';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Awesome Directory — 100xSystems',
  description:
    'The Awesome directory: every curated GitHub Awesome list in one place. Pick a list, choose a category, and dive straight into the resources — with native brand icons and zero clutter.',
  openGraph: {
    title: 'Awesome Directory — 100xSystems',
    description: 'Browse curated GitHub Awesome lists by source, then category.',
  },
};

interface AwesomeListFile {
  repoId: string;
  name: string;
  description?: string | null;
  repoUrl?: string;
  stars: number;
  topics: string[];
  links: AwesomeLink[];
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
  lists: AwesomeIndexEntry[];
}

const CACHE_DIR = path.join(process.cwd(), 'public', 'awesome-cache');

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** Strip emoji + :colon-code: tokens and collapse whitespace. */
function cleanName(name: string): string {
  return name
    .replace(/:[a-z0-9_+-]+:/gi, ' ')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Build a short, human description — prefer the explicit field, fall back to the cleaned name. */
function cleanDescription(repoId: string, name: string, explicit?: string | null): string | null {
  if (explicit && explicit.trim()) return cleanName(explicit);
  const cleaned = cleanName(name);
  return cleaned && cleaned !== repoId ? cleaned : null;
}

export default async function AwesomePage() {
  const index = await readJson<AwesomeIndex>(path.join(CACHE_DIR, 'index.json'));

  if (!index || index.lists.length === 0) {
    return (
      <main className="mx-auto max-w-[860px] px-4 py-16">
        <h1 className="text-xl font-bold text-fg uppercase tracking-wider mb-4">Awesome Directory</h1>
        <div className="border-2 border-dashed border-black/20 p-12 text-center">
          <p className="text-fg-muted text-sm">No awesome lists available yet.</p>
          <p className="text-fg-muted/60 text-xs mt-2">Run the crawler in the registry first.</p>
        </div>
      </main>
    );
  }

  // Load every list in parallel and assemble source-level data.
  const loadedLists = await Promise.all(
    index.lists.map((entry) => {
      const fileName = `${entry.repoId.replace('/', '-')}.json`;
      return readJson<AwesomeListFile>(path.join(CACHE_DIR, fileName)).then((list) => ({ entry, list }));
    }),
  );

  const sources: AwesomeSource[] = loadedLists
    .filter(({ list }) => list && Array.isArray(list.links) && list.links.length > 0)
    .map(({ entry, list }) => {
      const listData = list as AwesomeListFile;
      const links = listData.links;
      const counts = new Map<string, number>();
      for (const link of links) {
        const cat = (link.category || 'Uncategorized').trim() || 'Uncategorized';
        counts.set(cat, (counts.get(cat) || 0) + 1);
      }
      const categories = [...counts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
      return {
        repoId: entry.repoId,
        name: humanizeListName(entry.repoId),
        description: cleanDescription(entry.repoId, listData.name || entry.repoId, listData.description),
        repoUrl: listData.repoUrl || `https://github.com/${entry.repoId}`,
        stars: entry.stars || listData.stars || 0,
        topics: listData.topics || [],
        linkCount: links.length,
        categories,
        links,
      };
    })
    .sort((a, b) => b.stars - a.stars);

  const totalLinks = sources.reduce((sum, s) => sum + s.linkCount, 0);

  return (
    <main className="mx-auto py-16 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-fg-muted mb-8">
          <Link href="/discover/feed" className="font-bold uppercase tracking-wider hover:text-accent transition-colors">
            Feed
          </Link>
          <span>/</span>
          <span className="font-bold uppercase tracking-wider text-fg">Awesome Directory</span>
        </div>

        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            AWESOME DIRECTORY
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Pick a list.<br />
            <span className="text-accent">Dive right in.</span>
          </h1>
          <p className="mt-6 text-lg text-fg-secondary max-w-2xl">
            {sources.length} curated GitHub lists · {totalLinks.toLocaleString()} resources. Select a list,
            then a category — the resources appear below, with nothing in the way.
          </p>
        </div>

        {/* Feed — wrapped in Suspense because it reads useSearchParams for ?source= deep links */}
        <Suspense
          fallback={
            <div className="py-24 text-center text-sm text-fg-muted">Loading the directory…</div>
          }
        >
          <AwesomeFeed sources={sources} />
        </Suspense>
      </div>
    </main>
  );
}

