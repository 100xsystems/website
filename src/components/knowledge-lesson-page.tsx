/**
 * Knowledge Lesson Page — Client Component
 *
 * Full-featured lesson reading experience:
 * - Left SidebarNav: all lessons in the hub (expandable icon strip)
 * - Right LessonOutline: section headings with active tracking
 * - GSAP ScrollSmoother for butter-smooth scrolling
 * - ReadingToolbar: font size, line height, font family, code theme controls
 * - MarkdownRenderer with syntax-highlighted code blocks
 * - Prev/Next lesson navigation
 * - Mobile bottom nav
 */

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import {
  SidebarNav, MobileNav,
} from '@/presentation/__components';
import type { SidebarNavItem, MobileNavItem } from '@/presentation/__components';
import { cn } from '@/application/lib/utils';
import { MarkdownRenderer } from '@/lib/markdown-renderer';
import {
  ReadingProvider,
  useReadingSettings,
  contentWidthClass,
  fontFamilyClass,
  fontSizeRem,
  lineHeightValue,
} from '@/lib/reading-context';
import { ReadingToolbar } from '@/components/reading/ReadingToolbar';
import type { LessonMetaFE } from '@/lib/lesson-metadata';
import matter from 'gray-matter';

// ══════════════════════════════════════════════════════════════════════
// TYPES (LessonMetaFE lives in @/lib/lesson-metadata — server-safe module)
// ══════════════════════════════════════════════════════════════════════

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

// ══════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════

/**
 * Parse lesson frontmatter with gray-matter (works client-side).
 * Handles YAML AND JSON frontmatter blocks, including nested structures
 * like the `references:` list-of-objects used by language courses.
 */
function parseFrontmatter(raw: string): { content: string; frontmatter: Record<string, unknown> } {
  try {
    const parsed = matter(raw);
    const frontmatter = (parsed.data ?? {}) as Record<string, unknown>;
    return { content: parsed.content.trim(), frontmatter };
  } catch {
    // Fall back to raw content on malformed frontmatter — never crash a lesson.
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
    return { content: (match ? raw.slice(match[0].length) : raw).trim(), frontmatter: {} };
  }
}

function extractHeadings(markdown: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const regex = /^(#{2,4})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ id, text, level });
  }
  return headings;
}

/** Build URL for a lesson .md file in the knowledge-cache */
function lessonMdUrl(category: string, hubSlug: string, lessonSlug: string): string {
  return `/knowledge-cache/${category}/${hubSlug}/${lessonSlug}.md`;
}

// ══════════════════════════════════════════════════════════════════════
// LESSON METADATA HELPERS — prerequisites, knowledge refs, references
// ══════════════════════════════════════════════════════════════════════

const KNOWLEDGE_CATEGORIES = [
  'ai', 'languages', 'principles', 'patterns', 'tools', 'technologies',
  'case-studies', 'system-design', 'frameworks', 'infrastructure',
  'databases', 'data-formats', 'runtimes',
];

