/**
 * POST /api/v1/upsert-user
 *
 * Web-only upsert endpoint — called from the header when a user signs in via Clerk.
 * Unlike /api/v1/login (which requires GitHub OAuth for CLI auth), this endpoint
 * trusts the Clerk-authenticated session email passed in the body.
 *
 * Body: { github_email, github_username, display_name, github_avatar }
 */

import { NextResponse } from 'next/server';
import { upsertUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { github_email, github_username, display_name, github_avatar } = body;

    if (!github_email) {
      return NextResponse.json({ error: 'github_email is required' }, { status: 400 });
    }

    await upsertUser({
      github_email,
      github_username: github_username || undefined,
      display_name: display_name || undefined,
      github_avatar,
    });

    return NextResponse.json({ status: 'ok', email: github_email });
  } catch (error) {
    console.error('[upsert-user] Error:', error);
    return NextResponse.json({ error: 'Failed to upsert user' }, { status: 500 });
  }
}
