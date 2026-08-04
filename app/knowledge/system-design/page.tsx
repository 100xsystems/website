import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubs, refreshKnowledgeCacheIfStale, type ResourceHub } from '@/lib/knowledge-resources';
import { cn } from '@/application/lib/utils';
import {
  FaLayerGroup,
  FaCubes,
  FaProjectDiagram,
  FaClipboardCheck,
} from 'react-icons/fa';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'System Design — Knowledge Base',
  description:
    'A structured curriculum for mastering distributed system architecture — fundamentals, building blocks, patterns, and interview prep.',
};

const MODULE_ICONS: Record<string, React.ReactNode> = {
  fundamentals: <FaLayerGroup size={26} />,
  'building-blocks': <FaCubes size={26} />,
  patterns: <FaProjectDiagram size={26} />,
  interview: <FaClipboardCheck size={26} />,
};

const MODULE_CHIPS: Record<string, string> = {
  fundamentals: 'bg-indigo-100 text-indigo-700',
  'building-blocks': 'bg-sky-100 text-sky-700',
  patterns: 'bg-purple-100 text-purple-700',
  interview: 'bg-amber-100 text-amber-700',
};

export default function SystemDesignPage() {
  // ISR: re-clone the registry knowledge tree if stale.
  refreshKnowledgeCacheIfStale();
  const hubs = getHubs('system-design');

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
              System <span className="text-accent">Design</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-2xl mx-auto">
              A structured curriculum for mastering distributed system architecture — from core
              fundamentals and building blocks to proven patterns and interview preparation.
              Grounded in real-world case studies.
            </p>
          </div>

          <div className="flex justify-center gap-10">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{hubs.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Modules</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{totalLessons}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Lessons</span>
            </div>
          </div>
        </div>
      </section>

      {/* Module cards — big borderless cards with inverted hover */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {hubs.length === 0 ? (
            <div className="bg-surface-secondary p-14 text-center">
              <p className="text-sm text-fg-muted">System Design modules land here after the next registry sync.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1 bg-surface-secondary sm:grid-cols-2 lg:grid-cols-3">
              {hubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={`/knowledge/system-design/${hub.slug}`}
                  className="group flex flex-col items-start gap-6 p-7 sm:p-8 bg-white transition-colors duration-200 hover:bg-accent"
                >
                  <div className="flex w-full items-start justify-between gap-4">
                    <span className={cn(
                      'inline-flex h-16 w-16 shrink-0 items-center justify-center transition-colors duration-200',
                      MODULE_CHIPS[hub.slug] ?? 'bg-surface-secondary text-fg-muted',
                      'group-hover:bg-white/20 group-hover:text-white',
                    )}>
                      {MODULE_ICONS[hub.slug] ?? <FaLayerGroup size={26} />}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-surface-secondary text-accent transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold uppercase leading-tight tracking-wide text-fg transition-colors duration-200 group-hover:text-white sm:text-2xl">
                      {hub.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-secondary line-clamp-2 transition-colors duration-200 group-hover:text-white/80">
                      {hub.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-x-5 text-xs font-bold uppercase tracking-wider text-fg-muted transition-colors duration-200 group-hover:text-white/70">
                    <span>{hub.lessons?.length ?? 0} lessons</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
