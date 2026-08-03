import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getHub, refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { ResourceHubDetail } from '@/components/resource-hub-detail';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  // Try each technology category
  for (const cat of ['frameworks', 'infrastructure', 'databases', 'data-formats', 'runtimes']) {
    const hub = getHub(cat, slug);
    if (hub) return { title: `${hub.name} — Technologies` };
  }
  return { title: 'Not Found' };
}

export default async function TechnologyDetailPage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  // Try each technology category
  for (const cat of ['frameworks', 'infrastructure', 'databases', 'data-formats', 'runtimes']) {
    const hub = getHub(cat, slug);
    if (hub) {
      const lessonBasePath = hub.lessons ? `/knowledge/technologies/${hub.slug}` : undefined;
      return (
        <ResourceHubDetail
          hub={hub}
          backLabel="Technologies"
          backHref="/knowledge/technologies"
          lessonBasePath={lessonBasePath}
        />
      );
    }
  }
  notFound();
}
