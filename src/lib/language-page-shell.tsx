import Link from 'next/link';
import { getLanguageResources } from '@/lib/language-resources';

// ─── Types ──────────────────────────────────────────────────────────

export type LayoutVariant = 'grid' | 'bento' | 'compact' | 'feed';

export interface LanguagePageConfig {
  slug: string;
  name: string;
  description: string;
  layout: LayoutVariant;
  accentBg: string;
  accentText: string;
  icon: React.ReactNode;
}

// ─── Shared Shell ───────────────────────────────────────────────────

export function LanguagePageShell({ config }: { config: LanguagePageConfig }) {
  const resources = getLanguageResources(config.slug);

  if (!resources) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-fg-muted">No resource data available for {config.name}.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection config={config} resources={resources} />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        {config.layout === 'grid' && <GridLayout config={config} resources={resources} />}
        {config.layout === 'bento' && <BentoLayout config={config} resources={resources} />}
        {config.layout === 'compact' && <CompactLayout config={config} resources={resources} />}
        {config.layout === 'feed' && <FeedLayout config={config} resources={resources} />}
      </div>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────

interface HeroSectionProps {
  config: LanguagePageConfig;
  resources: NonNullable<ReturnType<typeof getLanguageResources>>;
}

function HeroSection({ config, resources }: HeroSectionProps) {
  return (
    <div className={cn('relative overflow-hidden', config.accentBg)}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-white" />
      </div>

      <div className="relative py-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/knowledge/languages"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors mb-8"
          >
            &larr; Languages
          </Link>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <span className={cn(
              'inline-flex items-center justify-center w-16 h-16 shrink-0',
              config.layout === 'grid' ? 'bg-white/20 rounded-xl' :
              config.layout === 'bento' ? 'bg-white/20' :
              config.layout === 'compact' ? 'bg-white/20' :
              'bg-white/20'
            )}>
              {config.icon}
            </span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-none mb-3">
                {config.name}
              </h1>
              <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                {config.description}
              </p>
            </div>
          </div>

          {/* Stats bar */}          <div className="flex flex-wrap gap-6 mt-10">
            <div className="text-center">
              <span className="block text-2xl font-extrabold text-white">{resources.categories.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mt-0.5">Categories</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-extrabold text-white">
                {resources.categories.reduce((s, c) => s + c.items.length, 0)}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mt-0.5">Resources</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grid Layout (JS, Python, TS) ──────────────────────────────────

function GridLayout({ resources }: { config: LanguagePageConfig; resources: NonNullable<ReturnType<typeof getLanguageResources>> }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent">
          Curated Resources
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.categories.map((category) => (
          <div key={category.label} className="bg-surface-secondary p-6 transition-all duration-200 hover:bg-accent group">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/70 transition-colors mb-4">
              {category.label}
            </h2>
            <div className="space-y-3">
              {category.items.map((item) => (
                <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="block group/link">
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
    </>
  );
}

// ─── Bento Layout (Java, Kotlin, Swift) ─────────────────────────────

function BentoLayout({ resources }: { config: LanguagePageConfig; resources: NonNullable<ReturnType<typeof getLanguageResources>> }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
          Resources
        </span>
      </div>
      <div className="space-y-6">
        {resources.categories.map((category) => (
          <div key={category.label} className="bg-surface-secondary transition-all duration-200 hover:bg-accent group">
            <div className="px-6 py-4 border-b border-white/5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/70 transition-colors">
                {category.label}
              </h2>
            </div>
            <div className="divide-y divide-white/5">
              {category.items.map((item) => (
                <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="block px-6 py-4 group/link">
                  <h3 className="text-sm font-semibold text-fg group-hover:text-white transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-fg-secondary/70 leading-relaxed mt-1 group-hover:text-white/70 transition-colors line-clamp-1">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Compact Layout (C++, Rust, Go) ────────────────────────────────

function CompactLayout({ resources }: { config: LanguagePageConfig; resources: NonNullable<ReturnType<typeof getLanguageResources>> }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
          Resources
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.categories.map((category) => (
          <div key={category.label} className="bg-surface-secondary p-5 transition-all duration-200 hover:bg-accent group">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/70 transition-colors mb-3">
              {category.label}
            </h2>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item.title}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-fg/80 hover:text-accent group-hover:text-white/90 transition-colors leading-relaxed">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Feed Layout (Ruby, PHP, C#) ───────────────────────────────────

function FeedLayout({ resources }: { config: LanguagePageConfig; resources: NonNullable<ReturnType<typeof getLanguageResources>> }) {
  return (
    <>
      {resources.categories.map((category) => (
        <section key={category.label} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
              {category.label}
            </h2>
            <div className="h-px flex-1 bg-surface-secondary" />
          </div>
          <div className="space-y-px">
            {category.items.map((item) => (
              <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 px-5 py-4 transition-all duration-200 bg-white hover:bg-accent group">
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-semibold text-fg group-hover:text-white transition-colors leading-snug">
                    {item.title}
                  </span>
                  <p className="text-xs text-fg-secondary/70 leading-relaxed mt-1 group-hover:text-white/70 transition-colors line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-fg-muted group-hover:text-white/60 transition-colors">&rarr;</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

// ─── Utility ──────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
