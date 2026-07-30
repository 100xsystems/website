import type { Metadata } from 'next';
import { SiToml } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'TOML — Knowledge Base',
  description: 'Curated resources for learning TOML — the human-friendly config format.',
};

const config: LanguagePageConfig = {
  slug: 'toml',
  name: 'TOML',
  description: 'TOML (Tom\'s Obvious, Minimal Language) is a human-friendly configuration file format designed for clarity and minimalism. It is the standard for Rust (Cargo.toml), Python (pyproject.toml), and many modern tools.',
  layout: 'feed',
  accentBg: 'bg-[#9C4221]',
  accentText: 'text-white',
  icon: <SiToml size={28} />,
};

export default function TomlPage() {
  return <LanguagePageShell config={config} />;
}
