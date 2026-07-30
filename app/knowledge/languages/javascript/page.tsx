import type { Metadata } from 'next';
import { SiJavascript } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'JavaScript — Knowledge Base',
  description: 'Curated resources for learning JavaScript — the language of the web.',
};

const config: LanguagePageConfig = {
  slug: 'javascript',
  name: 'JavaScript',
  description:
    'The language of the web. JavaScript powers browsers, servers (Node.js), desktop apps (Electron), and increasingly the edge. These are the definitive free resources — vetted, current, and complete.',
  layout: 'grid',
  accentBg: 'bg-[#F7DF1E]',
  accentText: 'text-black',
  icon: <SiJavascript size={28} className="text-black" />,
};

export default function JavaScriptPage() {
  return <LanguagePageShell config={config} />;
}
