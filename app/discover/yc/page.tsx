import type { Metadata } from 'next';
import { YcPage } from '@/presentation/pages/YcPage';

export const metadata: Metadata = {
  title: 'YC Companies — 100xSystems',
  description:
    'Browse all Y Combinator startups — their mission, team, industry, and more. Filter by tag, search by name.',
  openGraph: {
    title: 'YC Companies — 100xSystems',
    description: 'Browse all Y Combinator startups indexed by 100xSystems.',
  },
};

export default function DiscoverYcRoute() {
  return <YcPage />;
}
