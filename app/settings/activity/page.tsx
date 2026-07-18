/**
 * /settings/activity
 *
 * Shows all user activity: systems enrolled, tracks enrolled, lessons completed,
 * submissions, validations with their status counts.
 * Fetches from dedicated /api/v1/activity/:email endpoint.
 */

'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heading, Text, Divider, Spinner, StatCard, TabBar, Badge, Icon, type Tab, AnimatedIcon } from '@/presentation/__components';
import { cn } from '@/application/lib/utils';

interface ActivitySummary {
  systemsEnrolled: number;
  tracksEnrolled: number;
  lessonsCompleted: number;
  submissionsCount: number;
  validationsCount: number;
}

interface LessonInfo {
  lessonSlug: string;
  lessonType: string;
  isValidated: boolean;
  isSubmitted: boolean;
  positiveValidations: number;
  negativeValidations: number;
  updatedAt: string;
}

interface SystemActivity {
  systemSlug: string;
  trackSlug: string;
  enrolledAt: string;
  lessons: LessonInfo[];
  totalLessons: number;
  validatedLessons: number;
  submittedLessons: number;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'systems', label: 'Systems' },
  { id: 'lessons', label: 'Lessons' },
];

const lessonTypeColors: Record<string, string> = {
  quiz: 'bg-accent-yellow text-black',
  challenge: 'bg-accent text-white',
  lesson: 'bg-surface-secondary text-fg',
};

export default function ActivityPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [summary, setSummary] = useState<ActivitySummary | null>(null);
  const [systems, setSystems] = useState<SystemActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { router.push('/'); return; }

    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) { setLoading(false); return; }

    // Fetch from dedicated activity API
    fetch(`/api/v1/activity/${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.summary) setSummary(data.summary);
        if (data.systems) setSystems(data.systems);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('[activity] API error, showing empty:', err);
        setLoading(false);
      });
  }, [isLoaded, isSignedIn, user, router]);

  const allLessons = systems.flatMap(s =>
    s.lessons.map(l => ({ ...l, systemSlug: s.systemSlug, trackSlug: s.trackSlug }))
  );

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-4">
        <Heading variant="h1" className="mb-2">My Activity</Heading>
        <Text variant="muted">Track your learning journey across all systems</Text>
      </div>
      <Divider className="mb-8" />

      {/* Tabs */}
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} variant="underline" className="mb-8" />

      {/* Overview Tab */}
      {activeTab === 'overview' && summary && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              value={summary.systemsEnrolled}
              label="Systems Enrolled"
            />
            <StatCard
              value={summary.tracksEnrolled}
              label="Tracks Enrolled"
            />
            <StatCard
              value={summary.lessonsCompleted}
              label="Lessons Completed"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              value={summary.submissionsCount}
              label="Submissions Made"
            />
            <StatCard
              value={summary.validationsCount}
              label="Validations Passed"
            />
          </div>
        </div>
      )}

      {/* Systems Tab */}
      {activeTab === 'systems' && (
        <div className="space-y-4">
          {systems.length === 0 ? (
            <div className="border border-border bg-white p-12 text-center">
              <AnimatedIcon name="folder" size={32} color="#a3a3a3" isAnimated={false} />
              <Heading variant="h4" className="mt-4">No systems enrolled</Heading>
              <Text variant="body" className="mt-2">Start by enrolling in a system from the Systems page.</Text>
            </div>
          ) : (
            systems.map((sys, i) => (
              <div key={i} className="border border-black bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href={`/systems/${sys.systemSlug}`}
                      className="text-base font-bold text-fg hover:text-accent transition-colors uppercase tracking-wide"
                    >
                      {sys.systemSlug.replace(/-/g, ' ')}
                    </Link>
                    <Text variant="caption" className="block mt-0.5">
                      Track: {sys.trackSlug.replace(/-/g, ' ')}
                    </Text>
                  </div>
                  <div className="text-right">
                    <Text variant="caption" className="text-fg-muted">
                      Enrolled: {new Date(sys.enrolledAt).toLocaleDateString()}
                    </Text>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex-1 h-2 bg-surface-secondary">
                    <div
                      className="h-full bg-accent transition-all duration-500"
                      style={{
                        width: sys.totalLessons > 0
                          ? `${(sys.validatedLessons / sys.totalLessons) * 100}%`
                          : '0%',
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-fg-secondary">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent" />
                      {sys.validatedLessons}/{sys.totalLessons} validated
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent-yellow" />
                      {sys.submittedLessons} submitted
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Lessons Tab */}
      {activeTab === 'lessons' && (
        <div className="space-y-2">
          {allLessons.length === 0 ? (
            <div className="border border-border bg-white p-12 text-center">
              <AnimatedIcon name="file" size={32} color="#a3a3a3" isAnimated={false} />
              <Heading variant="h4" className="mt-4">No lessons started</Heading>
              <Text variant="body" className="mt-2">Complete lessons to see them here.</Text>
            </div>
          ) : (
            allLessons.map((l, i) => (
              <div key={i} className={cn(
                'border px-5 py-4 flex items-center justify-between',
                l.isValidated ? 'border-green-500 bg-green-50' : 'border-border bg-white',
              )}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className={cn(
                    'text-[10px] font-bold uppercase px-2 py-0.5',
                    lessonTypeColors[l.lessonType] || 'bg-surface-secondary text-fg',
                  )}>
                    {l.lessonType}
                  </span>
                  <span className="text-sm font-medium text-fg truncate">
                    {l.lessonSlug.replace(/-/g, ' ')}
                  </span>
                  <Text variant="caption" className="text-fg-muted hidden sm:inline">
                    {l.systemSlug}
                  </Text>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {l.isValidated ? (
                    <Badge variant="yellow" size="sm">✓ Validated</Badge>
                  ) : l.isSubmitted ? (
                    <Badge variant="purple" size="sm">Submitted</Badge>
                  ) : (
                    <span className="text-[10px] text-fg-muted uppercase tracking-wider font-semibold">
                      In Progress
                    </span>
                  )}
                  {l.positiveValidations > 0 && (
                    <span className="text-xs text-green-600 font-semibold">+{l.positiveValidations}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
