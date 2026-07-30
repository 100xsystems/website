import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllLanguages } from '@/lib/mdx';
import { getLanguagesWithResources, getLanguageResources, type LanguageResources } from '@/lib/language-resources';
import {
  SiJavascript,
  SiPython,
  SiTypescript,
  SiOpenjdk,
  SiCplusplus,
  SiKotlin,
  SiSwift,
  SiRuby,
  SiPhp,
  SiSharp,
  SiGo,
  SiRust,
  SiScala,
  SiR,
  SiDart,
  SiElixir,
  SiHaskell,
  SiLua,
  SiGnubash,
} from 'react-icons/si';

export const metadata: Metadata = {
  title: 'Languages — Knowledge Base',
};

const LANG_ICONS: Record<string, React.ReactNode> = {
  javascript: <SiJavascript size={22} />,
  python:     <SiPython size={22} />,
  typescript: <SiTypescript size={22} />,
  java:       <SiOpenjdk size={22} />,
  cpp:        <SiCplusplus size={22} />,
  kotlin:     <SiKotlin size={22} />,
  swift:      <SiSwift size={22} />,
  ruby:       <SiRuby size={22} />,
  php:        <SiPhp size={22} />,
  csharp:     <SiSharp size={22} />,
  go:         <SiGo size={22} />,
  rust:       <SiRust size={22} />,
  scala:      <SiScala size={22} />,
  r:          <SiR size={22} />,
  dart:       <SiDart size={22} />,
  elixir:     <SiElixir size={22} />,
  haskell:    <SiHaskell size={22} />,
  lua:        <SiLua size={22} />,
  shell:      <SiGnubash size={22} />,
};

const LANG_BG: Record<string, string> = {
  javascript: 'bg-[#F7DF1E] text-black',
  python:     'bg-[#3776AB] text-white',
  typescript: 'bg-[#3178C6] text-white',
  java:       'bg-[#ED8B00] text-white',
  cpp:        'bg-[#00599C] text-white',
  kotlin:     'bg-[#7F52FF] text-white',
  swift:      'bg-[#F05138] text-white',
  ruby:       'bg-[#CC342D] text-white',
  php:        'bg-[#777BB4] text-white',
  csharp:     'bg-[#239120] text-white',
  go:         'bg-[#00ADD8] text-white',
  rust:       'bg-[#000000] text-white',
  scala:      'bg-[#DC322F] text-white',
  r:          'bg-[#276DC3] text-white',
  dart:       'bg-[#0175C2] text-white',
  elixir:     'bg-[#4B275F] text-white',
  haskell:    'bg-[#5D4F85] text-white',
  lua:        'bg-[#000080] text-white',
  shell:      'bg-[#4EAA25] text-white',
};

const DEFAULT_BG = 'bg-accent text-white';

function getIcon(slug: string): React.ReactNode {
  return LANG_ICONS[slug] || null;
}

function getBg(slug: string): string {
  return LANG_BG[slug] || DEFAULT_BG;
}

function totalResources(lang: LanguageResources): number {
  return lang.categories.reduce((sum, cat) => sum + cat.items.length, 0);
}

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
              Curated resource hubs for 19 major programming languages.
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

      {/* Curated Language Cards — borderless, inverted hover */}
      {curatedSlugs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-surface-secondary">
              {curatedSlugs.map((slug) => {
                const resource = curatedMap.get(slug)!;
                const total = totalResources(resource);

                return (
                  <Link
                    key={slug}
                    href={`/knowledge/languages/${slug}`}
                    className="group flex items-start gap-5 p-6 sm:p-8 transition-all duration-200 bg-white hover:bg-accent"
                  >
                    <span className={cn(
                      'inline-flex items-center justify-center w-12 h-12 shrink-0 transition-colors',
                      getBg(slug),
                    )}>
                      {getIcon(slug)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors mb-1.5">
                        {resource.name}
                      </h3>
                      <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-2 mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-3">
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

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
