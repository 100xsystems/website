import type { Metadata } from 'next';
import { SiDart } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Dart — Knowledge Base',
  description: 'Curated resources for learning Dart — the language behind Flutter.',
};

const config: LanguagePageConfig = {
  slug: 'dart',
  name: 'Dart',
  description: 'Dart is the language behind Flutter, Googles cross-platform UI framework. It is optimized for building fast mobile, web, and desktop apps with a single codebase.',
  layout: 'grid',
  accentBg: 'bg-[#0175C2]',
  accentText: 'text-white',
  icon: <SiDart size={28} />,
};

export default function DartPage() {
  return <LanguagePageShell config={config} />;
}
