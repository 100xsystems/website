import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';
import { getHub } from '@/lib/knowledge-resources';
import { MarkdownRenderer } from '@/lib/markdown-renderer';

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

function loadLessonMarkdown(hubSlug: string, lessonSlug: string): string | null {
  const filePath = path.resolve(
    process.cwd(),
    'public', 'knowledge-cache', 'patterns', hubSlug, `${lessonSlug}.md`
  );
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
  } catch {}
  return null;
}

function parseLessonContent(raw: string): { content: string; frontmatter: Record<string, any> } {
  try {
    const { data, content } = matter(raw);
    return { content, frontmatter: data };
  } catch {
    return { content: raw, frontmatter: {} };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const hub = getHub('patterns', slug);
  if (!hub) return { title: 'Not Found' };
  const lesson = hub.lessons?.find((l) => l.slug === lessonSlug);
  return { title: `${lesson?.title || lessonSlug} — ${hub.name}` };
}

export default async function PatternLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const hub = getHub('patterns', slug);
  if (!hub) notFound();

  const lesson = hub.lessons?.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const raw = loadLessonMarkdown(slug, lessonSlug);
  const { content, frontmatter } = raw ? parseLessonContent(raw) : { content: '', frontmatter: {} };

  const lessons = hub.lessons || [];
  const currentIndex = lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const isQuiz = lesson.type === 'quiz';

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-border bg-surface-secondary">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href={`/knowledge/patterns/${slug}`}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors"
          >
            &larr; {hub.name}
          </Link>
          <div className="flex items-center gap-3">
            {lesson.duration && <span className="text-[9px] text-fg-muted">{lesson.duration}</span>}
            {lesson.difficulty && (
              <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-accent text-white">{lesson.difficulty}</span>
            )}
            {isQuiz && <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-accent-yellow text-black">Quiz</span>}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-12">
        {raw ? (
          <>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-fg tracking-tight leading-tight mb-8">{lesson.title}</h1>

            {frontmatter.learning_objectives && (
              <div className="bg-surface-secondary p-6 mb-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-3 block">Learning Objectives</span>
                <ul className="space-y-1.5">
                  {(frontmatter.learning_objectives as string[]).map((obj: string, i: number) => (
                    <li key={i} className="text-sm text-fg-secondary flex items-start gap-2">
                      <span className="text-accent mt-0.5">→</span>{obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <article className="prose max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-fg prose-p:text-fg-secondary prose-a:text-accent prose-a:font-semibold prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:rounded prose-code:bg-surface-secondary prose-code:text-fg prose-pre:bg-surface-secondary prose-pre:border prose-pre:border-border prose-strong:text-fg prose-li:text-fg-secondary prose-hr:border-border [&_code]:before:content-none [&_code]:after:content-none">
              <MarkdownRenderer source={content} />
            </article>
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-sm text-fg-muted">Lesson content is being prepared. Check back after the next registry sync.</p>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          {prevLesson ? (
            <Link href={`/knowledge/patterns/${slug}/${prevLesson.slug}`} className="group flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
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
            <Link href={`/knowledge/patterns/${slug}/${nextLesson.slug}`} className="group flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors text-right">
              <div>
                <div className="text-[9px] text-fg-muted uppercase tracking-wider">Next</div>
                <div className="text-sm">{nextLesson.title}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-0.5 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          ) : (
            <Link href={`/knowledge/patterns/${slug}`} className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Complete!
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
