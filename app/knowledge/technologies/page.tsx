import type { Metadata } from 'next';
import Link from 'next/link';
import { getKnowledgeItems } from '@/lib/mdx';
import {
  Cpu,
  Monitor,
  Globe,
  Cloud,
  Smartphone,
  Database,
  Network,
  Server,
  Circle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technologies — Knowledge Base',
  description: 'Key technologies, frameworks, and platforms driving the software industry.',
};

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

const TECH_ICONS = [Cpu, Monitor, Globe, Cloud, Smartphone, Database, Network, Server];

export default function TechnologiesPage() {
  const items = getKnowledgeItems('technologies');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero — split-screen style */}
      <section className="py-20 sm:py-24 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent mb-5">
                KNOWLEDGE BASE
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
                <span className="text-accent">Technologies</span>
              </h1>
              <p className="text-sm text-fg-secondary leading-relaxed max-w-xl">
                Key technologies, frameworks, and platforms driving the software industry.
                Understand the stack that powers modern applications.
              </p>

              {/* Stats inline */}
              <div className="flex gap-8 mt-8">
                <div>
                  <span className="block text-3xl font-extrabold text-fg">{items.length}</span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Technologies</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-fg">
                    {items.filter(i => i.difficulty === 'Beginner').length}
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Beginner</span>
                </div>
              </div>
            </div>

            {/* Right: decorative tech grid */}
            <div className="hidden lg:grid grid-cols-4 gap-3">
              {TECH_ICONS.map((Icon, i) => (
                <div key={i} className="flex items-center justify-center h-20 bg-surface-secondary border border-border">
                  <Icon size={24} className="text-accent/60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Grid — clean, spaced */}
      {items.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-sm text-fg-muted">Nothing yet. Contributions welcome!</p>
        </section>
      ) : (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="space-y-px border border-border divide-y divide-border">
              {items.map((item, i) => {
                const Icon = TECH_ICONS[i % TECH_ICONS.length];
                const diffStyle = DIFFICULTY_STYLES[item.difficulty] || 'bg-surface-secondary text-fg-muted';

                return (
                  <Link
                    key={item.slug}
                    href={`/knowledge/technologies/read/${item.slug}`}
                    className="group flex items-center gap-5 px-6 py-5 transition-all duration-200 hover:bg-accent"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
                      <Icon size={18} />
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-0.5">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <Circle size={4} className="text-fg-muted/30 fill-current group-hover:text-white/40 transition-colors" />
                        <span className="text-xs text-fg-muted/60 group-hover:text-white/50 transition-colors uppercase tracking-wider">
                          {item.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/70 transition-colors line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {item.tags.length > 0 && (
                      <div className="hidden sm:flex flex-wrap gap-1.5 shrink-0">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[8px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/70 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors shrink-0 opacity-0 group-hover:opacity-100">
                      &rarr;
                    </span>
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
