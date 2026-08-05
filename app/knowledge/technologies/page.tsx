import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubs, countHubResources, refreshKnowledgeCacheIfStale, type ResourceHub } from '@/lib/knowledge-resources';
import {
  SiReact, SiVuedotjs, SiAngular, SiSvelte, SiNextdotjs, SiAstro,
  SiDjango, SiLaravel, SiSpring, SiExpress, SiNestjs, SiFastify, SiHono,
  SiFlutter, SiTailwindcss, SiBootstrap,
  SiDocker, SiKubernetes, SiTerraform, SiAnsible, SiNginx, SiLinux, SiNixos,
  SiPostgresql, SiMongodb, SiRedis, SiMysql, SiElasticsearch, SiSqlite,
  SiJson, SiMarkdown, SiGraphql, SiToml, SiYaml, SiSass, SiLess, SiPug,
  SiNodedotjs, SiDeno, SiBun,
  SiWebpack, SiVite, SiEslint, SiPrettier, SiElectron, SiExpo,
  SiPrisma, SiGrafana, SiPrometheus, SiApachekafka, SiRabbitmq,
  SiJenkins, SiGitlab, SiGithubactions,
} from 'react-icons/si';

export const metadata: Metadata = {
  title: 'Technologies — Knowledge Base',
  description: 'Frameworks, platforms, databases, infrastructure, and tools powering modern software.',
};

// ─── Technology categories (aggregated from registry subdirectories) ──

interface TechCategory {
  slug: string;
  label: string;
  description: string;
}

const TECH_CATEGORIES: TechCategory[] = [
  { slug: 'frameworks',     label: 'Frameworks',     description: 'Web frameworks, UI libraries, and application runtimes.' },
  { slug: 'infrastructure', label: 'Infrastructure', description: 'Containers, cloud, CI/CD, and deployment tooling.' },
  { slug: 'databases',      label: 'Databases',      description: 'Relational, document, key-value, and search engines.' },
  { slug: 'data-formats',   label: 'Data & Formats', description: 'Markup, query, styling, and serialization formats.' },
  { slug: 'runtimes',       label: 'Runtimes',       description: 'JavaScript runtimes and execution environments.' },
];

// ─── Technology icon map ─────────────────────────────────────────────

const TECH_ICONS: Record<string, React.ReactNode> = {
  react:     <SiReact size={18} />,
  vue:       <SiVuedotjs size={18} />,
  angular:   <SiAngular size={18} />,
  svelte:    <SiSvelte size={18} />,
  nextjs:    <SiNextdotjs size={18} />,
  nuxt:      <span className="text-[10px] font-bold">Nx</span>,
  astro:     <SiAstro size={18} />,
  django:    <SiDjango size={18} />,
  laravel:   <SiLaravel size={18} />,
  spring:    <SiSpring size={18} />,
  express:   <SiExpress size={18} />,
  nestjs:    <SiNestjs size={18} />,
  fastify:   <SiFastify size={18} />,
  hono:      <SiHono size={18} />,
  flutter:   <SiFlutter size={18} />,
  tailwind:  <SiTailwindcss size={18} />,
  bootstrap: <SiBootstrap size={18} />,
  docker:     <SiDocker size={18} />,
  kubernetes: <SiKubernetes size={18} />,
  terraform:  <SiTerraform size={18} />,
  ansible:    <SiAnsible size={18} />,
  nginx:      <SiNginx size={18} />,
  linux:      <SiLinux size={18} />,
  nix:        <SiNixos size={18} />,
  postgresql: <SiPostgresql size={18} />,
  mongodb:    <SiMongodb size={18} />,
  redis:      <SiRedis size={18} />,
  mysql:      <SiMysql size={18} />,
  elasticsearch: <SiElasticsearch size={18} />,
  sqlite:     <SiSqlite size={18} />,
  json:       <SiJson size={18} />,
  markdown:   <SiMarkdown size={18} />,
  graphql:    <SiGraphql size={18} />,
  toml:       <SiToml size={18} />,
  sass:       <SiSass size={18} />,
  less:       <SiLess size={18} />,
  pug:        <SiPug size={18} />,
  nodejs:     <SiNodedotjs size={18} />,
  deno:       <SiDeno size={18} />,
  bun:        <SiBun size={18} />,
  webpack:   <SiWebpack size={18} />,
  vite:      <SiVite size={18} />,
  eslint:    <SiEslint size={18} />,
  prettier:  <SiPrettier size={18} />,
  electron:  <SiElectron size={18} />,
  expo:      <SiExpo size={18} />,
  prisma:    <SiPrisma size={18} />,
  grafana:   <SiGrafana size={18} />,
  prometheus: <SiPrometheus size={18} />,
  kafka:     <SiApachekafka size={18} />,
  rabbitmq:  <SiRabbitmq size={18} />,
  jenkins:   <SiJenkins size={18} />,
  gitlab:    <SiGitlab size={18} />,
  'github-actions': <SiGithubactions size={18} />,
};

