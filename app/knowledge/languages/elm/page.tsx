import type { Metadata } from 'next';
import { SiElm } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Elm — Knowledge Base',
  description: 'Curated resources for learning Elm — the delightful functional language for the web.',
};

const config: LanguagePageConfig = {
  slug: 'elm',
  name: 'Elm',
  description: 'Elm is a delightful functional language for building reliable web applications. It offers zero runtime exceptions, an advanced type system, and a practical approach to frontend development with its signature architecture.',
  layout: 'grid',
  accentBg: 'bg-[#60B5CC]',
  accentText: 'text-white',
  icon: <SiElm size={28} />,
};

export default function ElmPage() {
  return <LanguagePageShell config={config} />;
}
