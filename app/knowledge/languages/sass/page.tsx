import type { Metadata } from 'next';
import { SiSass } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Sass — Knowledge Base',
  description: 'Curated resources for learning Sass — CSS with superpowers.',
};

const config: LanguagePageConfig = {
  slug: 'sass',
  name: 'Sass',
  description: 'Sass (Syntactically Awesome Style Sheets) is a mature, stable CSS extension language that adds variables, nesting, mixins, functions, and modularity to CSS. It is the most popular CSS preprocessor in the world.',
  layout: 'grid',
  accentBg: 'bg-[#CC6699]',
  accentText: 'text-white',
  icon: <SiSass size={28} />,
};

export default function SassPage() {
  return <LanguagePageShell config={config} />;
}
