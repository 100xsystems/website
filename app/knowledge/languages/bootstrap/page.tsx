import type { Metadata } from 'next';
import { SiBootstrap } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Bootstrap — Knowledge Base',
  description: 'Curated resources for learning Bootstrap — the most popular CSS framework.',
};

const config: LanguagePageConfig = {
  slug: 'bootstrap', name: 'Bootstrap',
  description: 'Bootstrap is the world most popular CSS framework for building responsive, mobile-first websites and web applications. It provides a comprehensive set of HTML, CSS, and JavaScript components.',
  layout: 'compact', accentBg: 'bg-[#7952B3]', accentText: 'text-white',
  icon: <SiBootstrap size={28} />,
};

export default function BootstrapPage() { return <LanguagePageShell config={config} />; }
