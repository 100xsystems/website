/**
 * POST /api/cli/enroll
 *
 * Called by: `100xsystems init <system>`
 * Auth: GitHub token (Authorization: Bearer)
 * Body: { systemSlug, trackSlug, lessonSlug }
 *
 * Creates a user_progress record (enrollment) with the first lesson.
 * Updated for the new user_progress schema.
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { upsertUserProgress, getUserProgress } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const { systemSlug, trackSlug, lessonSlug } = body;

  if (!systemSlug || !trackSlug || !lessonSlug) {
    return NextResponse.json(
      { error: 'systemSlug, trackSlug, and lessonSlug are required' },
      { status: 400 },
    );
  }

  if (body.githubEmail && body.githubEmail !== user.github_email) {
    return NextResponse.json(
      { error: 'githubEmail does not match authenticated user' },
      { status: 403 },
    );
  }

  // Create enrollment record (first lesson)
  await upsertUserProgress({
    github_email: user.github_email,
    system_slug: systemSlug,
    track_slug: trackSlug,
    lesson_slug: lessonSlug,
    lesson_type: 'lesson',
  });

  // Return all progress for this user/system
  const progress = await getUserProgress(user.github_email, systemSlug);

  return NextResponse.json({
    ok: true,
    enrollment: {
      githubEmail: user.github_email,
      systemSlug,
      trackSlug,
      lessonSlug,
      startedAt: new Date().toISOString(),
    },
    progress: progress.map(p => ({
      lessonSlug: p.lesson_slug,
      trackSlug: p.track_slug,
      isValidated: p.is_validated === 1,
      lessonType: p.lesson_type,
    })),
  });
});
