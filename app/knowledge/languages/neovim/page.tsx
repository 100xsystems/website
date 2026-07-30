import type { Metadata } from 'next';
import { SiNeovim } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Neovim — Knowledge Base',
  description: 'Curated resources for learning Neovim — the extensible modern editor.',
};

const config: LanguagePageConfig = {
  slug: 'neovim', name: 'Neovim',
  description: 'Neovim is a hyper-extensible, modern refactor of Vim. It features asynchronous architecture, built-in LSP client, Tree-sitter syntax engine, and first-class Lua support for creating powerful editor configurations.',
  layout: 'bento', accentBg: 'bg-[#57A143]', accentText: 'text-white',
  icon: <SiNeovim size={28} />,
};

export default function NeovimPage() { return <LanguagePageShell config={config} />; }
