import type { Metadata } from 'next';
import { SiAstro } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Astro — Knowledge Base',
  description: 'Curated resources for learning Astro — the all-in-one web framework.',
};

const config: LanguagePageConfig = {
  slug: 'astro', name: 'Astro',
  description: 'Astro is the all-in-one web framework for building content-driven websites. It delivers zero-JS by default, supports multiple UI frameworks (React, Vue, Svelte), and uses a unique islands architecture for optimal performance.',
  layout: 'grid', accentBg: 'bg-[#BC52EE]', accentText: 'text-white',
  icon: <SiAstro size={28} />,
};

export default function AstroPage() { return <LanguagePageShell config={config} />; }
