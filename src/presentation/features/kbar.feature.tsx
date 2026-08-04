/**
 * kbar — Command+K command palette integration.
 * Provides a Spotlight-like interface for navigating the site via keyboard.
 *
 * @packageDocumentation
 */

'use client';

import React from 'react';
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from 'kbar';
import { cn } from '@/application/lib/utils';

// ─── Action Type ──────────────────────────────────────────────────────

type KbarAction = {
  id: string;
  name: string;
  shortcut?: string[];
  keywords?: string;
  section?: string;
  perform?: () => void;
};

interface ResultAction {
  name: string;
  shortcut?: string[];
  section?: string;
}

// ─── Actions ──────────────────────────────────────────────────────────

const createSectionActions = (
  section: string,
  items: Array<{
    id: string;
    name: string;
    shortcut?: string[];
    keywords?: string;
    href: string;
  }>,
): KbarAction[] =>
  items.map((item) => ({
    id: item.id,
    name: item.name,
    ...(item.shortcut ? { shortcut: item.shortcut } : {}),
    ...(item.keywords ? { keywords: item.keywords } : {}),
    section,
    perform: () => {
      window.location.href = item.href;
    },
  }));

const navigationActions: KbarAction[] = createSectionActions('Navigation', [
  { id: 'home', name: 'Home', shortcut: ['h'], keywords: 'home main landing', href: '/' },
  { id: 'courses', name: 'Courses', shortcut: ['c'], keywords: 'courses learning curriculum knowledge base', href: '/knowledge' },
  { id: 'ai', name: 'AI Hub', keywords: 'ai artificial intelligence ml machine learning llm', href: '/ai' },
  { id: 'feed', name: 'Engineering Feed', shortcut: ['f'], keywords: 'feed engineering articles blogs discover', href: '/discover/feed' },
  { id: 'yc', name: 'YC Companies', shortcut: ['y'], keywords: 'yc y combinator startups companies discover', href: '/discover/yc' },
  { id: 'ph', name: 'Product Hunt', keywords: 'producthunt products launches discover', href: '/discover/product-hunt' },
  { id: 'systems', name: 'Systems', shortcut: ['s'], keywords: 'systems software engineering architecture', href: '/systems' },
  { id: 'knowledge-graph', name: 'Knowledge Base', shortcut: ['k'], keywords: 'knowledge graph concepts principles', href: '/knowledge' },
  { id: 'roadmaps', name: 'Career Roadmaps', keywords: 'roadmaps roles frontend backend devops cloud sre data ml', href: '/roadmaps' },
  { id: 'system-design', name: 'System Design', keywords: 'system design distributed systems architecture curriculum', href: '/knowledge/system-design' },
  { id: 'case-studies', name: 'Case Studies', keywords: 'case studies twitter netflix uber google whatsapp discord amazon tiktok', href: '/knowledge/case-studies' },
  { id: 'search', name: 'Search Site', shortcut: ['g', 's'], keywords: 'search find lookup', href: '/search' },
  { id: 'languages', name: 'Programming Languages', shortcut: ['l'], keywords: 'languages programming coding courses', href: '/knowledge/languages' },
  { id: 'principles', name: 'Principles', shortcut: ['p'], keywords: 'principles fundamentals engineering', href: '/knowledge/principles' },
  { id: 'patterns', name: 'Patterns', keywords: 'design patterns architecture', href: '/knowledge/patterns' },
  { id: 'tools', name: 'Tools', keywords: 'developer tools utilities', href: '/knowledge/tools' },
  { id: 'technologies', name: 'Technologies', keywords: 'technologies platforms frameworks', href: '/knowledge/technologies' },
  { id: 'awesome', name: 'Awesome Lists', keywords: 'awesome github curated resources lists', href: '/discover/awesome' },
  { id: 'hn', name: 'Hacker News', keywords: 'hacker news stories discussions discover', href: '/discover/hn' },
  { id: 'github', name: 'GitHub Repos', keywords: 'github repositories code discover', href: '/discover/github' },
  { id: 'stackoverflow', name: 'Stack Overflow', keywords: 'stackoverflow q a questions discover', href: '/discover/stackoverflow' },
  { id: 'npm', name: 'NPM Packages', keywords: 'npm packages libraries discover', href: '/discover/npm' },
  { id: 'devto', name: 'Dev.to', keywords: 'devto developer articles discover', href: '/discover/devto' },
  { id: 'medium', name: 'Medium', keywords: 'medium articles stories discover', href: '/discover/medium' },
  { id: 'reddit', name: 'Reddit', keywords: 'reddit discussions programming discover', href: '/discover/reddit' },
  { id: 'wikipedia', name: 'Wikipedia', keywords: 'wikipedia encyclopedia articles discover', href: '/discover/wikipedia' },
  { id: 'duckduckgo', name: 'DuckDuckGo', keywords: 'duckduckgo web search discover', href: '/discover/ddg' },
  { id: 'feed-bookmarks', name: 'Feed Bookmarks', keywords: 'bookmarks saved articles feed', href: '/discover/feed/bookmarks' },
  { id: 'discover', name: 'Discover', keywords: 'discover explore', href: '/discover' },
  { id: 'community', name: 'Community', keywords: 'community discuss forum', href: '/community' },
]);

