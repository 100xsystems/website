'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button, Icon } from '@/presentation/__components';
import { getAwesomeIcon, getAwesomeBrandColor, humanizeListName } from '@/lib/awesome-icons';

export interface HomeAwesomeList {
  repoId: string;
  name: string;
  stars: number;
  linkCount: number;
  description: string | null;
}

interface HomeAwesomeProps {
  lists: HomeAwesomeList[];
}

function formatStars(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}

/** Homepage featured awesome lists — big borderless source cards, click to open the filtered list directly. */
export function HomeAwesome({ lists }: HomeAwesomeProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            AWESOME LISTS
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
              Curated by the&nbsp;<span className="text-accent">community</span>
            </h2>
            <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
              29,000+ resources from the most-starred GitHub awesome lists — one flat feed,
              searchable and filterable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1 bg-surface-secondary sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => {
            const color = getAwesomeBrandColor(list.repoId);
            return (
              <Link
                key={list.repoId}
                href={`/discover/awesome?source=${encodeURIComponent(list.repoId)}`}
                className="group flex flex-col items-start gap-6 p-7 sm:p-8 bg-white transition-colors duration-200 hover:bg-accent"
              >
                <div className="flex w-full items-start justify-between gap-4">
                  <span
                    className="inline-flex h-14 w-14 shrink-0 items-center justify-center transition-colors duration-200"
                    style={{ backgroundColor: `${color}1A`, color }}
                  >
                    {getAwesomeIcon(list.repoId, 26)}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-surface-secondary text-accent transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold uppercase tracking-wide text-fg leading-tight group-hover:text-white transition-colors duration-200 mb-2">
                    {humanizeListName(list.repoId)}
                  </h3>
                  {list.description && (
                    <p className="text-sm text-fg-secondary leading-relaxed line-clamp-2 group-hover:text-white/80 transition-colors duration-200">
                      {list.description}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex items-center gap-x-5 gap-y-1.5 text-xs font-bold uppercase tracking-wider text-fg-muted group-hover:text-white/70 transition-colors duration-200">
                  <span>★ {formatStars(list.stars)}</span>
                  <span>{list.linkCount.toLocaleString()} links</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA — same pattern as "View All Feeds" */}
        <div className="mt-12 text-center">
          <Button
            variant="purpleGhost"
            size="lg"
            icon={<Icon name="arrow-right" size={18} />}
            iconPosition="right"
            onClick={() => { window.location.href = '/discover/awesome'; }}
          >
            All Lists
          </Button>
        </div>
      </div>
    </section>
  );
}
