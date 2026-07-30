import type { Metadata } from 'next';
import { SiPostgresql } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'PostgreSQL — Knowledge Base', description: 'Curated resources for learning PostgreSQL — the advanced open-source database.' };
const config: LanguagePageConfig = { slug: 'postgresql', name: 'PostgreSQL', description: 'PostgreSQL is the worlds most advanced open-source relational database with ACID transactions, extensible data types, and powerful indexing.', layout: 'feed', accentBg: 'bg-[#4169E1]', accentText: 'text-white', icon: <SiPostgresql size={28} /> };
export default function PostgresqlPage() { return <LanguagePageShell config={config} />; }
