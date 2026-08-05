import { notFound } from 'next/navigation';
import { getHub, getHubs } from '@/lib/knowledge-resources';
import { buildLessonMetadata } from '@/lib/lesson-metadata';
import { KnowledgeLessonPageWithProvider } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  return getHubs('data-formats').flatMap((hub) =>
    (hub.lessons ?? []).map((lesson) => ({ slug: hub.slug, lessonSlug: lesson.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('data-formats', slug);
  if (!hub) return { title: 'Not Found' };
  return buildLessonMetadata(hub.name, lessonSlug, hub.lessons);
}

export default async function DataFormatsLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('data-formats', slug);
  if (!hub) notFound();
  const siblingHubs = getHubs('data-formats')
    .filter((h) => h.slug !== slug)
    .map((h) => ({ slug: h.slug, lessons: h.lessons || [] }));
  return (
    <KnowledgeLessonPageWithProvider
      category="data-formats"
      hubName={hub.name}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={hub.lessons || []}
      siblingHubs={siblingHubs}
      backUrlPrefix="knowledge/data-formats"
    />
  );
}
