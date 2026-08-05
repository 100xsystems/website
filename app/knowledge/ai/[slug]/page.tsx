import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getHub, getHubSlugs, refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { ResourceHubDetail } from '@/components/resource-hub-detail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getHubSlugs('ai').map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('ai', slug);
  if (!hub) return { title: 'Not Found' };
  return { title: `${hub.name} — AI Courses` };
}

export default async function AiHubDetailPage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('ai', slug);
  if (!hub) notFound();
  return (
    <ResourceHubDetail
      hub={hub}
      backLabel="AI Courses"
      backHref="/knowledge/ai"
      lessonBasePath={hub.lessons ? `/knowledge/ai/${hub.slug}` : undefined}
    />
  );
}
