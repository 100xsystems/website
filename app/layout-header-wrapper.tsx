'use client';

import { usePathname } from 'next/navigation';
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs';
import { Header } from '@/presentation/__components';
import type { HeaderNavItem } from '@/presentation/__components';
import type { ReactNode } from 'react';

interface HeaderWrapperProps {
  items: HeaderNavItem[];
  logo: ReactNode;
}

export function HeaderWrapper({ items, logo }: HeaderWrapperProps) {
  const pathname = usePathname();
  const isReadingPage = pathname.includes('/read/') || pathname.startsWith('/cli-docs/');

  if (isReadingPage) return null;

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
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8',
                  userButtonPopoverCard: 'shadow-xl',
                },
              }}
            />
          </Show>
        </div>
      }
    />
  );
}
