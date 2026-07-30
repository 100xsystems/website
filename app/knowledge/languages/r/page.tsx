import type { Metadata } from 'next';
import { SiR } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'R — Knowledge Base',
  description: 'Curated resources for learning R — statistical computing and data science.',
};

const config: LanguagePageConfig = {
  slug: 'r',
  name: 'R',
  description: 'R is the definitive language for statistical computing, data analysis, and visualization. It powers academic research, data science, and machine learning workflows worldwide.',
  layout: 'bento',
  accentBg: 'bg-[#276DC3]',
  accentText: 'text-white',
  icon: <SiR size={28} />,
};

export default function RPage() {
  return <LanguagePageShell config={config} />;
}
