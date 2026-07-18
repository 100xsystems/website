/**
 * /systems/[system]
 *
 * Redesigned system detail page:
 * - Enroll Now / Continue button based on enrollment status
 * - Single column sequential lessons with black borders
 * - Track switcher with language icons (BsTypescript / FaJava)
 * - Leaderboard on right side
 * - Stores curriculum data in localStorage for lesson page sidebar
 */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { BsType, BsFiletypeJava } from 'react-icons/bs';
import type { IconType } from 'react-icons';
import { Heading, Text, Button, Spinner, Badge, AnimatedIcon, Divider } from '@/presentation/__components';
import { cn } from '@/application/lib/utils';

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

interface UserProgressRow {
  githubEmail: string;
  systemSlug: string;
  trackSlug: string;
  lessonSlug: string;
  lessonType: string;
  isValidated: boolean;
  updatedAt: string;
}

interface LeaderboardActivity {
  githubEmail: string;
  githubUsername: string;
  lessonSlug: string;
  timestamp: string;
}

// Language icon map
const LANGUAGE_ICONS: Record<string, IconType> = {
  TypeScript: BsType,
  Java: BsFiletypeJava,
};

// Mock data for demonstration - in production this would come from the registry/curriculum
const SYSTEM_DATA: Record<string, { title: string; description: string; tracks: TrackInfo[]; lessons: LessonMeta[] }> = {
  'claude-code': {
    title: 'Claude Code',
    description: 'Build an AI-powered coding agent that operates directly in your terminal',
    tracks: [
      { slug: 'track-typescript', title: 'TypeScript Track', language: 'TypeScript' },
      { slug: 'track-java', title: 'Java Track', language: 'Java' },
    ],
    lessons: [
      { slug: 'lesson-intro-and-setup', title: 'Introduction & Setup', type: 'lesson', trackSlug: 'track-typescript' },
      { slug: 'lesson-build-cli', title: 'Build the CLI', type: 'lesson', trackSlug: 'track-typescript' },
      { slug: 'lesson-llm-integration', title: 'LLM Integration', type: 'lesson', trackSlug: 'track-typescript' },
      { slug: 'quiz-cli-foundations', title: 'Quiz: CLI Foundations', type: 'quiz', trackSlug: 'track-typescript' },
      { slug: 'challenge-build-agent', title: 'Challenge: Build Agent', type: 'challenge', trackSlug: 'track-typescript' },
      { slug: 'lesson-intro-to-java', title: 'Introduction to Java', type: 'lesson', trackSlug: 'track-java' },
      { slug: 'lesson-spring-boot-basics', title: 'Spring Boot Basics', type: 'lesson', trackSlug: 'track-java' },
      { slug: 'quiz-java-fundamentals', title: 'Quiz: Java Fundamentals', type: 'quiz', trackSlug: 'track-java' },
    ],
  },
  'microservices': {
    title: 'Microservices',
    description: 'Master distributed systems architecture and real-world production patterns',
    tracks: [
      { slug: 'track-spring-boot', title: 'Spring Boot Track', language: 'Java' },
      { slug: 'track-nestjs', title: 'NestJS Track', language: 'TypeScript' },
    ],
    lessons: [
      { slug: 'lesson-intro-microservices', title: 'Introduction to Microservices', type: 'lesson', trackSlug: 'track-spring-boot' },
      { slug: 'lesson-rest-api-design', title: 'REST API Design', type: 'lesson', trackSlug: 'track-spring-boot' },
      { slug: 'quiz-microservices-basics', title: 'Quiz: Microservices Basics', type: 'quiz', trackSlug: 'track-spring-boot' },
      { slug: 'lesson-nestjs-intro', title: 'NestJS Introduction', type: 'lesson', trackSlug: 'track-nestjs' },
    ],
  },
};

