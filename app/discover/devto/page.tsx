import type { Metadata } from 'next';
import { DevtoPage } from '@/presentation/pages/discover/DevtoPage';

export const metadata: Metadata = {
  title: 'Dev.to — 100xSystems',
  description: 'Developer articles and discussions from the DEV community.',
};

export default function DevtoRoute() {
  return <DevtoPage />;
}
