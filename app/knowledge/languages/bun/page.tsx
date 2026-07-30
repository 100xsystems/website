import type { Metadata } from 'next';
import { SiBun } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Bun — Knowledge Base',
  description: 'Curated resources for learning Bun — the all-in-one JavaScript runtime.',
};

const config: LanguagePageConfig = {
  slug: 'bun', name: 'Bun',
  description: 'Bun is an all-in-one JavaScript runtime, package manager, test runner, and bundler. Designed as a drop-in replacement for Node.js, it delivers blazing-fast startup times and built-in TypeScript support.',
  layout: 'grid', accentBg: 'bg-[#14151A]', accentText: 'text-white',
  icon: <SiBun size={28} />,
};

export default function BunPage() { return <LanguagePageShell config={config} />; }
