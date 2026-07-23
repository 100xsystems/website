import type { Metadata } from 'next';
import { FeedPage } from '@/feed/FeedPage';

export const metadata: Metadata = {
  title: 'Engineering Discovery — 100xSystems',
  description:
    'Curated engineering content from the best blogs across the industry. Discover articles from Netflix, Stripe, Cloudflare, Discord, and more.',
  openGraph: {
    title: 'Engineering Discovery — 100xSystems',
    description:
      'Curated engineering content from the best blogs across the industry.',
  },
};

export default function FeedRoute() {
  return <FeedPage />;
}
