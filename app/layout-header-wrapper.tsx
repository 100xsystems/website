'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/presentation/__components';
import type { HeaderNavItem } from '@/presentation/__components';
import type { ReactNode } from 'react';

interface HeaderWrapperProps {
  items: HeaderNavItem[];
  logo: ReactNode;
}

export function HeaderWrapper({ items, logo }: HeaderWrapperProps) {
  const pathname = usePathname();
  // Hide header on lesson pages and reading pages — these have their own sidebar+outline layout
  const lessonPagePattern = /^\/systems\/[^\/]+\/[^\/]+\/[^\/]+$/;
  // Knowledge lesson pages (e.g. /knowledge/languages/python/py-08-files-exceptions)
  const knowledgeLessonPattern = /^\/knowledge\/[^\/]+\/[^\/]+\/[^\/]+$/;
  const isReadingPage = pathname.includes('/read/') || lessonPagePattern.test(pathname) || knowledgeLessonPattern.test(pathname);

  if (isReadingPage) return null;

  return <Header items={items} logo={logo} />;
}
