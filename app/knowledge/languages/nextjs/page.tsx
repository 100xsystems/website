import type { Metadata } from 'next';
import { SiNextdotjs } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Next.js — Knowledge Base',
  description: 'Curated resources for learning Next.js — the React framework for production.',
};

const config: LanguagePageConfig = {
  slug: 'nextjs', name: 'Next.js',
  description: 'Next.js is the leading React framework for building production-grade web applications. It provides server-side rendering, static site generation, API routes, and a rich ecosystem of tools and optimizations.',
  layout: 'compact', accentBg: 'bg-[#000000]', accentText: 'text-white',
  icon: <SiNextdotjs size={28} />,
};

export default function NextjsPage() { return <LanguagePageShell config={config} />; }
