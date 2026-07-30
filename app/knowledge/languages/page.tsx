import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllLanguages } from '@/lib/mdx';
import { getLanguagesWithResources, getLanguageResources, type LanguageResources } from '@/lib/language-resources';
import {
  SiJavascript, SiPython, SiTypescript, SiOpenjdk, SiCplusplus,
  SiKotlin, SiSwift, SiRuby, SiPhp, SiSharp, SiGo, SiRust,
  SiScala, SiR, SiDart, SiElixir, SiHaskell, SiLua, SiGnubash,
  SiC, SiJulia, SiPerl, SiFortran, SiApachegroovy, SiClojure, SiErlang, SiAssemblyscript,
  SiOcaml, SiFsharp, SiCrystal, SiNim, SiZig, SiV, SiD, SiRacket,
  SiElm, SiGraphql, SiGleam, SiSolidity, SiWebassembly, SiAda, SiHaxe, SiTerraform, SiMarkdown,
  SiLatex, SiCommonlisp, SiProcessingfoundation, SiScratch, SiWolframlanguage, SiGodotengine, SiLabview, SiAutohotkey, SiJson, SiToml,
  SiPurescript, SiSass, SiLess, SiPug, SiJinja, SiNixos, SiDocker, SiKubernetes, SiAnsible, SiLlvm,
  SiReact, SiVuedotjs, SiAngular, SiSvelte, SiNodedotjs, SiExpress, SiFlutter, SiLinux, SiPostgresql, SiRedis,
  SiSpring, SiDjango, SiLaravel, SiNextdotjs, SiTailwindcss, SiBootstrap, SiNginx, SiMongodb, SiElasticsearch, SiMysql,
  SiGrafana, SiPrometheus, SiApachekafka, SiRabbitmq, SiApacheairflow, SiSqlite, SiJenkins, SiGitlab, SiGithubactions, SiNeovim,
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
  c:          <SiC size={22} />,
  matlab:     <span className="text-[11px] font-bold">M</span>,
  julia:      <SiJulia size={22} />,
  perl:       <SiPerl size={22} />,
  fortran:    <SiFortran size={22} />,
  groovy:     <SiApachegroovy size={22} />,
  clojure:    <SiClojure size={22} />,
  erlang:     <SiErlang size={22} />,
  assembly:   <SiAssemblyscript size={22} />,
  cobol:   <span className="text-[11px] font-bold">C</span>,
  ocaml:   <SiOcaml size={22} />,
  fsharp:  <SiFsharp size={22} />,
  crystal: <SiCrystal size={22} />,
  nim:     <SiNim size={22} />,
  zig:     <SiZig size={22} />,
  v:       <SiV size={22} />,
  d:       <SiD size={22} />,
  racket:  <SiRacket size={22} />,
  scheme:  <span className="text-[11px] font-bold">λ</span>,
  prolog:  <span className="text-[11px] font-bold">?</span>,
  sql:      <span className="text-[11px] font-bold">S</span>,
  elm:      <SiElm size={22} />,
  graphql:  <SiGraphql size={22} />,
  gleam:    <SiGleam size={22} />,
  solidity: <SiSolidity size={22} />,
  webassembly: <SiWebassembly size={22} />,
  ada:      <SiAda size={22} />,
  haxe:     <SiHaxe size={22} />,
  terraform: <SiTerraform size={22} />,
  markdown: <SiMarkdown size={22} />,
  latex:      <SiLatex size={22} />,
  'common-lisp': <SiCommonlisp size={22} />,
  processing: <SiProcessingfoundation size={22} />,
  scratch:    <SiScratch size={22} />,
  'wolfram-language': <SiWolframlanguage size={22} />,
  gdscript:   <SiGodotengine size={22} />,
  labview:    <SiLabview size={22} />,
  autohotkey: <SiAutohotkey size={22} />,
  json:       <SiJson size={22} />,
  toml:       <SiToml size={22} />,
  purescript: <SiPurescript size={22} />,
  sass:       <SiSass size={22} />,
  less:       <SiLess size={22} />,
  pug:        <SiPug size={22} />,
  jinja:      <SiJinja size={22} />,
  nix:        <SiNixos size={22} />,
  docker:     <SiDocker size={22} />,
  kubernetes: <SiKubernetes size={22} />,
  ansible:    <SiAnsible size={22} />,
  llvm:       <SiLlvm size={22} />,
  react:      <SiReact size={22} />,
  vue:        <SiVuedotjs size={22} />,
  angular:    <SiAngular size={22} />,
  svelte:     <SiSvelte size={22} />,
  nodejs:     <SiNodedotjs size={22} />,
  express:    <SiExpress size={22} />,
  flutter:    <SiFlutter size={22} />,
  linux:      <SiLinux size={22} />,
  postgresql: <SiPostgresql size={22} />,
  redis:      <SiRedis size={22} />,
  spring:     <SiSpring size={22} />,
  django:     <SiDjango size={22} />,
  laravel:    <SiLaravel size={22} />,
  nextjs:     <SiNextdotjs size={22} />,
  tailwind:   <SiTailwindcss size={22} />,
  bootstrap:  <SiBootstrap size={22} />,
  nginx:      <SiNginx size={22} />,
  mongodb:    <SiMongodb size={22} />,
  elasticsearch: <SiElasticsearch size={22} />,
  mysql:      <SiMysql size={22} />,
  grafana:    <SiGrafana size={22} />,
  prometheus: <SiPrometheus size={22} />,
  kafka:      <SiApachekafka size={22} />,
  rabbitmq:   <SiRabbitmq size={22} />,
  airflow:    <SiApacheairflow size={22} />,
  sqlite:     <SiSqlite size={22} />,
  jenkins:    <SiJenkins size={22} />,
  gitlab:     <SiGitlab size={22} />,
  'github-actions': <SiGithubactions size={22} />,
  neovim:     <SiNeovim size={22} />,
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
  c:          'bg-[#A8B9CC] text-black',
  matlab:     'bg-[#E16737] text-white',
  julia:      'bg-[#4063D8] text-white',
  perl:       'bg-[#39457E] text-white',
  fortran:    'bg-[#734F96] text-white',
  groovy:     'bg-[#4298B8] text-white',
  clojure:    'bg-[#5881D8] text-white',
  erlang:     'bg-[#A90533] text-white',
  assembly:   'bg-[#6E4C13] text-white',
  cobol:   'bg-[#005C99] text-white',
  ocaml:   'bg-[#EC6813] text-white',
  fsharp:  'bg-[#378BBA] text-white',
  crystal: 'bg-[#000000] text-white',
  nim:     'bg-[#FFE953] text-black',
  zig:     'bg-[#F7A41D] text-black',
  v:       'bg-[#5D87BF] text-white',
  d:       'bg-[#BA595E] text-white',
  racket:  'bg-[#9F1D20] text-white',
  scheme:  'bg-[#1B1B1B] text-white',
  prolog:  'bg-[#E61C24] text-white',
  sql:      'bg-[#336791] text-white',
  elm:      'bg-[#60B5CC] text-white',
  graphql:  'bg-[#E535AB] text-white',
  gleam:    'bg-[#FFC97B] text-black',
  solidity: 'bg-[#363636] text-white',
  webassembly: 'bg-[#654FF0] text-white',
  ada:      'bg-[#01A4FF] text-white',
  haxe:     'bg-[#F5871F] text-white',
  terraform: 'bg-[#7B42BC] text-white',
  markdown: 'bg-[#000000] text-white',
  latex:      'bg-[#008080] text-white',
  'common-lisp': 'bg-[#FF6600] text-white',
  processing: 'bg-[#0096D6] text-white',
  scratch:    'bg-[#F7A41D] text-black',
  'wolfram-language': 'bg-[#DD1100] text-white',
  gdscript:   'bg-[#478CBF] text-white',
  labview:    'bg-[#DDE020] text-black',
  autohotkey: 'bg-[#334455] text-white',
  json:       'bg-[#000000] text-white',
  toml:       'bg-[#9C4221] text-white',
  purescript: 'bg-[#333333] text-white',
  sass:       'bg-[#CC6699] text-white',
  less:       'bg-[#1D365D] text-white',
  pug:        'bg-[#A86454] text-white',
  jinja:      'bg-[#B41717] text-white',
  nix:        'bg-[#5277C3] text-white',
  docker:     'bg-[#2496ED] text-white',
  kubernetes: 'bg-[#326CE5] text-white',
  ansible:    'bg-[#EE0000] text-white',
  llvm:       'bg-[#4E8CAB] text-white',
  react:      'bg-[#61DAFB] text-black',
  vue:        'bg-[#4FC08D] text-white',
  angular:    'bg-[#DD0031] text-white',
  svelte:     'bg-[#FF3E00] text-white',
  nodejs:     'bg-[#339933] text-white',
  express:    'bg-[#000000] text-white',
  flutter:    'bg-[#02569B] text-white',
  linux:      'bg-[#FCC624] text-black',
  postgresql: 'bg-[#4169E1] text-white',
  redis:      'bg-[#DC382D] text-white',
  spring:     'bg-[#6DB33F] text-white',
  django:     'bg-[#092E20] text-white',
  laravel:    'bg-[#FF2D20] text-white',
  nextjs:     'bg-[#000000] text-white',
  tailwind:   'bg-[#06B6D4] text-white',
  bootstrap:  'bg-[#7952B3] text-white',
  nginx:      'bg-[#009639] text-white',
  mongodb:    'bg-[#47A248] text-white',
  elasticsearch: 'bg-[#005571] text-white',
  mysql:      'bg-[#4479A1] text-white',
  grafana:    'bg-[#F46800] text-white',
  prometheus: 'bg-[#E6522C] text-white',
  kafka:      'bg-[#231F20] text-white',
  rabbitmq:   'bg-[#FF6600] text-white',
  airflow:    'bg-[#017CEE] text-white',
  sqlite:     'bg-[#003B57] text-white',
  jenkins:    'bg-[#D24939] text-white',
  gitlab:     'bg-[#FC6D26] text-white',
  'github-actions': 'bg-[#2088FF] text-white',
  neovim:     'bg-[#57A143] text-white',
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
              Curated resource hubs for              99 major programming languages.
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
