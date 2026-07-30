/** ═══════════════════════════════════════════════════════════════════════
 *  ResourceHubDetail
 *
 *  A shared detail page component for any resource hub (patterns,
 *  principles, technologies, frameworks, etc.). Shows the hub's
 *  description and all 8 resource categories with clickable links.
 * ═══════════════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import type { ResourceHub } from '@/lib/knowledge-resources';
import {
  FaBook, FaFileAlt, FaLaptopCode, FaPlay, FaTerminal,
  FaSearch, FaNewspaper, FaUsers, FaGraduationCap,
} from 'react-icons/fa';

// ─── Category icons ─────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  book:      <FaBook size={14} />,
  docs:      <FaFileAlt size={14} />,
  code:      <FaLaptopCode size={14} />,
  video:     <FaPlay size={14} />,
  terminal:  <FaTerminal size={14} />,
  reference: <FaSearch size={14} />,
  news:      <FaNewspaper size={14} />,
  community: <FaUsers size={14} />,
};

const CATEGORY_BG: Record<string, string> = {
  book:      'bg-amber-50 text-amber-600',
  docs:      'bg-blue-50 text-blue-600',
  code:      'bg-emerald-50 text-emerald-600',
  video:     'bg-rose-50 text-rose-600',
  terminal:  'bg-violet-50 text-violet-600',
  reference: 'bg-cyan-50 text-cyan-600',
  news:      'bg-orange-50 text-orange-600',
  community: 'bg-indigo-50 text-indigo-600',
};

function getCatIcon(icon: string): React.ReactNode {
  return CATEGORY_ICONS[icon] || <FaBook size={14} />;
}

function getCatBg(icon: string): string {
  return CATEGORY_BG[icon] || 'bg-neutral-100 text-neutral-600';
}

// ─── Component ──────────────────────────────────────────────────────

interface ResourceHubDetailProps {
  hub: ResourceHub;
  backLabel: string;
  backHref: string;
  /** Base path for lesson links (e.g. /knowledge/principles) */
  lessonBasePath?: string;
}

export function ResourceHubDetail({ hub, backLabel, backHref, lessonBasePath }: ResourceHubDetailProps) {
  const hasLessons = hub.lessons && hub.lessons.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative py-16 px-6 lg:px-12 bg-accent">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors mb-8"
          >
            &larr; {backLabel}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-none mb-3">
            {hub.name}
          </h1>
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
            {hub.description}
          </p>

          {/* Lessons badge */}
          {hasLessons && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
              <FaGraduationCap size={12} />
              {hub.lessons!.length} {(hub.lessons![0]?.type === 'quiz' && hub.lessons!.length === 1) ? 'Quiz' : 'Lessons'}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        {/* Lessons Section */}
        {hasLessons && lessonBasePath && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white">
                <FaGraduationCap size={12} className="mr-2" />
                Knowledge Course
              </span>
            </div>

            <div className="space-y-1">
              {hub.lessons!.map((lesson, index) => (
                <Link
                  key={lesson.slug}
                  href={`${lessonBasePath}/${lesson.slug}`}
                  className="group flex items-center gap-5 px-6 py-5 transition-all duration-200 bg-white hover:bg-accent"
                >
                  <span className="flex items-center justify-center w-10 h-10 text-xs font-bold bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/70 transition-colors line-clamp-1 mt-1">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {lesson.type !== 'lesson' && (
                      <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-accent-yellow text-black group-hover:bg-white/20 group-hover:text-white/80 transition-colors">
                        {lesson.type}
                      </span>
                    )}
                    {lesson.duration && (
                      <span className="text-[9px] text-fg-muted group-hover:text-white/50 transition-colors">
                        {lesson.duration}
                      </span>
                    )}
                    <span className="text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors">
                      &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Resource Categories Grid */}
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent">
            Curated Resources
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hub.categories && hub.categories.map((category) => (
            <div
              key={category.label}
              className="bg-surface-secondary p-6 transition-all duration-200 hover:bg-accent group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className={cn(
                  'inline-flex items-center justify-center w-8 h-8',
                  getCatBg(category.icon),
                )}>
                  {getCatIcon(category.icon)}
                </span>
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/70 transition-colors">
                  {category.label}
                </h2>
              </div>

              <div className="space-y-3">
                {category.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group/link"
                  >
                    <h3 className="text-sm font-semibold text-fg group-hover:text-white transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-fg-secondary/70 leading-relaxed mt-1 group-hover:text-white/70 transition-colors line-clamp-2">
                      {item.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
