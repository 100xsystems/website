/**
 * GET /api/recent
 *
 * Returns recent activity across all users using the new user_progress table.
 * Query params: limit (number, default 30)
 */

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '30', 10) || 30, 1), 100);

  try {
    const db = getDb();

    // Recent activity from user_progress (validations and submissions)
    const result = await db.execute({
      sql: `SELECT
              p.github_email,
              u.github_username,
              p.system_slug,
              p.track_slug,
              p.lesson_slug,
              p.lesson_type,
              p.is_validated,
              p.is_submitted,
              p.submission_link,
              p.updated_at,
              CASE WHEN p.is_validated = 1 THEN 'validation'
                   WHEN p.is_submitted = 1 THEN 'submission'
                   ELSE 'progress' END as activity_type
            FROM user_progress p
            LEFT JOIN users u ON u.github_email = p.github_email
            WHERE p.is_validated = 1 OR p.is_submitted = 1
            ORDER BY p.updated_at DESC
            LIMIT ?`,
      args: [limit],
    });

    const activities = (result.rows as any[]).map((row) => ({
      type: row.activity_type,
      githubEmail: row.github_email,
      githubUsername: row.github_username || row.github_email?.split('@')[0] || 'anonymous',
      systemSlug: row.system_slug,
      trackSlug: row.track_slug,
      lessonSlug: row.lesson_slug,
      lessonType: row.lesson_type,
      is_validated: row.is_validated === 1,
      is_submitted: row.is_submitted === 1,
      submissionLink: row.submission_link,
      timestamp: row.updated_at,
    }));

    return NextResponse.json({ activities, count: activities.length });
  } catch (error) {
    console.error('[recent] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent activity' },
      { status: 500 },
    );
  }
}
