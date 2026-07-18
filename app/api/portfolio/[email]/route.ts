/**
 * GET /api/portfolio/:email
 *
 * Returns a user's full portfolio: user info and enrolled systems.
 * Updated for the new 2-table schema (users + user_progress).
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
        linkedinUrl: portfolio.user.linkedin_url,
        githubAvatar: portfolio.user.github_avatar,
        shortBio: portfolio.user.short_bio,
        currentProfession: portfolio.user.current_profession,
        experienceYears: portfolio.user.experience_years,
        createdAt: portfolio.user.created_at,
        lastLoginAt: portfolio.user.last_login_at,
      },
      enrollments: portfolio.systems.map((s) => ({
        systemSlug: s.system_slug,
        trackSlug: s.track_slug,
        startedAt: s.created_at,
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
