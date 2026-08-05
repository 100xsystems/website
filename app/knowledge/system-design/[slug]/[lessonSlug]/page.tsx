import { notFound } from 'next/navigation';
import { getHub, getHubs } from '@/lib/knowledge-resources';
import { buildLessonMetadata } from '@/lib/lesson-metadata';
import { KnowledgeLessonPageWithProvider } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  return getHubs('system-design').flatMap((hub) =>
    (hub.lessons ?? []).map((lesson) => ({ slug: hub.slug, lessonSlug: lesson.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('system-design', slug);
  if (!hub) return { title: 'Not Found' };
  return buildLessonMetadata(hub.name, lessonSlug, hub.lessons);
}

export default async function SystemDesignLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('system-design', slug);
  if (!hub) notFound();
  const siblingHubs = getHubs('system-design')
    .filter((h) => h.slug !== slug)
    .map((h) => ({ slug: h.slug, lessons: h.lessons || [] }));
  return (
    <KnowledgeLessonPageWithProvider
      category="system-design"
      hubName={hub.name}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={hub.lessons || []}
      siblingHubs={siblingHubs}
      backUrlPrefix="knowledge/system-design"
    />
  );
}
