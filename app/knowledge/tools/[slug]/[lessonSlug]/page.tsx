import { notFound } from 'next/navigation';
import { getKnowledgeItem } from '@/lib/mdx';
import type { LessonMeta } from '@/lib/knowledge-resources';
import { buildLessonMetadata } from '@/lib/lesson-metadata';
import { KnowledgeLessonPageWithProvider } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const item = getKnowledgeItem('tools', slug);
  if (!item) return { title: 'Not Found' };
  const lessons = (item.frontmatter as Record<string, unknown>)?.lessons as LessonMeta[] | undefined;
  return buildLessonMetadata(item.title, lessonSlug, lessons);
}

export default async function ToolLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const item = getKnowledgeItem('tools', slug);
  if (!item) notFound();
  const lessons = (item.frontmatter as Record<string, unknown>)?.lessons as LessonMeta[] | undefined;
  if (!lessons) notFound();
  return (
    <KnowledgeLessonPageWithProvider
      category="tools"
      hubName={item.title}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={lessons}
      backUrlPrefix="knowledge/tools"
    />
  );
}
