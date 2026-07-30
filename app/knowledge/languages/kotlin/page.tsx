import type { Metadata } from 'next';
import { SiKotlin } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Kotlin — Knowledge Base',
  description: 'Curated resources for learning Kotlin — modern JVM language.',
};

const config: LanguagePageConfig = {
  slug: 'kotlin',
  name: 'Kotlin',
  description:
    'Kotlin is the modern JVM language that is now the primary language for Android development. It is concise, expressive, and fully interoperable with Java. These are the definitive free resources — vetted, current, and complete.',
  layout: 'bento',
  accentBg: 'bg-[#7F52FF]',
  accentText: 'text-white',
  icon: <SiKotlin size={28} />,
};

export default function KotlinPage() {
  return <LanguagePageShell config={config} />;
}