function getTechIcon(slug: string): React.ReactNode | null {
  return TECH_ICONS[slug] || null;
}

// ─── Tech color mapping ──────────────────────────────────────────────

const TECH_COLORS: Record<string, string> = {
  react:       'text-[#61DAFB] group-hover:text-white',
  vue:         'text-[#4FC08D] group-hover:text-white',
  angular:     'text-[#DD0031] group-hover:text-white',
  svelte:      'text-[#FF3E00] group-hover:text-white',
  nextjs:      'text-fg group-hover:text-white',
  django:      'text-[#092E20] group-hover:text-white',
  laravel:     'text-[#FF2D20] group-hover:text-white',
  docker:      'text-[#2496ED] group-hover:text-white',
  kubernetes:  'text-[#326CE5] group-hover:text-white',
  postgresql:  'text-[#4169E1] group-hover:text-white',
  mongodb:     'text-[#47A248] group-hover:text-white',
  redis:       'text-[#DC382D] group-hover:text-white',
  nodejs:      'text-[#339933] group-hover:text-white',
  json:        'text-fg-secondary group-hover:text-white',
  tailwind:    'text-[#06B6D4] group-hover:text-white',
};

function getTechColor(slug: string): string {
  return TECH_COLORS[slug] || 'text-accent group-hover:text-white';
}

// ─── Build aggregated data ───────────────────────────────────────────

interface TechGroup {
  category: TechCategory;
  hubs: ResourceHub[];
}

function buildTechGroups(): TechGroup[] {
  return TECH_CATEGORIES.map((cat) => ({
    category: cat,
    hubs: getHubs(cat.slug),
  })).filter((g) => g.hubs.length > 0);
}

// ─── Page ────────────────────────────────────────────────────────────

export default function TechnologiesPage() {
  // ISR: re-clone the registry knowledge tree if stale.
  refreshKnowledgeCacheIfStale();
  const groups = buildTechGroups();
  const totalHubs = groups.reduce((s, g) => s + g.hubs.length, 0);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent mb-5">
              KNOWLEDGE BASE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              <span className="text-accent">Technologies</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-xl mx-auto">
              Frameworks, platforms, databases, infrastructure, and tools powering modern software.
              Every technology includes curated resources to learn and master it.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{totalHubs}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Technologies</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{groups.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped Technology Cards */}
      {groups.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-sm text-fg-muted">Nothing yet. Contributions welcome!</p>
        </section>
      ) : (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            {groups.map((group) => (
              <div key={group.category.slug} className="mb-16 last:mb-0">
                {/* Category header */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-fg">
                    {group.category.label}
                  </h2>
                  <span className="h-px flex-1 bg-surface-secondary" />
                  <span className="text-[9px] font-semibold uppercase text-fg-muted">
                    {group.hubs.length} items
                  </span>
                </div>

                {/* Cards — borderless, inverted hover */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-surface-secondary">
                  {group.hubs.map((hub) => {
                    const total = countHubResources(hub);
                    const icon = getTechIcon(hub.slug);
                    return (
                      <Link
                        key={hub.slug}
                        href={`/knowledge/technologies/${hub.slug}`}
                        className="group flex items-start gap-4 p-6 transition-all duration-200 bg-white hover:bg-accent"
                      >
                        {icon && (
                          <span className={cn(
                            'inline-flex items-center justify-center w-10 h-10 shrink-0 transition-colors bg-surface-secondary',
                            getTechColor(hub.slug),
                            'group-hover:bg-white/20',
                          )}>
                            {icon}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors mb-1">
                            {hub.name}
                          </h3>
                          <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/70 transition-colors line-clamp-2 mb-2">
                            {hub.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/70 transition-colors">
                              {total} resources
                            </span>
                            <span className="text-[8px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors">
                              Explore &rarr;
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
