import type { Metadata } from 'next';
import { Heading, Text, Badge } from '@/presentation/__components';
import { SearchPageClient } from './SearchPageClient';

export const metadata: Metadata = {
  title: 'Search — Engineering Discovery',
  description:
    'Search across Hacker News, Reddit, GitHub, Stack Overflow, NPM, Dev.to, Medium, and DuckDuckGo from one unified interface. Discover engineering knowledge across the web.',
  openGraph: {
    title: 'Search — Engineering Discovery',
    description:
      'Search across Hacker News, Reddit, GitHub, Stack Overflow, NPM, Dev.to, Medium, and DuckDuckGo from one unified interface.',
  },
};

export default function SearchPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <Badge variant="purple" size="sm" className="mb-4">
            MULTI-SOURCE SEARCH
          </Badge>
          <Heading variant="h1" className="uppercase tracking-tight mb-3">
            Discover Across the Web
          </Heading>
          <Text variant="body-lg" className="max-w-2xl mx-auto">
            One search. Multiple sources. No algorithms, no clutter — just real engineering
            knowledge from the platforms you trust.
          </Text>
        </div>

        {/* Unified Search Client */}
        <SearchPageClient />
      </div>
    </div>
  );
}
