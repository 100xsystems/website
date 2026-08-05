import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cn } from '@/application/lib/utils';
import { FaBook, FaFileAlt, FaLaptopCode, FaPlay, FaTerminal, FaSearch, FaNewspaper, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { getLanguageMeta, getHandcraftedSystems } from '@/lib/mdx';
import { getLanguageResources, getLanguagesWithResources, refreshLanguageResourcesIfStale } from '@/lib/language-resources';
import { getLangIcon, getLangBg, getLangHero } from '@/lib/language-icons';
import { classifyCourse, courseStatusMeta } from '@/lib/course-status';

interface Props {
  params: Promise<{ slug: string }>;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  book: <FaBook size={14} />,
  docs: <FaFileAlt size={14} />,
  code: <FaLaptopCode size={14} />,
  video: <FaPlay size={14} />,
  terminal: <FaTerminal size={14} />,
  reference: <FaSearch size={14} />,
  news: <FaNewspaper size={14} />,
  community: <FaUsers size={14} />,
};

const CATEGORY_BG: Record<string, string> = {
  book: 'bg-amber-50 text-amber-600',
  docs: 'bg-blue-50 text-blue-600',
  code: 'bg-emerald-50 text-emerald-600',
  video: 'bg-rose-50 text-rose-600',
  terminal: 'bg-violet-50 text-violet-600',
  reference: 'bg-cyan-50 text-cyan-600',
  news: 'bg-orange-50 text-orange-600',
  community: 'bg-indigo-50 text-indigo-600',
};

// Slugs with brand icons in language-icons.tsx — render even if registry
// data is momentarily missing (e.g. before the first cache clone).
const KNOWN_SLUGS = new Set([
  'javascript', 'python', 'typescript', 'java', 'cpp',
  'kotlin', 'swift', 'ruby', 'php', 'csharp', 'go', 'rust',
  'scala', 'r', 'dart', 'elixir', 'haskell', 'lua', 'shell',
  'c', 'matlab', 'julia', 'perl', 'fortran', 'groovy',
  'clojure', 'erlang', 'assembly', 'cobol',
  'ocaml', 'fsharp', 'crystal', 'nim', 'zig', 'v', 'd',
  'racket', 'scheme', 'prolog',
  'sql', 'elm', 'graphql', 'gleam', 'solidity', 'webassembly',
  'ada', 'haxe', 'terraform', 'markdown',
  'latex', 'common-lisp', 'processing', 'scratch', 'wolfram-language',
  'gdscript', 'labview', 'autohotkey', 'json', 'toml',
  'purescript', 'sass', 'less', 'pug', 'jinja',
  'nix', 'docker', 'kubernetes', 'ansible', 'llvm',
  'react', 'vue', 'angular', 'svelte', 'nodejs',
  'express', 'flutter', 'linux', 'postgresql', 'redis',
  'spring', 'django', 'laravel', 'nextjs', 'tailwind',
  'bootstrap', 'nginx', 'mongodb', 'elasticsearch', 'mysql',
  'grafana', 'prometheus', 'kafka', 'rabbitmq', 'airflow',
  'sqlite', 'jenkins', 'gitlab', 'github-actions', 'neovim',
  'astro',
  'bun', 'deno', 'nestjs', 'remix', 'fastify',
  'hono', 'selenium', 'cypress', 'vitest', 'jest',
  'vite', 'prisma', 'socketio', 'threejs', 'chartjs',
  'eslint', 'prettier', 'webpack', 'electron', 'expo',
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLanguageMeta(slug);
  const resources = getLanguageResources(slug);
  const title = lang?.title || resources?.name || slug;
  return { title: `${title} — Knowledge Base` };
}

export default async function LanguageDetailPage({ params }: Props) {
  const { slug } = await params;
  // ISR: ensure lesson + resource data is fresh on every revalidation.
  refreshLanguageResourcesIfStale();
  const lang = getLanguageMeta(slug);
  const resources = getLanguageResources(slug);

  // Don't 404 if we have curated resources OR if it's a known slug
  // Only 404 if we have neither curriculum data nor resource data
  if (!lang && !resources && !KNOWN_SLUGS.has(slug)) {
    notFound();
  }

  const displayName = lang?.title || resources?.name || slug;
  const hero = getLangHero(slug);
  const status = classifyCourse(resources?.lessons);
  const statusMeta = courseStatusMeta(status);

  const relatedSystems = getHandcraftedSystems().filter(
    (s) => s.tags && s.tags.some(t => t.toLowerCase().includes(slug.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Brand Banner */}
      <div className={cn('relative py-16 px-6 lg:px-12', hero.bg)}>
        <div className="max-w-[1200px] mx-auto">
          <Link href="/knowledge/languages" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors mb-8">
            &larr; Languages
          </Link>
          <div className="flex flex-wrap items-center gap-6">
            <span className={cn('inline-flex items-center justify-center w-16 h-16', hero.iconBg)}>
              {getLangIcon(slug, 28) || (
                <span className="text-lg font-bold">{displayName.charAt(0)}</span>
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-none">
                  {displayName}
                </h1>
                <span className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest', statusMeta.className)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', statusMeta.dot)} />
                  {status === 'complete'
                    ? `Full course · ${resources?.lessons?.length ?? 0} lessons`
                    : status === 'in-progress'
                      ? `Course in progress · ${resources?.lessons?.length ?? 0} lessons`
                      : 'Curated resources hub'}
                </span>
              </div>
              {resources?.description && (
                <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                  {resources.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">

        {/* Knowledge Course / Lessons — BEFORE curated resources */}
        {resources?.lessons && resources.lessons.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white">
                <FaGraduationCap size={12} className="mr-2" />
                Knowledge Course
              </span>
            </div>
            <div className="space-y-1">
              {resources.lessons.map((lesson, index) => (
                <Link
                  key={lesson.slug}
                  href={`/knowledge/languages/${slug}/${lesson.slug}`}
                  className="group flex items-center gap-5 px-6 py-5 transition-all duration-200 bg-white hover:bg-accent border border-border hover:border-accent"
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
                    {lesson.prerequisites && lesson.prerequisites.length > 0 && (
                      <span className="hidden sm:inline-block text-[9px] font-semibold uppercase tracking-wider text-fg-muted group-hover:text-white/60 transition-colors">
                        {lesson.prerequisites.length} prereq
                      </span>
                    )}
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

        {/* Curated Resources Grid — borderless (skipped when a hub has no curated categories, e.g. bash) */}
        {resources && (resources.categories?.length ?? 0) > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent">
                Curated Resources
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.categories.map((category) => (
                <div key={category.label} className="bg-surface-secondary p-6 transition-all duration-200 hover:bg-accent group">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={cn(
                      'inline-flex items-center justify-center w-8 h-8',
                      CATEGORY_BG[category.icon] || 'bg-neutral-100 text-neutral-600',
                    )}>
                      {CATEGORY_ICONS[category.icon] || <FaBook size={14} />}
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
          </section>
        )}

        {/* Curriculum / Chapters — borderless */}
        {lang && (
          <section className="mb-16 max-w-[900px]">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
                Curriculum
              </span>
            </div>

            {lang.chapters.length === 0 ? (
              <p className="text-sm text-fg-muted">
                {resources
                  ? 'A structured curriculum path is being developed for this language. The curated resources above will keep you learning in the meantime.'
                  : 'Curriculum chapters are coming soon for this language.'}
              </p>
            ) : (
              <div className="space-y-px">
                {lang.chapters.map((chapter, idx) => (
                  <Link
                    key={chapter.slug}
                    href={`/knowledge/languages/${slug}/${chapter.slug}`}
                    className="flex items-center gap-4 px-5 py-4 transition-all duration-200 bg-white hover:bg-accent group"
                  >
                    <span className="flex items-center justify-center w-7 h-7 text-[10px] font-bold shrink-0 bg-accent/10 text-accent group-hover:bg-white/20 group-hover:text-white transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-fg group-hover:text-white transition-colors flex-1">
                      {chapter.title}
                    </span>
                    <span className="text-xs text-fg-muted group-hover:text-white/60 transition-colors">&rarr;</span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Related Systems — borderless */}
        {relatedSystems.length > 0 && (
          <section className="max-w-[900px]">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
                Systems &amp; Tracks
              </span>
            </div>
            <div className="space-y-px">
              {relatedSystems.map((system) => (
                <Link
                  key={system.slug}
                  href={`/systems/${system.slug}`}
                  className="flex items-center gap-4 px-5 py-4 transition-all duration-200 bg-white hover:bg-accent group"
                >
                  <span className="text-sm font-semibold text-fg group-hover:text-white transition-colors flex-1 uppercase tracking-wide">
                    {system.title}
                  </span>
                  <span className="text-xs text-fg-muted group-hover:text-white/60 transition-colors">&rarr;</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
