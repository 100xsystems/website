import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllLanguages } from '@/lib/mdx';
import { getLanguagesWithResources, getLanguageResources, type LanguageResources } from '@/lib/language-resources';

export const metadata: Metadata = {
  title: 'Languages',
};

const ICONS: Record<string, string> = {
  javascript: '🟨',
  python: '🐍',
  typescript: '🔷',
  java: '☕',
  cpp: '⚡',
  kotlin: '🟣',
  swift: '🟠',
  ruby: '💎',
  php: '🐘',
  csharp: '♯',
  go: '🔵',
  rust: '🦀',
};

const DEFAULT_ICON = '📘';

/** Colour-coded accent per language */
const ACCENTS: Record<string, string> = {
  javascript: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  python: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  typescript: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  java: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  cpp: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  kotlin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  swift: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
  ruby: 'bg-red-500/10 text-red-400 border-red-500/20',
  php: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20',
  csharp: 'bg-green-500/10 text-green-400 border-green-500/20',
  go: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  rust: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const DEFAULT_ACCENT = 'bg-accent/10 text-accent border-accent/20';

/** Border colour class per language accent (for the resource category badges) */
function getAccentClass(slug: string): string {
  return ACCENTS[slug] || DEFAULT_ACCENT;
}

/** Total resources across all categories */
function totalResources(lang: LanguageResources): number {
  return lang.categories.reduce((sum, cat) => sum + cat.items.length, 0);
}

/** Category label grouped into short display groups */
const CATEGORY_GROUPS: Record<string, string> = {
  'Free Books': 'Books',
  'Official Documentation': 'Docs',
  'Interactive Courses': 'Courses',
  'Video Courses': 'Video',
  'Practice & Challenges': 'Practice',
  'Reference & Cheatsheets': 'Reference',
  'News & Updates': 'News',
  'Community': 'Community',
};

export default function LanguagesPage() {
  const languages = getAllLanguages();
  const curatedSlugs = getLanguagesWithResources();
  const curatedMap = new Map<string, LanguageResources>();
  for (const slug of curatedSlugs) {
    const res = getLanguageResources(slug);
    if (res) curatedMap.set(slug, res);
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* ─── Hero ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            Languages
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-2xl">
            Curated resource hubs for 12 major programming languages. Each hub collects the
            definitive free resources — books, docs, courses, videos, practice, references,
            news, and community — so you always know where to learn next.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-fg">{curatedSlugs.length}</span>
              <span className="text-sm text-fg-muted">Languages curated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-fg">
                {curatedSlugs.reduce((sum, s) => sum + totalResources(curatedMap.get(s)!), 0)}
              </span>
              <span className="text-sm text-fg-muted">Total resources</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-fg">8</span>
              <span className="text-sm text-fg-muted">Categories per language</span>
            </div>
          </div>
        </div>

        {/* ─── Curated Language Grid ───────────────────────────── */}
        {curatedSlugs.length === 0 ? (
          <p className="text-sm text-fg-muted">Languages coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {curatedSlugs.map((slug) => {
              const resource = curatedMap.get(slug)!;
              const accentClass = getAccentClass(slug);
              const total = totalResources(resource);

              return (
                <Link
                  key={slug}
                  href={`/languages/${slug}`}
                  className="group relative flex flex-col rounded-2xl border border-border p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5"
                >
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl leading-none">{ICONS[slug] || DEFAULT_ICON}</span>
                    <h3 className="text-lg font-bold text-fg group-hover:text-accent transition-colors">
                      {resource.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-fg-secondary leading-relaxed mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Resource count badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resource.categories.map((cat) => (
                      <span
                        key={cat.label}
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${accentClass}`}
                      >
                        {CATEGORY_GROUPS[cat.label] || cat.label}
                      </span>
                    ))}
                  </div>

                  {/* Footer: total + arrow */}
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-fg-muted font-medium">
                      {total} {total === 1 ? 'resource' : 'resources'}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-fg-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ─── Curriculum Languages (without curated resources) ── */}
        {languages.length > 0 && (
          <>
            <div className="mt-20 mb-8">
              <h2 className="text-2xl font-bold text-fg">Curriculum Languages</h2>
              <p className="text-sm text-fg-secondary mt-1">
                Languages with structured tracks and lessons in our curriculum.
              </p>
            </div>
            <div className="space-y-px rounded-xl border border-border overflow-hidden">
              {languages.map((lang) => {
                const isCurated = curatedMap.has(lang.slug);
                return (
                  <Link
                    key={lang.slug}
                    href={`/languages/${lang.slug}`}
                    className="flex items-center gap-4 px-5 py-4 transition-all duration-200 hover:bg-accent/5 group"
                  >
                    <span className="text-lg leading-none">{ICONS[lang.slug] || DEFAULT_ICON}</span>
                    <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors flex-1">
                      {lang.title}
                    </h3>
                    {isCurated && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                        Resources available
                      </span>
                    )}
                    <span className="text-xs text-fg-muted">
                      {lang.chapters.length} {lang.chapters.length === 1 ? 'chapter' : 'chapters'}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 text-fg-muted opacity-0 group-hover:text-accent group-hover:opacity-100 transition-all"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
