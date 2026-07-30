import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
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
  SiC,
  SiJulia,
  SiPerl,
  SiFortran,
  SiApachegroovy,
  SiClojure,
  SiErlang,
  SiAssemblyscript,
} from 'react-icons/si';
import { FaBook, FaFileAlt, FaLaptopCode, FaPlay, FaTerminal, FaSearch, FaNewspaper, FaUsers } from 'react-icons/fa';
import { getLanguageMeta, getHandcraftedSystems } from '@/lib/mdx';
import { getLanguageResources } from '@/lib/language-resources';

interface Props {
  params: Promise<{ slug: string }>;
}

const LANG_ICONS: Record<string, React.ReactNode> = {
  javascript: <SiJavascript size={28} />,
  python:     <SiPython size={28} />,
  typescript: <SiTypescript size={28} />,
  java:       <SiOpenjdk size={28} />,
  cpp:        <SiCplusplus size={28} />,
  kotlin:     <SiKotlin size={28} />,
  swift:      <SiSwift size={28} />,
  ruby:       <SiRuby size={28} />,
  php:        <SiPhp size={28} />,
  csharp:     <SiSharp size={28} />,
  go:         <SiGo size={28} />,
  rust:       <SiRust size={28} />,
  scala:      <SiScala size={28} />,
  r:          <SiR size={28} />,
  dart:       <SiDart size={28} />,
  elixir:     <SiElixir size={28} />,
  haskell:    <SiHaskell size={28} />,
  lua:        <SiLua size={28} />,
  shell:      <SiGnubash size={28} />,
  c:          <SiC size={28} />,
  matlab:     <span className="text-lg font-bold">M</span>,
  julia:      <SiJulia size={28} />,
  perl:       <SiPerl size={28} />,
  fortran:    <SiFortran size={28} />,
  groovy:     <SiApachegroovy size={28} />,
  clojure:    <SiClojure size={28} />,
  erlang:     <SiErlang size={28} />,
  assembly:   <SiAssemblyscript size={28} />,
  cobol:      <span className="text-lg font-bold">C</span>,
};

const LANG_HERO: Record<string, { bg: string; iconBg: string }> = {
  javascript: { bg: 'bg-[#F7DF1E]', iconBg: 'bg-[#F7DF1E] text-black' },
  python:     { bg: 'bg-[#3776AB]', iconBg: 'bg-[#3776AB] text-white' },
  typescript: { bg: 'bg-[#3178C6]', iconBg: 'bg-[#3178C6] text-white' },
  java:       { bg: 'bg-[#ED8B00]', iconBg: 'bg-[#ED8B00] text-white' },
  cpp:        { bg: 'bg-[#00599C]', iconBg: 'bg-[#00599C] text-white' },
  kotlin:     { bg: 'bg-[#7F52FF]', iconBg: 'bg-[#7F52FF] text-white' },
  swift:      { bg: 'bg-[#F05138]', iconBg: 'bg-[#F05138] text-white' },
  ruby:       { bg: 'bg-[#CC342D]', iconBg: 'bg-[#CC342D] text-white' },
  php:        { bg: 'bg-[#777BB4]', iconBg: 'bg-[#777BB4] text-white' },
  csharp:     { bg: 'bg-[#239120]', iconBg: 'bg-[#239120] text-white' },
  go:         { bg: 'bg-[#00ADD8]', iconBg: 'bg-[#00ADD8] text-white' },
  rust:       { bg: 'bg-[#000000]', iconBg: 'bg-[#000000] text-white' },
  scala:      { bg: 'bg-[#DC322F]', iconBg: 'bg-[#DC322F] text-white' },
  r:          { bg: 'bg-[#276DC3]', iconBg: 'bg-[#276DC3] text-white' },
  dart:       { bg: 'bg-[#0175C2]', iconBg: 'bg-[#0175C2] text-white' },
  elixir:     { bg: 'bg-[#4B275F]', iconBg: 'bg-[#4B275F] text-white' },
  haskell:    { bg: 'bg-[#5D4F85]', iconBg: 'bg-[#5D4F85] text-white' },
  lua:        { bg: 'bg-[#000080]', iconBg: 'bg-[#000080] text-white' },
  shell:      { bg: 'bg-[#4EAA25]', iconBg: 'bg-[#4EAA25] text-white' },
  c:          { bg: 'bg-[#A8B9CC]', iconBg: 'bg-[#A8B9CC] text-black' },
  matlab:     { bg: 'bg-[#E16737]', iconBg: 'bg-[#E16737] text-white' },
  julia:      { bg: 'bg-[#4063D8]', iconBg: 'bg-[#4063D8] text-white' },
  perl:       { bg: 'bg-[#39457E]', iconBg: 'bg-[#39457E] text-white' },
  fortran:    { bg: 'bg-[#734F96]', iconBg: 'bg-[#734F96] text-white' },
  groovy:     { bg: 'bg-[#4298B8]', iconBg: 'bg-[#4298B8] text-white' },
  clojure:    { bg: 'bg-[#5881D8]', iconBg: 'bg-[#5881D8] text-white' },
  erlang:     { bg: 'bg-[#A90533]', iconBg: 'bg-[#A90533] text-white' },
  assembly:   { bg: 'bg-[#6E4C13]', iconBg: 'bg-[#6E4C13] text-white' },
  cobol:      { bg: 'bg-[#005C99]', iconBg: 'bg-[#005C99] text-white' },
};

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

const KNOWN_SLUGS = new Set([
  'javascript', 'python', 'typescript', 'java', 'cpp',
  'kotlin', 'swift', 'ruby', 'php', 'csharp', 'go', 'rust',
  'scala', 'r', 'dart', 'elixir', 'haskell', 'lua', 'shell',
  'c', 'matlab', 'julia', 'perl', 'fortran', 'groovy',
  'clojure', 'erlang', 'assembly', 'cobol',
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
  const lang = getLanguageMeta(slug);
  const resources = getLanguageResources(slug);

  // Don't 404 if we have curated resources OR if it's a known slug
  // Only 404 if we have neither curriculum data nor resource data
  if (!lang && !resources && !KNOWN_SLUGS.has(slug)) {
    notFound();
  }

  const displayName = lang?.title || resources?.name || slug;
  const hero = LANG_HERO[slug] || { bg: 'bg-accent', iconBg: 'bg-accent text-white' };

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
          <div className="flex items-center gap-6">
            <span className={cn('inline-flex items-center justify-center w-16 h-16', hero.iconBg)}>
              {LANG_ICONS[slug] || (
                <span className="text-lg font-bold">{displayName.charAt(0)}</span>
              )}
            </span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-none mb-3">
                {displayName}
              </h1>
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

        {/* Curated Resources Grid — borderless */}
        {resources && (
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

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
