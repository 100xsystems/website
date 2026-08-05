import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getHub, getHubSlugs, refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { ResourceHubDetail } from '@/components/resource-hub-detail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getHubSlugs('runtimes').map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('runtimes', slug);
  if (!hub) return { title: 'Not Found' };
  return { title: `${hub.name} — Runtimes` };
}

export default async function RuntimesHubDetailPage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('runtimes', slug);
  if (!hub) notFound();
  return (
    <ResourceHubDetail
      hub={hub}
      backLabel="Runtimes"
      backHref="/knowledge/runtimes"
      lessonBasePath={hub.lessons ? `/knowledge/runtimes/${hub.slug}` : undefined}
    />
  );
}
