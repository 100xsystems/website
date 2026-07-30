import type { Metadata } from 'next';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'SQL — Knowledge Base',
  description: 'Curated resources for learning SQL — the universal query language.',
};

const config: LanguagePageConfig = {
  slug: 'sql',
  name: 'SQL',
  description: 'SQL (Structured Query Language) is the universal language for managing and querying relational databases. It powers everything from small applications to massive data warehouses, and is an essential skill for any developer.',
  layout: 'feed',
  accentBg: 'bg-[#336791]',
  accentText: 'text-white',
  icon: <span className="text-lg font-bold text-white">S</span>,
};

export default function SqlPage() {
  return <LanguagePageShell config={config} />;
}
