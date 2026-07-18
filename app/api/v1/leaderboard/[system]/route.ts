/**
 * GET /api/v1/leaderboard/:system?limit=10
 *
 * Returns recent validated activity for a system leaderboard.
 */

import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/db';

interface RouteParams {
  params: Promise<{ system: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { system } = await params;
  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '10', 10) || 10, 1), 50);

  if (!system) {
    return NextResponse.json({ error: 'System parameter is required' }, { status: 400 });
  }

  try {
    const activities = await getLeaderboard(system, limit);

    return NextResponse.json({
      systemSlug: system,
      activities: activities.map((a: any) => ({
        githubEmail: a.github_email,
        githubUsername: a.github_username || a.github_email?.split('@')[0] || 'anonymous',
        systemSlug: a.system_slug,
        trackSlug: a.track_slug,
        lessonSlug: a.lesson_slug,
        timestamp: a.updated_at,
      })),
    });
  } catch (error) {
    console.error('[leaderboard] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
