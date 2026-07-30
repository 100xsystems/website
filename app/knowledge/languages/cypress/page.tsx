import type { Metadata } from 'next';
import { SiCypress } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Cypress — Knowledge Base',
  description: 'Curated resources for learning Cypress — the modern testing framework.',
};

const config: LanguagePageConfig = {
  slug: 'cypress', name: 'Cypress',
  description: 'Cypress is a next-generation frontend testing framework built for the modern web. It enables fast, reliable end-to-end, component, and integration testing with real-time reloads and time-travel debugging.',
  layout: 'compact', accentBg: 'bg-[#17202C]', accentText: 'text-white',
  icon: <SiCypress size={28} />,
};

export default function CypressPage() { return <LanguagePageShell config={config} />; }
