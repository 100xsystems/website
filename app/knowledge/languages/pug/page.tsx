import type { Metadata } from 'next';
import { SiPug } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Pug — Knowledge Base',
  description: 'Curated resources for learning Pug — the high-performance template engine.',
};

const config: LanguagePageConfig = {
  slug: 'pug',
  name: 'Pug',
  description: 'Pug is a high-performance template engine heavily influenced by Haml, implemented in JavaScript for Node.js and browsers. Its clean, whitespace-sensitive syntax dramatically reduces HTML boilerplate.',
  layout: 'feed',
  accentBg: 'bg-[#A86454]',
  accentText: 'text-white',
  icon: <SiPug size={28} />,
};

export default function PugPage() {
  return <LanguagePageShell config={config} />;
}
