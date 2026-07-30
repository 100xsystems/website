import type { Metadata } from 'next';
import { SiGleam } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Gleam — Knowledge Base',
  description: 'Curated resources for learning Gleam — the friendly functional language on BEAM.',
};

const config: LanguagePageConfig = {
  slug: 'gleam',
  name: 'Gleam',
  description: 'Gleam is a friendly, statically-typed functional language that compiles to Erlang (BEAM). It offers a modern Rust-inspired type system, actor-based concurrency, and seamless interop with the BEAM ecosystem.',
  layout: 'compact',
  accentBg: 'bg-[#FFC97B]',
  accentText: 'text-black',
  icon: <SiGleam size={28} />,
};

export default function GleamPage() {
  return <LanguagePageShell config={config} />;
}
