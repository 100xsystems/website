/**
 * POST /api/v1/user_progress
 *
 * Called by:
 *   - `100xsystems init` — creates first enrollment record (default first lesson)
 *   - `100xsystems validate` — updates validation status for current lesson
 *
 * Auth: GitHub token (Authorization: Bearer)
 *
 * For init: { github_email?, system_slug, track_slug, lesson_slug, lesson_type? }
 * For validate: { github_email?, system_slug, track_slug, lesson_slug, is_validated (boolean) }
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { upsertUserProgress, incrementPositiveValidation, incrementNegativeValidation } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const { system_slug, track_slug, lesson_slug, lesson_type, is_validated, submission_link, live_link, achievement, achievement_type } = body;

  if (!system_slug || !track_slug || !lesson_slug) {
    return NextResponse.json(
      { error: 'system_slug, track_slug, and lesson_slug are required' },
      { status: 400 },
    );
  }

  if (is_validated !== undefined) {
    // Validation call
    if (is_validated === true || is_validated === 1) {
      await incrementPositiveValidation(user.github_email, system_slug, track_slug, lesson_slug);
    } else {
      await incrementNegativeValidation(user.github_email, system_slug, track_slug, lesson_slug);
    }
    return NextResponse.json({ status: 'recorded', action: 'validation' });
  }

  // Enrollment / progress upsert
  await upsertUserProgress({
    github_email: user.github_email,
    system_slug,
    track_slug,
    lesson_slug,
    lesson_type: lesson_type || 'lesson',
    submission_link,
    live_link,
    achievement,
    achievement_type,
  });

  return NextResponse.json({ status: 'recorded', action: 'enrollment' });
});
