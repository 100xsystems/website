'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SignInButton, SignUpButton, Show, useUser } from '@clerk/nextjs';
import { Header, Dropdown } from '@/presentation/__components';
import type { HeaderNavItem } from '@/presentation/__components';
import { useEffect, useState, type ReactNode } from 'react';

interface HeaderWrapperProps {
  items: HeaderNavItem[];
  logo: ReactNode;
}

export function HeaderWrapper({ items, logo }: HeaderWrapperProps) {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();
  const [localUser, setLocalUser] = useState<{ email: string; username: string } | null>(null);
  // Hide header on lesson pages and reading pages — these have their own sidebar+outline layout
  const lessonPagePattern = /^\/systems\/[^\/]+\/[^\/]+\/[^\/]+$/;
  const isReadingPage = pathname.includes('/read/') || pathname.startsWith('/cli-docs/') || lessonPagePattern.test(pathname);

  // On sign-in, upsert user into DB + store in localStorage
  useEffect(() => {
    if (!isSignedIn || !user) {
      setLocalUser(null);
      localStorage.removeItem('current-user');
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress || '';
    const githubUsername = user.externalAccounts?.find(
      (account) => account.provider === 'github'
    )?.username || email.split('@')[0] || 'User';

    // Store in localStorage immediately for fast access
    const userData = { email, username: githubUsername };
    localStorage.setItem('current-user', JSON.stringify(userData));
    setLocalUser(userData);

    // Upsert user in DB via web-friendly API call (no GitHub token needed)
    fetch('/api/v1/upsert-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        github_email: email,
        github_username: githubUsername,
        display_name: user.fullName || githubUsername,
        github_avatar: user.imageUrl || '',
      }),
    }).catch((err) => console.warn('[header] Failed to upsert user:', err));
  }, [isSignedIn, user]);

  if (isReadingPage) return null;

  // Derive username: try Clerk's GitHub external account, then fallback to localStorage, then email
  const clerkGithubUsername = user?.externalAccounts?.find(
    (account) => account.provider === 'github'
  )?.username;
  const localUsername = localUser?.username;
  const emailUsername = user?.primaryEmailAddress?.emailAddress?.split('@')[0];
  const githubUsername = clerkGithubUsername || localUsername || emailUsername || 'User';

  const dropdownItems = [
    { id: 'profile', label: 'My Profile', href: '/settings/profile' },
    { id: 'reading', label: 'Reading Settings', href: '/settings/reading' },
    { id: 'achievements', label: 'My Achievements', href: '/settings/achievements' },
    { id: 'activity', label: 'My Activity', href: '/settings/activity' },
  ];

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
              <Dropdown
                trigger={
                  <span className="text-sm font-bold uppercase tracking-wider text-fg-secondary cursor-pointer hover:text-accent-yellow transition-colors duration-200 whitespace-nowrap">
                    Hi, {githubUsername}
                  </span>
                }
                items={dropdownItems}
                align="right"
              />
            </div>
          </Show>
        </div>
      }
    />
  );
}
