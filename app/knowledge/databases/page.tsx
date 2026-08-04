import type { Metadata } from 'next';
import { refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { CategoryHubIndex } from '@/components/category-hub-index';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Databases — Knowledge Base',
  description:
    'Six complete database courses — PostgreSQL, MySQL, MongoDB, Redis, SQLite and Elasticsearch — covering storage engines, query planning, indexing and consistency models. Free and open.',
};

export default function DatabasesKnowledgePage() {
  // ISR: re-clone the registry knowledge tree if stale.
  refreshKnowledgeCacheIfStale();
  return (
    <CategoryHubIndex
      category="databases"
      categoryLabel="Databases"
      hubLabel="Databases"
      description="Six complete database courses — PostgreSQL, MySQL, MongoDB, Redis, SQLite and Elasticsearch — covering storage engines, query planning, indexing and consistency models."
    />
  );
}
