/**
 * POST /api/v1/login
 *
 * Called by: CLI login command
 * Auth: GitHub token
 * Body: { github_email, github_username, display_name, github_avatar }
 *
 * Upserts user from GitHub auth info.
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { upsertUser, getUser } from '@/lib/db';
import type { VerifiedUser } from '@/lib/auth';

export const POST = withAuth(async (request, user: VerifiedUser) => {
  const body = await request.json();
  const { github_email, github_username, display_name, github_avatar } = body;

  if (!github_email) {
    return NextResponse.json({ error: 'github_email is required' }, { status: 400 });
  }

  await upsertUser({
    github_email,
    github_username: github_username || user.github_username,
    display_name: display_name || user.display_name,
    github_avatar,
  });

  const dbUser = await getUser(github_email);

  return NextResponse.json({
    status: 'ok',
    user: dbUser ? {
      githubEmail: dbUser.github_email,
      githubUsername: dbUser.github_username,
      displayName: dbUser.display_name,
      githubAvatar: dbUser.github_avatar,
    } : null,
  });
});
