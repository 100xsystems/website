import { notFound } from 'next/navigation';
import { getHub, getHubs } from '@/lib/knowledge-resources';
import { buildLessonMetadata } from '@/lib/lesson-metadata';
import { KnowledgeLessonPageWithProvider } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  return getHubs('case-studies').flatMap((hub) =>
    (hub.lessons ?? []).map((lesson) => ({ slug: hub.slug, lessonSlug: lesson.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('case-studies', slug);
  if (!hub) return { title: 'Not Found' };
  return buildLessonMetadata(hub.name, lessonSlug, hub.lessons);
}

export default async function CaseStudyLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('case-studies', slug);
  if (!hub) notFound();
  return (
    <KnowledgeLessonPageWithProvider
      category="case-studies"
      hubName={hub.name}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={hub.lessons || []}
      backUrlPrefix="knowledge/case-studies"
    />
  );
}
