/**
 * GitHub OAuth Proxy (deprecated) — CLI now uses Device Flow directly.
 * Keeping this route for backward compatibility only.
 * Returns a helpful message redirecting users to use the CLI.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'The CLI now uses GitHub Device Flow for authentication. ' +
      'Run 100xsystems login from your terminal to authenticate.',
    docs: 'https://github.com/100xsystems/cli#authentication',
  });
}
