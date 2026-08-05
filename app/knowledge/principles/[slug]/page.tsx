import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getHub, getHubSlugs, refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { ResourceHubDetail } from '@/components/resource-hub-detail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getHubSlugs('principles').map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('principles', slug);
  if (!hub) return { title: 'Not Found' };
  return { title: `${hub.name} — Principles` };
}

export default async function PrincipleDetailPage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const hub = getHub('principles', slug);
  if (!hub) notFound();
  return (
    <ResourceHubDetail
      hub={hub}
      backLabel="Principles"
      backHref="/knowledge/principles"
      lessonBasePath={hub.lessons ? `/knowledge/principles/${hub.slug}` : undefined}
    />
  );
}
