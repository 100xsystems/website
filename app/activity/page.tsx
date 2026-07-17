import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/presentation/__components';
import { getDb } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Activity — 100xSystems',
  description: 'See what the community is building right now.',
};

export const dynamic = 'force-dynamic';

// ─── Types ──────────────────────────────────────────────────────────

interface ActivityItem {
  type: 'validation' | 'submission' | 'enrollment';
  githubEmail: string;
  githubUsername: string;
  systemSlug: string;
  trackSlug: string;
  timestamp: string;
  lessonSlug?: string;
  status?: string;
  passedCount?: number;
  failedCount?: number;
  prUrl?: string;
  prNumber?: number;
  prStatus?: string;
  completedAt?: string | null;
}

// ─── Helper: Time Ago ───────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

// ─── Activity Icon ──────────────────────────────────────────────────

function ActivityIcon({ type, status }: { type: string; status?: string }) {
  if (type === 'validation') {
    const isPassed = status === 'passed';
    return (
      <div className={`flex items-center justify-center w-8 h-8 shrink-0 ${isPassed ? 'bg-green-100' : 'bg-red-100'}`}>
        {isPassed ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-700">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </div>
    );
  }

  if (type === 'submission') {
    return (
      <div className="flex items-center justify-center w-8 h-8 shrink-0 bg-blue-100">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
          <path d="M18 8a3 3 0 1 0-3-3" /><line x1="6" y1="6" x2="18" y2="18" /><path d="M18 16a3 3 0 1 0 3 3" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-8 h-8 shrink-0 bg-purple-100">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-700">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    </div>
  );
}

// ─── Activity Description ───────────────────────────────────────────

function ActivityDescription({ item }: { item: ActivityItem }) {
  if (item.type === 'validation') {
    const isPassed = item.status === 'passed';
    return (
      <>
        <span className="font-bold text-fg">{item.githubUsername}</span>
        {' '}
        <span className={isPassed ? 'text-green-700' : 'text-red-700'}>
          {isPassed ? 'passed' : 'failed'}
        </span>
        {' '}
        <span className="text-fg-secondary">{item.lessonSlug?.replace(/-/g, ' ') || 'lesson'}</span>
        {' '}
        <span className="text-fg-muted">in</span>
        {' '}
        <Link href={`/systems/${item.systemSlug}`} className="text-accent font-semibold hover:underline">
          {item.systemSlug.replace(/-/g, ' ')}
        </Link>
        {item.passedCount !== undefined && (
          <span className="text-xs text-fg-muted ml-2">
            ({item.passedCount}/{item.passedCount! + (item.failedCount || 0)})
          </span>
        )}
      </>
    );
  }

  if (item.type === 'submission') {
    return (
      <>
        <span className="font-bold text-fg">{item.githubUsername}</span>
        {' '}
        <span className="text-fg-secondary">submitted</span>
        {' '}
        <Link href={`/systems/${item.systemSlug}`} className="text-accent font-semibold hover:underline">
          {item.systemSlug.replace(/-/g, ' ')}
        </Link>
        {' '}
        <span className="text-fg-muted">for review</span>
        {item.prUrl && (
          <a href={item.prUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-wider text-accent ml-2 hover:underline">
            PR #{item.prNumber || ''}
          </a>
        )}
      </>
    );
  }

  return (
    <>
      <span className="font-bold text-fg">{item.githubUsername}</span>
      {' '}
      <span className="text-fg-secondary">started</span>
      {' '}
      <Link href={`/systems/${item.systemSlug}`} className="text-accent font-semibold hover:underline">
        {item.systemSlug.replace(/-/g, ' ')}
      </Link>
      {' '}
      <span className="text-fg-muted">({item.trackSlug.replace(/-/g, ' ')})</span>
    </>
  );
}

// ─── Fetch Activity from DB ─────────────────────────────────────────

async function fetchActivityFromDB(limit = 50): Promise<ActivityItem[]> {
  try {
    const db = getDb();

    const [validations, submissions, enrollments] = await Promise.all([
      db.execute({
        sql: `SELECT v.github_email, u.github_username, v.system_slug, v.track_slug,
                     v.lesson_slug, v.status, v.passed_count, v.failed_count, v.validated_at
              FROM user_validations v
              LEFT JOIN users u ON u.github_email = v.github_email
              ORDER BY v.validated_at DESC LIMIT ?`,
        args: [limit],
      }),
      db.execute({
        sql: `SELECT s.github_email, u.github_username, s.system_slug, s.track_slug,
                     s.pr_url, s.pr_number, s.pr_status, s.submitted_at
              FROM submissions s
              LEFT JOIN users u ON u.github_email = s.github_email
              ORDER BY s.submitted_at DESC LIMIT ?`,
        args: [limit],
      }),
      db.execute({
        sql: `SELECT e.github_email, u.github_username, e.system_slug, e.track_slug,
                     e.started_at, e.completed_at
              FROM user_enrollments e
              LEFT JOIN users u ON u.github_email = e.github_email
              ORDER BY e.started_at DESC LIMIT ?`,
        args: [limit],
      }),
    ]);

    const activities: ActivityItem[] = [];

    for (const row of validations.rows as any[]) {
      activities.push({
        type: 'validation',
        githubEmail: row.github_email,
        githubUsername: row.github_username || row.github_email.split('@')[0],
        systemSlug: row.system_slug,
        trackSlug: row.track_slug,
        lessonSlug: row.lesson_slug,
        status: row.status,
        passedCount: row.passed_count,
        failedCount: row.failed_count,
        timestamp: row.validated_at,
      });
    }

    for (const row of submissions.rows as any[]) {
      activities.push({
        type: 'submission',
        githubEmail: row.github_email,
        githubUsername: row.github_username || row.github_email.split('@')[0],
        systemSlug: row.system_slug,
        trackSlug: row.track_slug,
        prUrl: row.pr_url,
        prNumber: row.pr_number,
        prStatus: row.pr_status,
        timestamp: row.submitted_at,
      });
    }

    for (const row of enrollments.rows as any[]) {
      activities.push({
        type: 'enrollment',
        githubEmail: row.github_email,
        githubUsername: row.github_username || row.github_email.split('@')[0],
        systemSlug: row.system_slug,
        trackSlug: row.track_slug,
        completedAt: row.completed_at,
        timestamp: row.started_at,
      });
    }

    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return activities.slice(0, limit);
  } catch (error) {
    console.error('[activity] Failed to fetch:', error);
    return [];
  }
}

// ─── Page Component ─────────────────────────────────────────────────

export default async function ActivityPage() {
  const activities = await fetchActivityFromDB(50);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumbs items={[{ label: 'Activity', href: '/activity' }]} />
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-accent text-white">
              Live Activity
            </span>
            <span className="text-xs text-fg-muted">
              {activities.length} recent events
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-fg">
            Community Activity
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-2xl">
            See what the community is building right now. Every validation, submission, and enrollment
            is captured in real-time.
          </p>
        </div>

        {/* Activity Feed */}
        {activities.length === 0 ? (
          <div className="text-center py-20 text-fg-muted">
            <p className="text-lg font-semibold mb-2">No activity yet</p>
            <p className="text-sm mb-8">Be the first to build a system!</p>
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-accent text-white px-5 py-2.5 hover:bg-accent/90 transition-colors"
            >
              Browse Systems
            </Link>
          </div>
        ) : (
          <div className="space-y-0 border-l border-gray-200 ml-4">
            {activities.map((item, idx) => (
              <div key={`${item.type}-${item.githubEmail}-${item.timestamp}-${idx}`} className="relative pl-8 pb-6">
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 -translate-x-1/2">
                  <ActivityIcon type={item.type} status={item.status} />
                </div>

                {/* Activity card */}
                <div className="bg-white border border-gray-100 px-5 py-4 hover:border-accent/20 transition-colors">
                  <p className="text-sm text-fg-secondary leading-relaxed">
                    <ActivityDescription item={item} />
                  </p>
                  <p className="text-[10px] font-medium text-fg-muted uppercase tracking-wider mt-1.5">
                    {timeAgo(item.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
