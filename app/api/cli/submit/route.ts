/**
 * POST /api/cli/submit
 *
 * Called by: `100xsystems submit`
 * Auth: GitHub token (Authorization: Bearer)
 * Body: { githubEmail?, systemSlug, trackSlug, prUrl, prNumber? }
 *
 * Records a submission (PR proof) and awards a completion badge.
 * Also marks the enrollment as completed.
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { recordSubmission, completeEnrollment, awardBadge } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const { systemSlug, trackSlug, prUrl, prNumber } = body;

  if (!systemSlug || !trackSlug || !prUrl) {
    return NextResponse.json(
      { error: 'systemSlug, trackSlug, and prUrl are required' },
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

  // Record the PR submission
  await recordSubmission({
    githubEmail: user.github_email,
    systemSlug,
    trackSlug,
    prUrl,
    prNumber: prNumber ?? undefined,
  });

  // Mark enrollment as completed
  await completeEnrollment(user.github_email, systemSlug, trackSlug);

  // Award completion badge
  await awardBadge(user.github_email, systemSlug, 'completed');

  return NextResponse.json({
    ok: true,
    message: `Submission recorded for ${systemSlug}/${trackSlug}`,
    badge: { systemSlug, badgeType: 'completed' },
  });
});
