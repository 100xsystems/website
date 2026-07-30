import type { Metadata } from 'next';
import Link from 'next/link';
import { getKnowledgeItems } from '@/lib/mdx';
import {
  Grid3X3,
  Layers,
  Workflow,
  Share2,
  Box,
  GitMerge,
  Split,
  Route,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patterns — Knowledge Base',
  description: 'Design patterns and architectural blueprints for solving common engineering challenges.',
};

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

const PATTERN_ICONS = [Grid3X3, Layers, Workflow, Share2, Box, GitMerge, Split, Route];

export default function PatternsPage() {
  const items = getKnowledgeItems('patterns');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent-yellow text-black mb-5">
              KNOWLEDGE BASE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              <span className="text-accent-yellow">Patterns</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-xl mx-auto">
              Design patterns and architectural blueprints for solving common engineering challenges.
              Reusable solutions that stand the test of time.
            </p>
          </div>

          <div className="flex justify-center gap-8">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{items.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Patterns</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">
                {items.filter(i => i.difficulty === 'Beginner').length}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Beginner</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">
                {items.filter(i => i.difficulty === 'Advanced').length}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Advanced</span>
            </div>
          </div>
        </div>
      </section>

      {/* Patterns — two-column bento */}
      {items.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-sm text-fg-muted">Nothing yet. Contributions welcome!</p>
        </section>
      ) : (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
                Architectural
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {items.map((item, i) => {
                const Icon = PATTERN_ICONS[i % PATTERN_ICONS.length];
                const diffStyle = DIFFICULTY_STYLES[item.difficulty] || 'bg-surface-secondary text-fg-muted';
                const isWide = i === 0;

                return (
                  <Link
                    key={item.slug}
                    href={`/knowledge/patterns/read/${item.slug}`}
                    className={cn(
                      'group block bg-white transition-all duration-300 border border-border hover:bg-accent-yellow',
                      isWide ? 'lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-8' : '',
                    )}
                  >
                    <div className={cn('p-6 sm:p-8', isWide ? 'lg:p-10' : '')}>
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-9 h-9 bg-accent-yellow/10 text-accent-yellow group-hover:bg-black/20 group-hover:text-black transition-colors shrink-0">
                            <Icon size={18} />
                          </span>
                          <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-black transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <span className={cn(
                          'text-[9px] font-semibold px-2 py-0.5 shrink-0 transition-colors',
                          diffStyle,
                          'group-hover:bg-black/20 group-hover:text-black',
                        )}>
                          {item.difficulty}
                        </span>
                      </div>

                      <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-black/70 transition-colors line-clamp-3">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 bg-surface-secondary text-fg-muted group-hover:bg-black/10 group-hover:text-black/60 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-accent-yellow group-hover:text-black transition-colors opacity-0 group-hover:opacity-100">
                        <span>Read</span>
                        <ArrowRight size={10} />
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
