/**
 * GET /api/portfolio/:email
 *
 * Returns a user's full portfolio: enrollments, submissions, badges.
 * This is a public read-only endpoint consumed by the website.
 */

import { NextResponse } from 'next/server';
import { getUserPortfolio } from '@/lib/db';

interface RouteParams {
  params: Promise<{ email: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { email } = await params;

  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  // Decode URL-encoded email
  const decodedEmail = decodeURIComponent(email);

  try {
    const portfolio = await getUserPortfolio(decodedEmail);

    if (!portfolio.user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      user: {
        githubEmail: portfolio.user.github_email,
        githubUsername: portfolio.user.github_username,
        displayName: portfolio.user.display_name,
        createdAt: portfolio.user.created_at,
        lastLoginAt: portfolio.user.last_login_at,
      },
      enrollments: portfolio.enrollments.map((e) => ({
        systemSlug: e.system_slug,
        trackSlug: e.track_slug,
        nextLessonSlug: e.next_lesson_slug,
        startedAt: e.started_at,
        completedAt: e.completed_at,
      })),
      submissions: portfolio.submissions.map((s) => ({
        systemSlug: s.system_slug,
        trackSlug: s.track_slug,
        prUrl: s.pr_url,
        prNumber: s.pr_number,
        prStatus: s.pr_status,
        submittedAt: s.submitted_at,
      })),
      badges: portfolio.badges.map((b) => ({
        systemSlug: b.system_slug,
        badgeType: b.badge_type,
        awardedAt: b.awarded_at,
      })),
    });
  } catch (error) {
    console.error('[portfolio] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 },
    );
  }
}
