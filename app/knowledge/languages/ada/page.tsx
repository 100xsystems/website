import type { Metadata } from 'next';
import { SiAda } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Ada — Knowledge Base',
  description: 'Curated resources for learning Ada — the language of safety-critical systems.',
};

const config: LanguagePageConfig = {
  slug: 'ada',
  name: 'Ada',
  description: 'Ada is a high-integrity, statically-typed programming language designed for safety-critical and real-time systems. It is used extensively in aerospace, defense, railway, and medical systems where reliability is paramount.',
  layout: 'bento',
  accentBg: 'bg-[#01A4FF]',
  accentText: 'text-white',
  icon: <SiAda size={28} />,
};

export default function AdaPage() {
  return <LanguagePageShell config={config} />;
}
