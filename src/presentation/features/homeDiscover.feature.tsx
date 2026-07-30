'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/application/lib/utils';
import {
  SiYcombinator, SiGithub, SiStackoverflow, SiNpm, SiDevdotto,
  SiMedium, SiReddit, SiDuckduckgo, SiWikipedia,
} from 'react-icons/si';

const DISCOVER_CARDS = [
  { slug: 'hn', label: 'Hacker News', description: 'Top stories, Show HN, Ask HN, Jobs', href: '/discover/hn', bgColor: 'bg-orange-600', hoverBg: 'hover:bg-orange-600', icon: <SiYcombinator size={20} /> },
  { slug: 'github', label: 'GitHub', description: 'Search repos by stars, language, topics', href: '/discover/github', bgColor: 'bg-gray-800', hoverBg: 'hover:bg-gray-800', icon: <SiGithub size={20} /> },
  { slug: 'stackoverflow', label: 'Stack Overflow', description: 'Q&A by tags — JavaScript, Python, Go, more', href: '/discover/stackoverflow', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500', icon: <SiStackoverflow size={20} /> },
  { slug: 'npm', label: 'NPM', description: 'Search packages by score & popularity', href: '/discover/npm', bgColor: 'bg-red-600', hoverBg: 'hover:bg-red-600', icon: <SiNpm size={20} /> },
  { slug: 'devto', label: 'Dev.to', description: 'Developer articles with reactions & tags', href: '/discover/devto', bgColor: 'bg-gray-800', hoverBg: 'hover:bg-gray-800', icon: <SiDevdotto size={20} /> },
  { slug: 'medium', label: 'Medium', description: 'Tech stories from publications', href: '/discover/medium', bgColor: 'bg-black', hoverBg: 'hover:bg-black', icon: <SiMedium size={20} /> },
  { slug: 'reddit', label: 'Reddit', description: 'Programming discussions by subreddit', href: '/discover/reddit', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-500', icon: <SiReddit size={20} /> },
  { slug: 'ddg', label: 'DuckDuckGo', description: 'Instant web answers & definitions', href: '/discover/ddg', bgColor: 'bg-orange-600', hoverBg: 'hover:bg-orange-600', icon: <SiDuckduckgo size={20} /> },
  { slug: 'wikipedia', label: 'Wikipedia', description: 'Reference articles & pages', href: '/discover/wikipedia', bgColor: 'bg-gray-700', hoverBg: 'hover:bg-gray-700', icon: <SiWikipedia size={20} /> },
  { slug: 'awesome', label: 'Awesome Lists', description: 'Curated GitHub resource collections', href: '/discover/awesome', bgColor: 'bg-accent', hoverBg: 'hover:bg-accent', icon: <span className="text-[13px] font-black">★</span> },
];

export function HomeDiscover() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            DISCOVER
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Explore&nbsp;
            <span className="text-accent">feeds</span>
          </h2>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            Dive into different data sources — each with its own unique interface and features.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DISCOVER_CARDS.map((card) => (
            <Link
              key={card.slug}
              href={card.href}
              className={cn(
                'group block bg-white border border-border p-6 transition-all duration-300 hover:border-transparent hover:shadow-xl hover:-translate-y-1',
                card.hoverBg,
              )}
            >
              {/* Icon */}
              <span className={cn(
                'inline-flex items-center justify-center w-12 h-12 text-white text-lg font-bold mb-4 transition-colors',
                card.bgColor,
              )}>
                {card.icon}
              </span>

              <h3 className="text-base font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors mb-2">
                {card.label}
              </h3>

              <p className="text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-2 mb-4">
                {card.description}
              </p>

              <span className={cn(
                'text-[10px] font-bold uppercase tracking-wider transition-colors',
                'text-accent group-hover:text-white/70',
              )}>
                Browse &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
