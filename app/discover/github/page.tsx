import type { Metadata } from 'next';
import { GitHubPage } from '@/presentation/pages/discover/GitHubPage';

export const metadata: Metadata = {
  title: 'GitHub Repos — 100xSystems',
  description: 'Search public repositories by stars, language, and topics.',
};

export default function GitHubRoute() {
  return <GitHubPage />;
}
