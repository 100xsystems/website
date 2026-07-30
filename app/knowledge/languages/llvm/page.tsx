import type { Metadata } from 'next';
import { SiLlvm } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'LLVM — Knowledge Base',
  description: 'Curated resources for learning LLVM — the compiler infrastructure.',
};

const config: LanguagePageConfig = {
  slug: 'llvm',
  name: 'LLVM',
  description: 'LLVM is a collection of modular and reusable compiler and toolchain technologies. It provides the intermediate representation (LLVM IR) and backend infrastructure used by Clang, Rust, Swift, and many other compilers.',
  layout: 'bento',
  accentBg: 'bg-[#4E8CAB]',
  accentText: 'text-white',
  icon: <SiLlvm size={28} />,
};

export default function LlvmPage() {
  return <LanguagePageShell config={config} />;
}
