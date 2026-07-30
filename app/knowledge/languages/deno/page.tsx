import type { Metadata } from 'next';
import { SiDeno } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Deno — Knowledge Base',
  description: 'Curated resources for learning Deno — the modern JavaScript/TypeScript runtime.',
};

const config: LanguagePageConfig = {
  slug: 'deno', name: 'Deno',
  description: 'Deno is a modern JavaScript, TypeScript, and WebAssembly runtime built on V8 and Rust. It provides secure defaults, native TypeScript support, comprehensive standard library, and built-in tooling.',
  layout: 'bento', accentBg: 'bg-[#000000]', accentText: 'text-white',
  icon: <SiDeno size={28} />,
};

export default function DenoPage() { return <LanguagePageShell config={config} />; }
