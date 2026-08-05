import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubs, countHubResources, refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { getLangIcon, getLangBg } from '@/lib/language-icons';

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
      <section className="py-12 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-8 sm:mb-12">
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
          <div className="flex justify-center gap-6 sm:gap-10">
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

      {/* AI Course Cards — borderless, inverted hover */}
      {hubs.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-sm text-fg-muted">AI courses land here after the next registry sync.</p>
        </section>
      ) : (
        <section className="py-10 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex gap-2 overflow-x-auto bg-surface-secondary -mx-6 px-6 pb-2 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:gap-1 lg:grid-cols-3 sm:overflow-visible sm:snap-none">
              {hubs.map((hub) => {
                const lessons = hub.lessons?.length ?? 0;
                const resources = countHubResources(hub);
                const icon = getLangIcon(hub.slug);
                return (
                  <Link
                    key={hub.slug}
                    href={`/knowledge/ai/${hub.slug}`}
                    className="group flex flex-col justify-between gap-6 p-8 bg-white transition-colors duration-200 hover:bg-accent shrink-0 w-[82vw] snap-start sm:w-auto"
                  >
                    <div className="flex items-start gap-5">
                      <span className={`inline-flex items-center justify-center w-14 h-14 shrink-0 transition-colors duration-200 ${getLangBg(hub.slug)}`}>
                        {icon}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-extrabold uppercase tracking-wide text-fg group-hover:text-white transition-colors duration-200 leading-tight">
                          {hub.name}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors duration-200">
                          {lessons} lessons
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-fg-secondary leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors duration-200">
                      {hub.description}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-fg-muted group-hover:text-white/70 transition-colors duration-200">
                      <span className="px-2 py-1 bg-surface-secondary text-fg-secondary group-hover:bg-white/20 group-hover:text-white transition-colors duration-200">
                        Full course
                      </span>
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
