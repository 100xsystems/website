/**
 * GET /api/v1/achievements/:email
 *
 * Returns all achievements for a user from the user_progress table.
 * Filters records where achievement is not null/empty.
 * Groups by achievement_type for icon differentiation (bronze, silver, gold, completed).
 */

import { NextResponse } from 'next/server';
import { getUserAchievements } from '@/lib/db';

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
    const rows = await getUserAchievements(decodedEmail);

    return NextResponse.json({
      email: decodedEmail,
      count: rows.length,
      achievements: rows.map((r) => ({
        systemSlug: r.system_slug,
        trackSlug: r.track_slug,
        lessonSlug: r.lesson_slug,
        achievement: r.achievement,
        achievementType: r.achievement_type || 'completed',
        updatedAt: r.updated_at,
      })),
    });
  } catch (error) {
    console.error('[achievements] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}
