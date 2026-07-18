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

export default async function PortfolioPage({ params }: Props) {
  const { email } = await params;
  const decodedEmail = decodeURIComponent(email);

  const portfolio = await getUserPortfolio(decodedEmail);

  if (!portfolio.user) {
    notFound();
  }

  const { user, systems } = portfolio;
  const username = user.display_name || user.github_username || decodedEmail.split('@')[0];

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
              <p className="text-2xl font-extrabold text-fg">{systems.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mt-1">Enrolled</p>
            </div>
            <div className="bg-white border border-gray-100 px-5 py-4">
              <p className="text-2xl font-extrabold text-fg">0</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mt-1">Completed</p>
            </div>
            <div className="bg-white border border-gray-100 px-5 py-4">
              <p className="text-2xl font-extrabold text-fg">0</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mt-1">Badges</p>
            </div>
            <div className="bg-white border border-gray-100 px-5 py-4">
              <p className="text-2xl font-extrabold text-fg">0</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mt-1">Submissions</p>
            </div>
          </div>
        </div>

        {/* Enrolled Systems */}
        {systems.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-extrabold tracking-tight text-fg mb-5 uppercase">
              Enrolled Systems
            </h2>
            <div className="space-y-3">
              {systems.map((s) => (
                <div key={s.track_slug} className="bg-white border border-gray-100 px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/systems/${s.system_slug}`}
                        className="text-sm font-bold text-accent hover:underline"
                      >
                        {s.system_slug.replace(/-/g, ' ')}
                      </Link>
                      <p className="text-xs text-fg-muted mt-0.5">
                        Track: {s.track_slug.replace(/-/g, ' ')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-medium text-fg-muted uppercase tracking-wider">
                        Started {new Date(s.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {systems.length === 0 && (
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
