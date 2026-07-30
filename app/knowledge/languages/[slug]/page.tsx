import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ExternalLink,
  BookOpen,
  FileText,
  Code2,
  Video,
  Terminal,
  Search,
  Newspaper,
  Users,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { getLanguageMeta, getHandcraftedSystems } from '@/lib/mdx';
import { getLanguageResources } from '@/lib/language-resources';

interface Props {
  params: Promise<{ slug: string }>;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  book: <BookOpen size={16} />,
  docs: <FileText size={16} />,
  code: <Code2 size={16} />,
  video: <Video size={16} />,
  terminal: <Terminal size={16} />,
  reference: <Search size={16} />,
  news: <Newspaper size={16} />,
  community: <Users size={16} />,
};

const CATEGORY_ACCENTS: Record<string, string> = {
  book: 'bg-amber-50 text-amber-600 border-amber-200',
  docs: 'bg-blue-50 text-blue-600 border-blue-200',
  code: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  video: 'bg-rose-50 text-rose-600 border-rose-200',
  terminal: 'bg-violet-50 text-violet-600 border-violet-200',
  reference: 'bg-cyan-50 text-cyan-600 border-cyan-200',
  news: 'bg-orange-50 text-orange-600 border-orange-200',
  community: 'bg-indigo-50 text-indigo-600 border-indigo-200',
};

const DEFAULT_ACCENT = 'bg-neutral-50 text-neutral-600 border-neutral-200';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) return { title: 'Language Not Found' };

  return {
    title: `${lang.title} — Knowledge Base`,
  };
}

export default async function LanguageDetailPage({ params }: Props) {
  const { slug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) notFound();

  const resources = getLanguageResources(slug);

  // Find systems that reference this language in their tags
  const relatedSystems = getHandcraftedSystems().filter(
    (s) => s.tags && s.tags.some(t => t.toLowerCase().includes(slug.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">

        {/* Back link */}
        <Link
          href="/knowledge/languages"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Languages
        </Link>

        {/* ─── Hero ─────────────────────────────────────────────────── */}
        <div className="mb-16 border-b border-border pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-accent/10 text-accent mb-4">
              LANGUAGE
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              {lang.title}
            </h1>
            {resources && (
              <p className="text-sm text-fg-secondary leading-relaxed max-w-2xl">
                {resources.description}
              </p>
            )}
          </div>
        </div>

        {/* ─── Curated Resources Grid ──────────────────────────────── */}
        {resources && (
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.categories.map((category) => {
                const accentClass = CATEGORY_ACCENTS[category.icon] || DEFAULT_ACCENT;
                return (
                  <div key={category.label} className="border border-border p-6 transition-all duration-200 hover:border-accent/30">
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className={cn(
                        'inline-flex items-center justify-center w-8 h-8 border',
                        accentClass,
                      )}>
                        {CATEGORY_ICONS[category.icon] || <BookOpen size={16} />}
                      </span>
                      <h2 className="text-[11px] font-bold uppercase tracking-widest text-fg-muted">
                        {category.label}
                      </h2>
                      <span className="ml-auto text-[10px] text-fg-muted/50 font-mono">
                        {category.items.length}
                      </span>
                    </div>

                    {/* Resource items */}
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <a
                          key={item.title}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded p-2 -mx-2 hover:bg-accent/5 transition-colors"
                        >
                          <div className="flex items-start gap-2">
                            <h3 className="text-sm font-semibold text-fg group-hover:text-accent transition-colors leading-snug flex-1">
                              {item.title}
                            </h3>
                            <ExternalLink size={12} className="text-fg-muted/30 group-hover:text-accent shrink-0 mt-1 transition-colors" />
                          </div>
                          <p className="text-xs text-fg-secondary/70 leading-relaxed mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── Curriculum / Chapters ───────────────────────────────── */}
        <section className="mb-16 max-w-[900px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
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
            <div className="border border-border divide-y divide-border">
              {lang.chapters.map((chapter, idx) => (
                <Link
                  key={chapter.slug}
                  href={`/knowledge/languages/${slug}/${chapter.slug}`}
                  className="flex items-center gap-4 px-5 py-4 transition-all duration-200 hover:bg-accent/5 group"
                >
                  <span className="flex items-center justify-center w-7 h-7 text-[10px] font-bold text-accent shrink-0 border border-accent/20 bg-accent/5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold text-fg group-hover:text-accent transition-colors flex-1">
                    {chapter.title}
                  </span>
                  <ArrowRight size={14} className="text-fg-muted opacity-0 group-hover:text-accent group-hover:opacity-100 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ─── Related Systems ─────────────────────────────────────── */}
        {relatedSystems.length > 0 && (
          <section className="max-w-[900px]">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Systems &amp; Tracks
              </span>
            </div>
            <div className="border border-border divide-y divide-border">
              {relatedSystems.map((system) => (
                <Link
                  key={system.slug}
                  href={`/systems/${system.slug}`}
                  className="flex items-center gap-4 px-5 py-4 transition-all duration-200 hover:bg-accent/5 group"
                >
                  <span className="text-sm font-semibold text-fg group-hover:text-accent transition-colors flex-1 uppercase tracking-wide">
                    {system.title}
                  </span>
                  <ArrowRight size={14} className="text-fg-muted opacity-0 group-hover:text-accent group-hover:opacity-100 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
