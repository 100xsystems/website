import type { Metadata } from 'next';
import { SiRuby } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Ruby — Knowledge Base',
  description: 'Curated resources for learning Ruby — simplicity and productivity.',
};

const config: LanguagePageConfig = {
  slug: 'ruby',
  name: 'Ruby',
  description:
    'Ruby is a language of simplicity and productivity, famous for the Rails web framework. It prioritizes developer happiness and elegant code. These are the definitive free resources — vetted, current, and complete.',
  layout: 'feed',
  accentBg: 'bg-[#CC342D]',
  accentText: 'text-white',
  icon: <SiRuby size={28} />,
};

export default function RubyPage() {
  return <LanguagePageShell config={config} />;
}
