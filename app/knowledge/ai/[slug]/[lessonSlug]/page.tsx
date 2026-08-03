import { notFound } from 'next/navigation';
import { getHub, getHubs } from '@/lib/knowledge-resources';
import { buildLessonMetadata } from '@/lib/lesson-metadata';
import { KnowledgeLessonPageWithProvider } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('ai', slug);
  if (!hub) return { title: 'Not Found' };
  return buildLessonMetadata(hub.name, lessonSlug, hub.lessons);
}

export default async function AiLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('ai', slug);
  if (!hub) notFound();
  // Pass every other AI course's lessons so prerequisites can link across courses
  // (e.g. "GENAI-01: What Is Generative AI?" referenced inside LLM Engineering).
  const siblingHubs = getHubs('ai')
    .filter((h) => h.slug !== slug)
    .map((h) => ({ slug: h.slug, lessons: h.lessons || [] }));
  return (
    <KnowledgeLessonPageWithProvider
      category="ai"
      hubName={hub.name}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={hub.lessons || []}
      siblingHubs={siblingHubs}
      backUrlPrefix="knowledge/ai"
    />
  );
}
