import type { Metadata } from 'next';
import { ProductHuntPage } from '@/presentation/pages/ProductHuntPage';

export const metadata: Metadata = {
  title: 'Product Hunt Products — 100xSystems',
  description:
    'Browse the latest product launches from Product Hunt — filter by topic, search by name or maker.',
  openGraph: {
    title: 'Product Hunt Products — 100xSystems',
    description: 'Browse the latest Product Hunt products indexed by 100xSystems.',
  },
};

export default function ProductHuntRoute() {
  return <ProductHuntPage />;
}
