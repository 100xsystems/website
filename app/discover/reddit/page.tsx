import type { Metadata } from 'next';
import { RedditPage } from '@/presentation/pages/discover/RedditPage';

export const metadata: Metadata = {
  title: 'Reddit — 100xSystems',
  description: 'Discussions and posts from subreddits across programming topics.',
};

export default function RedditRoute() {
  return <RedditPage />;
}
