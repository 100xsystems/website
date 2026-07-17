/**
 * ## Database: Turso Client & Query Helpers
 *
 * Lazy-initialized Turso (libSQL) client singleton with
 * typed query helpers for the 100xSystems schema.
 *
 * Schema:
 *   users             — github_email PK (Clerk/GitHub identity)
 *   user_enrollments  — which system/track a user is on
 *   user_validations  — lesson validation results
 *   submissions       — PR proof of completed work (portfolio)
 *   badges            — earned for completing systems
 *
 * @packageDocumentation
 */

import { createClient } from '@libsql/client';

// ─── Types ──────────────────────────────────────────────────────────

export interface User {
  github_email: string;
  github_username: string | null;
  display_name: string | null;
  created_at: string;
  last_login_at: string | null;
}

export interface UserEnrollment {
  github_email: string;
  system_slug: string;
  track_slug: string;
  next_lesson_slug: string | null;
  started_at: string;
  completed_at: string | null;
}

export interface UserValidation {
  github_email: string;
  system_slug: string;
  track_slug: string;
  lesson_slug: string;
  module_slug: string;
  status: 'passed' | 'failed';
  validation_result: string | null;
  passed_count: number;
  failed_count: number;
  validated_at: string;
}

export interface Submission {
  github_email: string;
  system_slug: string;
  track_slug: string;
  pr_url: string;
  pr_number: number | null;
  pr_status: 'open' | 'merged' | 'closed';
  submitted_at: string;
}

export interface Badge {
  github_email: string;
  system_slug: string;
  badge_type: 'completed' | 'gold' | 'contributor';
  awarded_at: string;
}

// ─── Client ──────────────────────────────────────────────────────────

let client: ReturnType<typeof createClient> | null = null;

export function getDb() {
  if (!client) {
    const url = process.env.DATABASE_URL;
    const authToken = process.env.DATABASE_AUTH_TOKEN;

    if (!url) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    if (!authToken) {
      throw new Error('DATABASE_AUTH_TOKEN environment variable is required');
    }

    client = createClient({ url, authToken });
  }
  return client;
}

// ─── User Helpers ────────────────────────────────────────────────────

export async function upsertUser(user: {
  github_email: string;
  github_username?: string;
  display_name?: string;
}): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO users (github_email, github_username, display_name, last_login_at)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(github_email) DO UPDATE SET
            github_username = COALESCE(excluded.github_username, users.github_username),
            display_name = COALESCE(excluded.display_name, users.display_name),
            last_login_at = CURRENT_TIMESTAMP`,
    args: [user.github_email, user.github_username ?? null, user.display_name ?? null],
  });
}

export async function getUser(email: string): Promise<User | null> {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM users WHERE github_email = ?', args: [email] });
  return (result.rows[0] as unknown as User) ?? null;
}

export async function updateLastLogin(email: string): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: "UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE github_email = ?",
    args: [email],
  });
}

// ─── Enrollment Helpers ──────────────────────────────────────────────

export async function enrollUser(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO user_enrollments (github_email, system_slug, track_slug)
          VALUES (?, ?, ?)
          ON CONFLICT(github_email, system_slug, track_slug) DO NOTHING`,
    args: [githubEmail, systemSlug, trackSlug],
  });
}

export async function getEnrollment(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string
): Promise<UserEnrollment | null> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM user_enrollments WHERE github_email = ? AND system_slug = ? AND track_slug = ?',
    args: [githubEmail, systemSlug, trackSlug],
  });
  return (result.rows[0] as unknown as UserEnrollment) ?? null;
}

export async function advanceToNextLesson(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string,
  nextLessonSlug: string
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `UPDATE user_enrollments
          SET next_lesson_slug = ?
          WHERE github_email = ? AND system_slug = ? AND track_slug = ?`,
    args: [nextLessonSlug, githubEmail, systemSlug, trackSlug],
  });
}

export async function completeEnrollment(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: "UPDATE user_enrollments SET completed_at = CURRENT_TIMESTAMP WHERE github_email = ? AND system_slug = ? AND track_slug = ?",
    args: [githubEmail, systemSlug, trackSlug],
  });
}

export async function getUserEnrollments(email: string): Promise<UserEnrollment[]> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM user_enrollments WHERE github_email = ? ORDER BY started_at DESC',
    args: [email],
  });
  return result.rows as unknown as UserEnrollment[];
}

// ─── Validation Helpers ──────────────────────────────────────────────

