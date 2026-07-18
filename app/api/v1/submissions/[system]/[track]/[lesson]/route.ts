/**
 * GET /api/v1/submissions/:system/:track/:lesson
 *
 * Returns all submissions for a specific lesson, ordered by liked_number desc.
 */

import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/db';

interface RouteParams {
  params: Promise<{ system: string; track: string; lesson: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { system, track, lesson } = await params;
  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1), 100);

  if (!system || !track || !lesson) {
    return NextResponse.json({ error: 'system, track, and lesson parameters are required' }, { status: 400 });
  }

  try {
    const submissions = await getSubmissions(system, track, lesson, limit);

    return NextResponse.json({
      systemSlug: system,
      trackSlug: track,
      lessonSlug: lesson,
      submissions: submissions.map((s) => ({
        githubEmail: s.github_email,
        submissionLink: s.submission_link,
        liveLink: s.live_link,
        likedNumber: s.liked_number,
        isReported: s.is_reported === 1,
        reportedNumber: s.reported_number,
        createdAt: s.created_at,
      })),
    });
  } catch (error) {
    console.error('[submissions] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
