/**
 * POST /api/cli/validate
 *
 * Called by: `100xsystems validate`
 * Auth: GitHub token (Authorization: Bearer)
 * Body: { systemSlug, trackSlug, lessonSlug, is_validated (boolean) }
 *
 * Updates user_progress validation status.
 * On successful validation, increments positive_validations.
 * On failed validation, increments negative_validations.
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { incrementPositiveValidation, incrementNegativeValidation } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const { systemSlug, trackSlug, lessonSlug, is_validated, status } = body;

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

  // Support both is_validated (boolean) and legacy status ('passed'/'failed')
  const validated = is_validated !== undefined
    ? is_validated
    : status === 'passed';

  if (validated) {
    await incrementPositiveValidation(user.github_email, systemSlug, trackSlug, lessonSlug);
  } else {
    await incrementNegativeValidation(user.github_email, systemSlug, trackSlug, lessonSlug);
  }

  return NextResponse.json({
    ok: true,
    status: validated ? 'passed' : 'failed',
    action: 'validation-recorded',
  });
});
