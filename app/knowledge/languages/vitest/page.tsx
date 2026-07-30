import type { Metadata } from 'next';
import { SiVitest } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Vitest — Knowledge Base',
  description: 'Curated resources for learning Vitest — the Vite-native test framework.',
};

const config: LanguagePageConfig = {
  slug: 'vitest', name: 'Vitest',
  description: 'Vitest is a blazing-fast unit test framework powered by Vite. It offers Jest-compatible API with native ESM support, TypeScript integration, and instant hot-module reloading for an exceptional testing experience.',
  layout: 'grid', accentBg: 'bg-[#6E9F18]', accentText: 'text-white',
  icon: <SiVitest size={28} />,
};

export default function VitestPage() { return <LanguagePageShell config={config} />; }
