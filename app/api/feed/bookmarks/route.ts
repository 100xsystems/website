/**
 * /api/feed/bookmarks
 *
 * CRUD API for feed bookmarks. Uses Clerk auth to identify the user.
 *
 * GET    — List all bookmarks for the authenticated user
 * POST   — Add a new bookmark
 * DELETE — Remove a bookmark (via query param ?url=...)
 *
 * ETHICAL NOTE:
 *   We store only metadata (title, URL, feed name, feed ID). We NEVER store
 *   article body content. Users click through to the original source.
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  addFeedBookmark,
  removeFeedBookmark,
  getFeedBookmarks,
  clearFeedBookmarks,
} from '@/lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const bookmarks = await getFeedBookmarks(userId);
    return NextResponse.json({ bookmarks });
  } catch (error) {
    console.error('[bookmarks] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Check for batch sync first (array of bookmarks)
  if (Array.isArray(body)) {
    const { upsertFeedBookmarks } = await import('@/lib/db');
    try {
      const bookmarks = body as Array<{
        url: string;
        title: string;
        feed_name: string;
        feed_id: string;
        saved_at?: string;
      }>;
      // Validate each bookmark has required fields
      for (const bm of bookmarks) {
        if (!bm.url || !bm.title) {
          return NextResponse.json({ error: 'Each bookmark must have url and title' }, { status: 400 });
        }
      }
      await upsertFeedBookmarks(userId, bookmarks);
      return NextResponse.json({ status: 'synced', count: bookmarks.length });
    } catch (error) {
      console.error('[bookmarks] Batch sync error:', error);
      return NextResponse.json({ error: 'Failed to sync bookmarks' }, { status: 500 });
    }
  }

  // Single bookmark
  const { url, title, feed_name, feed_id } = body as Record<string, unknown>;

  if (!url || typeof url !== 'string' || !title || typeof title !== 'string') {
    return NextResponse.json({ error: 'url and title are required' }, { status: 400 });
  }

  try {
    await addFeedBookmark({
      user_email: userId,
      url,
      title,
      feed_name: typeof feed_name === 'string' ? feed_name : '',
      feed_id: typeof feed_id === 'string' ? feed_id : '',
    });
    return NextResponse.json({ status: 'bookmarked' }, { status: 201 });
  } catch (error) {
    console.error('[bookmarks] POST error:', error);
    return NextResponse.json({ error: 'Failed to add bookmark' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (url) {
    // Remove single bookmark
    try {
      await removeFeedBookmark(userId, url);
      return NextResponse.json({ status: 'removed' });
    } catch (error) {
      console.error('[bookmarks] DELETE error:', error);
      return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 });
    }
  }

  // No specific URL = clear all
  try {
    await clearFeedBookmarks(userId);
    return NextResponse.json({ status: 'cleared' });
  } catch (error) {
    console.error('[bookmarks] DELETE clear all error:', error);
    return NextResponse.json({ error: 'Failed to clear bookmarks' }, { status: 500 });
  }
}
