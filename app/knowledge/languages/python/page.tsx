import type { Metadata } from 'next';
import { SiPython } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Python — Knowledge Base',
  description: 'Curated resources for learning Python — the most versatile language.',
};

const config: LanguagePageConfig = {
  slug: 'python',
  name: 'Python',
  description:
    'The most versatile language in the ecosystem. Python powers data science, machine learning, backend systems, automation, and scripting. These are the definitive free resources — vetted, current, and complete.',
  layout: 'grid',
  accentBg: 'bg-[#3776AB]',
  accentText: 'text-white',
  icon: <SiPython size={28} />,
};

export default function PythonPage() {
  return <LanguagePageShell config={config} />;
}
