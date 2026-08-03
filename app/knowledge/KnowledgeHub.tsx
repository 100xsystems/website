'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import { cn } from '@/application/lib/utils';
import { getLangIcon, getLangBg } from '@/lib/language-icons';
import {
  FaBalanceScale,
  FaBook,
  FaCode,
  FaCubes,
  FaProjectDiagram,
  FaRobot,
  FaThLarge,
  FaWrench,
} from 'react-icons/fa';

export interface KnowledgeHubItem {
  slug: string;
  name: string;
  description: string;
  lessons: Array<{ slug: string; title: string }>;
  resourceCount: number;
}

export interface KnowledgeCategory {
  key: string;
  label: string;
  hubs: KnowledgeHubItem[];
}

interface KnowledgeHubProps {
  categories: KnowledgeCategory[];
  initialCategory: string;
}

/** Per-category chip styles + icons — the same language as the homepage knowledge topics. */
const CATEGORY_META: Record<string, { icon: React.ReactNode; chip: string }> = {
  languages: { icon: <FaCode size={24} />, chip: 'bg-blue-100 text-blue-700' },
  principles: { icon: <FaBalanceScale size={24} />, chip: 'bg-amber-100 text-amber-700' },
  patterns: { icon: <FaProjectDiagram size={24} />, chip: 'bg-purple-100 text-purple-700' },
  tools: { icon: <FaWrench size={24} />, chip: 'bg-emerald-100 text-emerald-700' },
  technologies: { icon: <FaCubes size={24} />, chip: 'bg-rose-100 text-rose-700' },
  ai: { icon: <FaRobot size={24} />, chip: 'bg-violet-100 text-violet-700' },
  'case-studies': { icon: <FaBook size={24} />, chip: 'bg-pink-100 text-pink-700' },
};

function categoryResources(c: KnowledgeCategory): number {
  return c.hubs.reduce((s, h) => s + h.resourceCount, 0);
}

/**
 * Knowledge directory — pick a category (or keep the default "All Courses")
 * and the courses / curated hubs are rendered below, borderless with an
 * inverted accent hover. No borders, no shadows.
 */
