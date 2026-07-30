import type { Metadata } from 'next';
import { SiScratch } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Scratch — Knowledge Base',
  description: 'Curated resources for learning Scratch — the world\'s largest coding community.',
};

const config: LanguagePageConfig = {
  slug: 'scratch',
  name: 'Scratch',
  description: 'Scratch is the worlds largest coding community for children and the best way to start programming. It teaches computational thinking through a visual block-based interface used by millions worldwide.',
  layout: 'feed',
  accentBg: 'bg-[#F7A41D]',
  accentText: 'text-black',
  icon: <SiScratch size={28} />,
};

export default function ScratchPage() {
  return <LanguagePageShell config={config} />;
}
