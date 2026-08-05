import type { Metadata } from 'next';
import { refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { CategoryHubIndex } from '@/components/category-hub-index';

export const metadata: Metadata = {
  title: 'Data Formats — Knowledge Base',
  description:
    'Thirteen complete courses on data formats and markup — JSON, SQL, GraphQL, HTML, CSS, Markdown and more. Free and open.',
};

export default function DataFormatsKnowledgePage() {
  // ISR: re-clone the registry knowledge tree if stale.
  refreshKnowledgeCacheIfStale();
  return (
    <CategoryHubIndex
      category="data-formats"
      categoryLabel="Data Formats"
      hubLabel="Formats"
      description="Thirteen complete courses on data formats and markup — JSON, SQL, GraphQL, HTML, CSS, Markdown and more."
    />
  );
}