export function KnowledgeHub({ categories, initialCategory }: KnowledgeHubProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(initialCategory);

  const totals = useMemo(
    () => ({
      courses: categories.reduce((s, c) => s + c.hubs.length, 0),
      resources: categories.reduce((s, c) => s + categoryResources(c), 0),
    }),
    [categories],
  );

  const activeCategories = selected === 'all' ? categories : categories.filter((c) => c.key === selected);

  const select = (key: string) => {
    setSelected(key);
    router.replace(key === 'all' ? '/knowledge' : `/knowledge?category=${key}`, { scroll: false });
  };

  return (
    <div>
      {/* ── Category selector — big borderless cards (All Courses is the default) ── */}
      <div className="grid grid-cols-1 gap-1 bg-surface-secondary sm:grid-cols-2 lg:grid-cols-3">
        <CategoryCard
          label="All Courses"
          icon={<FaThLarge size={24} />}
          chip="bg-accent text-white"
          count={totals.courses}
          resourceCount={totals.resources}
          selected={selected === 'all'}
          onSelect={() => select('all')}
        />
        {categories.map((cat) => {
          const meta = CATEGORY_META[cat.key];
          return (
            <CategoryCard
              key={cat.key}
              label={cat.label}
              icon={meta?.icon}
              chip={meta?.chip ?? 'bg-surface-secondary text-fg-muted'}
              count={cat.hubs.length}
              resourceCount={categoryResources(cat)}
              selected={selected === cat.key}
              onSelect={() => select(cat.key)}
            />
          );
        })}
      </div>

      {/* ── Content — grouped by category, rendered below the cards ── */}
      <div className="mt-14 sm:mt-20">
        {activeCategories.map((cat) => {
          const meta = CATEGORY_META[cat.key];
          return (
            <section key={cat.key} className="mb-14 last:mb-0 sm:mb-20">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-center gap-5">
                  <span className={cn('inline-flex h-12 w-12 shrink-0 items-center justify-center', meta?.chip ?? 'bg-surface-secondary text-fg-muted')}>
                    {meta?.icon}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                      Courses &amp; hubs
                    </p>
                    <h2 className="mt-1 text-2xl font-extrabold uppercase tracking-tight text-fg sm:text-3xl">
                      {cat.label}
                    </h2>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-fg-muted tabular-nums">
                  {cat.hubs.length} courses · {categoryResources(cat).toLocaleString()} resources
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1 bg-surface-secondary sm:grid-cols-2 lg:grid-cols-3">
                {cat.hubs.map((hub) => (
                  <ItemCard key={hub.slug} category={cat.key} hub={hub} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

// ─── Category selector card (matches the Awesome source-card size) ────

function CategoryCard({
  label,
  icon,
  chip,
  count,
  resourceCount,
  selected,
  onSelect,
}: {
  label: string;
  icon?: React.ReactNode;
  chip: string;
  count: number;
  resourceCount: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'group flex flex-col items-start gap-6 p-7 text-left transition-colors duration-200 sm:p-8',
        selected ? 'bg-accent text-white' : 'bg-white hover:bg-accent',
      )}
    >
      <div className="flex w-full items-start justify-between gap-4">
        <span
          className={cn(
            'inline-flex h-16 w-16 shrink-0 items-center justify-center transition-colors duration-200',
            selected ? 'bg-white/20 text-white' : chip,
          )}
        >
          {icon}
        </span>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-200',
            selected
              ? 'bg-white/20 text-white'
              : 'bg-surface-secondary text-accent group-hover:bg-white/20 group-hover:text-white',
          )}
        >
          {selected ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-5 w-5" />}
        </span>
      </div>
      <div>
        <h3
          className={cn(
            'text-xl font-extrabold uppercase leading-tight tracking-tight transition-colors duration-200 sm:text-2xl',
            selected ? 'text-white' : 'text-fg group-hover:text-white',
          )}
        >
          {label}
        </h3>
        <p
          className={cn(
            'mt-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200',
            selected ? 'text-white/70' : 'text-fg-muted group-hover:text-white/70',
          )}
        >
          {count} {count === 1 ? 'course' : 'courses'} · {resourceCount.toLocaleString()} resources
        </p>
      </div>
    </button>
  );
}

// ─── Course / hub card ──────────────────────────────────────────────

function ItemCard({ category, hub }: { category: string; hub: KnowledgeHubItem }) {
  const isLanguage = category === 'languages';
  const chip = isLanguage ? getLangBg(hub.slug) : (CATEGORY_META[category]?.chip ?? 'bg-surface-secondary text-fg-muted');

  return (
    <Link
      href={`/knowledge/${category}/${hub.slug}`}
      className="group flex flex-col items-start gap-6 bg-white p-7 transition-colors duration-200 hover:bg-accent sm:p-8"
    >
      <div className="flex w-full items-start justify-between gap-4">
        <span className={cn('inline-flex h-14 w-14 shrink-0 items-center justify-center transition-colors duration-200', chip)}>
          {isLanguage ? (
            getLangIcon(hub.slug, 26) || <span className="text-sm font-extrabold">{hub.name.charAt(0)}</span>
          ) : (
            <span className="text-base font-extrabold">{hub.name.charAt(0)}</span>
          )}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-surface-secondary text-accent transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-extrabold uppercase leading-tight tracking-wide text-fg transition-colors duration-200 group-hover:text-white">
          {hub.name}
        </h3>
        {hub.description && (
          <p className="text-sm leading-relaxed text-fg-secondary line-clamp-2 transition-colors duration-200 group-hover:text-white/80">
            {hub.description}
          </p>
        )}
      </div>

      <div className="mt-auto flex items-center gap-x-5 text-xs font-bold uppercase tracking-wider text-fg-muted transition-colors duration-200 group-hover:text-white/70">
        <span>{hub.lessons.length} lessons</span>
        <span>{hub.resourceCount.toLocaleString()} resources</span>
      </div>
    </Link>
  );
}
