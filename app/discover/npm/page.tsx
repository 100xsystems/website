import type { Metadata } from 'next';
import { NpmPage } from '@/presentation/pages/discover/NpmPage';

export const metadata: Metadata = {
  title: 'NPM Packages — 100xSystems',
  description: 'Search the npm registry for packages by score, quality, and maintenance.',
};

export default function NpmRoute() {
  return <NpmPage />;
}
