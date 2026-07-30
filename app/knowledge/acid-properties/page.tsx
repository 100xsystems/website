import type { Metadata } from 'next';
import Link from 'next/link';
import { getSystemMeta, getSystemTracks, getTrackFlatLessons } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'ACID Properties — Knowledge Course',
  description: 'Master the four pillars of reliable database transactions: Atomicity, Consistency, Isolation, and Durability.',
};

export default function AcidCoursePage() {
  const system = getSystemMeta('acid-properties');
  const tracks = getSystemTracks('acid-properties');
  const track = tracks[0];
  const lessons = track ? getTrackFlatLessons('acid-properties', track.slug) : [];

  if (!system || !track) {
    return (
      <main className="min-h-screen bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-fg mb-4">Course Not Found</h1>
          <p className="text-sm text-fg-muted">The ACID Properties course has not been synced yet. Run the curriculum sync first.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-accent/5 to-accent/20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors mb-8"
          >
            &larr; Knowledge Base
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
              KNOWLEDGE COURSE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              {system.title}
            </h1>
            <p className="text-base sm:text-lg text-fg-secondary leading-relaxed max-w-2xl mb-6">
              {system.description}
            </p>

            <div className="flex flex-wrap gap-6">
              <div>
                <span className="block text-2xl font-extrabold text-fg">{lessons.length}</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Lessons</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-fg">{system.difficulty}</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Difficulty</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-fg">{track.language}</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Language</span>
              </div>
            </div>

            {/* Prerequisites */}
            {system.tags && system.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">Prerequisites:</span>
                {system.tags.slice(0, 4).map((tag) => (
                  <Link
                    key={tag}
                    href={`/discover/knowledge?q=${encodeURIComponent(tag.toLowerCase())}`}
                    className="px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {track.title}
            </span>
          </div>

          <div className="space-y-1">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.slug}
                href={`/knowledge/acid-properties/${lesson.slug}`}
                className="group flex items-center gap-5 px-6 py-5 transition-all duration-200 bg-white hover:bg-accent"
              >
                <span className="flex items-center justify-center w-10 h-10 text-xs font-bold bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors">
                    {lesson.title}
                  </h3>
                  {lesson.lessonType && lesson.lessonType !== 'lesson' && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-accent-yellow group-hover:text-white/70 transition-colors">
                      {lesson.lessonType}
                    </span>
                  )}
                  {lesson.estimatedTime && (
                    <span className="ml-3 text-[9px] text-fg-muted group-hover:text-white/50 transition-colors">
                      {lesson.estimatedTime}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors shrink-0 opacity-0 group-hover:opacity-100">
                  Start &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Refs */}
      <section className="py-12 bg-surface-secondary">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">Related Knowledge</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/knowledge/principles/acid" className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider bg-white text-fg-muted hover:bg-accent hover:text-white transition-colors">
              ACID Principle
            </Link>
            <Link href="/knowledge/patterns/mvcc-pattern" className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider bg-white text-fg-muted hover:bg-accent hover:text-white transition-colors">
              MVCC Pattern
            </Link>
            <Link href="/knowledge/patterns/optimistic-locking" className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider bg-white text-fg-muted hover:bg-accent hover:text-white transition-colors">
              Optimistic Locking
            </Link>
            <Link href="/knowledge/patterns/pessimistic-locking" className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider bg-white text-fg-muted hover:bg-accent hover:text-white transition-colors">
              Pessimistic Locking
            </Link>
            <Link href="/knowledge/principles/cap-theorem" className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider bg-white text-fg-muted hover:bg-accent hover:text-white transition-colors">
              CAP Theorem
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
