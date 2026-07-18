/**
 * /systems/:system/:track/:lesson
 *
 * Lesson viewing page with beautiful sidebar + outline:
 * - Left SidebarNav: all track lessons (expandable icon strip)
 * - Right LessonOutline: section headings with active tracking
 * - GSAP ScrollSmoother for butter-smooth scrolling
 * - Real lesson content from curriculum markdown files (via API)
 * - Fixed previous lesson validation logic
 * - Prev/Next lesson navigation at bottom
 * - View submissions button with popup
 * - Keyboard shortcuts: j/k for nav, / for shortcuts help
 */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import {
  Heading, Text, Button, Spinner, Badge, Divider,
  Icon, AnimatedIcon, SidebarNav, MobileNav,
} from '@/presentation/__components';
import type { SidebarNavItem, MobileNavItem } from '@/presentation/__components';
import { cn } from '@/application/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────

interface LessonMeta {
  slug: string;
  title: string;
  type: string;
  trackSlug: string;
}

interface TrackInfo {
  slug: string;
  title: string;
  language: string;
}

interface CurriculumData {
  enrolled: boolean;
  rows: UserProgressRow[];
  tracks: TrackInfo[];
  lessons: LessonMeta[];
  currentTrack: string;
}

interface UserProgressRow {
  githubEmail: string;
  systemSlug: string;
  trackSlug: string;
  lessonSlug: string;
  lessonType: string;
  isValidated: boolean;
  updatedAt: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface LessonContent {
  slug: string;
  title: string;
  content: string;
  type: string;
  track: string;
  module: string;
  estimatedTime?: string;
  difficulty?: string;
}

interface Submission {
  githubEmail: string;
  submissionLink: string | null;
  liveLink: string | null;
  likedNumber: number;
  isReported: boolean;
  reportedNumber: number;
}

// ─── Hardcoded Lesson Content (fallback when API unavailable) ──────

const FALLBACK_LESSON_CONTENT: Record<string, { title: string; content: string; type: string }> = {
  'lesson-intro-and-setup': {
    title: 'Introduction & Setup',
    type: 'lesson',
    content: `## Overview\n\nIn this lesson, you'll set up your development environment and learn the fundamentals of building a CLI tool.\n\n## Prerequisites\n\n- Node.js installed\n- Basic TypeScript knowledge\n- A code editor\n\n## Steps\n\n1. Install the required dependencies\n2. Set up your project structure\n3. Create your first command\n\n## Next Steps\n\nOnce you've completed the setup, you'll be ready to move on to building your first CLI commands.\n\n## Validation Checklist\n\n- [ ] package.json exists with all dependencies\n- [ ] tsconfig.json exists with proper configuration\n- [ ] npx tsc --noEmit passes without errors\n- [ ] npm run build completes successfully`,
  },
  'lesson-build-cli': {
    title: 'Build the CLI',
    type: 'lesson',
    content: `## Building Your CLI\n\nLearn how to structure and build a command-line interface.\n\n## Key Concepts\n\n- Command parsing\n- Argument handling\n- User interaction\n- Error handling\n\n## Implementation\n\nThe core of your CLI is the entry point that parses commands and dispatches to handlers.\n\n## Testing\n\nAlways test your CLI thoroughly before publishing.`,
  },
  'lesson-llm-integration': {
    title: 'LLM Integration',
    type: 'lesson',
    content: `## LLM Integration\n\nLearn how to integrate Large Language Models into your applications.\n\n## API Setup\n\nFirst, you'll need to set up API access to an LLM provider.\n\n## Prompt Engineering\n\nCraft effective prompts for different use cases.\n\n## Streaming Responses\n\nHandle real-time streaming responses for better UX.`,
  },
  'quiz-cli-foundations': {
    title: 'Quiz: CLI Foundations',
    type: 'quiz',
    content: `## Quiz Time!\n\nAnswer the following questions to test your understanding.\n\n## Question 1\n\nWhat is the purpose of a CLI?\n\n## Question 2\n\nHow do you handle user input?\n\n## Question 3\n\nWhat are the best practices for CLI design?`,
  },
  'challenge-build-agent': {
    title: 'Challenge: Build Agent',
    type: 'challenge',
    content: `## Challenge\n\nBuild your own AI-powered coding agent that operates in the terminal.\n\n## Requirements\n\n- Must accept natural language commands\n- Should integrate with an LLM\n- Must handle errors gracefully\n\n## Submission\n\nShare your solution link once completed.`,
  },
  'lesson-intro-to-java': {
    title: 'Introduction to Java',
    type: 'lesson',
    content: `## Introduction to Java\n\nLearn the fundamentals of Java programming.\n\n## Setup\n\nInstall JDK and set up your development environment.\n\n## Basic Syntax\n\nUnderstand Java syntax, data types, and control flow.`,
  },
  'lesson-spring-boot-basics': {
    title: 'Spring Boot Basics',
    type: 'lesson',
    content: `## Spring Boot Basics\n\nLearn how to build applications with Spring Boot.\n\n## Project Setup\n\nUse Spring Initializr to bootstrap your project.\n\n## REST Controllers\n\nCreate REST endpoints with Spring MVC.`,
  },
  'quiz-java-fundamentals': {
    title: 'Quiz: Java Fundamentals',
    type: 'quiz',
    content: `## Quiz: Java Fundamentals\n\nTest your knowledge of Java basics.\n\n## Question 1\n\nWhat is the JVM?\n\n## Question 2\n\nExplain the difference between JDK and JRE.`,
  },
  'lesson-intro-microservices': {
    title: 'Introduction to Microservices',
    type: 'lesson',
    content: `## Introduction to Microservices\n\nUnderstand the fundamentals of microservices architecture.\n\n## Core Concepts\n\n- Service decomposition\n- Communication patterns\n- Data management`,
  },
  'lesson-rest-api-design': {
    title: 'REST API Design',
    type: 'lesson',
    content: `## REST API Design\n\nLearn best practices for designing RESTful APIs.\n\n## Resource Modeling\n\nDesign your API around resources.\n\n## HTTP Methods\n\nUse the correct HTTP methods for each operation.`,
  },
  'quiz-microservices-basics': {
    title: 'Quiz: Microservices Basics',
    type: 'quiz',
    content: `## Quiz: Microservices Basics\n\nTest your understanding of microservices.\n\n## Question 1\n\nWhat is service discovery?\n\n## Question 2\n\nExplain the difference between orchestration and choreography.`,
  },
  'lesson-nestjs-intro': {
    title: 'NestJS Introduction',
    type: 'lesson',
    content: `## NestJS Introduction\n\nGet started with NestJS framework.\n\n## Setup\n\nInstall NestJS CLI and create your first project.\n\n## Modules\n\nUnderstand NestJS module system.`,
  },
};

// ─── Helpers ────────────────────────────────────────────────────────

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

// ─── LessonOutline Component ────────────────────────────────────────

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

// ─── Keyboard Shortcuts Overlay ─────────────────────────────────────

function KeyboardShortcutsOverlay({ onClose }: { onClose: () => void }) {
  const shortcuts = [
    { key: 'j', action: 'Next lesson' },
    { key: 'k', action: 'Previous lesson' },
    { key: '/', action: 'Toggle this help' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-[60]" onClick={onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
        <div className="bg-white shadow-2xl border border-border p-6 w-72 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-fg">
              Keyboard Shortcuts
            </span>
            <button onClick={onClose} className="text-fg-muted hover:text-fg transition-colors">
              <Icon name="x" size={14} />
            </button>
          </div>
          <div className="space-y-2.5">
            {shortcuts.map((s) => (
              <div key={s.key} className="flex items-center justify-between">
                <span className="text-xs font-semibold text-fg">{s.action}</span>
                <kbd className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-[10px] font-bold font-mono uppercase bg-gray-100 text-fg-muted border border-gray-200">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Copy Button ────────────────────────────────────────────────────

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

// ─── Main Lesson Page ───────────────────────────────────────────────

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const systemSlug = params.system as string;
  const trackSlug = params.track as string;
  const lessonSlug = params.lesson as string;

  const email = user?.primaryEmailAddress?.emailAddress;

  // ─── State ──────────────────────────────────────────────────────
  const [curriculum, setCurriculum] = useState<CurriculumData | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgressRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // ─── Lesson Content (from API or fallback) ──────────────────────
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);

  const lesson = lessonContent || FALLBACK_LESSON_CONTENT[lessonSlug] || null;

  // ─── Fetch real lesson content from API ─────────────────────────
  useEffect(() => {
    async function fetchLessonContent() {
      try {
        const res = await fetch(`/api/v1/lesson-content/${systemSlug}/${trackSlug}/${lessonSlug}`);
        if (res.ok) {
          const data = await res.json();
          setLessonContent(data);
        }
      } catch {
        // Fallback to FALLBACK_LESSON_CONTENT — handled below
      }
    }
    fetchLessonContent();
  }, [systemSlug, trackSlug, lessonSlug]);

  // ─── GSAP ScrollSmoother Initialization ────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      normalizeScroll: false,
    });
    return () => { smoother.kill(); };
  }, []);

  // ─── Derive data from curriculum ────────────────────────────────
  const allLessons: LessonMeta[] = useMemo(() => {
    if (curriculum) {
      return curriculum.lessons.filter(l => l.trackSlug === trackSlug);
    }
    return [];
  }, [curriculum, trackSlug]);

  const allTracks: TrackInfo[] = useMemo(() => {
    return curriculum?.tracks || [];
  }, [curriculum]);

  const lessonIndex = allLessons.findIndex(l => l.slug === lessonSlug);
  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  // ─── Check previous lesson validation ───────────────────────────
  const previousLessonValidated = useMemo(() => {
    if (lessonIndex <= 0) return true;
    const previousSlug = allLessons[lessonIndex - 1]?.slug;
    if (!previousSlug) return true;
    return userProgress.some(p => p.lessonSlug === previousSlug && p.isValidated);
  }, [lessonIndex, allLessons, userProgress]);

  const isCurrentLessonValidated = useMemo(() => {
    return userProgress.some(p => p.lessonSlug === lessonSlug && p.isValidated);
  }, [lessonSlug, userProgress]);

  // ─── Load curriculum + progress ─────────────────────────────────
  useEffect(() => {
    const cacheKey = systemSlug;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        const data = JSON.parse(cached) as CurriculumData;
        setCurriculum(data);
        setUserProgress(data.rows || []);

        if (data.lessons && data.tracks) {
          setLoading(false);
          return;
        }
      } catch { /* fall through to API fetch */ }
    }

    if (email) {
      fetch(`/api/v1/user_progress/${encodeURIComponent(email)}/${systemSlug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.rows) setUserProgress(data.rows);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [systemSlug, email]);

  // ─── IntersectionObserver for active heading ────────────────────
  useEffect(() => {
    if (!lesson || !lesson.content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveHeading(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('[id^="heading-"]').forEach((el) => observer.observe(el));
    }, 300);

    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [lesson]);

  // ─── Keyboard shortcuts (j/k for nav, / for shortcuts) ─────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        if (nextLesson) navigateToLesson(nextLesson.slug);
      } else if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        if (prevLesson) navigateToLesson(prevLesson.slug);
      } else if (e.key === '/') {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevLesson, nextLesson, lessonSlug]);

  // ─── Navigation ─────────────────────────────────────────────────
  const navigateToLesson = useCallback((slug: string) => {
    setSidebarOpen(false);
    if (curriculum) {
      localStorage.setItem(systemSlug, JSON.stringify({
        ...curriculum,
        rows: userProgress,
      }));
    }
    router.push(`/systems/${systemSlug}/${trackSlug}/${slug}`);
  }, [systemSlug, trackSlug, curriculum, userProgress, router]);

  const handleSidebarNav = useCallback((navItem: SidebarNavItem) => {
    navigateToLesson(navItem.id);
  }, [navigateToLesson]);

  const handleGoBack = () => {
    if (curriculum) {
      localStorage.setItem(systemSlug, JSON.stringify({
        ...curriculum,
        rows: userProgress,
      }));
    }
    router.push(`/systems/${systemSlug}`);
  };

  // ─── Extract headings from lesson content ───────────────────────
  const headings = useMemo(() => {
    if (!lesson?.content) return [];
    return extractHeadings(lesson.content);
  }, [lesson]);

  // ─── Render markdown content ─────────────────────────────────────
  const renderContent = useCallback((content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];

    let codeBlock: string[] | null = null;
    let codeLang = '';
    let listBuffer: React.ReactNode[] = [];

    function flushList() {
      if (listBuffer.length > 0) {
        elements.push(<ul key={`ul-${elements.length}`} className="list-disc pl-6 mb-4 space-y-1">{listBuffer}</ul>);
        listBuffer = [];
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code block handling
      if (line.startsWith('```') && codeBlock !== null) {
        codeBlock.push(line);
        // End of code block
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-gray-50 border border-gray-200 p-4 mb-6 overflow-x-auto text-sm font-mono">
            <code>{codeBlock.slice(1, -1).join('\n')}</code>
          </pre>
        );
        codeBlock = null;
        codeLang = '';
        continue;
      }
      if (line.startsWith('```')) {
        codeBlock = [];
        codeLang = line.slice(3).trim();
        continue;
      }
      if (codeBlock !== null) {
        codeBlock.push(line);
        continue;
      }

      flushList();

      // Headings
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '');
        const id = `heading-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
        elements.push(
          <Heading key={`h2-${i}`} variant="h2" id={id} className="mt-10 mb-4 scroll-mt-24">{text}</Heading>
        );
        continue;
      }
      if (line.startsWith('### ')) {
        const text = line.replace('### ', '');
        const id = `heading-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
        elements.push(
          <Heading key={`h3-${i}`} variant="h3" id={id} className="mt-8 mb-3 scroll-mt-24">{text}</Heading>
        );
        continue;
      }

      // List items
      if (line.startsWith('- ')) {
        listBuffer.push(
          <li key={`li-${i}`} className="text-fg-tertiary">{line.replace('- ', '')}</li>
        );
        continue;
      }
      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') ||
          line.startsWith('4. ') || line.startsWith('5. ') || line.startsWith('6. ') ||
          line.startsWith('7. ') || line.startsWith('8. ') || line.startsWith('9. ') ||
          line.startsWith('0. ')) {
        listBuffer.push(
          <li key={`li-${i}`} className="text-fg-tertiary">{line.replace(/^\d+\. /, '')}</li>
        );
        continue;
      }

      // Checkboxes
      if (line.includes('- [ ]') || line.includes('- [x]')) {
        const checked = line.includes('[x]');
        const text = line.replace(/^- \[[x ]\] /, '');
        elements.push(
          <div key={`cb-${i}`} className="flex items-start gap-2 mb-2">
            <span className={cn(
              'w-4 h-4 border flex items-center justify-center shrink-0 mt-0.5',
              checked ? 'bg-green-500 border-green-500' : 'border-gray-300'
            )}>
              {checked && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <Text variant="body-sm" className={checked ? 'line-through text-fg-muted' : ''}>{text}</Text>
          </div>
        );
        continue;
      }

      // Empty line
      if (line.trim() === '') {
        elements.push(<div key={`br-${i}`} className="h-2" />);
        continue;
      }

      // Plain text (paragraph)
      elements.push(<Text key={`p-${i}`} variant="body" className="mb-3 leading-relaxed">{line}</Text>);
    }

    flushList();
    return elements;
  }, []);

  // ─── Submissions ─────────────────────────────────────────────────
  const handleViewSubmissions = async () => {
    setShowSubmissions(true);
    setSubmissionsLoading(true);
    try {
      const res = await fetch(`/api/v1/submissions/${systemSlug}/${trackSlug}/${lessonSlug}?limit=50`);
      const data = await res.json();
      if (data.submissions) setSubmissions(data.submissions);
    } catch { /* noop */ }
    setSubmissionsLoading(false);
  };

  const handleLike = async (submission: Submission) => {
    if (!email) return;
    try {
      await fetch('/api/v1/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_email: submission.githubEmail,
          system_slug: systemSlug,
          track_slug: trackSlug,
          lesson_slug: lessonSlug,
        }),
      });
      setSubmissions(prev =>
        prev.map(s =>
          s.githubEmail === submission.githubEmail
            ? { ...s, likedNumber: s.likedNumber + 1 }
            : s
        )
      );
    } catch { /* noop */ }
  };

  const handleReport = async (submission: Submission) => {
    if (!email) return;
    try {
      await fetch('/api/v1/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_email: submission.githubEmail,
          system_slug: systemSlug,
          track_slug: trackSlug,
          lesson_slug: lessonSlug,
        }),
      });
      setSubmissions(prev =>
        prev.map(s =>
          s.githubEmail === submission.githubEmail
            ? { ...s, isReported: true, reportedNumber: s.reportedNumber + 1 }
            : s
        )
      );
    } catch { /* noop */ }
  };

  const [likedSubmissions, setLikedSubmissions] = useState<Record<string, boolean>>({});

  // ─── Sidebar Nav Items ──────────────────────────────────────────
  const sidebarItems: SidebarNavItem[] = useMemo(() => {
    return allLessons.map(l => ({
      id: l.slug,
      label: l.title,
      iconName: l.slug === lessonSlug ? 'bookmark' : 'file-text',
    }));
  }, [allLessons, lessonSlug]);

  // ─── Mobile Nav Items ──────────────────────────────────────────
  const mobileItems: MobileNavItem[] = useMemo(() => [
    { id: 'settings', label: 'Settings', iconName: 'settings' },
    { id: 'outline', label: 'Outline', iconName: 'list' },
    { id: 'submissions', label: 'Submissions', iconName: 'message-square' },
  ], []);

  const handleMobileNav = useCallback((navItem: MobileNavItem) => {
    if (navItem.id === 'settings') {
      setSettingsOpen(prev => !prev);
    } else if (navItem.id === 'outline') {
      setSidebarOpen(prev => !prev);
    } else if (navItem.id === 'submissions') {
      handleViewSubmissions();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Loading State ──────────────────────────────────────────────
  const resolveLessonTitle = lessonContent?.title || (FALLBACK_LESSON_CONTENT[lessonSlug]?.title) || null;
  const resolveLessonType = lessonContent?.type || (FALLBACK_LESSON_CONTENT[lessonSlug]?.type) || 'lesson';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <Heading variant="h1">Lesson Not Found</Heading>
        <Text variant="body" className="mt-4">The lesson &quot;{lessonSlug}&quot; does not exist.</Text>
        <Button variant="ghost" className="mt-4" onClick={handleGoBack}>
          ← Back to System
        </Button>
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
      <aside className="fixed right-0 top-0 h-screen z-30 hidden xl:block w-72 bg-white border-l border-gray-100">
        <div className="h-full overflow-y-auto pr-8 pl-6 pt-10 pb-20">
          {headings.length > 0 && (
            <div className="mb-10">
              <LessonOutline
                headings={headings}
                activeId={activeHeading}
                onSelect={(id) => {
                  const smoother = ScrollSmoother.get();
                  if (smoother) {
                    smoother.scrollTo(`#${id}`, true, 'top top');
                  } else {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
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
                <span className="text-xs font-semibold text-fg">{lessonIndex + 1} / {allLessons.length}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-fg-muted">Type</span>
                <span className="text-xs font-semibold uppercase text-fg">{resolveLessonType}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-fg-muted">Status</span>
                <span className={cn(
                  'text-xs font-semibold uppercase',
                  isCurrentLessonValidated ? 'text-green-600' : 'text-fg-muted',
                )}>
                  {isCurrentLessonValidated ? 'Validated' : 'Pending'}
                </span>
              </div>
              {lessonContent?.estimatedTime && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-fg-muted">Est. time</span>
                  <span className="text-xs font-semibold text-fg">{lessonContent.estimatedTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="px-2">
            <button
              onClick={() => setShowShortcuts(true)}
              className="text-xs text-fg-muted hover:text-accent transition-colors flex items-center gap-2"
            >
              <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[9px] font-bold font-mono uppercase bg-gray-100 border border-gray-200">
                /
              </kbd>
              <span>Keyboard shortcuts</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ GSAP Smooth Wrapper ═══ */}
      <div id="smooth-wrapper" className="flex-1 min-h-screen lg:ml-[60px]">
        <div id="smooth-content">
          <div className="max-w-[800px] mx-auto px-6 py-12">

            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
                Back to {systemSlug}
              </button>

              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 text-fg-secondary hover:text-accent transition-colors"
                  aria-label="Toggle sidebar"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
                <CopyButton content={lesson.content} />
              </div>
            </div>

            {/* ═══ Previous Lesson Warning ═══ */}
            {lessonIndex > 0 && !previousLessonValidated && (
              <div className="border border-accent-yellow bg-accent-yellow/10 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AnimatedIcon name="alert-circle" size={20} color="#facc15" isAnimated={true} />
                  <div>
                    <Text variant="body" className="font-semibold">Previous lesson not validated</Text>
                    <Text variant="body-sm" className="mt-1">
                      You will not be able to complete this lesson because the previous lesson has not been validated yet through our CLI.
                    </Text>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ Lesson Header ═══ */}
            <div className="flex items-center gap-3 mb-2">
              {resolveLessonType !== 'lesson' && (
                <Badge variant={resolveLessonType === 'quiz' ? 'yellow' : 'purple'} size="sm">
                  {resolveLessonType.toUpperCase()}
                </Badge>
              )}
              {isCurrentLessonValidated && (
                <Badge variant="yellow" size="sm">✓ Validated</Badge>
              )}
              <span className="text-xs text-fg-muted">
                Lesson {lessonIndex + 1} of {allLessons.length}
              </span>
            </div>

            <Heading variant="h1" className="mb-8">{resolveLessonTitle}</Heading>

            <Divider className="mb-8" />

            {/* ═══ Lesson Content ═══ */}
            <div className="prose prose-sm max-w-none">
              {renderContent(lesson.content)}
            </div>

            <Divider className="my-8" />

            {/* ═══ Prev / Next Navigation ═══ */}
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
                <div />
              )}
            </div>

            {/* ═══ View Submissions Button ═══ */}
            <div className="flex items-center gap-4">
              <Button variant="primary" size="default" onClick={handleViewSubmissions}>
                View Submissions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Back to Top Button ═══ */}
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

      {/* ═══ Mobile Bottom Nav ═══ */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <MobileNav items={mobileItems} activeId="" onNavigate={handleMobileNav} />
      </div>

      {/* ═══ Keyboard Shortcuts Overlay ═══ */}
      {showShortcuts && (
        <KeyboardShortcutsOverlay onClose={() => setShowShortcuts(false)} />
      )}

      {/* ═══ Submissions Popup ═══ */}
      {showSubmissions && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[600px] max-h-[80vh] overflow-y-auto border border-black">
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
              <Heading variant="h4">Submissions</Heading>
              <button onClick={() => setShowSubmissions(false)} className="text-fg-muted hover:text-fg">
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="px-6 py-4">
              {submissionsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Spinner size="lg" />
                </div>
              ) : submissions.length === 0 ? (
                <Text variant="body" className="text-fg-muted text-center py-8">
                  No submissions yet. Be the first!
                </Text>
              ) : (
                <div className="space-y-2">
                  {submissions.map((s, i) => {
                    const isLiked = likedSubmissions[s.githubEmail] || false;
                    return (
                      <div
                        key={i}
                        className="border border-black bg-white group cursor-pointer hover:bg-accent-bg/30 transition-colors duration-150"
                        onClick={() => {
                          if (s.submissionLink) {
                            window.open(s.submissionLink, '_blank', 'noopener,noreferrer');
                          }
                        }}
                      >
                        <div className="px-5 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-8 h-8 bg-accent-bg flex items-center justify-center">
                                <span className="text-xs font-bold text-accent">
                                  {s.githubEmail.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <Text variant="body-sm" className="font-semibold text-fg group-hover:text-accent transition-colors">
                                  {s.githubEmail.split('@')[0]}
                                </Text>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleLike(s);
                                      setLikedSubmissions(prev => ({ ...prev, [s.githubEmail]: !isLiked }));
                                    }}
                                    className="flex items-center gap-1 transition-colors duration-150 group"
                                  >
                                    <svg
                                      width="14" height="14" viewBox="0 0 24 24"
                                      fill={isLiked ? 'currentColor' : 'none'}
                                      stroke="currentColor"
                                      strokeWidth={isLiked ? 0 : 2}
                                      strokeLinecap="round" strokeLinejoin="round"
                                      className={cn(
                                        'shrink-0 transition-colors duration-150',
                                        isLiked ? 'text-red-500' : 'text-fg-muted group-hover:text-red-400'
                                      )}
                                    >
                                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                    <Text variant="caption" className={cn(isLiked ? 'text-red-500 font-semibold' : 'text-fg-muted')}>
                                      {s.likedNumber}
                                    </Text>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                              {s.liveLink && (
                                <a
                                  href={s.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-150"
                                >
                                  View Live
                                </a>
                              )}
                              <a
                                href={s.submissionLink || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent-hover transition-colors duration-150"
                              >
                                Open
                              </a>
                              <button
                                onClick={() => handleReport(s)}
                                className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-fg-muted border border-border hover:text-red-500 hover:border-red-300 transition-all duration-150"
                                disabled={s.isReported}
                              >
                                {s.isReported ? 'Reported' : 'Report'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