function humanizeSlug(slug: string): string {
  const cleaned = slug
    .replace(/^[a-z]+-\d+-/i, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return cleaned ? cleaned.replace(/\b\w/g, (c) => c.toUpperCase()) : slug;
}

interface ResolvedRef {
  label: string;
  href: string;
}

function resolveKnowledgeRef(
  ref: string | { slug?: string; title?: string },
  category: string,
): ResolvedRef {
  // Handle object format: { slug: "patterns-consistent-hashing", title: "Consistent Hashing" }
  if (typeof ref === 'object' && ref !== null) {
    const slug = ref.slug || '';
    const label = ref.title || humanizeSlug(slug);
    if (!slug) return { label: label || 'Reference', href: '#' };
    // Object refs are bare slugs — link within the current category
    return { label, href: `/knowledge/${category}/${slug}` };
  }

  // Handle string format (bare slug or path-based slug)
  const refStr = String(ref);
  const parts = refStr.split('/').filter(Boolean);
  const label = humanizeSlug(parts[parts.length - 1] || refStr);
  if (parts.length >= 3) {
    // category/hub/lesson
    return { label, href: `/knowledge/${parts.slice(0, 3).join('/')}` };
  }
  if (parts.length === 2) {
    // category/hub OR hub/lesson within the current category
    if (KNOWLEDGE_CATEGORIES.includes(parts[0])) {
      return { label, href: `/knowledge/${parts.join('/')}` };
    }
    return { label, href: `/knowledge/${category}/${parts.join('/')}` };
  }
  return { label, href: `/knowledge/${category}/${parts[0]}` };
}

function resolvePrereq(
  pre: string,
  lessons: LessonMetaFE[],
  category: string,
  hubSlug: string,
  siblingHubs: Array<{ slug: string; lessons: LessonMetaFE[] }> = [],
): { label: string; href?: string } {
  // Normalize both sides so punctuation (colons, commas, quotes) doesn't break matching
  const strip = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const preStrip = strip(pre);
  if (preStrip.length < 4) return { label: pre };
  const matchIn = (ls: LessonMetaFE[]) =>
    ls.find((l) => {
      const slugNorm = strip(l.slug);
      if (slugNorm.length < 4) return false;
      // e.g. pre "JS-01: Values, Types, and Variables" ↔ slug "js-01-values-types-variables"
      return slugNorm.startsWith(preStrip) || preStrip.startsWith(slugNorm);
    });
  // 1) Same-hub match first (e.g. "RL-02: Markov Decision Processes" inside the RL course).
  const sameHub = matchIn(lessons);
  if (sameHub) return { label: sameHub.title, href: `/knowledge/${category}/${hubSlug}/${sameHub.slug}` };
  // 2) Cross-course match (e.g. "GENAI-01: What Is Generative AI?" inside LLM Engineering).
  for (const sibling of siblingHubs) {
    const hit = matchIn(sibling.lessons);
    if (hit) return { label: hit.title, href: `/knowledge/${category}/${sibling.slug}/${hit.slug}` };
  }
  return { label: pre };
}

/** Split markdown into top-level ## sections (fence-aware) */
function splitMarkdownSections(markdown: string): { heading: string | null; body: string }[] {
  const lines = markdown.split('\n');
  const sections: { heading: string | null; body: string[] }[] = [];
  let current: { heading: string | null; body: string[] } | null = null;
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    const m = !inFence && /^##\s+(.+)$/.exec(line);
    if (m) {
      if (current) sections.push(current);
      current = { heading: m[1].trim(), body: [] };
    } else {
      if (!current) current = { heading: null, body: [] };
      current.body.push(line);
    }
  }
  if (current) sections.push(current);
  return sections.map((s) => ({ heading: s.heading, body: s.body.join('\n').trim() }));
}

// ══════════════════════════════════════════════════════════════════════
// SPECIAL CONTENT SECTIONS — distinct high-quality panels
// ══════════════════════════════════════════════════════════════════════

interface SpecialSectionStyle {
  kicker: string;
  panelClass: string;
  headingClass: string;
  icon: React.ReactNode;
}

