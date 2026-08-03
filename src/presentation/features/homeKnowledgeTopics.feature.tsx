'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/application/lib/utils';
import { FaBalanceScale, FaProjectDiagram, FaWrench, FaCubes } from 'react-icons/fa';

export interface KnowledgeTopic {
  slug: string;
  label: string;
  description: string;
  count: number;
}

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  principles: <FaBalanceScale size={22} />,
  patterns: <FaProjectDiagram size={22} />,
  tools: <FaWrench size={22} />,
  technologies: <FaCubes size={22} />,
};

const TOPIC_BG: Record<string, string> = {
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
    <section className="py-16 sm:py-24 bg-surface-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            KNOWLEDGE BASE
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Concepts that make&nbsp;<span className="text-accent">great engineers</span>
          </h2>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            Structured resource hubs for the principles, patterns, tools, and technologies
            behind every system you&apos;ll ever build.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 bg-white">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/knowledge/${topic.slug}`}
              className="group block bg-surface-secondary p-8 transition-colors duration-200 hover:bg-accent"
            >
              <span className={cn(
                'inline-flex items-center justify-center w-14 h-14 mb-6 transition-colors duration-200',
                TOPIC_BG[topic.slug] || 'bg-surface-secondary text-fg-muted',
                'group-hover:bg-white/20 group-hover:text-white',
              )}>
                {TOPIC_ICONS[topic.slug] || <FaWrench size={22} />}
              </span>
              <h3 className="text-lg font-extrabold uppercase tracking-wide text-fg group-hover:text-white transition-colors duration-200 mb-2">
                {topic.label}
              </h3>
              <p className="text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors duration-200 mb-6">
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
