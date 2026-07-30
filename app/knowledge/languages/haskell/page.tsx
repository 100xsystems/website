import type { Metadata } from 'next';
import { SiHaskell } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Haskell — Knowledge Base',
  description: 'Curated resources for learning Haskell — purely functional programming.',
};

const config: LanguagePageConfig = {
  slug: 'haskell',
  name: 'Haskell',
  description: 'Haskell is a purely functional programming language with strong static typing and lazy evaluation. It provides an unparalleled foundation for writing correct, composable, and concurrent software.',
  layout: 'compact',
  accentBg: 'bg-[#5D4F85]',
  accentText: 'text-white',
  icon: <SiHaskell size={28} />,
};

export default function HaskellPage() {
  return <LanguagePageShell config={config} />;
}
