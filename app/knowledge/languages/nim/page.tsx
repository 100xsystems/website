import type { Metadata } from 'next';
import { SiNim } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Nim — Knowledge Base', description: 'Curated resources for learning Nim.' };
const config: LanguagePageConfig = { slug: 'nim', name: 'Nim', description: 'Nim is an efficient, statically typed systems language with Python-like syntax that compiles to C for C-level performance with high-level expressiveness.', layout: 'feed', accentBg: 'bg-[#FFE953]', accentText: 'text-black', icon: <SiNim size={28} /> };
export default function NimPage() { return <LanguagePageShell config={config} />; }
