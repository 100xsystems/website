import { notFound } from 'next/navigation';
import { getHub } from '@/lib/knowledge-resources';
import { buildLessonMetadata } from '@/lib/lesson-metadata';
import { KnowledgeLessonPageWithProvider } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('principles', slug);
  if (!hub) return { title: 'Not Found' };
  return buildLessonMetadata(hub.name, lessonSlug, hub.lessons);
}

export default async function PrincipleLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('principles', slug);
  if (!hub) notFound();
  return (
    <KnowledgeLessonPageWithProvider
      category="principles"
      hubName={hub.name}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={hub.lessons || []}
      backUrlPrefix="knowledge/principles"
    />
  );
}
