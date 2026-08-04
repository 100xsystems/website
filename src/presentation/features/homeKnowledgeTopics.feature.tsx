'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/application/lib/utils';
import { FaBalanceScale, FaProjectDiagram, FaWrench, FaCubes, FaMapSigns, FaCode, FaRobot, FaServer, FaBook } from 'react-icons/fa';

export interface KnowledgeTopic {
  slug: string;
  label: string;
  description: string;
  count: number;
}

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  roadmaps: <FaMapSigns size={22} />,
  languages: <FaCode size={22} />,
  ai: <FaRobot size={22} />,
  'system-design': <FaServer size={22} />,
  'case-studies': <FaBook size={22} />,
  principles: <FaBalanceScale size={22} />,
  patterns: <FaProjectDiagram size={22} />,
  tools: <FaWrench size={22} />,
  technologies: <FaCubes size={22} />,
};

const TOPIC_BG: Record<string, string> = {
  roadmaps: 'bg-cyan-100 text-cyan-700',
  languages: 'bg-sky-100 text-sky-700',
  ai: 'bg-violet-100 text-violet-700',
  'system-design': 'bg-indigo-100 text-indigo-700',
  'case-studies': 'bg-pink-100 text-pink-700',
  principles: 'bg-amber-100 text-amber-700',
  patterns: 'bg-purple-100 text-purple-700',
  tools: 'bg-blue-100 text-blue-700',
  technologies: 'bg-emerald-100 text-emerald-700',
};

interface HomeKnowledgeTopicsProps {
  topics: KnowledgeTopic[];
}

/** Homepage knowledge topics section — principles, patterns, tools, technologies. */
export function HomeKnowledgeTopics({ topics }: HomeKnowledgeTopicsProps) {
  return (
    <section id="concepts" className="scroll-mt-20 py-10 sm:py-24 bg-surface-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            KNOWLEDGE BASE
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Concepts that make&nbsp;<span className="text-accent">great engineers</span>
          </h2>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            Career roadmaps, complete language courses, AI tracks, system design, case studies,
            and the principles, patterns, tools, and technologies behind every system you&apos;ll ever build.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1 bg-white sm:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={topic.slug === 'roadmaps' ? '/roadmaps' : `/knowledge/${topic.slug}`}
              className="group block bg-surface-secondary p-5 transition-colors duration-200 hover:bg-accent sm:p-8"
            >
              <span className={cn(
                'inline-flex items-center justify-center w-10 h-10 mb-4 transition-colors duration-200 sm:w-14 sm:h-14 sm:mb-6',
                TOPIC_BG[topic.slug] || 'bg-surface-secondary text-fg-muted',
                'group-hover:bg-white/20 group-hover:text-white',
              )}>
                {TOPIC_ICONS[topic.slug] || <FaWrench size={22} />}
              </span>
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-fg group-hover:text-white transition-colors duration-200 mb-1 sm:text-lg sm:mb-2">
                {topic.label}
              </h3>
              <p className="hidden text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors duration-200 sm:block sm:mb-6">
                {topic.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-white text-fg-muted group-hover:bg-white/20 group-hover:text-white transition-colors duration-200">
                  {topic.count} hubs
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/80 transition-colors duration-200 inline-block">
                  Explore &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
