'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { IconAnimatedGridPattern } from '@/presentation/__components';
import { FaGraduationCap, FaCompass, FaNewspaper } from 'react-icons/fa';

/**
 * HomeHero — the first thing a visitor sees.
 *
 * Speaks clearly about what 100xSystems is: a free, structured software
 * engineering education platform with complete language courses, curated
 * resources, and a live discovery feed. Three CTAs map to the three pillars.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden flex items-center bg-white" style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <div className="absolute inset-0 z-0">
        <IconAnimatedGridPattern />
      </div>

      <div className="relative z-10 w-full max-w-300 mx-auto px-6 lg:px-12 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          {/* ── Left: message ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-accent text-white mb-4 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Free · Structured · Depth-first
              </div>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-[1.05] mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              100xSystems is a free{' '}
              <span className="text-accent">engineering</span>
              <br className="hidden sm:block" /> education platform.
            </motion.h1>

            <motion.p
              className="text-base sm:text-xl text-fg-secondary leading-relaxed max-w-xl mb-6 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              Complete courses for 50+ programming languages, curated resource hubs for
              every principle, pattern, and tool, and a live feed of the best engineering
              content on the web — all free, all in one place.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/courses"
                className="inline-flex items-center gap-3 px-5 py-3 sm:px-8 sm:py-4 bg-white text-fg text-sm font-bold uppercase tracking-wider border border-border transition-colors duration-200 hover:bg-accent hover:text-white hover:border-accent"
              >
                <FaGraduationCap size={16} />
                Browse Courses
              </Link>
              <Link
                href="/knowledge/languages"
                className="inline-flex items-center gap-3 px-5 py-3 sm:px-8 sm:py-4 text-fg text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:text-accent relative after:absolute after:bottom-2 after:left-8 after:right-8 after:h-0.75 after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                <FaCompass size={16} />
                Explore Languages
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center gap-3 px-5 py-3 sm:px-8 sm:py-4 text-fg-muted text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:text-fg"
              >
                <FaNewspaper size={16} />
                Discover
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="flex flex-wrap items-center gap-5 sm:gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              {[
                { n: '50+', l: 'Language courses' },
                { n: '160+', l: 'Concepts explained' },
                { n: '29k', l: 'Curated resources' },
              ].map((s) => (
                <div key={s.l}>
                  <span className="block text-2xl sm:text-4xl font-extrabold text-fg tabular-nums">{s.n}</span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: pillar cards ── */}
          <motion.div
            className="grid grid-cols-3 gap-1 bg-surface-secondary lg:grid-cols-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <PillarCard
              index="01"
              title="Learn"
              desc="Complete, structured courses — 21 lessons per language, from first program to expert patterns."
              href="/courses"
              accent="bg-accent"
            />
            <PillarCard
              index="02"
              title="Reference"
              desc="Curated resource hubs with the definitive free books, docs, courses, and practice for every topic."
              href="/knowledge"
              accent="bg-accent-yellow"
              text="text-black"
            />
            <PillarCard
              index="03"
              title="Discover"
              desc="A live feed of the best engineering blogs, YC companies, launches, and tools — updated daily."
              href="/discover"
              accent="bg-fg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  index,
  title,
  desc,
  href,
  accent,
  text = 'text-white',
}: {
  index: string;
  title: string;
  desc: string;
  href: string;
  accent: string;
  text?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-start gap-2 p-3 bg-white transition-colors duration-200 hover:bg-accent lg:flex-row lg:items-start lg:gap-5 lg:p-6"
    >
      <span className={`inline-flex items-center justify-center w-9 h-9 lg:w-12 lg:h-12 shrink-0 text-xs lg:text-sm font-extrabold ${accent} ${text} group-hover:bg-white/20 group-hover:text-white transition-colors duration-200`}>
        {index}
      </span>
      <div className="min-w-0">
        <h3 className="text-[10px] lg:text-base font-extrabold uppercase tracking-widest text-fg group-hover:text-white transition-colors duration-200 lg:mb-1.5">
          {title}
        </h3>
        <p className="hidden lg:block text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors duration-200">{desc}</p>
      </div>
      <span className="hidden lg:inline-block ml-auto mt-1 text-accent text-sm font-bold group-hover:text-white transition-colors duration-200">→</span>
    </Link>
  );
}
