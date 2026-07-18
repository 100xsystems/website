'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/presentation/__components';

export function FooterWrapper() {
  const pathname = usePathname();
  // Hide footer on lesson pages and reading pages — these have their own layout
  const lessonPagePattern = /^\/systems\/[^\/]+\/[^\/]+\/[^\/]+$/;
  const isReadingPage = pathname.includes('/read/') || pathname.startsWith('/cli-docs/') || lessonPagePattern.test(pathname);

  if (isReadingPage) return null;

  return <Footer />;
}
