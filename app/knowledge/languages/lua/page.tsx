import type { Metadata } from 'next';
import { SiLua } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Lua — Knowledge Base',
  description: 'Curated resources for learning Lua — lightweight embeddable scripting.',
};

const config: LanguagePageConfig = {
  slug: 'lua',
  name: 'Lua',
  description: 'Lua is a lightweight, embeddable scripting language prized for its speed, simplicity, and tiny footprint. It powers game engines (Roblox, Love2D), embedded systems, and configuration in Neovim and Redis.',
  layout: 'feed',
  accentBg: 'bg-[#000080]',
  accentText: 'text-white',
  icon: <SiLua size={28} />,
};

export default function LuaPage() {
  return <LanguagePageShell config={config} />;
}
