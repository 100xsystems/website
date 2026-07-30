import type { Metadata } from 'next';
import { HnPage } from '@/presentation/pages/discover/HnPage';

export const metadata: Metadata = {
  title: 'Hacker News — 100xSystems',
  description: 'Top stories and discussions from the Y Combinator community.',
};

export default function HnRoute() {
  return <HnPage />;
}
