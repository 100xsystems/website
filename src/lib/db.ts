/**
 * ## Database: Turso Client & Query Helpers
 *
 * Lazy-initialized Turso (libSQL) client singleton with
 * typed query helpers for the 100xSystems schema.
 *
 * Schema (2 tables only):
 *   users          — github_email PK, github_username, display_name, linkedin_url,
 *                    github_avatar, short_bio, current_profession, experience_years,
 *                    created_at, last_login_at
 *   user_progress  — github_email, system_slug, track_slug, lesson_slug (composite PK),
 *                    lesson_type, is_submitted, submission_link, live_link, is_validated,
 *                    positive_validations, negative_validations, liked_number, is_reported,
 *                    reported_number, achievement, achievement_type, created_at, updated_at
 *
 * @packageDocumentation
 */

import { createClient } from '@libsql/client';

// ─── Types ──────────────────────────────────────────────────────────

export interface User {
  github_email: string;
  github_username: string | null;
  display_name: string | null;
  linkedin_url: string | null;
  github_avatar: string | null;
  short_bio: string | null;
  current_profession: string | null;
  experience_years: number;
  created_at: string;
  last_login_at: string | null;
}

export interface UserProgress {
  github_email: string;
  system_slug: string;
  track_slug: string;
  lesson_slug: string;
  lesson_type: string | null;
  is_submitted: number;
  submission_link: string | null;
  live_link: string | null;
  is_validated: number;
  negative_validations: number;
  liked_number: number;
  is_reported: number;
  reported_number: number;
  achievement: string | null;
  achievement_type: string | null;
  created_at: string;
  updated_at: string;
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
  github_avatar?: string;
}): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO users (github_email, github_username, display_name, github_avatar, last_login_at)
          VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(github_email) DO UPDATE SET
            github_username = COALESCE(excluded.github_username, users.github_username),
            display_name = COALESCE(excluded.display_name, users.display_name),
            github_avatar = COALESCE(excluded.github_avatar, users.github_avatar),
            last_login_at = CURRENT_TIMESTAMP`,
    args: [user.github_email, user.github_username ?? null, user.display_name ?? null, user.github_avatar ?? null],
  });
}

export async function getUser(email: string): Promise<User | null> {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM users WHERE github_email = ?', args: [email] });
  return (result.rows[0] as unknown as User) ?? null;
}

export async function updateUser(email: string, updates: Partial<{
  display_name: string;
  linkedin_url: string;
  short_bio: string;
  current_profession: string;
  experience_years: number;
}>): Promise<void> {
  const db = getDb();
  const setClauses: string[] = [];
  const args: any[] = [];

  if (updates.display_name !== undefined) { setClauses.push('display_name = ?'); args.push(updates.display_name); }
  if (updates.linkedin_url !== undefined) { setClauses.push('linkedin_url = ?'); args.push(updates.linkedin_url); }
  if (updates.short_bio !== undefined) { setClauses.push('short_bio = ?'); args.push(updates.short_bio); }
  if (updates.current_profession !== undefined) { setClauses.push('current_profession = ?'); args.push(updates.current_profession); }
  if (updates.experience_years !== undefined) { setClauses.push('experience_years = ?'); args.push(updates.experience_years); }

  if (setClauses.length === 0) return;

  args.push(email);
  await db.execute({
    sql: `UPDATE users SET ${setClauses.join(', ')} WHERE github_email = ?`,
    args,
  });
}

export async function updateLastLogin(email: string): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: "UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE github_email = ?",
    args: [email],
  });
}

// ─── User Progress Helpers (replaces enrollment, validation, submission, badges) ──

export async function upsertUserProgress(progress: {
  github_email: string;
  system_slug: string;
  track_slug: string;
  lesson_slug: string;
  lesson_type?: string;
  is_submitted?: number;
  submission_link?: string;
  live_link?: string;
  is_validated?: number;
  achievement?: string;
  achievement_type?: string;
}): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO user_progress (github_email, system_slug, track_slug, lesson_slug, lesson_type, is_submitted, submission_link, live_link, is_validated, achievement, achievement_type, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(github_email, system_slug, track_slug, lesson_slug) DO UPDATE SET
            lesson_type = COALESCE(excluded.lesson_type, user_progress.lesson_type),
            is_submitted = COALESCE(excluded.is_submitted, user_progress.is_submitted),
            submission_link = COALESCE(excluded.submission_link, user_progress.submission_link),
            live_link = COALESCE(excluded.live_link, user_progress.live_link),
            is_validated = COALESCE(excluded.is_validated, user_progress.is_validated),
            achievement = COALESCE(excluded.achievement, user_progress.achievement),
            achievement_type = COALESCE(excluded.achievement_type, user_progress.achievement_type),
            updated_at = CURRENT_TIMESTAMP`,
    args: [
      progress.github_email,
      progress.system_slug,
      progress.track_slug,
      progress.lesson_slug,
      progress.lesson_type ?? 'lesson',
      progress.is_submitted ?? 0,
      progress.submission_link ?? null,
      progress.live_link ?? null,
      progress.is_validated ?? 0,
      progress.achievement ?? null,
      progress.achievement_type ?? null,
    ],
  });
}

