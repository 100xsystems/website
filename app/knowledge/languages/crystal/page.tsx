import type { Metadata } from 'next';
import { SiCrystal } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Crystal — Knowledge Base', description: 'Curated resources for learning Crystal.' };
const config: LanguagePageConfig = { slug: 'crystal', name: 'Crystal', description: 'Crystal is a statically typed, compiled language with Ruby-like syntax but blazing LLVM performance — featuring type inference and nil safety.', layout: 'compact', accentBg: 'bg-[#000000]', accentText: 'text-white', icon: <SiCrystal size={28} /> };
export default function CrystalPage() { return <LanguagePageShell config={config} />; }
