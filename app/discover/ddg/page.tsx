import type { Metadata } from 'next';
import { DdgPage } from '@/presentation/pages/discover/DdgPage';

export const metadata: Metadata = {
  title: 'DuckDuckGo — 100xSystems',
  description: 'Instant answers and related topics from DuckDuckGo.',
};

export default function DdgRoute() {
  return <DdgPage />;
}
