/**
 * POST /api/v1/like
 *
 * Increments liked_number for a submission.
 * Body: { target_email, system_slug, track_slug, lesson_slug }
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { likeSubmission } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const { target_email, system_slug, track_slug, lesson_slug } = body;

  if (!target_email || !system_slug || !track_slug || !lesson_slug) {
    return NextResponse.json({ error: 'target_email, system_slug, track_slug, and lesson_slug are required' }, { status: 400 });
  }

  try {
    await likeSubmission(target_email, system_slug, track_slug, lesson_slug);
    return NextResponse.json({ status: 'liked' });
  } catch (error) {
    console.error('[like] Error:', error);
    return NextResponse.json({ error: 'Failed to like submission' }, { status: 500 });
  }
});
