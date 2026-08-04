import { notFound } from 'next/navigation';
import { getHub, getHubs } from '@/lib/knowledge-resources';
import { buildLessonMetadata } from '@/lib/lesson-metadata';
import { KnowledgeLessonPageWithProvider } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('runtimes', slug);
  if (!hub) return { title: 'Not Found' };
  return buildLessonMetadata(hub.name, lessonSlug, hub.lessons);
}

export default async function RuntimesLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('runtimes', slug);
  if (!hub) notFound();
  const siblingHubs = getHubs('runtimes')
    .filter((h) => h.slug !== slug)
    .map((h) => ({ slug: h.slug, lessons: h.lessons || [] }));
  return (
    <KnowledgeLessonPageWithProvider
      category="runtimes"
      hubName={hub.name}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={hub.lessons || []}
      siblingHubs={siblingHubs}
      backUrlPrefix="knowledge/runtimes"
    />
  );
}
