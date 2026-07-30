import type { Metadata } from 'next';
import { MediumPage } from '@/presentation/pages/discover/MediumPage';

export const metadata: Metadata = {
  title: 'Medium — 100xSystems',
  description: 'Articles and stories from Medium publications.',
};

export default function MediumRoute() {
  return <MediumPage />;
}
