'use client';

import React from 'react';
import Link from 'next/link';
import { getAwesomeIcon } from '@/lib/awesome-icons';

export interface HomeAwesomeList {
  repoId: string;
  name: string;
  stars: number;
  linkCount: number;
}

interface HomeAwesomeProps {
  lists: HomeAwesomeList[];
}

function formatStars(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}

/** Homepage featured awesome lists — click to open the filtered list directly. */
export function HomeAwesome({ lists }: HomeAwesomeProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            AWESOME LISTS
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
                Curated by the&nbsp;<span className="text-accent">community</span>
              </h2>
              <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
                29,000+ resources from the most-starred GitHub awesome lists — one flat feed,
                searchable and filterable.
              </p>
            </div>
            <Link
              href="/discover/awesome"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider border border-border text-fg hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
            >
              All lists &rarr;
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lists.map((list) => (
            <Link
              key={list.repoId}
              href={`/discover/awesome?source=${encodeURIComponent(list.repoId)}`}
              className="group flex items-start gap-4 p-5 bg-white border border-border hover:border-transparent hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 shrink-0 bg-surface-secondary text-fg-muted group-hover:bg-accent group-hover:text-white transition-colors">
                {getAwesomeIcon(list.repoId)}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-fg group-hover:text-accent transition-colors leading-snug line-clamp-2 mb-1">
                  {list.name.replace(/^[^\w]*/, '')}
                </h3>
                <div className="flex items-center gap-3 text-[10px] text-fg-muted">
                  <span className="font-bold tabular-nums">★ {formatStars(list.stars)}</span>
                  <span>{list.linkCount.toLocaleString()} links</span>
                </div>
              </div>
              <span className="text-accent text-xs font-bold group-hover:translate-x-1 transition-transform mt-1">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
