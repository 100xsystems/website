import type { Metadata } from 'next';
import { SiLess } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Less — Knowledge Base',
  description: 'Curated resources for learning Less — the dynamic CSS preprocessor.',
};

const config: LanguagePageConfig = {
  slug: 'less',
  name: 'Less',
  description: 'Less is a CSS pre-processor that extends CSS with dynamic behavior such as variables, mixins, operations, and functions. It runs on both client and server side, making CSS more maintainable and extensible.',
  layout: 'compact',
  accentBg: 'bg-[#1D365D]',
  accentText: 'text-white',
  icon: <SiLess size={28} />,
};

export default function LessPage() {
  return <LanguagePageShell config={config} />;
}
