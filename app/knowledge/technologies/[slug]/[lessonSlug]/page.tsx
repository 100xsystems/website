import { notFound } from 'next/navigation';
import { getHub } from '@/lib/knowledge-resources';
import { buildLessonMetadata, KnowledgeLessonPageWithProvider } from '@/components/knowledge-lesson-page';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

const TECH_CATEGORIES = ['frameworks', 'infrastructure', 'databases', 'data-formats', 'runtimes'] as const;

function findHub(slug: string): { hub: NonNullable<ReturnType<typeof getHub>>; category: string } | null {
  for (const cat of TECH_CATEGORIES) {
    const hub = getHub(cat, slug);
    if (hub) return { hub, category: cat };
  }
  return null;
}

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const found = findHub(slug);
  if (!found) return { title: 'Not Found' };
  return buildLessonMetadata(found.hub.name, lessonSlug, found.hub.lessons);
}

export default async function TechnologyLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const found = findHub(slug);
  if (!found) notFound();
  return (
    <KnowledgeLessonPageWithProvider
      category={found.category}
      hubName={found.hub.name}
      hubSlug={slug}
      lessonSlug={lessonSlug}
      lessons={found.hub.lessons || []}
      backUrlPrefix="knowledge/technologies"
    />
  );
}
