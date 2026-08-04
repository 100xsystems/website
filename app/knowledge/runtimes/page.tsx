import type { Metadata } from 'next';
import { refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { CategoryHubIndex } from '@/components/category-hub-index';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Runtimes — Knowledge Base',
  description:
    'Three complete runtime courses — Node.js, Bun and Deno — the modern JavaScript execution environments. Free and open.',
};

export default function RuntimesKnowledgePage() {
  // ISR: re-clone the registry knowledge tree if stale.
  refreshKnowledgeCacheIfStale();
  return (
    <CategoryHubIndex
      category="runtimes"
      categoryLabel="Runtimes"
      hubLabel="Runtimes"
      description="Three complete runtime courses — Node.js, Bun and Deno — the modern JavaScript execution environments."
    />
  );
}