export interface ValidationInput {
  githubEmail: string;
  systemSlug: string;
  trackSlug: string;
  lessonSlug: string;
  moduleSlug: string;
  status: 'passed' | 'failed';
  validationResult?: string;
  passedCount?: number;
  failedCount?: number;
}

export async function recordValidation(input: ValidationInput): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO user_validations (github_email, system_slug, track_slug, lesson_slug, module_slug, status, validation_result, passed_count, failed_count)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(github_email, system_slug, track_slug, lesson_slug) DO UPDATE SET
            status = excluded.status,
            validation_result = excluded.validation_result,
            passed_count = excluded.passed_count,
            failed_count = excluded.failed_count,
            validated_at = CURRENT_TIMESTAMP`,
    args: [
      input.githubEmail,
      input.systemSlug,
      input.trackSlug,
      input.lessonSlug,
      input.moduleSlug,
      input.status,
      input.validationResult ?? null,
      input.passedCount ?? 0,
      input.failedCount ?? 0,
    ],
  });
}

export async function getValidation(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string,
  lessonSlug: string
): Promise<UserValidation | null> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM user_validations WHERE github_email = ? AND system_slug = ? AND track_slug = ? AND lesson_slug = ?',
    args: [githubEmail, systemSlug, trackSlug, lessonSlug],
  });
  return (result.rows[0] as unknown as UserValidation) ?? null;
}

export async function getValidationsForTrack(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string
): Promise<UserValidation[]> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM user_validations WHERE github_email = ? AND system_slug = ? AND track_slug = ? ORDER BY validated_at',
    args: [githubEmail, systemSlug, trackSlug],
  });
  return result.rows as unknown as UserValidation[];
}

export async function getPassedCountForTrack(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string
): Promise<number> {
  const db = getDb();
  const result = await db.execute({
    sql: `SELECT COUNT(*) as count FROM user_validations
          WHERE github_email = ? AND system_slug = ? AND track_slug = ? AND status = 'passed'`,
    args: [githubEmail, systemSlug, trackSlug],
  });
  return Number((result.rows[0] as any).count);
}

// ─── Submission Helpers (Portfolio) ──────────────────────────────────

export async function recordSubmission(submission: {
  githubEmail: string;
  systemSlug: string;
  trackSlug: string;
  prUrl: string;
  prNumber?: number;
}): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO submissions (github_email, system_slug, track_slug, pr_url, pr_number)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(github_email, system_slug, track_slug) DO UPDATE SET
            pr_url = excluded.pr_url,
            pr_number = COALESCE(excluded.pr_number, submissions.pr_number),
            pr_status = 'open',
            submitted_at = CURRENT_TIMESTAMP`,
    args: [
      submission.githubEmail,
      submission.systemSlug,
      submission.trackSlug,
      submission.prUrl,
      submission.prNumber ?? null,
    ],
  });
}

export async function updateSubmissionStatus(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string,
  status: 'open' | 'merged' | 'closed'
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: 'UPDATE submissions SET pr_status = ? WHERE github_email = ? AND system_slug = ? AND track_slug = ?',
    args: [status, githubEmail, systemSlug, trackSlug],
  });
}

export async function getUserSubmissions(email: string): Promise<Submission[]> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM submissions WHERE github_email = ? ORDER BY submitted_at DESC',
    args: [email],
  });
  return result.rows as unknown as Submission[];
}

// ─── Badge Helpers (Showcase) ────────────────────────────────────────

export async function awardBadge(
  githubEmail: string,
  systemSlug: string,
  badgeType: 'completed' | 'gold' | 'contributor' = 'completed'
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO badges (github_email, system_slug, badge_type)
          VALUES (?, ?, ?)
          ON CONFLICT(github_email, system_slug, badge_type) DO NOTHING`,
    args: [githubEmail, systemSlug, badgeType],
  });
}

export async function getUserBadges(email: string): Promise<Badge[]> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM badges WHERE github_email = ? ORDER BY awarded_at DESC',
    args: [email],
  });
  return result.rows as unknown as Badge[];
}

// ─── Portfolio View (Combined) ──────────────────────────────────────

export async function getUserPortfolio(email: string): Promise<{
  user: User | null;
  enrollments: UserEnrollment[];
  submissions: Submission[];
  badges: Badge[];
}> {
  const [user, enrollments, submissions, badges] = await Promise.all([
    getUser(email),
    getUserEnrollments(email),
    getUserSubmissions(email),
    getUserBadges(email),
  ]);

  return { user, enrollments, submissions, badges };
}
