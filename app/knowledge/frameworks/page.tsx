import type { Metadata } from 'next';
import { refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { CategoryHubIndex } from '@/components/category-hub-index';

export const metadata: Metadata = {
  title: 'Frameworks — Knowledge Base',
  description:
    'Eighteen complete framework courses across web, backend and mobile — React, Vue, Angular, Next.js, Django, Express, Flutter and more. Free and open.',
};

export default function FrameworksKnowledgePage() {
  // ISR: re-clone the registry knowledge tree if stale.
  refreshKnowledgeCacheIfStale();
  return (
    <CategoryHubIndex
      category="frameworks"
      categoryLabel="Frameworks"
      hubLabel="Frameworks"
      description="Eighteen complete framework courses across web, backend and mobile — React, Vue, Angular, Next.js, Django, Express, Flutter and more."
    />
  );
}
