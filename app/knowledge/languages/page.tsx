import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllLanguages } from '@/lib/mdx';
import { getLanguagesWithResources, getLanguageResources, type LanguageResources } from '@/lib/language-resources';
import {
  FileJson,
  Terminal,
  FileCode2,
  Coffee,
  Cpu,
  Command,
  Apple,
  Gem,
  Database,
  Hash,
  Zap,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Languages — Knowledge Base',
};

// ─── Language Brand Config ──────────────────────────────────────────

interface LangConfig {
  icon: React.ReactNode;
  bgColor: string;
  hoverBg: string;
}

const LANG_CONFIGS: Record<string, LangConfig> = {
  javascript: { icon: <FileJson size={20} />, bgColor: 'bg-amber-500', hoverBg: 'hover:bg-amber-500' },
  python:      { icon: <Terminal size={20} />, bgColor: 'bg-blue-500', hoverBg: 'hover:bg-blue-500' },
  typescript:  { icon: <FileCode2 size={20} />, bgColor: 'bg-sky-500', hoverBg: 'hover:bg-sky-500' },
  java:        { icon: <Coffee size={20} />, bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500' },
  cpp:         { icon: <Cpu size={20} />, bgColor: 'bg-indigo-500', hoverBg: 'hover:bg-indigo-500' },
  kotlin:      { icon: <Command size={20} />, bgColor: 'bg-purple-500', hoverBg: 'hover:bg-purple-500' },
  swift:       { icon: <Apple size={20} />, bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500' },
  ruby:        { icon: <Gem size={20} />, bgColor: 'bg-red-500', hoverBg: 'hover:bg-red-500' },
  php:         { icon: <Database size={20} />, bgColor: 'bg-indigo-400', hoverBg: 'hover:bg-indigo-400' },
  csharp:      { icon: <Hash size={20} />, bgColor: 'bg-green-500', hoverBg: 'hover:bg-green-500' },
  go:          { icon: <Zap size={20} />, bgColor: 'bg-cyan-500', hoverBg: 'hover:bg-cyan-500' },
  rust:        { icon: <Shield size={20} />, bgColor: 'bg-rose-500', hoverBg: 'hover:bg-rose-500' },
};

const DEFAULT_CONFIG: LangConfig = {
  icon: <FileCode2 size={20} />,
  bgColor: 'bg-accent',
  hoverBg: 'hover:bg-accent',
};

function getConfig(slug: string): LangConfig {
  return LANG_CONFIGS[slug] || DEFAULT_CONFIG;
}

function totalResources(lang: LanguageResources): number {
  return lang.categories.reduce((sum, cat) => sum + cat.items.length, 0);
}

// ─── Page ───────────────────────────────────────────────────────────

export default function LanguagesPage() {
  const languages = getAllLanguages();
  const curatedSlugs = getLanguagesWithResources();
  const curatedMap = new Map<string, LanguageResources>();
  for (const slug of curatedSlugs) {
    const res = getLanguageResources(slug);
    if (res) curatedMap.set(slug, res);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              KNOWLEDGE BASE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              Programming&nbsp;<span className="text-accent">Languages</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-xl mx-auto">
              Curated resource hubs for 12 major programming languages.
              Each hub collects the definitive free resources — books, docs, courses, videos,
              practice, reference, news, and community.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{curatedSlugs.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Languages</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">
                {curatedSlugs.reduce((sum, s) => sum + totalResources(curatedMap.get(s)!), 0)}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Resources</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">8</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Language Cards */}
      {curatedSlugs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {curatedSlugs.map((slug) => {
                const resource = curatedMap.get(slug)!;
                const config = getConfig(slug);
                const total = totalResources(resource);

                return (
                  <Link
                    key={slug}
                    href={`/knowledge/languages/${slug}`}
                    className={cn(
                      'group block bg-white p-6 sm:p-8 transition-all duration-300 border border-border',
                      config.hoverBg,
                    )}
                  >
                    {/* Brand icon */}
                    <span className={cn(
                      'inline-flex items-center justify-center w-10 h-10 text-white mb-4 transition-colors',
                      config.bgColor,
                    )}>
                      {config.icon}
                    </span>

                    <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors mb-2">
                      {resource.name}
                    </h3>

                    <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-2 mb-4">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 text-[9px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80 transition-colors">
                        {total} resources
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors">
                        Explore &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Curriculum Languages */}
      {languages.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Curriculum
              </span>
              <span className="text-[10px] text-fg-muted/60 font-mono">Structured tracks &amp; lessons</span>
            </div>

            <div className="border border-border divide-y divide-border">
              {languages.map((lang) => {
                const isCurated = curatedMap.has(lang.slug);
                const config = getConfig(lang.slug);
                return (
                  <Link
                    key={lang.slug}
                    href={`/knowledge/languages/${lang.slug}`}
                    className={cn(
                      'flex items-center gap-4 px-5 py-4 transition-all duration-200 group',
                      config.hoverBg,
                    )}
                  >
                    <span className={cn(
                      'inline-flex items-center justify-center w-8 h-8 text-white shrink-0 transition-colors',
                      config.bgColor,
                    )}>
                      {config.icon}
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors flex-1">
                      {lang.title}
                    </h3>
                    {isCurated && (
                      <span className="text-[9px] font-semibold uppercase tracking-widest px-2 py-1 bg-accent/10 text-accent group-hover:bg-white/20 group-hover:text-white/80 transition-colors">
                        Curated
                      </span>
                    )}
                    <span className="text-[10px] text-fg-muted group-hover:text-white/60 transition-colors">
                      {lang.chapters.length} {lang.chapters.length === 1 ? 'chapter' : 'chapters'}
                    </span>
                    <ArrowRight size={14} className="text-fg-muted opacity-0 group-hover:text-white group-hover:opacity-100 transition-all shrink-0" />
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

// ─── cn helper ──────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
