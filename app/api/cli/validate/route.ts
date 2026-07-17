/**
 * POST /api/cli/validate
 *
 * Called by: `100xsystems validate` (after each lesson check)
 * Auth: GitHub token (Authorization: Bearer)
 * Body: {
 *   githubEmail?, systemSlug, trackSlug, lessonSlug, moduleSlug,
 *   status, passedCount?, failedCount?, validationResult?, nextLessonSlug?
 * }
 *
 * Records a validation result. If status === 'passed' and nextLessonSlug
 * is provided, also advances the user's enrollment.
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { recordValidation, advanceToNextLesson } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const {
    systemSlug,
    trackSlug,
    lessonSlug,
    moduleSlug,
    status,
    passedCount,
    failedCount,
    validationResult,
    nextLessonSlug,
  } = body;

  // Validate required fields
  if (!systemSlug || !trackSlug || !lessonSlug || !moduleSlug || !status) {
    return NextResponse.json(
      { error: 'systemSlug, trackSlug, lessonSlug, moduleSlug, and status are required' },
      { status: 400 },
    );
  }

  if (!['passed', 'failed'].includes(status)) {
    return NextResponse.json(
      { error: 'status must be "passed" or "failed"' },
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

  // Record the validation
  await recordValidation({
    githubEmail: user.github_email,
    systemSlug,
    trackSlug,
    lessonSlug,
    moduleSlug,
    status,
    passedCount: passedCount ?? 0,
    failedCount: failedCount ?? 0,
    validationResult: validationResult ?? undefined,
  });

  // If passed and we know the next lesson, advance enrollment
  if (status === 'passed' && nextLessonSlug) {
    await advanceToNextLesson(user.github_email, systemSlug, trackSlug, nextLessonSlug);
  }

  return NextResponse.json({
    ok: true,
    status,
    advanced: !!(status === 'passed' && nextLessonSlug),
  });
});
