import type { Metadata } from 'next';
import { SiRust } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Rust — Knowledge Base',
  description: 'Curated resources for learning Rust — safe systems programming.',
};

const config: LanguagePageConfig = {
  slug: 'rust',
  name: 'Rust',
  description:
    'Rust is a systems programming language focused on safety, speed, and concurrency without a garbage collector. It powers everything from embedded devices to cloud infrastructure.',
  layout: 'compact',
  accentBg: 'bg-[#000000]',
  accentText: 'text-white',
  icon: <SiRust size={28} />,
};

export default function RustPage() {
  return <LanguagePageShell config={config} />;
}
