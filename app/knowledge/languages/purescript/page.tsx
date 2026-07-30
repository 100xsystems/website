import type { Metadata } from 'next';
import { SiPurescript } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'PureScript — Knowledge Base',
  description: 'Curated resources for learning PureScript — strongly-typed functional programming for the web.',
};

const config: LanguagePageConfig = {
  slug: 'purescript',
  name: 'PureScript',
  description: 'PureScript is a strongly-typed, purely functional programming language that compiles to JavaScript. It features algebraic data types, type classes, and a sophisticated type system inspired by Haskell.',
  layout: 'compact',
  accentBg: 'bg-[#333333]',
  accentText: 'text-white',
  icon: <SiPurescript size={28} />,
};

export default function PurescriptPage() {
  return <LanguagePageShell config={config} />;
}
