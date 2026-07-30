import type { Metadata } from 'next';
import { SiCplusplus } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'C++ — Knowledge Base',
  description: 'Curated resources for learning C++ — systems programming language.',
};

const config: LanguagePageConfig = {
  slug: 'cpp',
  name: 'C++',
  description:
    'C++ is a systems programming language that gives you complete control over memory and hardware. It powers game engines, browsers (Chrome), operating systems, and high-frequency trading. These are the definitive free resources — vetted, current, and complete.',
  layout: 'compact',
  accentBg: 'bg-[#00599C]',
  accentText: 'text-white',
  icon: <SiCplusplus size={28} />,
};

export default function CppPage() {
  return <LanguagePageShell config={config} />;
}