const SPECIAL_SECTION_STYLES: Record<string, SpecialSectionStyle> = {
  'Practice Questions': {
    kicker: 'Practice Questions',
    panelClass: 'bg-surface-secondary',
    headingClass: 'text-fg',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  'LLM Prompts for Deeper Understanding': {
    kicker: 'LLM Prompts for Deeper Understanding',
    panelClass: 'bg-accent/5',
    headingClass: 'text-accent',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  'Key Takeaways': {
    kicker: 'Key Takeaways',
    panelClass: 'bg-accent-yellow/10',
    headingClass: 'text-fg',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  'Knowledge Check': {
    kicker: 'Knowledge Check',
    panelClass: 'bg-accent/5',
    headingClass: 'text-accent',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
};

function getSpecialSectionStyle(heading: string): SpecialSectionStyle | undefined {
  for (const key of Object.keys(SPECIAL_SECTION_STYLES)) {
    if (heading.toLowerCase() === key.toLowerCase()) return SPECIAL_SECTION_STYLES[key];
  }
  return undefined;
}

// ══════════════════════════════════════════════════════════════════════
// LESSON OUTLINE COMPONENT
// ══════════════════════════════════════════════════════════════════════

function LessonOutline({
  headings,
  activeId,
  onSelect,
}: {
  headings: HeadingItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-fg-muted mb-5 block">
        Lesson content
      </span>
      <div className="flex flex-col space-y-1.5">
        {headings.map((item) => {
          let indent = '';
          if (item.level === 2) indent = 'pl-0';
          else if (item.level === 3) indent = 'pl-4';
          else if (item.level >= 4) indent = 'pl-8';

          const isActive = item.id === activeId;

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                'cursor-pointer text-sm leading-snug py-2 rounded-sm transition-colors duration-150',
                indent,
                isActive
                  ? 'text-fg font-semibold'
                  : 'text-fg-secondary hover:bg-accent hover:text-white',
              )}
            >
              <span className="block truncate px-2">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// SMOOTH CONTENT WRAPPER
// ══════════════════════════════════════════════════════════════════════

function SmoothContent({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const timer = setTimeout(() => {
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 2,
        effects: false,
        normalizeScroll: false,
      });
    }, 0);
    return () => {
      clearTimeout(timer);
      const s = ScrollSmoother.get();
      if (s) s.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="flex-1 min-h-screen lg:ml-[60px]">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// COPY BUTTON
// ══════════════════════════════════════════════════════════════════════

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  }, [content]);
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-2 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 text-fg-muted hover:text-accent"
      title="Copy content for use with LLM"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════
// KNOWLEDGE LESSON PAGE — MAIN EXPORT
// (buildLessonMetadata is server-safe and lives in @/lib/lesson-metadata)
// ══════════════════════════════════════════════════════════════════════

interface KnowledgeLessonPageProps {
  /** Knowledge-cache category directory (e.g. 'principles', 'languages', 'tools') */
  category: string;
  /** Display name for the hub (e.g. 'JavaScript', 'ACID') */
  hubName: string;
  /** Slug of the hub */
  hubSlug: string;
  /** Current lesson slug */
  lessonSlug: string;
  /** All lessons in this hub (for sidebar navigation + prev/next) */
  lessons: LessonMetaFE[];
  /** URL prefix for backUrl and lesson links (e.g. /knowledge/principles) */
  backUrlPrefix: string;
  /** Optional sibling hubs in the same category — enables clickable cross-course prerequisites. */
  siblingHubs?: Array<{ slug: string; lessons: LessonMetaFE[] }>;
}

export function KnowledgeLessonPage({
  category,
  hubName,
  hubSlug,
  lessonSlug,
  lessons,
  backUrlPrefix,
  siblingHubs = [],
}: KnowledgeLessonPageProps) {
  const router = useRouter();
  const { settings } = useReadingSettings();

  // ─── State ──────────────────────────────────────────────────────
  const [raw, setRaw] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [frontmatter, setFrontmatter] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');

  // ─── Derive data ────────────────────────────────────────────────
  const lesson = lessons.find((l) => l.slug === lessonSlug);
  const currentIndex = lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const isQuiz = lesson?.type === 'quiz';

  // ─── Lesson metadata from frontmatter ───────────────────────────
  const lessonPrereqs = useMemo(
    () => ((frontmatter.prerequisites as string[] | undefined) || []).map((p) => resolvePrereq(p, lessons, category, hubSlug, siblingHubs)),
    [frontmatter, lessons, category, hubSlug, siblingHubs],
  );
  const lessonKnowledgeRefs = useMemo(
    () => ((frontmatter.knowledge_refs as Array<string | { slug?: string; title?: string }> | undefined) || []).map((r) => resolveKnowledgeRef(r, category)),
    [frontmatter, category],
  );
  const lessonReferences = useMemo(
    () => (frontmatter.references as { title: string; url: string }[] | undefined) || [],
    [frontmatter],
  );
  const contentSections = useMemo(() => splitMarkdownSections(content), [content]);

  // ─── Fetch lesson content from knowledge-cache ──────────────────
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(lessonMdUrl(category, hubSlug, lessonSlug));
        if (res.ok) {
          const text = await res.text();
          if (!mounted) return;
          const { content: parsedContent, frontmatter: parsedFm } = parseFrontmatter(text);
          // Drop the redundant slug-prefixed H1 (e.g. "# PY-04-FUNCTIONS-SCOPE: Functions and Scope")
          // — the page header already renders the clean lesson title.
          const cleanedContent = parsedContent.replace(/^#\s+.+\n+/, '');
          setRaw(text);
          setContent(cleanedContent);
          setFrontmatter(parsedFm);
        } else {
          if (!mounted) return;
          setRaw(null);
          setContent('');
        }
      } catch {
        if (!mounted) return;
        setRaw(null);
        setContent('');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [category, hubSlug, lessonSlug]);

  // ─── Extract headings from content ──────────────────────────────
  const headings = useMemo(() => {
    if (!content) return [];
    return extractHeadings(content);
  }, [content]);

  // ─── IntersectionObserver for active heading ────────────────────
  useEffect(() => {
    if (!content) return;

    const visibleHeadings = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleHeadings.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.delete(entry.target.id);
          }
        }
        let bestId = '';
        let bestTop = Infinity;
        for (const [id, top] of visibleHeadings) {
          if (top < bestTop) { bestTop = top; bestId = id; }
        }
        if (bestId) setActiveHeading(bestId);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('article h2[id], article h3[id], article h4[id]').forEach((el) => {
        observer.observe(el);
      });
    }, 300);

    return () => { clearTimeout(timer); observer.disconnect(); visibleHeadings.clear(); };
  }, [content]);

  // ─── Navigation helpers ─────────────────────────────────────────
  const backUrl = `/${backUrlPrefix}/${hubSlug}`;

  const navigateToLesson = useCallback((slug: string) => {
    setSidebarOpen(false);
    router.push(`/${backUrlPrefix}/${hubSlug}/${slug}`);
  }, [backUrlPrefix, hubSlug, router]);

  const handleGoBack = useCallback(() => {
    router.push(backUrl);
  }, [backUrl, router]);

  // ─── Sidebar / Mobile nav items ─────────────────────────────────
  const sidebarItems: SidebarNavItem[] = useMemo(() => {
    return lessons.map((l, index) => ({
      id: l.slug,
      label: l.title,
      number: String(index + 1).padStart(2, '0'),
    }));
  }, [lessons]);

  const mobileItems: MobileNavItem[] = useMemo(() => [
    { id: 'outline', label: 'Outline', iconName: 'list' },
  ], []);

  const handleMobileNav = useCallback((navItem: MobileNavItem) => {
    if (navItem.id === 'outline') {
      setSidebarOpen(prev => !prev);
    }
  }, []);

  const handleSidebarNav = useCallback((navItem: SidebarNavItem) => {
    navigateToLesson(navItem.id);
  }, [navigateToLesson]);

  // ─── Scroll to heading ──────────────────────────────────────────
  const scrollToHeading = useCallback((id: string) => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(`#${id}`, true, 'top top');
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // ─── Loading state ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-fg-muted uppercase tracking-wider">Loading lesson...</span>
        </div>
      </div>
    );
  }

  // ─── Error state (no lesson found) ──────────────────────────────
  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center max-w-md px-6">
          <div className="text-4xl mb-4 text-fg-muted">404</div>
          <h1 className="text-xl font-bold text-fg mb-2">Lesson Not Found</h1>
          <p className="text-sm text-fg-muted mb-6">
            The lesson &quot;{lessonSlug}&quot; does not exist in this course.
          </p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent/90 transition-colors"
          >
            &larr; Back to {hubName}
          </button>
        </div>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-white">
      {/* ═══ Left Sidebar — Lesson Navigation ═══ */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 pt-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 transition-transform duration-300',
          'shrink-0',
        )}
      >
        <SidebarNav
          items={sidebarItems}
          activeId={lessonSlug}
          onItemClick={handleSidebarNav}
        />
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══ Right Sidebar — Lesson Outline ═══ */}
      <aside className="fixed right-0 top-0 h-screen z-30 hidden xl:block w-72 bg-white">
        <div className="h-full overflow-y-auto pr-8 pl-6 pt-10 pb-20">
          {headings.length > 0 && (
            <div className="mb-10">
              <LessonOutline
                headings={headings}
                activeId={activeHeading}
                onSelect={scrollToHeading}
              />
            </div>
          )}

          {/* Lesson Info */}
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-fg-muted mb-5 block">
              Lesson Info
            </span>
            <div className="space-y-2 px-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-fg-muted">Number</span>
                <span className="text-xs font-semibold text-fg">{currentIndex + 1} / {lessons.length}</span>
              </div>
              {lesson.difficulty && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-fg-muted">Difficulty</span>
                  <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-accent text-white">{lesson.difficulty}</span>
                </div>
              )}
              {lesson.duration && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-fg-muted">Duration</span>
                  <span className="text-xs font-semibold text-fg">{lesson.duration}</span>
                </div>
              )}
              {lesson.level && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-fg-muted">Level</span>
                  <span className="text-xs font-bold uppercase text-fg-secondary">{lesson.level}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ GSAP Smooth Wrapper ═══ */}
      <SmoothContent key={lessonSlug}>
        <div className="max-w-[880px] mx-auto px-6 py-12">

          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
              Back to {hubName}
            </button>

            <div className="hidden sm:flex items-center gap-1">
              <ReadingToolbar />
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-fg-secondary hover:text-accent transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              {raw && <CopyButton content={content} />}
            </div>
          </div>

          {/* Lesson Header */}
          <div className="flex items-center gap-3 mb-2">
            {isQuiz && (
              <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-accent-yellow text-black">Quiz</span>
            )}
            {lesson.difficulty && (
              <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-accent text-white">{lesson.difficulty}</span>
            )}
            {lesson.level && (
              <span className="text-[9px] text-fg-muted uppercase tracking-wider">{lesson.level}</span>
            )}
            <span className="text-[9px] text-fg-muted">· Lesson {currentIndex + 1} of {lessons.length}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-fg tracking-tight leading-tight mb-8">
            {lesson.title}
          </h1>

          {/* Prerequisites */}
          {lessonPrereqs.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mr-2">Prerequisites</span>
              {lessonPrereqs.map((p, i) =>
                p.href ? (
                  <Link
                    key={i}
                    href={p.href}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-secondary hover:bg-accent hover:text-white transition-colors duration-200"
                  >
                    {p.label}
                  </Link>
                ) : (
                  <span key={i} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted">
                    {p.label}
                  </span>
                )
              )}
            </div>
          )}

          {/* Knowledge References — the most important */}
          {lessonKnowledgeRefs.length > 0 && (
            <div className="bg-accent text-white p-6 mb-10">
              <div className="flex items-center gap-4 mb-5">
                <span className="flex items-center justify-center w-10 h-10 bg-white/20 text-white shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </span>
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">Related knowledge</span>
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-white">Knowledge References</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {lessonKnowledgeRefs.map((ref, i) => (
                  <Link
                    key={i}
                    href={ref.href}
                    className="group flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  >
                    <span className="flex items-center justify-center w-6 h-6 bg-white/15 text-white text-[10px] font-bold shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">
                      {ref.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Learning Objectives */}
          {!!frontmatter.learning_objectives && Array.isArray(frontmatter.learning_objectives) && (
            <div className="bg-surface-secondary p-6 mb-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-3 block">
                Learning Objectives
              </span>
              <ul className="space-y-1.5">
                {(frontmatter.learning_objectives as string[]).map((obj: string, i: number) => (
                  <li key={i} className="text-sm text-fg-secondary flex items-start gap-2">
                    <span className="text-accent mt-0.5">&rarr;</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* External References */}
          {lessonReferences.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">References</span>
                <div className="h-px flex-1 bg-surface-secondary" />
              </div>
              <div className="space-y-px">
                {lessonReferences.map((ref, i) => (
                  <a
                    key={i}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 px-5 py-4 bg-white hover:bg-accent transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-fg group-hover:text-white transition-colors leading-snug">
                      {ref.title}
                    </span>
                    <span className="text-xs text-fg-muted group-hover:text-white/60 transition-colors shrink-0">&rarr;</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-border mb-10" />

          {/* Lesson Content with MarkdownRenderer */}
          {raw ? (
            <article className={cn(
              contentWidthClass(settings.contentWidth),
              fontFamilyClass(settings.font),
              `text-[${fontSizeRem(settings.fontSize)}]`,
              `leading-[${lineHeightValue(settings.lineHeight)}]`,
              'bg-white min-h-screen pb-24'
            )}>
              {contentSections.map((section, i) => {
                const special = section.heading ? getSpecialSectionStyle(section.heading) : undefined;
                if (special) {
                  return (
                    <section key={i} className={cn('my-10 px-6 py-8', special.panelClass)}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="flex items-center justify-center w-10 h-10 bg-white text-accent shrink-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                          {special.icon}
                        </span>
                        <div>
                          <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-fg-muted">Lesson section</span>
                          <h2 className={cn('text-sm font-extrabold uppercase tracking-widest', special.headingClass)}>
                            {section.heading}
                          </h2>
                        </div>
                      </div>
                      <MarkdownRenderer source={section.body} codeTheme={settings.codeTheme} />
                    </section>
                  );
                }
                return (
                  <MarkdownRenderer
                    key={i}
                    source={section.heading ? `## ${section.heading}\n\n${section.body}` : section.body}
                    codeTheme={settings.codeTheme}
                  />
                );
              })}
            </article>
          ) : (
            <div className="py-20 text-center">
              <p className="text-sm text-fg-muted">
                Lesson content is being prepared. Check back after the next registry sync.
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-border my-12" />

          {/* Prev / Next Navigation */}
          <div className="flex items-center justify-between mb-8">
            {prevLesson ? (
              <button
                onClick={() => navigateToLesson(prevLesson.slug)}
                className="group text-left"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:-translate-x-0.5 transition-transform">
                    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                  </svg>
                  <div>
                    <div className="text-[9px] text-fg-muted uppercase tracking-wider">Previous</div>
                    <div className="text-sm">{prevLesson.title}</div>
                  </div>
                </div>
              </button>
            ) : <div />}
            {nextLesson ? (
              <button
                onClick={() => navigateToLesson(nextLesson.slug)}
                className="group text-right"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                  <div>
                    <div className="text-[9px] text-fg-muted uppercase tracking-wider">Next</div>
                    <div className="text-sm">{nextLesson.title}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </button>
            ) : (
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Complete!
              </button>
            )}
          </div>
        </div>
      </SmoothContent>

      {/* Back to Top Button */}
      <button
        onClick={() => {
          const smoother = ScrollSmoother.get();
          if (smoother) {
            smoother.scrollTo(0, true, 'top');
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        className="fixed bottom-20 right-6 z-40 w-10 h-10 flex items-center justify-center bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.1)] text-fg-muted hover:text-accent transition-all duration-200"
        aria-label="Back to top"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
        </svg>
      </button>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <MobileNav items={mobileItems} activeId="" onNavigate={handleMobileNav} />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// WRAPPER: Page component that includes <ReadingProvider>
// ══════════════════════════════════════════════════════════════════════

export function KnowledgeLessonPageWithProvider(props: KnowledgeLessonPageProps) {
  return (
    <ReadingProvider>
      <KnowledgeLessonPage {...props} />
    </ReadingProvider>
  );
}
