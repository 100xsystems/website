/**
 * GET /api/v1/activity/:email
 *
 * Returns comprehensive activity data for a user:
 * - Enrolled systems & tracks
 * - Lessons with validation status
 * - Submission counts
 * - Validation counts
 */

import { NextResponse } from 'next/server';
import { getDb, getUserProgress, getUserActivitySummary, getUserEnrolledSystems } from '@/lib/db';

interface RouteParams {
  params: Promise<{ email: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { email } = await params;

  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  const decodedEmail = decodeURIComponent(email);

  try {
    const [summary, enrolledSystems] = await Promise.all([
      getUserActivitySummary(decodedEmail),
      getUserEnrolledSystems(decodedEmail),
    ]);

    // Get progress per enrolled system
    const systemsWithProgress = await Promise.all(
      enrolledSystems.map(async (sys) => {
        const progress = await getUserProgress(decodedEmail, sys.system_slug);
        return {
          systemSlug: sys.system_slug,
          trackSlug: sys.track_slug,
          enrolledAt: sys.created_at,
          lessons: progress.map(p => ({
            lessonSlug: p.lesson_slug,
            lessonType: p.lesson_type,
            isValidated: p.is_validated === 1,
            isSubmitted: p.is_submitted === 1,
            negativeValidations: p.negative_validations,
            updatedAt: p.updated_at,
          })),
          totalLessons: progress.length,
          validatedLessons: progress.filter(p => p.is_validated === 1).length,
          submittedLessons: progress.filter(p => p.is_submitted === 1).length,
        };
      })
    );

    return NextResponse.json({
      email: decodedEmail,
      summary: {
        systemsEnrolled: summary.systemsEnrolled,
        tracksEnrolled: summary.tracksEnrolled,
        lessonsCompleted: summary.lessonsCompleted,
        submissionsCount: summary.submissionsCount,
        validationsCount: summary.validationsCount,
      },
      systems: systemsWithProgress,
    });
  } catch (error) {
    console.error('[activity] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch activity' }, { status: 500 });
  }
}
