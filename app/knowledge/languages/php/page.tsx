import type { Metadata } from 'next';
import { SiPhp } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'PHP — Knowledge Base',
  description: 'Curated resources for learning PHP — powering the web.',
};

const config: LanguagePageConfig = {
  slug: 'php',
  name: 'PHP',
  description:
    'PHP powers over 75% of all websites, including WordPress, Laravel applications, and massive platforms like Facebook. It is the most accessible backend language with an unmatched ecosystem. These are the definitive free resources — vetted, current, and complete.',
  layout: 'feed',
  accentBg: 'bg-[#777BB4]',
  accentText: 'text-white',
  icon: <SiPhp size={28} />,
};

export default function PhpPage() {
  return <LanguagePageShell config={config} />;
}
