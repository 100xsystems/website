/**
 * ## Auth Middleware — GitHub Token Verification
 *
 * The CLI authenticates via GitHub OAuth (PKCE) and sends the access token
 * in the `Authorization` header. This middleware verifies the token by
 * calling the GitHub API, then auto-upserts the user.
 *
 * @packageDocumentation
 */

import { type NextRequest, NextResponse } from 'next/server';
import { upsertUser } from '@/lib/db';

// ─── Error ──────────────────────────────────────────────────────────

export class AuthError extends Error {
  constructor(
    message: string,
    public status: number = 401,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

// ─── Verified User ──────────────────────────────────────────────────

export interface VerifiedUser {
  github_email: string;
  github_username: string;
  display_name: string;
}

// ─── Verify Token ───────────────────────────────────────────────────

export async function verifyGitHubToken(token: string): Promise<VerifiedUser> {
  if (!token) {
    throw new AuthError('Authorization header required');
  }

  // Remove "Bearer " prefix if present
  const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

  // Verify with GitHub API
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': '100xsystems',
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new AuthError('Invalid or expired GitHub token', 401);
    }
    throw new AuthError(`GitHub API error: ${res.status}`, 502);
  }

  const user = await res.json();
  const githubUsername: string = user.login;

  // Fetch primary email (public user emails endpoint)
  let email = '';
  try {
    const emailRes = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': '100xsystems',
      },
    });
    if (emailRes.ok) {
      const emails = await emailRes.json();
      const primary = emails.find((e: any) => e.primary);
      email = primary?.email || '';
    }
  } catch {
    // Fallback: use username-based email
  }

  // If no email from GitHub, use a placeholder
  const githubEmail = email || `${githubUsername}@users.noreply.github.com`;

  const verified: VerifiedUser = {
    github_email: githubEmail,
    github_username: githubUsername,
    display_name: user.name || githubUsername,
  };

  // Auto-upsert user on every validated call (keeps last_login_at current)
  await upsertUser({
    github_email: githubEmail,
    github_username: githubUsername,
    display_name: user.name || undefined,
  });

  return verified;
}

// ─── Extract Token from Request ─────────────────────────────────────

export function extractToken(request: NextRequest): string {
  const auth = request.headers.get('Authorization');
  if (!auth) throw new AuthError('Missing Authorization header');
  return auth;
}

// ─── withAuth — Route Handler Wrapper ───────────────────────────────

export function withAuth(
  handler: (request: NextRequest, user: VerifiedUser) => Promise<NextResponse>,
) {
  return async (request: NextRequest) => {
    try {
      const token = extractToken(request);
      const user = await verifyGitHubToken(token);
      return await handler(request, user);
    } catch (error) {
      if (error instanceof AuthError) {
        return NextResponse.json(
          { error: error.message },
          { status: error.status },
        );
      }
      console.error('[auth] Unexpected error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 },
      );
    }
  };
}
