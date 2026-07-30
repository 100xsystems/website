import type { Metadata } from 'next';
import { SiHaxe } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Haxe — Knowledge Base',
  description: 'Curated resources for learning Haxe — the cross-platform toolkit.',
};

const config: LanguagePageConfig = {
  slug: 'haxe',
  name: 'Haxe',
  description: 'Haxe is a cross-platform language and toolkit that compiles to JavaScript, C++, Python, Lua, PHP, Java, and more. It is ideal for building applications that need to run on multiple platforms from a single codebase.',
  layout: 'compact',
  accentBg: 'bg-[#F5871F]',
  accentText: 'text-white',
  icon: <SiHaxe size={28} />,
};

export default function HaxePage() {
  return <LanguagePageShell config={config} />;
}