/**
 * Mark a lesson as validated (sets is_validated = 1).
 * Called on successful validation.
 * No positive_validations counter — just a boolean flag.
 */
export async function markLessonValidated(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string,
  lessonSlug: string
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `UPDATE user_progress SET is_validated = 1, updated_at = CURRENT_TIMESTAMP
          WHERE github_email = ? AND system_slug = ? AND track_slug = ? AND lesson_slug = ?`,
    args: [githubEmail, systemSlug, trackSlug, lessonSlug],
  });
}

/**
 * Increment negative validations for a lesson on failed validation.
 */
export async function incrementNegativeValidation(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string,
  lessonSlug: string
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `UPDATE user_progress SET negative_validations = negative_validations + 1, updated_at = CURRENT_TIMESTAMP
          WHERE github_email = ? AND system_slug = ? AND track_slug = ? AND lesson_slug = ?`,
    args: [githubEmail, systemSlug, trackSlug, lessonSlug],
  });
}

/**
 * Get all user progress rows for a specific user and system.
 * Used by the website to determine enrollment status and lesson progress.
 */
export async function getUserProgress(
  githubEmail: string,
  systemSlug: string
): Promise<UserProgress[]> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM user_progress WHERE github_email = ? AND system_slug = ? ORDER BY created_at ASC',
    args: [githubEmail, systemSlug],
  });
  return result.rows as unknown as UserProgress[];
}

/**
 * Check if a user is enrolled in a system (has at least one progress record).
 */
export async function isUserEnrolled(githubEmail: string, systemSlug: string): Promise<boolean> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT 1 FROM user_progress WHERE github_email = ? AND system_slug = ? LIMIT 1',
    args: [githubEmail, systemSlug],
  });
  return result.rows.length > 0;
}

/**
 * Get the current lesson for a user in a system (most recent validated lesson or first lesson).
 */
export async function getCurrentLesson(
  githubEmail: string,
  systemSlug: string,
  trackSlug: string
): Promise<UserProgress | null> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM user_progress WHERE github_email = ? AND system_slug = ? AND track_slug = ? ORDER BY created_at DESC LIMIT 1',
    args: [githubEmail, systemSlug, trackSlug],
  });
  return (result.rows[0] as unknown as UserProgress) ?? null;
}

/**
 * Get all achievements for a user.
 */
export async function getUserAchievements(githubEmail: string): Promise<UserProgress[]> {
  const db = getDb();
  const result = await db.execute({
    sql: `SELECT * FROM user_progress WHERE github_email = ? AND achievement IS NOT NULL AND achievement != '' ORDER BY updated_at DESC`,
    args: [githubEmail],
  });
  return result.rows as unknown as UserProgress[];
}

/**
 * Get all systems a user is enrolled in.
 */
export async function getUserEnrolledSystems(githubEmail: string): Promise<UserProgress[]> {
  const db = getDb();
  const result = await db.execute({
    sql: `SELECT DISTINCT system_slug, track_slug, MIN(created_at) as created_at
          FROM user_progress WHERE github_email = ?
          GROUP BY system_slug, track_slug ORDER BY created_at DESC`,
    args: [githubEmail],
  });
  return result.rows as unknown as UserProgress[];
}

/**
 * Get submission count for a user.
 */
export async function getUserSubmissionCount(githubEmail: string): Promise<number> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM user_progress WHERE github_email = ? AND is_submitted = 1',
    args: [githubEmail],
  });
  return Number((result.rows[0] as any).count);
}

/**
 * Get validation count for a user.
 */
export async function getUserValidationCount(githubEmail: string): Promise<number> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM user_progress WHERE github_email = ? AND is_validated = 1',
    args: [githubEmail],
  });
  return Number((result.rows[0] as any).count);
}

/**
 * Get user's progress summary for activity page.
 */
