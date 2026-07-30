import type { Metadata } from 'next';
import { SiAutohotkey } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'AutoHotkey — Knowledge Base',
  description: 'Curated resources for learning AutoHotkey — Windows desktop automation.',
};

const config: LanguagePageConfig = {
  slug: 'autohotkey',
  name: 'AutoHotkey',
  description: 'AutoHotkey is a free, open-source scripting language for Windows desktop automation. It enables creating hotkeys, macros, form fillers, and custom UI tools to automate repetitive tasks.',
  layout: 'feed',
  accentBg: 'bg-[#334455]',
  accentText: 'text-white',
  icon: <SiAutohotkey size={28} />,
};

export default function AutohotkeyPage() {
  return <LanguagePageShell config={config} />;
}
