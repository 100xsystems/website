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
  const hub = getHub('data-formats', slug);
  if (!hub) return { title: 'Not Found' };
  return { title: `${hub.name} — Data Formats` };
}

export default async function DataFormatsHubDetailPage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('data-formats', slug);
  if (!hub) notFound();
  return (
    <ResourceHubDetail
      hub={hub}
      backLabel="Data Formats"
      backHref="/knowledge/data-formats"
      lessonBasePath={hub.lessons ? `/knowledge/data-formats/${hub.slug}` : undefined}
    />
  );
}
