'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/presentation/__components';

export function FooterWrapper() {
  const pathname = usePathname();
  // Hide footer on lesson pages and reading pages — these have their own layout
  const lessonPagePattern = /^\/systems\/[^\/]+\/[^\/]+\/[^\/]+$/;
  // Knowledge lesson pages (e.g. /knowledge/languages/python/py-08-files-exceptions)
  const knowledgeLessonPattern = /^\/knowledge\/[^\/]+\/[^\/]+\/[^\/]+$/;
  const isReadingPage = pathname.includes('/read/') || lessonPagePattern.test(pathname) || knowledgeLessonPattern.test(pathname);

  if (isReadingPage) return null;

  return <Footer />;
}