export default function SystemPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const systemSlug = params.system as string;

  const [userProgress, setUserProgress] = useState<UserProgressRow[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<string>('');
  const [enrolled, setEnrolled] = useState(false);

  const system = SYSTEM_DATA[systemSlug];
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (!system) { setLoading(false); return; }

    // Set default track
    if (!currentTrack && system.tracks.length > 0) {
      setCurrentTrack(system.tracks[0].slug);
    }

    if (!email || !isSignedIn) {
      setLoading(false);
      return;
    }

    // Fetch user progress for this system
    fetch(`/api/v1/user_progress/${encodeURIComponent(email)}/${systemSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.rows) {
          setUserProgress(data.rows);
          setEnrolled(data.enrolled);
          // Set track from progress if exists
          if (data.rows.length > 0 && data.rows[0].trackSlug) {
            setCurrentTrack(data.rows[0].trackSlug);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch leaderboard
    fetch(`/api/v1/leaderboard/${systemSlug}?limit=10`)
      .then((res) => res.json())
      .then((data) => {
        if (data.activities) setLeaderboard(data.activities);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemSlug, email, isSignedIn]);

  const handleEnroll = async () => {
    if (!email || !isSignedIn) {
      router.push('/sign-in');
      return;
    }

    const currentTrackLessons = system.lessons.filter(l => l.trackSlug === currentTrack);
    const firstLesson = currentTrackLessons[0];
    if (!firstLesson) return;

    try {
      const res = await fetch('/api/v1/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          github_email: email,
          system_slug: systemSlug,
          track_slug: currentTrack,
          lesson_slug: firstLesson.slug,
          lesson_type: firstLesson.type,
        }),
      });

      if (res.ok) {
        setEnrolled(true);
        setUserProgress([{
          githubEmail: email,
          systemSlug,
          trackSlug: currentTrack,
          lessonSlug: firstLesson.slug,
          lessonType: firstLesson.type,
          isValidated: false,
          updatedAt: new Date().toISOString(),
        }]);
      } else {
        const errData = await res.json();
        console.warn('[enroll] Failed:', errData);
      }
    } catch (err) {
      console.warn('[enroll] Error:', err);
    }
  };

  // Check if user is enrolled in the CURRENTLY SELECTED track
  const isEnrolledInCurrentTrack = userProgress.some(p => p.trackSlug === currentTrack);
  const currentTrackLessons = system.lessons.filter(l => l.trackSlug === currentTrack);
  const currentLessonSlug = userProgress.find(p => p.trackSlug === currentTrack)?.lessonSlug;

  const handleContinue = () => {
    const targetLesson = currentLessonSlug || currentTrackLessons[0]?.slug;
    if (targetLesson) {
      // Store full curriculum data + progress in localStorage for lesson page
      localStorage.setItem(systemSlug, JSON.stringify({
        enrolled: isEnrolledInCurrentTrack,
        rows: userProgress,
        tracks: system.tracks,
        lessons: system.lessons,
        currentTrack,
      }));
      router.push(`/systems/${systemSlug}/${currentTrack}/${targetLesson}`);
    }
  };

  // For tracks the user is NOT enrolled in, clicking "View Track" just shows lessons
  const handleViewTrack = () => {
    const firstLesson = currentTrackLessons[0];
    if (firstLesson) {
      localStorage.setItem(systemSlug, JSON.stringify({
        enrolled: isEnrolledInCurrentTrack,
        rows: userProgress,
        tracks: system.tracks,
        lessons: system.lessons,
        currentTrack,
      }));
      router.push(`/systems/${systemSlug}/${currentTrack}/${firstLesson.slug}`);
    }
  };

  const handleLessonClick = (lesson: LessonMeta) => {
    // Check if previous lessons are validated
    const lessonIndex = currentTrackLessons.findIndex(l => l.slug === lesson.slug);
    const previousLessons = currentTrackLessons.slice(0, lessonIndex);
    const allPreviousValidated = previousLessons.every(pl =>
      userProgress.some(p => p.lessonSlug === pl.slug && p.isValidated)
    );

    if (!allPreviousValidated && lessonIndex > 0) {
      const proceed = window.confirm(
        'You haven\'t completed the previous lesson yet. Would you still like to see this lesson?'
      );
      if (!proceed) return;
    }

    // Store full curriculum data in localStorage
    localStorage.setItem(systemSlug, JSON.stringify({
      enrolled: isEnrolledInCurrentTrack,
      rows: userProgress,
      tracks: system.tracks,
      lessons: system.lessons,
      currentTrack,
    }));
    router.push(`/systems/${systemSlug}/${currentTrack}/${lesson.slug}`);
  };

  if (!system) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <Heading variant="h1">System Not Found</Heading>
        <Text variant="body" className="mt-4">The system &quot;{systemSlug}&quot; does not exist.</Text>
      </div>
    );
  }

  // Get language icon for current track
  const currentTrackInfo = system.tracks.find(t => t.slug === currentTrack);
  const LangIcon = currentTrackInfo ? LANGUAGE_ICONS[currentTrackInfo.language] : null;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {/* System Header */}
      <div className="mb-8">
        <Heading variant="h1">{system.title}</Heading>
        <Text variant="body-lg" className="mt-2 text-fg-secondary">{system.description}</Text>
      </div>

      {/* Enrollment Bar */}
      <div className="border-2 border-black bg-white p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {isEnrolledInCurrentTrack ? (
            <Badge variant="yellow" size="sm">✅ Enrolled</Badge>
          ) : (
            <Badge variant="purple" size="sm">Not Enrolled</Badge>
          )}
          {system.tracks.length > 1 && (
            <div className="flex items-center gap-2">
              <Text variant="caption">Track:</Text>
              <select
                value={currentTrack}
                onChange={(e) => setCurrentTrack(e.target.value)}
                className="text-sm border-0 border-b-2 border-border py-1 bg-transparent focus:outline-none focus:border-accent cursor-pointer"
              >
                {system.tracks.map((t) => {
                  const Icon = LANGUAGE_ICONS[t.language];
                  return (
                    <option key={t.slug} value={t.slug}>
                      {t.title}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isEnrolledInCurrentTrack ? (
            <Button variant="primary" size="sm" onClick={handleContinue}>
              Continue → {currentLessonSlug ? `(Lesson ${currentTrackLessons.findIndex(l => l.slug === currentLessonSlug) + 1})` : ''}
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleViewTrack}>
                View Track
              </Button>
              <Button variant="ripple" size="sm" onClick={handleEnroll}>
                Enroll Now
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Track Language Badge */}
      {LangIcon && (
        <div className="flex items-center gap-2 mb-6">
          <LangIcon className="text-xl text-fg-secondary" />
          <span className="text-xs font-bold uppercase tracking-wider text-fg-muted">
            {currentTrackInfo?.language} · {currentTrackLessons.length} lessons
          </span>
        </div>
      )}

      {/* Main Content: Lessons + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lessons Column */}
        <div className="lg:col-span-2">
          <Heading variant="h3" className="mb-4">Lessons</Heading>
          <Divider className="mb-6" />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="space-y-1">
              {currentTrackLessons.map((lesson, index) => {
                const progress = userProgress.find(p => p.lessonSlug === lesson.slug);
                const isValidated = progress?.isValidated || false;
                const isCurrentLesson = lesson.slug === currentLessonSlug;

                return (
                  <button
                    key={lesson.slug}
                    onClick={() => handleLessonClick(lesson)}
                    className={cn(
                      'w-full text-left px-5 py-4 border-2 transition-all duration-200',
                      'hover:border-black',
                      isValidated
                        ? 'border-green-500 bg-green-50'
                        : isCurrentLesson
                          ? 'border-accent bg-accent-bg'
                          : 'border-border bg-white',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-fg-muted w-6">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <Text variant="body" className="font-semibold">{lesson.title}</Text>
                          {lesson.type !== 'lesson' && (
                            <span className={cn(
                              'text-[10px] font-bold uppercase tracking-wider',
                              lesson.type === 'quiz' ? 'text-accent-yellow' : 'text-accent'
                            )}>
                              {lesson.type}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isValidated && <span className="text-green-600 text-sm">✓</span>}
                        {isCurrentLesson && !isValidated && (
                          <span className="text-accent text-xs font-semibold">Current</span>
                        )}
                        <AnimatedIcon name="chevron-right" size={16} color="#a3a3a3" isAnimated={false} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Leaderboard Sidebar */}
        <div>
          <div className="border border-black">
            <div className="px-5 py-4 border-b border-black bg-surface-secondary">
              <Heading variant="h5" className="uppercase tracking-wider">Leaderboard</Heading>
            </div>
            <div className="divide-y divide-border">
              {leaderboard.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <Text variant="muted">No recent activity</Text>
                </div>
              ) : (
                leaderboard.map((a, i) => (
                  <div key={i} className="px-5 py-3 flex items-center gap-3">
                    <span className="text-xs font-bold text-fg-muted w-4">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <Text variant="body-sm" className="font-semibold truncate">{a.githubUsername}</Text>
                      <Text variant="caption" className="text-fg-muted">{a.lessonSlug}</Text>
                    </div>
                    <Text variant="caption" className="text-fg-muted shrink-0">
                      {new Date(a.timestamp).toLocaleDateString()}
                    </Text>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
