import type { Metadata } from 'next';
import { SiTailwindcss } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Tailwind CSS — Knowledge Base',
  description: 'Curated resources for learning Tailwind CSS — the utility-first CSS framework.',
};

const config: LanguagePageConfig = {
  slug: 'tailwind', name: 'Tailwind CSS',
  description: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It provides low-level utility classes that let you build designs directly in your markup.',
  layout: 'grid', accentBg: 'bg-[#06B6D4]', accentText: 'text-white',
  icon: <SiTailwindcss size={28} />,
};

export default function TailwindPage() { return <LanguagePageShell config={config} />; }
