import type { Metadata } from 'next';
import { SiReact } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'React — Knowledge Base',
  description: 'Curated resources for learning React — the library for web UIs.',
};

const config: LanguagePageConfig = {
  slug: 'react', name: 'React',
  description: 'React is the most popular frontend library for building user interfaces, developed by Meta. It uses a component-based architecture with a virtual DOM to build fast, interactive web applications at scale.',
  layout: 'grid', accentBg: 'bg-[#61DAFB]', accentText: 'text-black',
  icon: <SiReact size={28} />,
};

export default function ReactPage() { return <LanguagePageShell config={config} />; }
