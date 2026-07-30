/** ═══════════════════════════════════════════════════════════════════════
 *  ResourceHubDetail
 *
 *  A shared detail page component for any resource hub (patterns,
 *  principles, technologies, frameworks, etc.). Shows the hub's
 *  description and all 8 resource categories with clickable links.
 * ═══════════════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import type { ResourceHub } from '@/lib/knowledge-resources';
import {
  FaBook, FaFileAlt, FaLaptopCode, FaPlay, FaTerminal,
  FaSearch, FaNewspaper, FaUsers,
} from 'react-icons/fa';

// ─── Category icons ─────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  book:      <FaBook size={14} />,
  docs:      <FaFileAlt size={14} />,
  code:      <FaLaptopCode size={14} />,
  video:     <FaPlay size={14} />,
  terminal:  <FaTerminal size={14} />,
  reference: <FaSearch size={14} />,
  news:      <FaNewspaper size={14} />,
  community: <FaUsers size={14} />,
};

const CATEGORY_BG: Record<string, string> = {
  book:      'bg-amber-50 text-amber-600',
  docs:      'bg-blue-50 text-blue-600',
  code:      'bg-emerald-50 text-emerald-600',
  video:     'bg-rose-50 text-rose-600',
  terminal:  'bg-violet-50 text-violet-600',
  reference: 'bg-cyan-50 text-cyan-600',
  news:      'bg-orange-50 text-orange-600',
  community: 'bg-indigo-50 text-indigo-600',
};

function getCatIcon(icon: string): React.ReactNode {
  return CATEGORY_ICONS[icon] || <FaBook size={14} />;
}

function getCatBg(icon: string): string {
  return CATEGORY_BG[icon] || 'bg-neutral-100 text-neutral-600';
}

// ─── Component ──────────────────────────────────────────────────────

interface ResourceHubDetailProps {
  hub: ResourceHub;
  backLabel: string;
  backHref: string;
}

export function ResourceHubDetail({ hub, backLabel, backHref }: ResourceHubDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative py-16 px-6 lg:px-12 bg-accent">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors mb-8"
          >
            &larr; {backLabel}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-none mb-3">
            {hub.name}
          </h1>
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
            {hub.description}
          </p>
        </div>
      </div>

      {/* Resource Categories Grid */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent">
            Curated Resources
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hub.categories && hub.categories.map((category) => (
            <div
              key={category.label}
              className="bg-surface-secondary p-6 transition-all duration-200 hover:bg-accent group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className={cn(
                  'inline-flex items-center justify-center w-8 h-8',
                  getCatBg(category.icon),
                )}>
                  {getCatIcon(category.icon)}
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
      </div>
    </div>
  );
}

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
