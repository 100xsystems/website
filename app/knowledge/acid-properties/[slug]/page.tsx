import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSystemTracks, getTrackFlatLessons, getLessonBySlug } from '@/lib/mdx';
import { MarkdownRenderer } from '@/lib/markdown-renderer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug('acid-properties', slug);
  if (!lesson) return { title: 'Not Found' };
  return { title: `${lesson.title} — ACID Properties` };
}

export default async function AcidLessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLessonBySlug('acid-properties', slug);
  if (!lesson) notFound();

  const tracks = getSystemTracks('acid-properties');
  const track = tracks[0];
  const allLessons = track ? getTrackFlatLessons('acid-properties', track.slug) : [];
  const currentIndex = allLessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isQuiz = lesson.lessonType === 'quiz';

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-border bg-surface-secondary">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/knowledge/acid-properties"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors"
          >
            &larr; ACID Properties
          </Link>
          <div className="flex items-center gap-3">
            {lesson.estimatedTime && (
              <span className="text-[9px] text-fg-muted">{lesson.estimatedTime}</span>
            )}
            {lesson.difficulty && (
              <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-accent text-white">
                {lesson.difficulty}
              </span>
            )}
            {isQuiz && (
              <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-accent-yellow text-black">
                Quiz
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Lesson content */}
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-12">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-fg tracking-tight leading-tight mb-8">
          {lesson.title}
        </h1>

        {/* Learning objectives */}
        {lesson.frontmatter?.learning_objectives && (
          <div className="bg-surface-secondary p-6 mb-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-3 block">
              Learning Objectives
            </span>
            <ul className="space-y-1.5">
              {(lesson.frontmatter.learning_objectives as string[]).map((obj: string, i: number) => (
                <li key={i} className="text-sm text-fg-secondary flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main content */}
        <article className="prose max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-fg prose-p:text-fg-secondary prose-a:text-accent prose-a:font-semibold prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:rounded prose-code:bg-surface-secondary prose-code:text-fg prose-pre:bg-surface-secondary prose-pre:border prose-pre:border-border prose-strong:text-fg prose-li:text-fg-secondary prose-hr:border-border [&_code]:before:content-none [&_code]:after:content-none">
          <MarkdownRenderer source={lesson.content} />
        </article>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          {prevLesson ? (
            <Link
              href={`/knowledge/acid-properties/${prevLesson.slug}`}
              className="group flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:-translate-x-0.5 transition-transform">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] text-fg-muted uppercase tracking-wider">Previous</div>
                <div className="text-sm">{prevLesson.title}</div>
              </div>
            </Link>
          ) : <div />}
          {nextLesson ? (
            <Link
              href={`/knowledge/acid-properties/${nextLesson.slug}`}
              className="group flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors text-right"
            >
              <div>
                <div className="text-[9px] text-fg-muted uppercase tracking-wider">Next</div>
                <div className="text-sm">{nextLesson.title}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-0.5 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/knowledge/acid-properties"
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Course complete!
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
