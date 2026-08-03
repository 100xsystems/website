'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/application/lib/utils';
import { getLangIcon, getLangBg } from '@/lib/language-icons';
import { classifyCourse, courseStatusMeta, type LessonMetaLite } from '@/lib/course-status';

export interface HomeLanguageItem {
  slug: string;
  name: string;
  description: string;
  lessons: LessonMetaLite[];
  resourceCount: number;
}

interface HomeLanguagesProps {
  languages: HomeLanguageItem[];
}

/** Homepage languages section — complete + in-progress courses with status badges. */
export function HomeLanguages({ languages }: HomeLanguagesProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            LEARN
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
                Language&nbsp;<span className="text-accent">courses</span>
              </h2>
              <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
                Complete, structured courses — not link dumps. Start from the first program and
                go all the way to expert patterns. Or jump straight to the curated resources.
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider border border-border text-fg hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
            >
              All courses &rarr;
            </Link>
          </div>
        </div>

        {/* Language grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-surface-secondary">
          {languages.map((lang) => {
            const status = classifyCourse(lang.lessons);
            const meta = courseStatusMeta(status);
            return (
              <Link
                key={lang.slug}
                href={`/knowledge/languages/${lang.slug}`}
                className="group flex flex-col justify-between gap-4 p-6 bg-white transition-all duration-200 hover:bg-accent"
              >
                <div className="flex items-start gap-4">
                  <span className={cn(
                    'inline-flex items-center justify-center w-12 h-12 shrink-0 transition-colors',
                    getLangBg(lang.slug),
                  )}>
                    {getLangIcon(lang.slug, 22) || (
                      <span className="text-sm font-extrabold">{lang.name.charAt(0)}</span>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors mb-1">
                      {lang.name}
                    </h3>
                    <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-2">
                      {lang.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn(
                    'px-2 py-1 text-[9px] font-bold uppercase tracking-wider transition-colors',
                    meta.className,
                    status === 'complete' ? 'group-hover:bg-white group-hover:text-accent' : 'group-hover:bg-white/20 group-hover:text-white',
                  )}>
                    {status === 'complete' ? `Full course · ${lang.lessons.length} lessons` : meta.label}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-fg-muted group-hover:text-white/70 transition-colors">
                    {lang.resourceCount} resources
                  </span>
                  <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors">
                    &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
