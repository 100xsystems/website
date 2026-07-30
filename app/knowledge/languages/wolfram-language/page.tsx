import type { Metadata } from 'next';
import { SiWolframlanguage } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Wolfram Language — Knowledge Base',
  description: 'Curated resources for learning Wolfram Language — computational knowledge engine.',
};

const config: LanguagePageConfig = {
  slug: 'wolfram-language',
  name: 'Wolfram Language',
  description: 'Wolfram Language is a multi-paradigm computational language developed by Wolfram Research. It powers Mathematica and excels at symbolic mathematics, data science, machine learning, and knowledge-based computing.',
  layout: 'compact',
  accentBg: 'bg-[#DD1100]',
  accentText: 'text-white',
  icon: <SiWolframlanguage size={28} />,
};

export default function WolframLanguagePage() {
  return <LanguagePageShell config={config} />;
}
