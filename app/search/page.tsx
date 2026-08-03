import type { Metadata } from 'next';
import { HomeUnifiedSearch } from '@/presentation/features/homeUnifiedSearch.feature';

export const metadata: Metadata = {
  title: 'Search — Engineering Discovery',
  description:
    'Search everything: engineering blogs, YC companies, GitHub repos, packages, lessons, and the web — all at once from one unified interface.',
  openGraph: {
    title: 'Search — Engineering Discovery',
    description:
      'Search everything: engineering blogs, YC companies, GitHub repos, packages, lessons, and the web — all at once.',
  },
};

export default function SearchPage() {
  return <HomeUnifiedSearch />;
}
