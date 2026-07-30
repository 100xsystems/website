import type { Metadata } from 'next';
import { SiSqlite } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'SQLite — Knowledge Base',
  description: 'Curated resources for learning SQLite — the most deployed database engine.',
};

const config: LanguagePageConfig = {
  slug: 'sqlite', name: 'SQLite',
  description: 'SQLite is the most widely deployed database engine in the world. It is an embedded, serverless, zero-configuration SQL database engine powering billions of devices and applications.',
  layout: 'compact', accentBg: 'bg-[#003B57]', accentText: 'text-white',
  icon: <SiSqlite size={28} />,
};

export default function SqlitePage() { return <LanguagePageShell config={config} />; }
