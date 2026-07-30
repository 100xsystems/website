import type { Metadata } from 'next';
import { SiGraphql } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'GraphQL — Knowledge Base',
  description: 'Curated resources for learning GraphQL — the query language for APIs.',
};

const config: LanguagePageConfig = {
  slug: 'graphql',
  name: 'GraphQL',
  description: 'GraphQL is a query language and runtime for APIs, developed by Meta. It lets clients request exactly the data they need, eliminating over-fetching and under-fetching common with REST APIs.',
  layout: 'compact',
  accentBg: 'bg-[#E535AB]',
  accentText: 'text-white',
  icon: <SiGraphql size={28} />,
};

export default function GraphqlPage() {
  return <LanguagePageShell config={config} />;
}
