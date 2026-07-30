import type { Metadata } from 'next';
import { SiGodotengine } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'GDScript — Knowledge Base',
  description: 'Curated resources for learning GDScript — the Godot Engine scripting language.',
};

const config: LanguagePageConfig = {
  slug: 'gdscript',
  name: 'GDScript',
  description: 'GDScript is the primary scripting language for the Godot Engine. It has a Python-like syntax but is optimized for game development with built-in types like vectors, colors, and nodes.',
  layout: 'grid',
  accentBg: 'bg-[#478CBF]',
  accentText: 'text-white',
  icon: <SiGodotengine size={28} />,
};

export default function GdscriptPage() {
  return <LanguagePageShell config={config} />;
}
