import type { Metadata } from 'next';
import { SiJest } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Jest — Knowledge Base',
  description: 'Curated resources for learning Jest — the JavaScript testing framework.',
};

const config: LanguagePageConfig = {
  slug: 'jest', name: 'Jest',
  description: 'Jest is the most popular JavaScript testing framework. Created by Meta, it provides a zero-config setup, built-in mocking, snapshot testing, and code coverage for projects of any size.',
  layout: 'bento', accentBg: 'bg-[#C21325]', accentText: 'text-white',
  icon: <SiJest size={28} />,
};

export default function JestPage() { return <LanguagePageShell config={config} />; }
