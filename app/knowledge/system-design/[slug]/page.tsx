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
  const hub = getHub('system-design', slug);
  if (!hub) return { title: 'Not Found' };
  return { title: `${hub.name} — System Design` };
}

export default async function SystemDesignModulePage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('system-design', slug);
  if (!hub) notFound();
  return (
    <ResourceHubDetail
      hub={hub}
      backLabel="System Design"
      backHref="/knowledge/system-design"
      lessonBasePath={hub.lessons ? `/knowledge/system-design/${hub.slug}` : undefined}
    />
  );
}
