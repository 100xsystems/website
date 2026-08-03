'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/application/lib/utils';
import { Button, Icon } from '@/presentation/__components';
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

/** Homepage languages section — top popular languages as big borderless cards, matching the Awesome section. */
export function HomeLanguages({ languages }: HomeLanguagesProps) {
  return (
    <section id="courses" className="scroll-mt-20 py-10 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            LEARN
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
              Language&nbsp;<span className="text-accent">courses</span>
            </h2>
            <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
              Complete, structured courses for the most popular programming languages — from the
              first program all the way to expert patterns. Not link dumps.
            </p>
          </div>
        </div>

        {/* Language grid — horizontal swipe on mobile, hairline grid on desktop */}
        <div className="flex gap-2 overflow-x-auto bg-surface-secondary -mx-6 px-6 pb-2 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:gap-1 lg:grid-cols-3 sm:overflow-visible sm:snap-none">
          {languages.map((lang) => {
            const status = classifyCourse(lang.lessons);
            const meta = courseStatusMeta(status);
            return (
              <Link
                key={lang.slug}
                href={`/knowledge/languages/${lang.slug}`}
                className="group flex flex-col items-start gap-6 p-7 sm:p-8 bg-white transition-colors duration-200 hover:bg-accent shrink-0 w-[82vw] snap-start sm:w-auto"
              >
                <div className="flex w-full items-start justify-between gap-4">
                  <span className={cn(
                    'inline-flex h-14 w-14 shrink-0 items-center justify-center transition-colors duration-200',
                    getLangBg(lang.slug),
                  )}>
                    {getLangIcon(lang.slug, 26) || (
                      <span className="text-sm font-extrabold">{lang.name.charAt(0)}</span>
                    )}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-surface-secondary text-accent transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold uppercase tracking-wide text-fg leading-tight group-hover:text-white transition-colors duration-200 mb-2">
                    {lang.name}
                  </h3>
                  {lang.description && (
                    <p className="text-sm text-fg-secondary leading-relaxed line-clamp-2 group-hover:text-white/80 transition-colors duration-200">
                      {lang.description}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex w-full items-center gap-x-5 gap-y-1.5 text-xs font-bold uppercase tracking-wider text-fg-muted group-hover:text-white/70 transition-colors duration-200">
                  <span>{lang.lessons.length} lessons</span>
                  <span>{lang.resourceCount.toLocaleString()} resources</span>
                  <span className={cn(
                    'ml-auto px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider transition-colors duration-200',
                    meta.className,
                    status === 'complete' ? 'group-hover:bg-white group-hover:text-accent' : 'group-hover:bg-white/20 group-hover:text-white',
                  )}>
                    {status === 'complete' ? 'Complete' : meta.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA — same pattern as "View All Feeds" */}
        <div className="mt-8 sm:mt-12 text-center">
          <Button
            variant="purpleGhost"
            size="lg"
            icon={<Icon name="arrow-right" size={18} />}
            iconPosition="right"
            onClick={() => { window.location.href = '/courses'; }}
          >
            All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
