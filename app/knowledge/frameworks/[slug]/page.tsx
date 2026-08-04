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
  const hub = getHub('frameworks', slug);
  if (!hub) return { title: 'Not Found' };
  return { title: `${hub.name} — Frameworks` };
}

export default async function FrameworksHubDetailPage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('frameworks', slug);
  if (!hub) notFound();
  return (
    <ResourceHubDetail
      hub={hub}
      backLabel="Frameworks"
      backHref="/knowledge/frameworks"
      lessonBasePath={hub.lessons ? `/knowledge/frameworks/${hub.slug}` : undefined}
    />
  );
}
