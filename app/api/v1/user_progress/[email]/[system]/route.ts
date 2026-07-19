/**
 * GET /api/v1/user_progress/:email/:system
 *
 * Returns all progress rows for a user in a specific system.
 * Used by the website to determine enrollment status, lesson progress, and validations.
 *
 * Also used by localStorage caching on the systems page.
 */

import { NextResponse } from 'next/server';
import { getUserProgress } from '@/lib/db';

interface RouteParams {
  params: Promise<{ email: string; system: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { email, system } = await params;

  if (!email || !system) {
    return NextResponse.json({ error: 'Email and system parameters are required' }, { status: 400 });
  }

  const decodedEmail = decodeURIComponent(email);

  try {
    const rows = await getUserProgress(decodedEmail, system);

    return NextResponse.json({
      systemSlug: system,
      enrolled: rows.length > 0,
      rows: rows.map((r) => ({
        githubEmail: r.github_email,
        systemSlug: r.system_slug,
        trackSlug: r.track_slug,
        lessonSlug: r.lesson_slug,
        lessonType: r.lesson_type,
        isSubmitted: r.is_submitted === 1,
        submissionLink: r.submission_link,
        liveLink: r.live_link,
        isValidated: r.is_validated === 1,
        negativeValidations: r.negative_validations,
        likedNumber: r.liked_number,
        achievement: r.achievement,
        achievementType: r.achievement_type,
        updatedAt: r.updated_at,
      })),
    });
  } catch (error) {
    console.error('[user_progress] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch user progress' }, { status: 500 });
  }
}
