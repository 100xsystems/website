import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { getLanguageMeta, getHandcraftedSystems } from '@/lib/mdx';
import { getLanguageResources } from '@/lib/language-resources';

interface Props {
  params: Promise<{ slug: string }>;
}

const ICONS: Record<string, string> = {
  book: '📖',
  docs: '📋',
  code: '💻',
  video: '🎥',
  terminal: '⚡',
  reference: '🔍',
  news: '📰',
  community: '👥',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) return { title: 'Language Not Found' };

  return {
    title: `${lang.title} - Languages`,
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
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1100px] mx-auto">
        {/* Back link */}
        <div className="mb-8">
          <a href="/languages" className="text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors">
            &larr; Languages
          </a>
        </div>

        {/* Language Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-fg">
            {lang.title}
          </h1>
          {resources && (
            <p className="text-base text-fg-secondary leading-relaxed max-w-2xl mb-4">
              {resources.description}
            </p>
          )}
          {!resources && (
            <p className="text-sm text-fg-secondary">
              {lang.chapters.length} chapters
            </p>
          )}
        </div>

        {/* Curated Resources (if available) */}
        {resources && (
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.categories.map((category) => (
                <div key={category.label} className="border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">{ICONS[category.icon] || '📌'}</span>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-fg-muted">
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
                        className="group block"
                      >
                        <div className="flex items-start gap-2">
                          <h3 className="text-sm font-semibold text-fg group-hover:text-accent transition-colors leading-snug flex-1">
                            {item.title}
                          </h3>
                          <ExternalLink className="h-3 w-3 text-fg-muted/40 group-hover:text-accent shrink-0 mt-0.5" />
                        </div>
                        <p className="text-xs text-fg-secondary/70 leading-relaxed mt-1 line-clamp-2">
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

        {/* Chapters (if available) */}
        <div className="mb-12 max-w-[900px]">
          <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-6">
            Curriculum
          </p>

          {lang.chapters.length === 0 ? (
            <p className="text-sm text-fg-muted">
              {resources ? 'A structured curriculum is being curated. In the meantime, explore the resources above.' : 'Chapters coming soon.'}
            </p>
          ) : (
            <div className="space-y-px">
              {lang.chapters.map((chapter, idx) => (
                <Link
                  key={chapter.slug}
                  href={`/languages/${slug}/${chapter.slug}`}
                  className="flex items-center gap-4 px-4 py-3 transition-all duration-200 hover:bg-accent/5 group"
                >
                  <span className="flex items-center justify-center w-8 h-8 text-xs font-bold text-accent shrink-0 border border-accent/20">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                    {chapter.title}
                  </h3>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 text-fg-muted opacity-50 group-hover:text-accent group-hover:opacity-100 transition-all">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Systems */}
        {relatedSystems.length > 0 && (
          <div className="max-w-[900px]">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-6">
              Systems You Can Build with {lang.title}
            </p>
            <div className="space-y-px">
              {relatedSystems.map((system) => (
                <Link
                  key={system.slug}
                  href={`/systems/${system.slug}`}
                  className="flex items-center gap-4 px-4 py-3 transition-all duration-200 hover:bg-accent/5 group"
                >
                  <span className="text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                    {system.title}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 text-fg-muted opacity-0 group-hover:text-accent group-hover:opacity-100 transition-all">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
