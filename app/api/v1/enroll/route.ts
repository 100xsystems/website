/**
 * POST /api/v1/enroll
 *
 * Web enrollment endpoint — used by the "Enroll Now" button on the systems page.
 * Unlike /api/v1/user_progress (which requires GitHub OAuth token for CLI),
 * this endpoint trusts the Clerk-authenticated session email passed in the body.
 *
 * The email is sent from the client-side Clerk session (verified by Clerk).
 * For stricter security, this could be extended with Clerk session token verification.
 *
 * Body: { github_email, system_slug, track_slug, lesson_slug, lesson_type }
 */

import { NextResponse } from 'next/server';
import { upsertUserProgress } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { github_email, system_slug, track_slug, lesson_slug, lesson_type } = body;

    if (!github_email || !system_slug || !track_slug || !lesson_slug) {
      return NextResponse.json(
        { error: 'github_email, system_slug, track_slug, and lesson_slug are required' },
        { status: 400 },
      );
    }

    await upsertUserProgress({
      github_email,
      system_slug,
      track_slug,
      lesson_slug,
      lesson_type: lesson_type || 'lesson',
    });

    return NextResponse.json({
      status: 'enrolled',
      action: 'enrollment',
      system_slug,
      track_slug,
      lesson_slug,
    });
  } catch (error) {
    console.error('[enroll] Error:', error);
    return NextResponse.json({ error: 'Failed to enroll' }, { status: 500 });
  }
}
