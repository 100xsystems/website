import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getKnowledgeItem, getKnowledgeItems } from '@/lib/mdx';
import { refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { KnowledgeItemDetail } from '../../principles/KnowledgeItemDetail';
import type { LessonMeta } from '@/lib/knowledge-resources';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const item = getKnowledgeItem('tools', slug);
  if (!item) return { title: 'Not Found' };
  return { title: `${item.title} - Tools` };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  refreshKnowledgeCacheIfStale();
  const item = getKnowledgeItem('tools', slug);
  if (!item) notFound();

  const sidebarItems = getKnowledgeItems('tools');

  // Extract lessons from frontmatter (tools use a different data format)
  const lessons = (item.frontmatter as Record<string, unknown>)?.lessons as LessonMeta[] | undefined;

  return (
    <>
      {lessons && lessons.length > 0 && (
        <div className="relative z-50 bg-accent py-10 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white">
                Knowledge Course
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {lessons.map((lesson, i) => (
                <Link
                  key={lesson.slug}
                  href={`/knowledge/tools/${slug}/${lesson.slug}`}
                  className="group flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 transition-all duration-200"
                >
                  <span className="text-[10px] font-bold text-white/60 group-hover:text-white/80 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold text-white transition-colors">
                    {lesson.title}
                  </span>
                  <span className="text-[9px] font-bold text-white/60 group-hover:text-white/80 transition-colors">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <KnowledgeItemDetail
        item={item}
        domain="tools"
        sidebarItems={sidebarItems}
      />
    </>
  );
}