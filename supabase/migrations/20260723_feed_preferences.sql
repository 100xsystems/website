-- Migration: create feed_preferences table
-- Date: 2026-07-23
-- Description: Adds a table for cross-device preference sync for the Discovery feed.
-- Uses Clerk user IDs as the user identifier.
-- Stores only feed filter preferences (selected feeds, tags, sort order).
-- No article content is ever stored.

CREATE TABLE IF NOT EXISTS feed_preferences (
    user_email TEXT NOT NULL PRIMARY KEY,
    selected_feeds TEXT NOT NULL DEFAULT '[]',
    selected_tags TEXT NOT NULL DEFAULT '[]',
    sort_by TEXT NOT NULL DEFAULT 'newest',
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
