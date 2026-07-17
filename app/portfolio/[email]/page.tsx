import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/presentation/__components';
import { getUserPortfolio } from '@/lib/db';

interface Props {
  params: Promise<{ email: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { email } = await params;
  const decoded = decodeURIComponent(email);
  return {
    title: `${decoded.split('@')[0]}'s Portfolio — 100xSystems`,
  };
}

const badgeColors: Record<string, string> = {
  completed: 'bg-accent text-white',
  gold: 'bg-accent-yellow text-black',
  contributor: 'bg-fg text-white',
};

const statusColors: Record<string, string> = {
  merged: 'bg-green-100 text-green-800',
  open: 'bg-blue-100 text-blue-800',
  closed: 'bg-gray-100 text-gray-600',
};

function BadgeIcon({ type }: { type: string }) {
  if (type === 'gold') return <span className="text-lg">🏆</span>;
  if (type === 'completed') return <span className="text-lg">✅</span>;
  if (type === 'contributor') return <span className="text-lg">⭐</span>;
  return <span className="text-lg">🎖️</span>;
}

export default async function PortfolioPage({ params }: Props) {
  const { email } = await params;
  const decodedEmail = decodeURIComponent(email);

  const portfolio = await getUserPortfolio(decodedEmail);

  if (!portfolio.user) {
    notFound();
  }

  const { user, enrollments, submissions, badges } = portfolio;
  const username = user.display_name || user.github_username || decodedEmail.split('@')[0];
  const completedSystems = enrollments.filter((e) => e.completed_at);
  const inProgressSystems = enrollments.filter((e) => !e.completed_at);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumbs items={[{ label: 'Portfolio', href: '#' }]} />
        </div>

        {/* User Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-accent/10 flex items-center justify-center">
              <span className="text-2xl font-extrabold text-accent">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-fg">
                {username}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                {user.github_username && (
                  <a
                    href={`https://github.com/${user.github_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-accent hover:underline"
                  >
                    @{user.github_username}
                  </a>
                )}
                <span className="text-xs text-fg-muted">
                  Joined {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-white border border-gray-100 px-5 py-4">
              <p className="text-2xl font-extrabold text-fg">{enrollments.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mt-1">Enrolled</p>
            </div>
            <div className="bg-white border border-gray-100 px-5 py-4">
              <p className="text-2xl font-extrabold text-fg">{completedSystems.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mt-1">Completed</p>
            </div>
            <div className="bg-white border border-gray-100 px-5 py-4">
              <p className="text-2xl font-extrabold text-fg">{badges.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mt-1">Badges</p>
            </div>
            <div className="bg-white border border-gray-100 px-5 py-4">
              <p className="text-2xl font-extrabold text-fg">{submissions.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mt-1">Submissions</p>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        {badges.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-extrabold tracking-tight text-fg mb-5 uppercase">
              Badges & Achievements
            </h2>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <div
                  key={`${badge.system_slug}-${badge.badge_type}`}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-100 bg-white"
                >
                  <BadgeIcon type={badge.badge_type} />
                  <div>
                    <p className="text-sm font-bold text-fg">{badge.system_slug.replace(/-/g, ' ')}</p>
                    <span className={`${badgeColors[badge.badge_type] || 'bg-gray-100 text-fg-muted'} text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5`}>
                      {badge.badge_type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* In-Progress Systems */}
        {inProgressSystems.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-extrabold tracking-tight text-fg mb-5 uppercase">
              In Progress
            </h2>
            <div className="space-y-3">
              {inProgressSystems.map((enrollment) => (
                <div key={enrollment.track_slug} className="bg-white border border-gray-100 px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/systems/${enrollment.system_slug}`}
                        className="text-sm font-bold text-accent hover:underline"
                      >
                        {enrollment.system_slug.replace(/-/g, ' ')}
                      </Link>
                      <p className="text-xs text-fg-muted mt-0.5">
                        Track: {enrollment.track_slug.replace(/-/g, ' ')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-medium text-fg-muted uppercase tracking-wider">
                        Started {new Date(enrollment.started_at).toLocaleDateString()}
                      </p>
                      {enrollment.next_lesson_slug && (
                        <p className="text-xs text-fg-secondary mt-1">
                          Next: {enrollment.next_lesson_slug.replace(/-/g, ' ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Completed Systems */}
        {completedSystems.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-extrabold tracking-tight text-fg mb-5 uppercase">
              Completed Systems
            </h2>
            <div className="space-y-3">
              {completedSystems.map((enrollment) => (
                <div key={enrollment.track_slug} className="bg-white border border-gray-100 px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/systems/${enrollment.system_slug}`}
                        className="text-sm font-bold text-accent hover:underline"
                      >
                        {enrollment.system_slug.replace(/-/g, ' ')}
                      </Link>
                      <p className="text-xs text-fg-muted mt-0.5">
                        Track: {enrollment.track_slug.replace(/-/g, ' ')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-medium text-green-700 uppercase tracking-wider">
                        ✓ Completed
                      </p>
                      <p className="text-[10px] text-fg-muted">
                        {enrollment.completed_at ? new Date(enrollment.completed_at).toLocaleDateString() : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Submissions */}
        {submissions.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-extrabold tracking-tight text-fg mb-5 uppercase">
              PR Submissions
            </h2>
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub.pr_url} className="bg-white border border-gray-100 px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/systems/${sub.system_slug}`}
                        className="text-sm font-bold text-accent hover:underline"
                      >
                        {sub.system_slug.replace(/-/g, ' ')}
                      </Link>
                      <span className="text-xs text-fg-muted mx-2">/</span>
                      <span className="text-xs text-fg-muted">{sub.track_slug.replace(/-/g, ' ')}</span>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-3">
                      <span className={`${statusColors[sub.pr_status] || 'bg-gray-100 text-fg-muted'} text-[10px] font-bold uppercase tracking-wider px-2 py-0.5`}>
                        {sub.pr_status}
                      </span>
                      <a
                        href={sub.pr_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-wider text-accent hover:underline"
                      >
                        View PR
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {enrollments.length === 0 && (
          <div className="text-center py-20 text-fg-muted">
            <p className="text-lg font-semibold mb-2">No activity yet</p>
            <p className="text-sm mb-8">Start building a system to build your portfolio.</p>
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-accent text-white px-5 py-2.5 hover:bg-accent/90 transition-colors"
            >
              Browse Systems
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
