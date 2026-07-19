/**
 * GET /api/progress/:email/:system
 *
 * Returns a user's progress for a specific system using the new user_progress table.
 */

import { NextResponse } from 'next/server';
import { getUserProgress } from '@/lib/db';

interface RouteParams {
  params: Promise<{ email: string; system: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { email, system } = await params;

  if (!email || !system) {
    return NextResponse.json(
      { error: 'Email and system parameters are required' },
      { status: 400 },
    );
  }

  const decodedEmail = decodeURIComponent(email);

  try {
    const progress = await getUserProgress(decodedEmail, system);

    return NextResponse.json({
      systemSlug: system,
      enrolled: progress.length > 0,
      lessons: progress.map((p) => ({
        trackSlug: p.track_slug,
        lessonSlug: p.lesson_slug,
        lessonType: p.lesson_type,
        isValidated: p.is_validated === 1,
        isSubmitted: p.is_submitted === 1,
        negativeValidations: p.negative_validations,
        updatedAt: p.updated_at,
      })),
    });
  } catch (error) {
    console.error('[progress] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 },
    );
  }
}
