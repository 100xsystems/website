/**
 * POST /api/cli/submit
 *
 * Called by: `100xsystems submit`
 * Auth: GitHub token (Authorization: Bearer)
 * Body: { systemSlug, trackSlug, lessonSlug, submissionLink, liveLink? }
 *
 * Records a submission link and marks the lesson as submitted.
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { upsertUserProgress } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const { systemSlug, trackSlug, lessonSlug, submissionLink, liveLink } = body;

  if (!systemSlug || !trackSlug || !lessonSlug || !submissionLink) {
    return NextResponse.json(
      { error: 'systemSlug, trackSlug, lessonSlug, and submissionLink are required' },
      { status: 400 },
    );
  }

  if (body.githubEmail && body.githubEmail !== user.github_email) {
    return NextResponse.json(
      { error: 'githubEmail does not match authenticated user' },
      { status: 403 },
    );
  }

  // Record the submission
  await upsertUserProgress({
    github_email: user.github_email,
    system_slug: systemSlug,
    track_slug: trackSlug,
    lesson_slug: lessonSlug,
    is_submitted: 1,
    submission_link: submissionLink,
    live_link: liveLink || undefined,
  });

  return NextResponse.json({
    ok: true,
    message: `Submission recorded for ${systemSlug}/${trackSlug}/${lessonSlug}`,
  });
});
