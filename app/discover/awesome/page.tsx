import type { Metadata } from 'next';
import Link from 'next/link';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Sparkles } from 'lucide-react';
import { AwesomeFeed } from './AwesomeFeed';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Awesome Lists — 100xSystems',
  description:
    'All resources from GitHub Awesome lists in one flat feed. Search, filter by source or category, and discover curated engineering tools and libraries.',
  openGraph: {
    title: 'Awesome Lists — 100xSystems',
    description: 'Curated engineering resources from GitHub Awesome lists.',
  },
};

interface AwesomeLink {
  url: string;
  title: string;
  description: string | null;
  category: string;
  source: string;
}

interface AwesomeListFile {
  repoId: string;
  name: string;
  links: AwesomeLink[];
  stars: number;
  topics: string[];
}

interface AwesomeIndex {
  listCount: number;
  totalLinks: number;
  lists: Array<{ repoId: string; name: string; linkCount: number; stars: number }>;
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

export default async function AwesomePage() {
  const index = await readJson<AwesomeIndex>(path.join(CACHE_DIR, 'index.json'));

  if (!index || index.lists.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-bold text-violet-900 mb-4">Awesome Lists</h1>
        <div className="rounded-lg border-2 border-dashed border-violet-200 p-12 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-violet-300 mb-3" />
          <p className="text-violet-500 text-sm">No awesome lists available yet.</p>
          <p className="text-violet-400 text-xs mt-2">
            Run the crawler in the registry first.
          </p>
        </div>
      </main>
    );
  }

  // Load all list data in parallel and combine into one flat array
  const allLinks: AwesomeLink[] = [];
  const sourceLabels: Record<string, string> = {};
  const seenUrls = new Set<string>();

  const loadedLists = await Promise.all(
    index.lists.map((entry) => {
      const fileName = `${entry.repoId.replace('/', '-')}.json`;
      return readJson<AwesomeListFile>(path.join(CACHE_DIR, fileName)).then((list) => ({ entry, list }));
    })
  );

  for (const { entry, list } of loadedLists) {
    if (!list) continue;

    sourceLabels[entry.repoId] = list.name || entry.repoId;

    for (const link of list.links) {
      // Deduplicate by URL
      const key = link.url.toLowerCase();
      if (seenUrls.has(key)) continue;
      seenUrls.add(key);
      allLinks.push(link);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-violet-500 mb-6">
        <Link href="/feed" className="hover:text-violet-700 transition-colors">
          Feed
        </Link>
        <span>/</span>
        <span className="text-violet-900 font-medium">Awesome Lists</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-6 w-6 text-violet-500" />
          <h1 className="text-2xl font-bold text-violet-900">Awesome Lists</h1>
        </div>
        <p className="text-violet-600 text-sm max-w-2xl">
          All resources from {index.listCount} curated awesome lists in one flat feed.
          {' '}{allLinks.length.toLocaleString()} resources across {index.lists.length} collections.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
          {allLinks.length.toLocaleString()} resources
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
          {index.listCount} lists
        </span>
      </div>

      {/* Feed */}
      <AwesomeFeed links={allLinks} sourceLabels={sourceLabels} />
    </main>
  );
}
