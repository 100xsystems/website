-- Migration: create feed_bookmarks table
-- Date: 2026-07-23
-- Description: Adds a table for cross-device bookmark sync for the Discovery feed.
-- Uses Clerk user IDs as the user identifier.
-- Stores only article metadata (title, URL, feed name, feed ID). Never article bodies.

CREATE TABLE IF NOT EXISTS feed_bookmarks (
    user_email TEXT NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    feed_name TEXT NOT NULL DEFAULT '',
    feed_id TEXT NOT NULL DEFAULT '',
    saved_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_email, url)
);

-- Index for fast lookups by user
CREATE INDEX IF NOT EXISTS idx_feed_bookmarks_user_email ON feed_bookmarks(user_email);

-- Index for ordering by save time
CREATE INDEX IF NOT EXISTS idx_feed_bookmarks_saved_at ON feed_bookmarks(saved_at DESC);
