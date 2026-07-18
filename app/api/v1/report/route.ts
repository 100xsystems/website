/**
 * POST /api/v1/report
 *
 * Reports a submission (increments reported_number, sets is_reported).
 * Body: { target_email, system_slug, track_slug, lesson_slug }
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { reportSubmission } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const { target_email, system_slug, track_slug, lesson_slug } = body;

  if (!target_email || !system_slug || !track_slug || !lesson_slug) {
    return NextResponse.json({ error: 'target_email, system_slug, track_slug, and lesson_slug are required' }, { status: 400 });
  }

  try {
    await reportSubmission(target_email, system_slug, track_slug, lesson_slug);
    return NextResponse.json({ status: 'reported' });
  } catch (error) {
    console.error('[report] Error:', error);
    return NextResponse.json({ error: 'Failed to report submission' }, { status: 500 });
  }
});