export async function getUserActivitySummary(githubEmail: string): Promise<{
  systemsEnrolled: number;
  tracksEnrolled: number;
  lessonsCompleted: number;
  submissionsCount: number;
  validationsCount: number;
}> {
  const db = getDb();
  const [systemsResult, tracksResult, lessonsResult, submissionsResult, validationsResult] = await Promise.all([
    db.execute({ sql: 'SELECT COUNT(DISTINCT system_slug) as count FROM user_progress WHERE github_email = ?', args: [githubEmail] }),
    db.execute({ sql: 'SELECT COUNT(DISTINCT system_slug || track_slug) as count FROM user_progress WHERE github_email = ?', args: [githubEmail] }),
    db.execute({ sql: 'SELECT COUNT(*) as count FROM user_progress WHERE github_email = ? AND is_validated = 1', args: [githubEmail] }),
    db.execute({ sql: 'SELECT COUNT(*) as count FROM user_progress WHERE github_email = ? AND is_submitted = 1', args: [githubEmail] }),
    db.execute({ sql: 'SELECT COUNT(*) as count FROM user_progress WHERE github_email = ? AND is_validated = 1', args: [githubEmail] }),
  ]);

  return {
    systemsEnrolled: Number((systemsResult.rows[0] as any).count),
    tracksEnrolled: Number((tracksResult.rows[0] as any).count),
    lessonsCompleted: Number((lessonsResult.rows[0] as any).count),
    submissionsCount: Number((submissionsResult.rows[0] as any).count),
    validationsCount: Number((validationsResult.rows[0] as any).count),
  };
}

/**
 * Get leaderboard for a system (recently validated lessons).
 */
export async function getLeaderboard(systemSlug: string, limit: number = 10): Promise<any[]> {
  const db = getDb();
  const result = await db.execute({
    sql: `SELECT p.github_email, u.github_username, p.system_slug, p.track_slug, p.lesson_slug, p.updated_at
          FROM user_progress p
          LEFT JOIN users u ON u.github_email = p.github_email
          WHERE p.system_slug = ? AND p.is_validated = 1
          ORDER BY p.updated_at DESC
          LIMIT ?`,
    args: [systemSlug, limit],
  });
  return result.rows;
}

/**
 * Get submissions for a specific lesson.
 */
export async function getSubmissions(
  systemSlug: string,
  trackSlug: string,
  lessonSlug: string,
  limit: number = 50
): Promise<UserProgress[]> {
  const db = getDb();
  const result = await db.execute({
    sql: `SELECT * FROM user_progress
          WHERE system_slug = ? AND track_slug = ? AND lesson_slug = ? AND is_submitted = 1
          ORDER BY liked_number DESC
          LIMIT ?`,
    args: [systemSlug, trackSlug, lessonSlug, limit],
  });
  return result.rows as unknown as UserProgress[];
}

/**
 * Like a submission (increment liked_number).
 */
export async function likeSubmission(
  targetEmail: string,
  systemSlug: string,
  trackSlug: string,
  lessonSlug: string
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `UPDATE user_progress SET liked_number = liked_number + 1, updated_at = CURRENT_TIMESTAMP
          WHERE github_email = ? AND system_slug = ? AND track_slug = ? AND lesson_slug = ?`,
    args: [targetEmail, systemSlug, trackSlug, lessonSlug],
  });
}

/**
 * Report a submission (increment reported_number, set is_reported).
 */
export async function reportSubmission(
  targetEmail: string,
  systemSlug: string,
  trackSlug: string,
  lessonSlug: string
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `UPDATE user_progress SET is_reported = 1, reported_number = reported_number + 1, updated_at = CURRENT_TIMESTAMP
          WHERE github_email = ? AND system_slug = ? AND track_slug = ? AND lesson_slug = ?`,
    args: [targetEmail, systemSlug, trackSlug, lessonSlug],
  });
}

/**
 * Get user portfolio (profile data + enrolled systems).
 */
export async function getUserPortfolio(email: string): Promise<{
  user: User | null;
  systems: UserProgress[];
}> {
  const [user, systems] = await Promise.all([
    getUser(email),
    getUserEnrolledSystems(email),
  ]);
  return { user, systems };
}

// ─── Feed Bookmarks ──────────────────────────────────────────────────

/**
 * Schema: feed_bookmarks
 *
 *   user_email TEXT NOT NULL,
 *   url        TEXT NOT NULL,
 *   title      TEXT NOT NULL,
 *   feed_name  TEXT NOT NULL,
 *   feed_id    TEXT NOT NULL,
 *   saved_at   TEXT NOT NULL DEFAULT (datetime('now')),
 *   PRIMARY KEY (user_email, url)
 */

export interface FeedBookmark {
  user_email: string;
  url: string;
  title: string;
  feed_name: string;
  feed_id: string;
  saved_at: string;
}

