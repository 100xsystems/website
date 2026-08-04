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
  const hub = getHub('tools', slug);
  if (!hub) return { title: 'Not Found' };
  return { title: `${hub.name} — Tools` };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('tools', slug);
  if (!hub) notFound();

  const lessonBasePath = hub.lessons ? `/knowledge/tools/${hub.slug}` : undefined;

  return (
    <ResourceHubDetail
      hub={hub}
      backLabel="Tools"
      backHref="/knowledge/tools"
      lessonBasePath={lessonBasePath}
    />
  );
}
