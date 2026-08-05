import type { Metadata } from 'next';
import Link from 'next/link';
import { cn } from '@/application/lib/utils';
import { getLanguagesWithResources, getLanguageResources, refreshLanguageResourcesIfStale, type LanguageResources } from '@/lib/language-resources';
import { getLangIcon, getLangBg } from '@/lib/language-icons';
import { classifyCourse, courseStatusMeta } from '@/lib/course-status';

export const metadata: Metadata = {
  title: 'Languages — Knowledge Base',
};

function totalResources(lang: LanguageResources): number {
  if (!lang.categories) return 0;
  return lang.categories.reduce((sum, cat) => sum + (cat.items?.length ?? 0), 0);
}

export default function LanguagesPage() {
  // ISR: re-clone the registry if stale so course status + lessons refresh.
  refreshLanguageResourcesIfStale();

  const curatedSlugs = getLanguagesWithResources();
  const curatedMap = new Map<string, LanguageResources>();
  for (const slug of curatedSlugs) {
    const res = getLanguageResources(slug);
    if (res) curatedMap.set(slug, res);
  }

  const complete = curatedSlugs.filter((s) => classifyCourse(curatedMap.get(s)?.lessons) === 'complete').length;
  const inProgress = curatedSlugs.filter((s) => classifyCourse(curatedMap.get(s)?.lessons) === 'in-progress').length;
  const resourceCount = curatedSlugs.reduce((sum, s) => sum + totalResources(curatedMap.get(s)!), 0);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
              KNOWLEDGE BASE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              Programming&nbsp;<span className="text-accent">Languages</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-xl mx-auto">
              {complete} complete courses and {inProgress} in progress, plus curated resource
              hubs for {curatedSlugs.length} major programming languages — books, docs, courses,
              videos, practice, reference, news, and community.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{curatedSlugs.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Languages</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{complete}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Full courses</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{resourceCount}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Resources</span>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Language Cards — borderless, inverted hover */}
      {curatedSlugs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-surface-secondary">
              {curatedSlugs.map((slug) => {
                const resource = curatedMap.get(slug)!;
                const total = totalResources(resource);
                const status = classifyCourse(resource.lessons);
                const meta = courseStatusMeta(status);

                return (
                  <Link
                    key={slug}
                    href={`/knowledge/languages/${slug}`}
                    className="group flex items-start gap-5 p-6 sm:p-8 transition-all duration-200 bg-white hover:bg-accent"
                  >
                    <span className={cn(
                      'inline-flex items-center justify-center w-12 h-12 shrink-0 transition-colors',
                      getLangBg(slug),
                    )}>
                      {getLangIcon(slug, 22) || (
                        <span className="text-sm font-extrabold">{resource.name.charAt(0)}</span>
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors mb-1.5">
                        {resource.name}
                      </h3>
                      <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-2 mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn(
                          'px-2 py-1 text-[9px] font-bold uppercase tracking-wider transition-colors',
                          meta.className,
                          status === 'complete' ? 'group-hover:bg-white group-hover:text-accent' : 'group-hover:bg-white/20 group-hover:text-white',
                        )}>
                          {status === 'complete'
                            ? `Full course · ${resource.lessons?.length ?? 0} lessons`
                            : status === 'in-progress'
                              ? `In progress · ${resource.lessons?.length ?? 0} lessons`
                              : meta.label}
                        </span>
                        <span className="px-2 py-1 text-[9px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80 transition-colors">
                          {total} resources
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors">
                          Explore &rarr;
                        </span>
                      </div>
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
