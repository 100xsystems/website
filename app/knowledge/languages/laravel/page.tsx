import type { Metadata } from 'next';
import { SiLaravel } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Laravel — Knowledge Base',
  description: 'Curated resources for learning Laravel — the PHP web framework.',
};

const config: LanguagePageConfig = {
  slug: 'laravel', name: 'Laravel',
  description: 'Laravel is a powerful MVC PHP framework designed for developers who need a simple, elegant toolkit for building full-featured web applications with expressive, elegant syntax.',
  layout: 'feed', accentBg: 'bg-[#FF2D20]', accentText: 'text-white',
  icon: <SiLaravel size={28} />,
};

export default function LaravelPage() { return <LanguagePageShell config={config} />; }
