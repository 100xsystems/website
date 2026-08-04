'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Check, Compass } from 'lucide-react';
import { cn } from '@/application/lib/utils';
import {
  FaBrain, FaCloud, FaCogs, FaCode, FaDatabase, FaLaptopCode,
  FaLayerGroup, FaMapSigns, FaServer, FaShieldAlt,
} from 'react-icons/fa';
import type { Roadmap } from '@/lib/roadmaps';

interface RoadmapsExplorerProps {
  roadmaps: Roadmap[];
  courseNames: Record<string, string>;
  initialSlug: string | null;
}

const ROADMAP_ICONS: Record<string, React.ReactNode> = {
  FaCode: <FaCode size={30} />,
  FaServer: <FaServer size={30} />,
  FaCogs: <FaCogs size={30} />,
  FaCloud: <FaCloud size={30} />,
  FaLaptopCode: <FaLaptopCode size={30} />,
  FaBrain: <FaBrain size={30} />,
  FaLayerGroup: <FaLayerGroup size={30} />,
  FaShieldAlt: <FaShieldAlt size={30} />,
  FaDatabase: <FaDatabase size={30} />,
};

const STEP_CAT_META: Record<string, { label: string; chip: string }> = {
  languages: { label: 'Language', chip: 'bg-blue-100 text-blue-700' },
  principles: { label: 'Principle', chip: 'bg-amber-100 text-amber-700' },
  patterns: { label: 'Pattern', chip: 'bg-purple-100 text-purple-700' },
  tools: { label: 'Tool', chip: 'bg-emerald-100 text-emerald-700' },
  frameworks: { label: 'Framework', chip: 'bg-teal-100 text-teal-700' },
  databases: { label: 'Database', chip: 'bg-orange-100 text-orange-700' },
  infrastructure: { label: 'Infrastructure', chip: 'bg-sky-100 text-sky-700' },
  runtimes: { label: 'Runtime', chip: 'bg-cyan-100 text-cyan-700' },
  'system-design': { label: 'System Design', chip: 'bg-indigo-100 text-indigo-700' },
  'case-studies': { label: 'Case Study', chip: 'bg-pink-100 text-pink-700' },
  ai: { label: 'AI', chip: 'bg-violet-100 text-violet-700' },
  'data-formats': { label: 'Data Format', chip: 'bg-lime-100 text-lime-700' },
  technologies: { label: 'Technology', chip: 'bg-rose-100 text-rose-700' },
};

function humanizeSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function RoadmapsExplorer({ roadmaps, courseNames, initialSlug }: RoadmapsExplorerProps) {
  const router = useRouter();

  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug);

  const activeRoadmap = useMemo(
    () => (activeSlug ? roadmaps.find((r) => r.slug === activeSlug) ?? null : null),
    [roadmaps, activeSlug],
  );

  const selectRoadmap = (slug: string) => {
    const next = activeSlug === slug ? null : slug;
    setActiveSlug(next);
    const p = new URLSearchParams();
    if (next) p.set('roadmap', next);
    router.replace(`/roadmaps${p.toString() ? `?${p.toString()}` : ''}`, { scroll: false });
  };

  const stepName = (category: string, slug: string): string =>
    courseNames[`${category}/${slug}`] || humanizeSlug(slug);

  return (
    <main className="mx-auto bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-fg-muted">
          <Link href="/" className="font-bold uppercase tracking-wider transition-colors hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span className="font-bold uppercase tracking-wider text-fg">Roadmaps</span>
        </div>

        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 bg-accent px-4 py-2 text-sm font-bold uppercase tracking-widest text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            CAREER ROADMAPS
          </div>
          <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Choose your path.<br />
            <span className="text-accent">One step at a time.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
            {roadmaps.length} role-based roadmaps. Pick a role below and the full
            sequence of courses appears — the path knows what to learn first, so you
            don&apos;t have to guess.
          </p>
        </div>

        {/* ═══ Section 1 — Roadmap selector (the main event) ═══ */}
        <section>
          <div className="mb-8 flex items-center gap-5">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-accent/10 text-accent">
              <Compass size={24} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                Select a role to unlock its sequence
              </p>
              <h2 className="mt-1 text-2xl font-extrabold uppercase tracking-tight text-fg sm:text-3xl">
                Pick your roadmap
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 bg-surface-secondary sm:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((rm) => {
              const isActive = activeSlug === rm.slug;
              return (
                <button
                  key={rm.slug}
                  type="button"
                  onClick={() => selectRoadmap(rm.slug)}
                  aria-pressed={isActive}
                  className={cn(
                    'group flex flex-col items-start justify-between gap-8 p-8 text-left transition-all duration-200 sm:p-10',
                    isActive ? 'bg-accent text-white' : 'bg-white hover:bg-accent',
                  )}
                >
                  <div className="flex w-full items-start justify-between gap-4">
                    <span
                      className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 sm:h-20 sm:w-20"
                      style={isActive ? { backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' } : { backgroundColor: `${rm.color}1A`, color: rm.color }}
                    >
                      {ROADMAP_ICONS[rm.icon] || <FaMapSigns size={30} />}
                    </span>
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-surface-secondary text-accent group-hover:bg-white/20 group-hover:text-white',
                      )}
                    >
                      {isActive ? <Check className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </span>
                  </div>

                  <div className="w-full">
                    <h3
                      className={cn(
                        'text-xl font-extrabold uppercase leading-tight tracking-tight transition-colors duration-200 sm:text-2xl',
                        isActive ? 'text-white' : 'text-fg group-hover:text-white',
                      )}
                    >
                      {rm.name.replace(' Roadmap', '')}
                    </h3>
                    <p
                      className={cn(
                        'mt-3 hidden text-sm leading-relaxed transition-colors duration-200 sm:block',
                        isActive ? 'text-white/80' : 'text-fg-secondary group-hover:text-white/80',
                      )}
                    >
                      {rm.description}
                    </p>
                  </div>

                  <div
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200',
                      isActive ? 'bg-white/20 text-white' : 'bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white',
                    )}
                  >
                    {rm.steps.length} steps
                    <span className={cn('transition-transform duration-200', isActive ? 'translate-x-0.5' : 'group-hover:translate-x-0.5')}>
                      &rarr;
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ═══ Section 2 — Selected roadmap sequence (hidden until a roadmap is picked) ═══ */}
        {activeRoadmap && (
          <section className="mt-20 sm:mt-28">
            <div className="mb-10 border-b-2 border-border pb-8">
              <div className="flex items-center gap-6">
                <span
                  className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-white sm:h-20 sm:w-20"
                  style={{ backgroundColor: activeRoadmap.color }}
                >
                  {ROADMAP_ICONS[activeRoadmap.icon] || <FaMapSigns size={30} />}
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                    {activeRoadmap.steps.length} steps · follow in order
                  </p>
                  <h2 className="mt-1 text-3xl font-extrabold uppercase tracking-tight text-fg sm:text-4xl">
                    {activeRoadmap.name.replace(' Roadmap', '')}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-secondary">
                    {activeRoadmap.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {activeRoadmap.steps.map((step, index) => {
                const catMeta = STEP_CAT_META[step.category] ?? { label: step.category, chip: 'bg-surface-secondary text-fg-muted' };
                return (
                  <Link
                    key={`${step.category}/${step.slug}`}
                    href={`/knowledge/${step.category}/${step.slug}`}
                    className="group flex items-center gap-6 bg-surface-secondary px-8 py-8 transition-all duration-200 hover:bg-accent sm:gap-8 sm:px-10"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-white text-base font-extrabold text-fg-muted transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white sm:h-16 sm:w-16">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-extrabold uppercase tracking-wide text-fg transition-colors duration-200 group-hover:text-white sm:text-lg">
                        {stepName(step.category, step.slug)}
                      </h3>
                      <p className="mt-1 text-sm text-fg-secondary transition-colors duration-200 group-hover:text-white/70">
                        {catMeta.label} course
                      </p>
                    </div>
                    <span className={cn(
                      'hidden shrink-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 sm:inline-block',
                      catMeta.chip,
                      'group-hover:bg-white/20 group-hover:text-white',
                    )}>
                      {catMeta.label}
                    </span>
                    <span className="shrink-0 text-xl font-bold text-accent transition-colors duration-200 group-hover:text-white/70">
                      &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
