import type { Metadata } from 'next';
import { SiSpring } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Spring — Knowledge Base',
  description: 'Curated resources for learning the Spring framework — guides, courses, and references.',
};

const config: LanguagePageConfig = {
  slug: 'spring', name: 'Spring',
  description: 'Spring is the most popular framework for building enterprise Java applications. It provides comprehensive infrastructure support for dependency injection, web services, data access, security, and microservices.',
  layout: 'grid', accentBg: 'bg-[#6DB33F]', accentText: 'text-white',
  icon: <SiSpring size={28} />,
};

export default function SpringPage() { return <LanguagePageShell config={config} />; }
