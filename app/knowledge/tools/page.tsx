import type { Metadata } from 'next';
import Link from 'next/link';
import { getKnowledgeItems } from '@/lib/mdx';
import {
  Wrench,
  Hammer,
  Cog,
  Terminal,
  Container,
  Cloud,
  Database,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tools — Knowledge Base',
  description: 'Essential tools and platforms for modern software development and infrastructure.',
};

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

const TOOL_ICONS = [Wrench, Hammer, Cog, Terminal, Container, Cloud, Database, Lock];

export default function ToolsPage() {
  const items = getKnowledgeItems('tools');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero — compact, utilitarian */}
      <section className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted mb-5">
                KNOWLEDGE BASE
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight uppercase leading-none mb-3">
                <span className="text-accent">Tools</span>
              </h1>
              <p className="text-sm text-fg-secondary max-w-lg">
                Essential tools and platforms for modern software development and infrastructure.
                Master the instruments of the trade.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              <div className="text-center">
                <span className="block text-3xl font-extrabold text-fg">{items.length}</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Tools</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-extrabold text-fg">
                  {items.filter(i => i.tags.length > 0).length}
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Categorized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid — compact cards */}
      {items.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-sm text-fg-muted">Nothing yet. Contributions welcome!</p>
        </section>
      ) : (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((item, i) => {
                const Icon = TOOL_ICONS[i % TOOL_ICONS.length];
                const diffStyle = DIFFICULTY_STYLES[item.difficulty] || 'bg-surface-secondary text-fg-muted';

                return (
                  <Link
                    key={item.slug}
                    href={`/knowledge/tools/read/${item.slug}`}
                    className="group flex items-start gap-4 p-5 transition-all duration-200 border border-border hover:bg-fg"
                  >
                    <span className="inline-flex items-center justify-center w-9 h-9 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors truncate">
                          {item.title}
                        </h3>
                        <span className={cn(
                          'text-[8px] font-semibold px-1.5 py-0.5 shrink-0 transition-colors',
                          diffStyle,
                          'group-hover:bg-white/20 group-hover:text-white',
                        )}>
                          {item.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/70 transition-colors line-clamp-2">
                        {item.description}
                      </p>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="text-[8px] font-mono text-fg-muted/50 group-hover:text-white/40 transition-colors">
                            {item.tags.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      )}
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
