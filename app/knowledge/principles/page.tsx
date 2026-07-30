import type { Metadata } from 'next';
import Link from 'next/link';
import { getKnowledgeItems } from '@/lib/mdx';
import {
  Lightbulb,
  Scale,
  Layers,
  GitBranch,
  Shield,
  Zap,
  RefreshCw,
  Codepen,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Principles — Knowledge Base',
  description: 'Foundational software engineering principles that guide architectural decisions and code quality.',
};

// ─── Difficulty display ─────────────────────────────────────────────

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

const PRINCIPLE_ICONS = [
  Lightbulb, Scale, Layers, GitBranch, Shield, Zap, RefreshCw, Codepen,
];

export default function PrinciplesPage() {
  const items = getKnowledgeItems('principles');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
              KNOWLEDGE BASE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              <span className="text-accent">Principles</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-xl mx-auto">
              Foundational software engineering principles that guide architectural decisions
              and code quality. Learn the &ldquo;why&rdquo; behind the patterns.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{items.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Principles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Grid */}
      {items.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-sm text-fg-muted">Nothing yet. Contributions welcome!</p>
        </section>
      ) : (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, i) => {
                const Icon = PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length];
                const diffStyle = DIFFICULTY_STYLES[item.difficulty] || 'bg-surface-secondary text-fg-muted';

                return (
                  <Link
                    key={item.slug}
                    href={`/knowledge/principles/read/${item.slug}`}
                    className="group block bg-white p-6 sm:p-8 transition-all duration-300 border border-border hover:bg-accent"
                  >
                    {/* Icon */}
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-accent/10 text-accent group-hover:bg-white/20 group-hover:text-white mb-4 transition-colors">
                      <Icon size={20} />
                    </span>

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <span className={cn(
                        'text-[9px] font-semibold px-2 py-0.5 shrink-0 transition-colors',
                        diffStyle,
                        'group-hover:bg-white/20 group-hover:text-white',
                      )}>
                        {item.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors opacity-0 group-hover:opacity-100">
                        Read &rarr;
                      </span>
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