export async function addFeedBookmark(bookmark: {
  user_email: string;
  url: string;
  title: string;
  feed_name: string;
  feed_id: string;
  /** ISO 8601 timestamp. Defaults to now if omitted. */
  saved_at?: string;
}): Promise<void> {
  const db = getDb();
  const timestamp = bookmark.saved_at ?? new Date().toISOString();
  await db.execute({
    sql: `INSERT OR IGNORE INTO feed_bookmarks (user_email, url, title, feed_name, feed_id, saved_at)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [bookmark.user_email, bookmark.url, bookmark.title, bookmark.feed_name, bookmark.feed_id, timestamp],
  });
}

export async function removeFeedBookmark(userEmail: string, url: string): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: 'DELETE FROM feed_bookmarks WHERE user_email = ? AND url = ?',
    args: [userEmail, url],
  });
}

export async function getFeedBookmarks(userEmail: string): Promise<FeedBookmark[]> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM feed_bookmarks WHERE user_email = ? ORDER BY saved_at DESC',
    args: [userEmail],
  });
  return result.rows as unknown as FeedBookmark[];
}

export async function clearFeedBookmarks(userEmail: string): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: 'DELETE FROM feed_bookmarks WHERE user_email = ?',
    args: [userEmail],
  });
}

// ─── Feed Preferences ──────────────────────────────────────────────────

/**
 * Schema: feed_preferences
 *
 *   user_email      TEXT PRIMARY KEY,
 *   selected_feeds  TEXT NOT NULL DEFAULT '[]',  -- JSON array of feed IDs
 *   selected_tags   TEXT NOT NULL DEFAULT '[]',  -- JSON array of tag strings
 *   sort_by         TEXT NOT NULL DEFAULT 'newest',
 *   updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
 */

export interface FeedPreferencesRow {
  user_email: string;
  selected_feeds: string;
  selected_tags: string;
  sort_by: 'newest' | 'hn-rank';
  updated_at: string;
}

export interface FeedPreferencesData {
  userEmail: string;
  selectedFeeds: string[];
  selectedTags: string[];
  sortBy: 'newest' | 'hn-rank';
  updatedAt: string;
}

export async function getFeedPreferences(userEmail: string): Promise<FeedPreferencesData | null> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM feed_preferences WHERE user_email = ?',
    args: [userEmail],
  });
  const row = result.rows[0] as unknown as FeedPreferencesRow | undefined;
  if (!row) return null;
  return {
    userEmail: row.user_email,
    selectedFeeds: JSON.parse(row.selected_feeds),
    selectedTags: JSON.parse(row.selected_tags),
    sortBy: row.sort_by,
    updatedAt: row.updated_at,
  };
}

export async function upsertFeedPreferences(
  userEmail: string,
  prefs: { selectedFeeds: string[]; selectedTags: string[]; sortBy: 'newest' | 'hn-rank' }
): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: `INSERT INTO feed_preferences (user_email, selected_feeds, selected_tags, sort_by, updated_at)
          VALUES (?, ?, ?, ?, datetime('now'))
          ON CONFLICT(user_email) DO UPDATE SET
            selected_feeds = excluded.selected_feeds,
            selected_tags = excluded.selected_tags,
            sort_by = excluded.sort_by,
            updated_at = datetime('now')`,
    args: [
      userEmail,
      JSON.stringify(prefs.selectedFeeds),
      JSON.stringify(prefs.selectedTags),
      prefs.sortBy,
    ],
  });
}

export async function deleteFeedPreferences(userEmail: string): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: 'DELETE FROM feed_preferences WHERE user_email = ?',
    args: [userEmail],
  });
}

export async function isFeedBookmarked(userEmail: string, url: string): Promise<boolean> {
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT 1 FROM feed_bookmarks WHERE user_email = ? AND url = ? LIMIT 1',
    args: [userEmail, url],
  });
  return result.rows.length > 0;
}

export async function upsertFeedBookmarks(userEmail: string, bookmarks: Array<{
  url: string;
  title: string;
  feed_name: string;
  feed_id: string;
  saved_at?: string;
}>): Promise<void> {
  const db = getDb();

  // Use a transaction for bulk upsert
  await db.execute('BEGIN TRANSACTION');
  try {
    // Delete all existing bookmarks for this user
    await db.execute({
      sql: 'DELETE FROM feed_bookmarks WHERE user_email = ?',
      args: [userEmail],
    });

    // Insert all bookmarks
    for (const bm of bookmarks) {
      await db.execute({
        sql: `INSERT INTO feed_bookmarks (user_email, url, title, feed_name, feed_id, saved_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [userEmail, bm.url, bm.title, bm.feed_name, bm.feed_id, bm.saved_at ?? new Date().toISOString()],
      });
    }

    await db.execute('COMMIT');
  } catch (err) {
    await db.execute('ROLLBACK');
    throw err;
  }
}
