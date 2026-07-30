import { notFound } from 'next/navigation';
import { getLanguageResources } from '@/lib/language-resources';
import { buildLessonMetadata, KnowledgeLessonPage } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const lang = getLanguageResources(slug);
  if (!lang) return { title: 'Not Found' };
  return buildLessonMetadata(lang.name, lessonSlug, lang.lessons);
}

export default async function LanguageLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const lang = getLanguageResources(slug);
  if (!lang) notFound();
  return (
    <KnowledgeLessonPage
      category="languages"
      hubName={lang.name}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={lang.lessons || []}
      backUrl={`/knowledge/languages/${slug}`}
    />
  );
}
