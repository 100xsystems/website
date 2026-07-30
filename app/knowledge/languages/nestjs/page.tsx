import type { Metadata } from 'next';
import { SiNestjs } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'NestJS — Knowledge Base',
  description: 'Curated resources for learning NestJS — the progressive Node.js framework.',
};

const config: LanguagePageConfig = {
  slug: 'nestjs', name: 'NestJS',
  description: 'NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript by default and combines elements of OOP, FP, and FRP with a modular architecture.',
  layout: 'feed', accentBg: 'bg-[#E0234E]', accentText: 'text-white',
  icon: <SiNestjs size={28} />,
};

export default function NestjsPage() { return <LanguagePageShell config={config} />; }
