import type { Metadata } from 'next';
import { StackoverflowPage } from '@/presentation/pages/discover/StackoverflowPage';

export const metadata: Metadata = {
  title: 'Stack Overflow — 100xSystems',
  description: 'Q&A for programming topics, sorted by votes and relevance.',
};

export default function StackoverflowRoute() {
  return <StackoverflowPage />;
}
