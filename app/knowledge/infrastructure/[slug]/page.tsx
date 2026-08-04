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
  const hub = getHub('infrastructure', slug);
  if (!hub) return { title: 'Not Found' };
  return { title: `${hub.name} — Infrastructure` };
}

export default async function InfrastructureHubDetailPage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('infrastructure', slug);
  if (!hub) notFound();
  return (
    <ResourceHubDetail
      hub={hub}
      backLabel="Infrastructure"
      backHref="/knowledge/infrastructure"
      lessonBasePath={hub.lessons ? `/knowledge/infrastructure/${hub.slug}` : undefined}
    />
  );
}
