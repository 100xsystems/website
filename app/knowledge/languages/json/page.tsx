import type { Metadata } from 'next';
import { SiJson } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'JSON — Knowledge Base',
  description: 'Curated resources for learning JSON — the universal data interchange format.',
};

const config: LanguagePageConfig = {
  slug: 'json',
  name: 'JSON',
  description: 'JSON (JavaScript Object Notation) is the most widely used data interchange format on the web. It is lightweight, language-independent, and used everywhere from APIs to configuration files to databases.',
  layout: 'compact',
  accentBg: 'bg-[#000000]',
  accentText: 'text-white',
  icon: <SiJson size={28} />,
};

export default function JsonPage() {
  return <LanguagePageShell config={config} />;
}
