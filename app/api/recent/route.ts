/**
 * GET /api/recent
 *
 * Returns recent activity across all users: most recent validations,
 * submissions, and enrollments. Public read-only endpoint.
 *
 * Query params:
 *   limit (number, default 30) — max results
 */

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '30', 10) || 30, 1), 100);

  try {
    const db = getDb();

    // Recent validations
    const validationsResult = await db.execute({
      sql: `SELECT
              v.github_email,
              u.github_username,
              v.system_slug,
              v.track_slug,
              v.lesson_slug,
              v.status,
              v.passed_count,
              v.failed_count,
              v.validated_at,
              'validation' as activity_type
            FROM user_validations v
            LEFT JOIN users u ON u.github_email = v.github_email
            ORDER BY v.validated_at DESC
            LIMIT ?`,
      args: [limit],
    });

    // Recent submissions
    const submissionsResult = await db.execute({
      sql: `SELECT
              s.github_email,
              u.github_username,
              s.system_slug,
              s.track_slug,
              s.pr_url,
              s.pr_number,
              s.pr_status,
              s.submitted_at,
              'submission' as activity_type
            FROM submissions s
            LEFT JOIN users u ON u.github_email = s.github_email
            ORDER BY s.submitted_at DESC
            LIMIT ?`,
      args: [limit],
    });

    // Recent enrollments
    const enrollmentsResult = await db.execute({
      sql: `SELECT
              e.github_email,
              u.github_username,
              e.system_slug,
              e.track_slug,
              e.started_at,
              e.completed_at,
              'enrollment' as activity_type
            FROM user_enrollments e
            LEFT JOIN users u ON u.github_email = e.github_email
            ORDER BY e.started_at DESC
            LIMIT ?`,
      args: [limit],
    });

    // Merge and sort by timestamp desc
    const activities: any[] = [];

    for (const row of validationsResult.rows as any[]) {
      activities.push({
        type: 'validation',
        githubEmail: row.github_email,
        githubUsername: row.github_username || row.github_email.split('@')[0],
        systemSlug: row.system_slug,
        trackSlug: row.track_slug,
        lessonSlug: row.lesson_slug,
        status: row.status,
        passedCount: row.passed_count,
        failedCount: row.failed_count,
        timestamp: row.validated_at,
      });
    }

    for (const row of submissionsResult.rows as any[]) {
      activities.push({
        type: 'submission',
        githubEmail: row.github_email,
        githubUsername: row.github_username || row.github_email.split('@')[0],
        systemSlug: row.system_slug,
        trackSlug: row.track_slug,
        prUrl: row.pr_url,
        prNumber: row.pr_number,
        prStatus: row.pr_status,
        timestamp: row.submitted_at,
      });
    }

    for (const row of enrollmentsResult.rows as any[]) {
      activities.push({
        type: 'enrollment',
        githubEmail: row.github_email,
        githubUsername: row.github_username || row.github_email.split('@')[0],
        systemSlug: row.system_slug,
        trackSlug: row.track_slug,
        completedAt: row.completed_at,
        timestamp: row.started_at,
      });
    }

    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const recent = activities.slice(0, limit);

    return NextResponse.json({ activities: recent, count: recent.length });
  } catch (error) {
    console.error('[recent] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent activity' },
      { status: 500 },
    );
  }
}
