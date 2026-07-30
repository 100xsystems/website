import type { Metadata } from 'next';
import { SiNixos } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Nix — Knowledge Base',
  description: 'Curated resources for learning Nix — the purely functional package management language.',
};

const config: LanguagePageConfig = {
  slug: 'nix',
  name: 'Nix',
  description: 'Nix is a purely functional package management language that powers NixOS and the Nix package manager. It enables reproducible builds, declarative system configuration, and portable development environments.',
  layout: 'bento',
  accentBg: 'bg-[#5277C3]',
  accentText: 'text-white',
  icon: <SiNixos size={28} />,
};

export default function NixPage() {
  return <LanguagePageShell config={config} />;
}
