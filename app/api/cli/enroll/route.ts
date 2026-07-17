/**
 * POST /api/cli/enroll
 *
 * Called by: `100xsystems init <system>`
 * Auth: GitHub token (Authorization: Bearer)
 * Body: { systemSlug, trackSlug }
 *
 * Creates a user enrollment or returns existing one.
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { enrollUser, getEnrollment } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const { systemSlug, trackSlug } = body;

  if (!systemSlug || !trackSlug) {
    return NextResponse.json(
      { error: 'systemSlug and trackSlug are required' },
      { status: 400 },
    );
  }

  // Verify the caller owns this email
  if (body.githubEmail && body.githubEmail !== user.github_email) {
    return NextResponse.json(
      { error: 'githubEmail does not match authenticated user' },
      { status: 403 },
    );
  }

  await enrollUser(user.github_email, systemSlug, trackSlug);

  const enrollment = await getEnrollment(user.github_email, systemSlug, trackSlug);

  return NextResponse.json({
    ok: true,
    enrollment: enrollment
      ? {
          githubEmail: enrollment.github_email,
          systemSlug: enrollment.system_slug,
          trackSlug: enrollment.track_slug,
          nextLessonSlug: enrollment.next_lesson_slug,
          startedAt: enrollment.started_at,
        }
      : null,
  });
});
