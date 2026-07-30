import type { Metadata } from 'next';
import { SiMysql } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'MySQL — Knowledge Base',
  description: 'Curated resources for learning MySQL — the world most popular open-source database.',
};

const config: LanguagePageConfig = {
  slug: 'mysql', name: 'MySQL',
  description: 'MySQL is the world most popular open-source relational database. It is a core component of the LAMP stack and powers millions of web applications, from small blogs to large-scale enterprise systems.',
  layout: 'bento', accentBg: 'bg-[#4479A1]', accentText: 'text-white',
  icon: <SiMysql size={28} />,
};

export default function MysqlPage() { return <LanguagePageShell config={config} />; }
