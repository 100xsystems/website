import type { Metadata } from 'next';
import Link from 'next/link';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { AwesomeFeed } from './AwesomeFeed';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Awesome Lists — 100xSystems',
  description:
    'All resources from GitHub Awesome lists in one flat feed. Search, filter by source collection, and discover curated engineering tools and libraries.',
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
      <main className="mx-auto max-w-[860px] px-4 py-16">
        <h1 className="text-xl font-bold text-fg uppercase tracking-wider mb-4">Awesome Lists</h1>
        <div className="border-2 border-dashed border-black/20 p-12 text-center">
          <p className="text-fg-muted text-sm">No awesome lists available yet.</p>
          <p className="text-fg-muted/60 text-xs mt-2">Run the crawler in the registry first.</p>
        </div>
      </main>
    );
  }

  // Load all list data in parallel and combine into one flat array
  const allLinks: AwesomeLink[] = [];
  const sourceLabels: Record<string, string> = {};
  const sourceStars: Record<string, number> = {};
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
    sourceStars[entry.repoId] = entry.stars;
    for (const link of list.links) {
      const key = link.url.toLowerCase();
      if (seenUrls.has(key)) continue;
      seenUrls.add(key);
      allLinks.push(link);
    }
  }

  return (
    <main className="mx-auto max-w-[860px] px-4 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-fg-muted mb-6">
        <Link href="/feed" className="font-bold uppercase tracking-wider hover:text-accent transition-colors">
          Feed
        </Link>
        <span>/</span>
        <span className="font-bold uppercase tracking-wider text-fg">Awesome Lists</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-fg uppercase tracking-wider">Awesome Lists</h1>
        <p className="text-sm text-fg-muted mt-1.5 max-w-2xl">
          {allLinks.length.toLocaleString()} resources from {index.listCount} curated GitHub Awesome lists.
        </p>
      </div>

      {/* Feed */}
      <AwesomeFeed
        links={allLinks}
        sourceLabels={sourceLabels}
        sourceStars={sourceStars}
      />
    </main>
  );
}
