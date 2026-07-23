/**
 * /api/feed/preferences
 *
 * CRUD API for feed preferences. Uses Clerk auth to identify the user.
 *
 * GET    — Get preferences for the authenticated user
 * POST   — Upsert preferences (sync from client)
 * DELETE — Clear preferences
 *
 * ETHICAL NOTE:
 *   We store only filter metadata (selected feeds, tags, sort order).
 *   No article content is ever stored anywhere in this API.
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  getFeedPreferences,
  upsertFeedPreferences,
  deleteFeedPreferences,
} from '@/lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const prefs = await getFeedPreferences(userId);
    return NextResponse.json({
      preferences: prefs ?? {
        userEmail: userId,
        selectedFeeds: [],
        selectedTags: [],
        sortBy: 'newest',
        updatedAt: null,
      },
    });
  } catch (error) {
    console.error('[feed-preferences] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
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

  const { selectedFeeds, selectedTags, sortBy } = body as Record<string, unknown>;

  // Validate
  if (!Array.isArray(selectedFeeds) || !Array.isArray(selectedTags)) {
    return NextResponse.json(
      { error: 'selectedFeeds and selectedTags must be arrays' },
      { status: 400 }
    );
  }
  if (sortBy !== 'newest' && sortBy !== 'hn-rank') {
    return NextResponse.json(
      { error: 'sortBy must be "newest" or "hn-rank"' },
      { status: 400 }
    );
  }

  try {
    await upsertFeedPreferences(userId, {
      selectedFeeds: selectedFeeds as string[],
      selectedTags: selectedTags as string[],
      sortBy: sortBy as 'newest' | 'hn-rank',
    });
    return NextResponse.json({ status: 'synced' });
  } catch (error) {
    console.error('[feed-preferences] POST error:', error);
    return NextResponse.json({ error: 'Failed to sync preferences' }, { status: 500 });
  }
}

export async function DELETE() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    await deleteFeedPreferences(userId);
    return NextResponse.json({ status: 'cleared' });
  } catch (error) {
    console.error('[feed-preferences] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to clear preferences' }, { status: 500 });
  }
}