const utilityActions: KbarAction[] = [
  {
    id: 'toggle-view',
    name: 'Toggle Feed View',
    shortcut: ['t'],
    keywords: 'toggle switch view grid flat feed layout',
    section: 'Utility',
    perform: () => {
      if (window.location.pathname.startsWith('/feed')) {
        const current = localStorage.getItem('100xfeed-view') || 'flat';
        const next = current === 'flat' ? 'grid' : 'flat';
        localStorage.setItem('100xfeed-view', next);
        window.location.reload();
      }
    },
  },
  {
    id: 'go-to-top',
    name: 'Scroll to Top',
    shortcut: ['g', 't'],
    keywords: 'top scroll top beginning',
    section: 'Utility',
    perform: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
];

const allActions: KbarAction[] = [...navigationActions, ...utilityActions];

// ─── Result Renderer ──────────────────────────────────────────────────

function KbarResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      maxHeight={400}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <GroupHeading>{item}</GroupHeading>
        ) : (
          <ResultItem action={item as unknown as ResultAction} active={active} />
        )
      }
    />
  );
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-fg-muted/60 border-b border-border">
      {children}
    </div>
  );
}

function ResultItem({ action, active }: { action: ResultAction; active: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 cursor-pointer transition-colors duration-100',
        active
          ? 'bg-accent text-white'
          : 'text-fg hover:bg-surface-secondary',
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center justify-center w-6 h-6 shrink-0">
          <ActionIcon category={action.section ?? ''} />
        </div>
        <span className="text-sm font-medium truncate">{action.name}</span>
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-4">
        {action.shortcut?.map((key) => (
          <kbd
            key={key}
            className={cn(
              'px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider min-w-[20px] text-center border transition-colors duration-100',
              active
                ? 'bg-white/20 text-white border-white/30'
                : 'bg-surface-secondary text-fg-muted border-border',
            )}
          >
            {key === 'g' ? 'G' : key}
          </kbd>
        ))}
      </div>
    </div>
  );
}

function ActionIcon({ category }: { category: string }) {
  const icon = category === 'Navigation' ? '⌘' : category === 'Utility' ? '⚡' : '→';
  return (
    <span className="text-xs text-fg-muted/60 font-mono">{icon}</span>
  );
}

// ─── Search Input ─────────────────────────────────────────────────────

function KbarSearchInput() {
  return (
    <div className="border-b border-border">
      <KBarSearch
        defaultPlaceholder="Search commands and pages…"
        className="w-full px-4 py-4 text-sm text-fg bg-transparent outline-none placeholder:text-fg-muted/50"
      />
    </div>
  );
}

// ─── Kbar Modal ───────────────────────────────────────────────────────

function KbarModal() {
  return (
    <KBarPortal>
      {/* Overlay */}
      <KBarPositioner className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
        <KBarAnimator className="w-full max-w-[560px] bg-white border-2 border-black shadow-2xl overflow-hidden">
          {/* Search */}
          <KbarSearchInput />

          {/* Results */}
          <KbarResults />

          {/* Footer hints */}
          <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-[9px] text-fg-muted/50 uppercase tracking-wider">
            <span>↑↓ — Navigate</span>
            <span>Enter — Open</span>
            <span>Esc — Close</span>
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

// ─── Kbar Provider Wrapper ───────────────────────────────────────────

export function KbarRoot({ children }: { children: React.ReactNode }) {
  return (
    <KBarProvider actions={allActions}>
      <KbarModal />
      {children}
    </KBarProvider>
  );
}
