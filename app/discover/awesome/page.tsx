import type { Metadata } from 'next';
import Link from 'next/link';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Star, ExternalLink, BookOpen } from 'lucide-react';

export const revalidate = 86400; // Revalidate every 24h

export const metadata: Metadata = {
  title: 'Awesome Lists — 100xSystems',
  description:
    'Curated collections of the best engineering resources from GitHub Awesome lists. Discover tools, libraries, and learning materials across distributed systems, databases, languages, and more.',
  openGraph: {
    title: 'Awesome Lists — 100xSystems',
    description:
      'Curated collections of engineering resources from GitHub Awesome lists.',
  },
};

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

async function readAwesomeIndex(): Promise<AwesomeIndex | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'awesome-cache', 'index.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as AwesomeIndex;
  } catch {
    return null;
  }
}

function formatStars(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default async function AwesomeBrowsePage() {
  const index = await readAwesomeIndex();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
        <Link href="/feed" className="hover:text-neutral-700 transition-colors">
          Feed
        </Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">Awesome Lists</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Awesome Lists</h1>
        <p className="text-neutral-600 text-lg max-w-2xl">
          Curated collections of the best engineering resources from the GitHub
          Awesome ecosystem. Each list is maintained by the community and covers
          a specific domain.
        </p>
      </div>

      {!index || index.lists.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
          <h2 className="text-lg font-semibold text-neutral-500 mb-2">
            No awesome lists available
          </h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">
            Run the awesome list crawler in the registry repo (<code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">npm run crawl-awesome</code>) to populate the data.
          </p>
        </div>
      ) : (
        <>
          {/* Stats bar */}
          <div className="flex flex-wrap gap-4 mb-8 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1">
              <BookOpen className="h-3.5 w-3.5" />
              {index.listCount} lists
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1">
              <ExternalLink className="h-3.5 w-3.5" />
              {index.totalLinks.toLocaleString()} resources
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs">
              Updated {new Date(index.generatedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Topic summary chips */}
          {Object.keys(index.topicSummary).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(index.topicSummary)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 20)
                  .map(([topic, count]) => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
                    >
                      {topic}
                      <span className="text-neutral-400">({count})</span>
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* List grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {index.lists
              .sort((a, b) => b.stars - a.stars)
              .map((list) => (
                <Link
                  key={list.repoId}
                  href={`/discover/awesome/${list.repoId}`}
                  className="group rounded-lg border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors text-sm leading-snug">
                      {list.name || list.repoId.replace('-', '/')}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs text-amber-600 shrink-0 ml-2">
                      <Star className="h-3 w-3" />
                      {formatStars(list.stars)}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-2 mb-3 font-mono">
                    {list.repoId.replace('-', '/')}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span className="inline-flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {list.linkCount} resources
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </main>
  );
}
