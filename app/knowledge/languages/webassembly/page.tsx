import type { Metadata } from 'next';
import { SiWebassembly } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'WebAssembly — Knowledge Base',
  description: 'Curated resources for learning WebAssembly — near-native speed in the browser.',
};

const config: LanguagePageConfig = {
  slug: 'webassembly',
  name: 'WebAssembly',
  description: 'WebAssembly (Wasm) is a low-level binary instruction format that runs at near-native speed in browsers and beyond. It enables compiling C/C++, Rust, Go, and other languages to run on the web and in edge runtimes.',
  layout: 'feed',
  accentBg: 'bg-[#654FF0]',
  accentText: 'text-white',
  icon: <SiWebassembly size={28} />,
};

export default function WebassemblyPage() {
  return <LanguagePageShell config={config} />;
}
