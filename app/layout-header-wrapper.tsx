'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, Show, useUser } from '@clerk/nextjs';
import { Header } from '@/presentation/__components';
import type { HeaderNavItem } from '@/presentation/__components';
import type { ReactNode } from 'react';

interface HeaderWrapperProps {
  items: HeaderNavItem[];
  logo: ReactNode;
}

export function HeaderWrapper({ items, logo }: HeaderWrapperProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const isReadingPage = pathname.includes('/read/') || pathname.startsWith('/cli-docs/');

  if (isReadingPage) return null;

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const portfolioHref = userEmail
    ? `/portfolio/${encodeURIComponent(userEmail)}`
    : null;

  return (
    <Header
      items={items}
      logo={logo}
      actions={
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-accent text-accent hover:bg-accent hover:text-white transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center gap-2">
              {portfolioHref && (
                <Link
                  href={portfolioHref}
                  className="text-[10px] font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors"
                >
                  Portfolio
                </Link>
              )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8',
                    userButtonPopoverCard: 'shadow-xl',
                  },
                }}
              />
            </div>
          </Show>
        </div>
      }
    />
  );
}
