import type { Metadata } from 'next';
import { SiV } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'V — Knowledge Base', description: 'Curated resources for learning V.' };
const config: LanguagePageConfig = { slug: 'v', name: 'V', description: 'V is a simple, fast, safe, compiled language for developing maintainable software — with C interop, built-in GUI library, and cross-platform compilation.', layout: 'feed', accentBg: 'bg-[#5D87BF]', accentText: 'text-white', icon: <SiV size={28} /> };
export default function VPage() { return <LanguagePageShell config={config} />; }
