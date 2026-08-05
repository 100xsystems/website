import { notFound } from 'next/navigation';
import { getHub, getHubs } from '@/lib/knowledge-resources';
import { buildLessonMetadata } from '@/lib/lesson-metadata';
import { KnowledgeLessonPageWithProvider } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  return getHubs('frameworks').flatMap((hub) =>
    (hub.lessons ?? []).map((lesson) => ({ slug: hub.slug, lessonSlug: lesson.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('frameworks', slug);
  if (!hub) return { title: 'Not Found' };
  return buildLessonMetadata(hub.name, lessonSlug, hub.lessons);
}

export default async function FrameworksLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('frameworks', slug);
  if (!hub) notFound();
  const siblingHubs = getHubs('frameworks')
    .filter((h) => h.slug !== slug)
    .map((h) => ({ slug: h.slug, lessons: h.lessons || [] }));
  return (
    <KnowledgeLessonPageWithProvider
      category="frameworks"
      hubName={hub.name}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={hub.lessons || []}
      siblingHubs={siblingHubs}
      backUrlPrefix="knowledge/frameworks"
    />
  );
}
