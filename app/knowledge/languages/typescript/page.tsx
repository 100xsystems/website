import type { Metadata } from 'next';
import { SiTypescript } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'TypeScript — Knowledge Base',
  description: 'Curated resources for learning TypeScript — JavaScript with types.',
};

const config: LanguagePageConfig = {
  slug: 'typescript',
  name: 'TypeScript',
  description:
    'TypeScript is JavaScript with static types. It catches errors at compile time, enables fearless refactoring, and powers the largest codebases in the world. These are the definitive free resources — vetted, current, and complete.',
  layout: 'grid',
  accentBg: 'bg-[#3178C6]',
  accentText: 'text-white',
  icon: <SiTypescript size={28} />,
};

export default function TypeScriptPage() {
  return <LanguagePageShell config={config} />;
}
