/**
 * GET /api/progress/:email/:system
 *
 * Returns a user's progress for a specific system: enrollments,
 * validations, and submission. Public read-only endpoint.
 */

import { NextResponse } from 'next/server';
import {
  getUserEnrollments,
  getValidationsForTrack,
  getPassedCountForTrack,
  getUserSubmissions,
  getUserBadges,
} from '@/lib/db';

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
    // Get enrollments for this specific system
    const allEnrollments = await getUserEnrollments(decodedEmail);
    const enrollments = allEnrollments.filter((e) => e.system_slug === system);

    // Get validations and passes for each track
    const tracksWithProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
        const validations = await getValidationsForTrack(
          decodedEmail,
          system,
          enrollment.track_slug,
        );
        const passedCount = await getPassedCountForTrack(
          decodedEmail,
          system,
          enrollment.track_slug,
        );

        return {
          trackSlug: enrollment.track_slug,
          nextLessonSlug: enrollment.next_lesson_slug,
          startedAt: enrollment.started_at,
          completedAt: enrollment.completed_at,
          totalValidations: validations.length,
          passedCount,
          validations: validations.map((v) => ({
            lessonSlug: v.lesson_slug,
            moduleSlug: v.module_slug,
            status: v.status,
            passedCount: v.passed_count,
            failedCount: v.failed_count,
            validatedAt: v.validated_at,
          })),
        };
      }),
    );

    // Get submissions for this system
    const allSubmissions = await getUserSubmissions(decodedEmail);
    const submissions = allSubmissions.filter((s) => s.system_slug === system);

    // Get badges for this system
    const allBadges = await getUserBadges(decodedEmail);
    const badges = allBadges.filter((b) => b.system_slug === system);

    return NextResponse.json({
      systemSlug: system,
      tracks: tracksWithProgress,
      submissions: submissions.map((s) => ({
        trackSlug: s.track_slug,
        prUrl: s.pr_url,
        prNumber: s.pr_number,
        prStatus: s.pr_status,
        submittedAt: s.submitted_at,
      })),
      badges: badges.map((b) => ({
        badgeType: b.badge_type,
        awardedAt: b.awarded_at,
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
