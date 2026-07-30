import type { Metadata } from 'next';
import { WikipediaPage } from '@/presentation/pages/discover/WikipediaPage';

export const metadata: Metadata = {
  title: 'Wikipedia — 100xSystems',
  description: 'Search Wikipedia articles and reference pages.',
};

export default function WikipediaRoute() {
  return <WikipediaPage />;
}
