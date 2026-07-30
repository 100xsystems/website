import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getHub } from '@/lib/knowledge-resources';
import { ResourceHubDetail } from '@/components/resource-hub-detail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hub = getHub('case-studies', slug);
  if (!hub) return { title: 'Not Found' };
  return { title: `${hub.name} — Case Studies` };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const hub = getHub('case-studies', slug);
  if (!hub) notFound();
  return <ResourceHubDetail hub={hub} backLabel="Case Studies" backHref="/knowledge/case-studies" />;
}
