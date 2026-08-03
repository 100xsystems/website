import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubs, countHubResources, refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { getLangIcon, getLangBg } from '@/lib/language-icons';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'AI Courses — Knowledge Base',
  description:
    'Twelve complete AI courses: data science, machine learning, deep learning, computer vision, NLP, generative AI, reinforcement learning, MLOps, LLM engineering, AI agents, prompt engineering and AI safety. Free and open.',
};

export default function AiKnowledgePage() {
  // ISR: re-clone the registry knowledge tree if stale.
  refreshKnowledgeCacheIfStale();
  const hubs = getHubs('ai');
  const totalLessons = hubs.reduce((s, h) => s + (h.lessons?.length ?? 0), 0);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
              KNOWLEDGE BASE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              <span className="text-accent">AI</span> Courses
            </h1>
            <p className="text-sm text-fg-secondary max-w-2xl mx-auto">
              Twelve complete 21-lesson courses across the entire AI landscape — data science,
              machine learning, deep learning, computer vision, NLP, generative AI, reinforcement
              learning, MLOps, LLM engineering, AI agents, prompt engineering and AI safety. Every
              lesson includes objectives, code, references and prerequisites.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{hubs.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Domains</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{totalLessons}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Lessons</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{hubs.reduce((s, h) => s + countHubResources(h), 0)}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Curated Resources</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Course Cards */}
      {hubs.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-sm text-fg-muted">AI courses land here after the next registry sync.</p>
        </section>
      ) : (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hubs.map((hub) => {
                const lessons = hub.lessons?.length ?? 0;
                const resources = countHubResources(hub);
                const icon = getLangIcon(hub.slug);
                return (
                  <Link
                    key={hub.slug}
                    href={`/knowledge/ai/${hub.slug}`}
                    className="group flex flex-col gap-5 p-7 bg-white border border-border hover:border-transparent hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center justify-center w-12 h-12 shrink-0 ${getLangBg(hub.slug)}`}>
                        {icon}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-fg mb-0.5">
                          {hub.name}
                        </h3>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                          {lessons} lessons
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-fg-secondary leading-relaxed line-clamp-3">
                      {hub.description}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                      <span className="px-2 py-1 bg-surface-secondary">Full course</span>
                      <span>{resources} curated resources</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
