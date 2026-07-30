import type { Metadata } from 'next';
import { SiGo } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Go — Knowledge Base',
  description: 'Curated resources for learning Go — simple, reliable, efficient.',
};

const config: LanguagePageConfig = {
  slug: 'go',
  name: 'Go',
  description:
    'Go is a statically typed, compiled language designed at Google for building simple, reliable, and efficient software at scale. It excels at backend services, microservices, APIs, and concurrent systems.',
  layout: 'compact',
  accentBg: 'bg-[#00ADD8]',
  accentText: 'text-white',
  icon: <SiGo size={28} />,
};

export default function GoPage() {
  return <LanguagePageShell config={config} />;
}
